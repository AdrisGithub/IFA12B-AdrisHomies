import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {StatusComponent} from '../status/status.component';
import {ArtikeldetailsComponent} from '../../modals-ucs/Artikeldetails/Artikeldetails.component';
import {ModalService} from '../../services/Modal.service';
import {BubatzStore} from '../../store/ls-store';
import {ServiceDetailsComponent} from '../../modals-ucs/Servicedetails/Servicedetails.component';

@Component({
  selector: 'ls-service',
  standalone: true,
  imports: [
    CurrencyPipe,
    StatusComponent
  ],
  template: `
    <article (click)="openDetails()">
      <div class="left-box">
        <h3>{{ service().name }}</h3>
        <p class="description">{{service().description}}</p>
      </div>
      <div class="information">
        <p class="price">{{ service().price | currency: 'EUR' }}</p>
        <div class="availability">
          @if (service().available) {
            <ls-status [displayText]="'aktiv'" [statusColour]="'green'"></ls-status>
          } @else {
            <ls-status [displayText]="'nicht verfügbar'" [statusColour]="'red'"></ls-status>
          }
        </div>
      </div>
    </article>
  `,
  styles: `
    article {
      background: var(--card-bg);
      padding: 0.7em;
      font-family: Arial, sans-serif;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
    }

    div {
      display: flex;
    }

    p {
      font-size: 20px;
    }

    .information {
      justify-content: space-between;
      margin-top: 0.4em;
      text-align: center;
    }

    .availability {
      gap: 10px;
      margin-top: 0.2em;
    }
    .left-box, .information {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    .information {
      align-items: flex-end;
    }
    .description {
      font-size: 14px;
      color: var(--text-secondary);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceComponent {
  service = input.required<Service>()

  modalService = inject(ModalService);
  store = inject(BubatzStore);

  openDetails = () => {
    this.store.selectService(this.service().id);
    this.modalService.openModal(ServiceDetailsComponent)
  }
}

export type Service = {
  id: number,
  name: string,
  description: string,
  price: number,
  available: boolean
}
