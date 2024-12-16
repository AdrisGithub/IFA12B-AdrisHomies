import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalBase } from '../../services/Modal.service';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";

@Component({
  selector: 'ls-lagerplaetze',
  standalone: true,
  imports: [ModalContainerComponent],
  template: `
  <ls-modal-container [title]="'Lagerplätze'">
  </ls-modal-container>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LagerplaetzeComponent implements ModalBase { }
