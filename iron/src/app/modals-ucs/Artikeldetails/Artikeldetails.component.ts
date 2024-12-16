import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";
import { ModalBase, ModalService } from '../../services/Modal.service';
import { ArtikelVerkaufenComponent } from '../ArtikelVerkaufen/ArtikelVerkaufen.component';
import { ButtonComponent } from "../../core-components/button/button.component";
import { BorderContainerComponent } from '../../core-components/BorderContainer/BorderContainer.component';

@Component({
  selector: 'ls-artikeldetails',
  standalone: true,
  imports: [ModalContainerComponent, ButtonComponent, BorderContainerComponent],
  template: `

  <ls-modal-container [title]="'Artikeldetails'">
    <ls-border-container [fontSize]="25" title="Test 123">
      <h3>zusätzliche Infos</h3>
      <br>
      <ls-button (onClick)="openVerkaufenModal()">Artikel verkaufen</ls-button>
    </ls-border-container>
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
