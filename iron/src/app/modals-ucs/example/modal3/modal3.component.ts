import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalContainerComponent } from '../../../core-components/modal-container/modal-container.component';
import { ModalBase, ModalService } from '../../../services/Modal.service';
import { ButtonComponent } from '../../../core-components/button/button.component';

@Component({
  selector: 'ls-modal3',
  standalone: true,
  imports: [ModalContainerComponent, ButtonComponent],
  template: `
  
  <ls-modal-container [title]="'Anderes Untermodal'">
    <p>hier ist auch leider nichts</p>
    <pre>༼ つ ◕_◕ ༽つ</pre>
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
export class Modal3Component implements ModalBase {

  modalService = inject(ModalService);

  closeModals = () => { this.modalService.clearStack(); }
 }
