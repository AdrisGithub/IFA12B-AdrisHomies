import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {StatusComponent} from '../status/status.component';
import {ArtikeldetailsComponent} from '../../modals-ucs/Artikeldetails/Artikeldetails.component';
import {ModalService} from '../../services/Modal.service';
import {BubatzStore} from '../../store/ls-store';
import {ServiceDetailsComponent} from '../../modals-ucs/Servicedetails/Servicedetails.component';

@Component({
    selector: 'ls-service',
    imports: [
        CurrencyPipe,
        StatusComponent
    ],
    template: `
    <article (click)="openDetails()">
      <h1>{{ service().name }}</h1>
      <div class="bottomRow">
      <p class="description">{{ service().description }}</p>
      <div class="information">
          @if (service().available) {
            <div class="availabilty">
            <ls-status [displayText]="'verfügbar'" [statusColour]="'green'" [fontSize]="18"></ls-status>
            </div>
          } @else {
            <div class="availabilty">
            <ls-status [displayText]="'gebucht'" [statusColour]="'red'" [fontSize]="18"></ls-status>
            </div>
          }
        <p class="price">{{ service().price | currency: 'EUR' }}</p>
        </div>
      </div>
    </article>
  `,
    styles: `
    article {
      background: var(--card-bg);
      padding: 1em 1.5em;
      font-family: Arial, sans-serif;
      width: 100%;
      box-sizing: border-box;
      cursor: pointer;
    }


    .bottomRow {
      margin-top: 0.7em;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    p {
      font-size: 25px;
    }

    .price {
      justify-self: end;
    }

    .availabilty {
      text-align: left;
      margin: 0 0.5em;
    }

    .information {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin: auto 0;
    }

    .description {
      font-size: 18px;
      color: var(--text-secondary);
      margin: auto 0.5em auto 0;
      width: 13em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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

export interface Service {
  id: number,
  name: string,
  description: string,
  price: number,
  available: boolean
}
