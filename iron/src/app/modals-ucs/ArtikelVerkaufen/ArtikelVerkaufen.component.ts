import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";
import { ButtonComponent } from "../../core-components/button/button.component";
import {ModalBase, ModalService} from '../../services/Modal.service';
import {BorderContainerComponent} from '../../core-components/BorderContainer/BorderContainer.component';
import {StatusComponent} from '../../core-components/status/status.component';
import {InputComponent} from '../../core-components/input/input.component';
import {BubatzStore} from '../../store/ls-store';
import {LagerplaetzeComponent} from '../Lagerplaetze/Lagerplaetze.component';

@Component({
  selector: 'ls-artikel-verkaufen',
  standalone: true,
  imports: [ModalContainerComponent, BorderContainerComponent, StatusComponent, InputComponent, ButtonComponent],
  template: `
    <ls-modal-container [title]="'Artikel verkaufen'">
      <h3>{{ article().name }}</h3>
      <div class="Container">
        <ls-border-container [title]="'Beschreibung'">
          <p>{{ article().description}}</p>
        </ls-border-container>
      </div>
      <div class="Container">
        <ls-border-container [title]="'Artikel verkaufen'">
          <div class="availability">
            @if (article().amountOrdered) {
              <ls-status [statusColour]="'orange'" [displayText]="'nachbestellt'"
                         [amount]="article().amountOrdered" [fontSize]="20"></ls-status>
            }
            @if (!article().amountWarehouse) {
              <ls-status [statusColour]="'red'" [displayText]="'nicht verfügbar'" [fontSize]="20"></ls-status>
            } @else {
              <ls-status [statusColour]="'green'" [displayText]="'verfügbar'"
                         [amount]="article().amountWarehouse" [fontSize]="20"></ls-status>
            }
          </div>
          <div class="input">
            <ls-input [displayText]="'gewünschte Verkaufsmenge:'" [fontSize]="20"></ls-input>
          </div>
          <div class="button">
            <ls-button (onClick)="sellArticle()">Artikel verkaufen</ls-button>
          </div>
      </ls-border-container>
      </div>
    </ls-modal-container>
  `,
  styleUrl: 'ArtikelVerkaufen.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ArtikelVerkaufenComponent implements ModalBase {

  modalServcie = inject(ModalService);
  store = inject(BubatzStore);

  article = this.store.currentlyActiveArticle;


  sellArticle() {
    //TODO Backend-call
    this.modalServcie.openModal(LagerplaetzeComponent)
  }
}



