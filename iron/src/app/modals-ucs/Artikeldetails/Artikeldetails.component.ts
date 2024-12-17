import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";
import { ModalBase, ModalService } from '../../services/Modal.service';
import { ArtikelVerkaufenComponent } from '../ArtikelVerkaufen/ArtikelVerkaufen.component';
import { BorderContainerComponent } from '../../core-components/BorderContainer/BorderContainer.component';

@Component({
  selector: 'ls-artikeldetails',
  standalone: true,
  imports: [ModalContainerComponent, BorderContainerComponent],
  template: `

  <ls-modal-container [title]="'Artikeldetails'">
    <section class="grid-container">
        <ls-border-container class="beschreibung" title="Beschreibung">
          <pre>{{ beschreibung }}</pre>
        </ls-border-container>
        <ls-border-container class="zusatz" title="Zusatzinformationen">
          <pre>{{ beschreibung }}</pre>
        </ls-border-container>
        <ls-border-container class="instanzen" title="Instanzen">
          <pre>{{ beschreibung }}</pre>
        </ls-border-container>
        <div class="buttons"></div>
    </section>
  </ls-modal-container>
  
  `,
  styles: `    
    .grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 20px;
    }

    .instanzen {
      grid-column: 2 / span 1;
      grid-row: 1 / span 2;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtikeldetailsComponent implements ModalBase { 

  modalService = inject(ModalService);

  beschreibung = "Test124 \ndies ist ein Artikel"

  openVerkaufenModal = () => { this.modalService.openModal(ArtikelVerkaufenComponent) }

}
