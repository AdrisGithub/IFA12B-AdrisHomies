import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, ɵnoSideEffects } from '@angular/core';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";
import { ModalBase, ModalService } from '../../services/Modal.service';
import { ArtikelVerkaufenComponent } from '../ArtikelVerkaufen/ArtikelVerkaufen.component';
import { BorderContainerComponent } from '../../core-components/BorderContainer/BorderContainer.component';
import { ButtonComponent } from '../../core-components/button/button.component';
import { BubatzStore } from '../../store/ls-store';
import { ArtikelNachbestellenComponent } from '../ArtikelNachbestellen/ArtikelNachbestellen.component';
import { ArtikelInstanzComponent } from '../../components/ArtikelInstanz/ArtikelInstanz.component';

@Component({
  selector: 'ls-artikeldetails',
  standalone: true,
  imports: [ModalContainerComponent, BorderContainerComponent, ButtonComponent, ArtikelInstanzComponent],
  template: `

  <ls-modal-container [title]="'Artikeldetails '+ article()?.name">
    <section class="grid-container">
        <ls-border-container class="beschreibung" title="Beschreibung">
          <pre>{{ article()?.description }}</pre>
        </ls-border-container>
        <ls-border-container class="zusatz" title="Zusatzinformationen">
          <table>
          @for (info of addInfos(); track info.key) {
            <tr>
              <td>{{ info.key }}:</td>
              <td>{{ info.value }}</td>
            </tr>
          }
          </table>
        </ls-border-container>
        <ls-border-container class="instanzen" title="Instanzen">
          <div class="list">
            @for (item of article()?.items; track item.id) {
              <ls-artikel-instanz [clickable]="true" [instanz]="item" />
            }
          </div>
        </ls-border-container>
        <div class="buttons">
        <ls-button [fullWidth]="true" (onClick)="openNachbestellenModal()">Nachbestellen</ls-button>
        <ls-button [fullWidth]="true" (onClick)="openVerkaufenModal()">Verkaufen</ls-button>
        </div>
    </section>
  </ls-modal-container>

  `,
  styleUrl: './Artikeldetails.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtikeldetailsComponent implements ModalBase {

  modalService = inject(ModalService);
  store = inject(BubatzStore);

  article = this.store.currentlyActiveArticle;

  addInfos = computed<Pair[]>(() => {
    const article = this.article()!;
    const keys = Object.keys(article.infos);
    return keys.map(key => ({key, value: article.infos[key]}))
  })

  eff = effect(() => console.log(this.addInfos()))

  openNachbestellenModal = () => { this.modalService.openModal(ArtikelNachbestellenComponent) }
  openVerkaufenModal = () => { this.modalService.openModal(ArtikelVerkaufenComponent) }

}

type Pair = {key: string, value: string}
