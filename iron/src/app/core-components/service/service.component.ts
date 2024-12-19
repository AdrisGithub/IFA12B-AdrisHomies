import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {StatusComponent} from '../status/status.component';

@Component({
  selector: 'ls-service',
  standalone: true,
  imports: [
    CurrencyPipe,
    StatusComponent
  ],
  template: `
    <article>
      <h1>{{ service().name }}</h1>
      <div class="bottomRow">
      <!--<p class="description">{{ service().description }}</p>-->
        <p class="description">Hallo, das hier ist eine sehr, sehr, sehr, sehr, sehr lange Beschreibung</p>
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
}

export type Service = {
  id: number,
  name: string,
  description: string,
  price: number,
  available: boolean
}
