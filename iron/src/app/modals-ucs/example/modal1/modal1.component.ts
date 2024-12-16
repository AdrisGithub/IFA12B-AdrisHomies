import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalContainerComponent } from '../../../core-components/modal-container/modal-container.component';
import { ButtonComponent } from '../../../core-components/button/button.component';
import { ModalBase, ModalService } from '../../../services/Modal.service';
import { Modal2Component } from '../modal2/modal2.component';
import { Modal3Component } from '../modal3/modal3.component';

@Component({
  selector: 'ls-modal1',
  standalone: true,
  imports: [ModalContainerComponent, ButtonComponent],
  template: `
  
  <ls-modal-container [title]="'Artikeldetails'">
    <h3>zusätzliche Infos</h3>
    <br>
    <ls-button (onClick)="openFirstSubModal()">Open first Submodal</ls-button>
    <br><br>
    <ls-button (onClick)="openSecondSubModal()">Open second Submodal</ls-button>
  </ls-modal-container>

  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal1Component implements ModalBase {

  modalService = inject(ModalService);

  openFirstSubModal = () => { this.modalService.openModal(Modal2Component)}
  openSecondSubModal = () => { this.modalService.openModal(Modal3Component)}

 }
