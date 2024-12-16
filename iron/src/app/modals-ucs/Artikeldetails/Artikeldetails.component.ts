import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";
import { ModalBase, ModalService } from '../../services/Modal.service';
import { ArtikelVerkaufenComponent } from '../ArtikelVerkaufen/ArtikelVerkaufen.component';
import { ButtonComponent } from "../../core-components/button/button.component";

@Component({
  selector: 'ls-artikeldetails',
  standalone: true,
  imports: [ModalContainerComponent, ButtonComponent],
  template: `

  <ls-modal-container [title]="'Artikeldetails'">
    <h3>zusätzliche Infos</h3>
    <br>
    <ls-button (onClick)="openVerkaufenModal()">Artikel verkaufen</ls-button>
  </ls-modal-container>
  
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtikeldetailsComponent implements ModalBase { 

  modalService = inject(ModalService);

  openVerkaufenModal = () => { this.modalService.openModal(ArtikelVerkaufenComponent) }

}
