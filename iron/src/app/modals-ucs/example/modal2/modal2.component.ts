import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalContainerComponent } from '../../../core-components/modal-container/modal-container.component';
import { ButtonComponent } from '../../../core-components/button/button.component';
import { ModalService } from '../../../services/Modal.service';

@Component({
  selector: 'ls-modal2',
  standalone: true,
  imports: [ModalContainerComponent, ButtonComponent],
  template: `
  
  <ls-modal-container [title]="'Untermodal'">
    <p>hier gehts nicht weiter</p>
    <ls-button (onClick)="closeModals()">Zur Startseite</ls-button>
  </ls-modal-container>
  
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal2Component {

  modalService = inject(ModalService);

  closeModals = () => { this.modalService.clearStack(); }
 }
