import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalBase } from '../../services/Modal.service';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";

@Component({
  selector: 'ls-artikel-nachbestellen',
  standalone: true,
  imports: [ModalContainerComponent],
  template: `
    <ls-modal-container [title]="'Artikel nachbestellen'">
    </ls-modal-container>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtikelNachbestellenComponent implements ModalBase { }
