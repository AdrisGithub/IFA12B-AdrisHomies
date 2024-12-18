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
      <div>
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
