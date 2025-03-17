import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ModalService } from '../../services/Modal.service';

@Component({
    selector: 'ls-modal-container',
    imports: [],
    template: `

  <section class="modal">
    <header>
      <h1>{{ title() }}</h1>
      <button (click)="closeDialoge()" type="button"><img src="./x.svg"></button>
    </header>
    <ng-content/>
  </section>

  `,
    styleUrl: './modal-container.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalContainerComponent {

  title = input.required<string>();

  modalService = inject(ModalService);

  closeDialoge = () => { this.modalService.closeModal(); }
 }
