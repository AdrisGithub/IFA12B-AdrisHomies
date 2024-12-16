import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";
import { ModalBase } from '../../services/Modal.service';

@Component({
  selector: 'ls-artikel-einlagern',
  standalone: true,
  imports: [ModalContainerComponent],
  template: `
  
  <ls-modal-container [title]="'Artikel einlagern'">
  </ls-modal-container>
  
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtikelEinlagernComponent implements ModalBase { }
