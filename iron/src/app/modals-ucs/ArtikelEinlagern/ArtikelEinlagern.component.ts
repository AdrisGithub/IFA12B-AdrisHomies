import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";
import {ModalBase, ModalService} from '../../services/Modal.service';
import {ArticleComponent} from '../../core-components/article/article.component';
import {BorderContainerComponent} from '../../core-components/BorderContainer/BorderContainer.component';
import {InputComponent} from '../../core-components/input/input.component';
import {ButtonComponent} from '../../core-components/button/button.component';
import {BubatzStore} from '../../store/ls-store';
import {CurrencyPipe} from '@angular/common';
import {StatusComponent} from '../../core-components/status/status.component';

@Component({
  selector: 'ls-artikel-einlagern',
  standalone: true,
  imports: [ModalContainerComponent, ArticleComponent, BorderContainerComponent, InputComponent, ButtonComponent, CurrencyPipe, StatusComponent, FormsModule, ReactiveFormsModule],
  template: `
    <ls-modal-container [title]="'Artikel einlagern'">
      <article>
        <div>
          <h3>{{ article()?.title }}</h3>
          <p class="verkaufspreis">Verkaufspreis</p>
        </div>
        <div class="information">
          <p class="price">{{ article()?.price | currency: 'EUR' }}</p>
          <div class="availability">
            @if (article()?.amountOrdered) {
              <ls-status [statusColour]="'orange'" [displayText]="'nachbestellt'"
                         [amount]="article()?.amountOrdered"></ls-status>
            }
            @if (!article()?.amountWarehouse) {
              <ls-status [statusColour]="'red'" [displayText]="'nicht verfügbar'"></ls-status>
            } @else {
              <ls-status [statusColour]="'green'" [displayText]="'verfügbar'"
                         [amount]="article()?.amountWarehouse"></ls-status>
            }
          </div>
        </div>
      </article>
      <div class="container">
        <ls-border-container [title]="'im Lager'">
          <ul>
            @for (item of article()?.items; track item.id) {
              @if (item.reihenNr != null) {
                <li>Reihe {{ item.reihenNr }} - Platz {{ item.spaltenNr }}</li>
              }
            } @empty {
              <li>Keine Artikel verfügbar.</li>
            }
          </ul>
        </ls-border-container>
        <form>
          <ls-input [icon]="'ladders'" [displayText]="'Reihe:'" (value)="row = $event" />
          <ls-input [icon]="'container'" [displayText]="'Platz:'" (value)="column = $event"/>
        </form>
      </div>
      <div class="flex">
        <ls-button (onClick)="storeArticle()">einlagern</ls-button>
      </div>
    </ls-modal-container>
  `,
  styles: `
    :host {
      display: block;
    }
    ul {
      list-style: none;
      padding: 0;
      font-family: Arial, sans-serif;
    }
    li {
      background-color: var(--card-bg);
      border-radius: 10px;
      padding: 0.5em;
      margin: 0.5em;
    }
    .container {
      display: flex;
      gap: 1em;
      align-items: center;
      flex-wrap: wrap;
    }
    .flex {
      display: flex;
      justify-content: end;
    }

    article {
      background: var(--card-bg);
      padding: 0.7em;
      font-family: Arial, sans-serif;
      width: 100%;
      box-sizing: border-box;
    }

    div {
      display: flex;
      justify-content: space-between;
    }

    p {
      font-size: 20px;
    }

    .information {
      justify-content: space-between;
      flex-direction: row-reverse;
      margin-top: 0.4em;
      text-align: center;
    }

    .availability {
      gap: 10px;
      margin-top: 0.2em;
    }
    .verkaufspreis {
      color: var(--text-secondary);
    }
    .price {
      font-size: 36px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtikelEinlagernComponent implements ModalBase {
  row?: string;
  column?: string;

  store = inject(BubatzStore);
  modalService = inject(ModalService);
  article = this.store.currentlyActiveArticle;

  storeArticle = () => {
    if (this.row && this.column){
      const row = Number.parseInt(this.row);
      const column = Number.parseInt(this.column);

      this.store.storeArticle(this.store.selectedInstance()!.id, row, column)
      this.modalService.clearStack();
    }
  }

}
