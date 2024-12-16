import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";
import { ButtonComponent } from "../../core-components/button/button.component";
import { ModalBase } from '../../services/Modal.service';

@Component({
  selector: 'ls-artikel-verkaufen',
  standalone: true,
  imports: [ModalContainerComponent],
  template: `
  <ls-modal-container [title]="'Artikel verkaufen'">
  </ls-modal-container>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtikelVerkaufenComponent implements ModalBase { }
