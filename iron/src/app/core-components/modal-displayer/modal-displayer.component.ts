import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, viewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../services/Modal.service';

@Component({
  selector: 'ls-modal-displayer',
  standalone: true,
  imports: [],

  template: `
  <dialog (click)="modalService.closeModal()" #lsModal data-modal>
    <div (click)="$event.stopPropagation()">
      <div class="modal-attach-container" #container></div>
    </div>
  </dialog>
  `,
  styles: `
  
  dialog {
    border: none;
    padding: 0;
    color: inherit;
  }

  dialog::backdrop {
    background-color: rgba(26, 26, 26, 0.8);
  }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDisplayerComponent {
  container = viewChild('container', { read: ViewContainerRef });
  dialog = viewChild<ElementRef>('lsModal');

  modalService = inject(ModalService);

  isVisable = computed(() => !!this.displayModal)
  displayModal = this.modalService.getCurrentModal$();

  sub = this.displayModal.subscribe( modal => {
    if(modal) {
      this.container()?.clear();
      this.dialog()?.nativeElement.showModal()
      this.container()?.createComponent(modal);
    }
    else {
      this.container()?.clear();
      this.dialog()?.nativeElement.close()
    }
  })

 }
