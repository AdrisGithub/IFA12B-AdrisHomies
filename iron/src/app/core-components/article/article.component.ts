import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {StatusComponent} from '../status/status.component';

@Component({
  selector: 'ls-article',
  standalone: true,
  imports: [
    StatusComponent
  ],
  template: `
    <article>
      <h1>{{ article().title }}</h1>
      <div class="information">
        <p class="price">{{ article().price }}</p>
        <div class="availability">
          @if (article().amountOrdered) {
            <ls-status [statusColour]="'orange'" [displayText]="'nachbestellt'"
                       [amount]="article().amountOrdered"></ls-status>
          }
          @if (!article().amountWarehouse) {
            <ls-status [statusColour]="'red'" [displayText]="'nicht verfügbar'"></ls-status>
          }
          @else {
            <ls-status [statusColour]="'green'" [displayText]="'verfügbar'"
                       [amount]="article().amountWarehouse"></ls-status>
          }
        </div>
      </div>
    </article>

  `,
  styles:
    `
      article {
        background: var(--card-bg);
        padding: 1em;
        font-family: Arial, sans-serif;
        width: 100%;
        box-sizing: border-box;
      }

      div {
        display: flex;
      }

      p {
        font-size: 32px;
      }

      .information {
        justify-content: space-between;
        margin-top: 0.4em;
        text-align: center;
      }

      .availability {
        gap: 15px;
        margin-top: 0.2em;
      }
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ArticleComponent {
  article = input.required<Article>();
}

export type Article = {
  title: string,
  price: string,
  amountWarehouse?: number,
  amountOrdered?: number;
}
