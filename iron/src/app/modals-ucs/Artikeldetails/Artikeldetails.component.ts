import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, ɵnoSideEffects } from '@angular/core';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";
import { ModalBase, ModalService } from '../../services/Modal.service';
import { ArtikelVerkaufenComponent } from '../ArtikelVerkaufen/ArtikelVerkaufen.component';
import { BorderContainerComponent } from '../../core-components/BorderContainer/BorderContainer.component';
import { ButtonComponent } from '../../core-components/button/button.component';
import { BubatzStore } from '../../store/ls-store';
import { ArtikelNachbestellenComponent } from '../ArtikelNachbestellen/ArtikelNachbestellen.component';

@Component({
  selector: 'ls-artikeldetails',
  standalone: true,
  imports: [ModalContainerComponent, BorderContainerComponent, ButtonComponent],
  template: `

  <ls-modal-container [title]="'Artikeldetails '+ article()?.name">
    <section class="grid-container">
        <ls-border-container class="beschreibung" title="Beschreibung">
          <pre>{{ article()?.description }}</pre>
        </ls-border-container>
        <ls-border-container class="zusatz" title="Zusatzinformationen">
          @for (info of addInfos(); track info.key) {
            {{ info.key }}: {{ info.value }}
          }
        </ls-border-container>
        <ls-border-container class="instanzen" title="Instanzen">
          <pre>test 123</pre>
        </ls-border-container>
        <div class="buttons">
        <ls-button [fullWidth]="true" (onClick)="openNachbestellenModal()">Nachbestellen</ls-button>
        <ls-button [fullWidth]="true" (onClick)="openVerkaufenModal()">Verkaufen</ls-button>
        </div>
    </section>
  </ls-modal-container>
  
  `,
  styles: `    
    .grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr min-content;
      gap: 20px;
    }

    .instanzen {
      grid-column: 2 / span 1;
      grid-row: 1 / span 2;
    }

    .zusatz {
      grid-row: 2 / span 2;
    }

    .buttons {
      grid-column: 2 / span 1;
      grid-row: 3 / span 1;
      display: flex;
      gap: 20px;
    }
  `,
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
