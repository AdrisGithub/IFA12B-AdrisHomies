import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../core-components/button/button.component';
import { ModalDisplayerComponent } from '../../core-components/modal-displayer/modal-displayer.component';
import { Modal1Component } from '../../modals-ucs/example/modal1/modal1.component';
import { ModalService } from '../../services/Modal.service';

@Component({
  selector: 'ls-modal-test-view',
  standalone: true,
  imports: [ButtonComponent, ModalDisplayerComponent],
  template: `

  <ls-modal-displayer/> 

  <main class="flex-container">
    <h1>BuBATZ!</h1>
    <ls-button (onClick)="openModal()">Open Test-Modal!</ls-button>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero veritatis pariatur velit nobis nesciunt laudantium asperiores iusto beatae aperiam minima cupiditate et veniam ipsam mollitia molestiae commodi, doloremque officia debitis.</p>
  </main>
  
  `,
  styles: `
  
    .flex-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: sticky;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }

  h1 {
    font-size: 56px;
    padding-bottom: .5em;
  }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalTestViewComponent { 
  
  modalOpen = signal<boolean>(true);

  modalService = inject(ModalService);

  openModal = () => { this.modalService.openModal(Modal1Component) };
}
