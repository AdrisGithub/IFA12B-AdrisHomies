import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {StatusComponent} from '../status/status.component';
import {CurrencyPipe} from '@angular/common';
import {ArticleItem} from '../../gen';
import { ModalService } from '../../services/Modal.service';
import { BubatzStore } from '../../store/ls-store';
import { ArtikeldetailsComponent } from '../../modals-ucs/Artikeldetails/Artikeldetails.component';

@Component({
    selector: 'ls-article',
    imports: [
        StatusComponent,
        CurrencyPipe
    ],
    template: `
    <article (click)="openDetails()">
      <h1>{{ article().title }}</h1>
      <div class="information">
        <div class="availability">
          @if (!article().amountWarehouse) {
            <ls-status [statusColour]="'red'" [displayText]="'nicht verfügbar'" [fontSize]="18"></ls-status>
          }
          @else {
            <ls-status [statusColour]="'green'" [displayText]="'verfügbar'"
                       [amount]="article().amountWarehouse" [fontSize]="18"></ls-status>
          }
          @if (article().amountOrdered) {
            <ls-status [statusColour]="'orange'" [displayText]="'nachbestellt'"
                       [amount]="article().amountOrdered" [fontSize]="18"></ls-status>
          }
        </div>
        <p class="price">{{ article().price | currency: 'EUR' }}</p>
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

      div {
        display: flex;
      }

      p {
        font-size: 25px;
      }

      .information {
        justify-content: space-between;
        margin-top: 0.7em;
        text-align: center;
      }

      .availability {
        gap: 10px;
        margin-top: 0.2em;
      }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ArticleComponent {
  article = input.required<Article>();

  modalService = inject(ModalService);
  store = inject(BubatzStore);

  openDetails = () => {
    console.log("click")
    this.store.selectArticle(this.article().id);
    this.modalService.openModal(ArtikeldetailsComponent)
  }
}

export interface Article {
  id: number,
  description: string,
  title: string,
  price: number,
  amountWarehouse?: number,
  amountOrdered?: number;
  items: ArticleItem[];
}
