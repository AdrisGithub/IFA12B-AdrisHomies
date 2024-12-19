import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ModalBase, ModalService} from '../../services/Modal.service';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";
import {BorderContainerComponent} from '../../core-components/BorderContainer/BorderContainer.component';
import {ButtonComponent} from '../../core-components/button/button.component';
import {InputComponent} from '../../core-components/input/input.component';
import {StatusComponent} from '../../core-components/status/status.component';
import {BubatzStore} from '../../store/ls-store';
import {LagerplaetzeComponent} from '../Lagerplaetze/Lagerplaetze.component';
import {PatchArticle} from '../../gen';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'ls-artikel-nachbestellen',
  standalone: true,
  imports: [ModalContainerComponent, BorderContainerComponent, ButtonComponent, InputComponent, StatusComponent],
  template: `
    <ls-modal-container [title]="'Artikel nachbestellen'">
      <h3>{{ article()?.title }}</h3>
      <div class="Container">
        <ls-border-container [title]="'Beschreibung'">
          <p>{{ article()?.description }}</p>
        </ls-border-container>
      </div>
      <div class="Container">
        <ls-border-container [title]="'Artikelinformationen'">
          <div class="availability">
            @if (article()?.amountOrdered) {
              <ls-status [statusColour]="'orange'" [displayText]="'nachbestellt'"
                         [amount]="article()?.amountOrdered" [fontSize]="20"></ls-status>
            }
            @if (!article()?.amountWarehouse) {
              <ls-status [statusColour]="'red'" [displayText]="'nicht verfügbar'" [fontSize]="20"></ls-status>
            } @else {
              <ls-status [statusColour]="'green'" [displayText]="'verfügbar'"
                         [amount]="article()?.amountWarehouse" [fontSize]="20"></ls-status>
            }
          </div>
          <div class="input">
            <ls-input (value)="amount=$event" [displayText]="'gewünschte Bestellmenge:'" [fontSize]="20"></ls-input>
          </div>
          <div class="button">
            <ls-button [fullWidth]="true" (onClick)="restock()">Artikel bestellen</ls-button>
          </div>
        </ls-border-container>
      </div>
    </ls-modal-container>
  `,
  styleUrl: 'ArtikelNachbestellen.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtikelNachbestellenComponent implements ModalBase {

  modalservice = inject(ModalService);
  store = inject(BubatzStore);
  toast = inject(ToastService);
  article = this.store.currentlyActiveArticleWithAmounts;
  amount : string | undefined;

  restock() {
    if (this.amount) {
      const particle : PatchArticle = {id: this.article()!.id, amount: Number.parseInt(this.amount)};
      this.store.reorderArticle(particle);
    } else{
      this.toast.addToast({severity: "warning", message: 'Eingabe Fehler', detail: 'Die Anzahl der Artikel muss angegeben werden'})
    }
    this.modalservice.clearStack();
  }
}
