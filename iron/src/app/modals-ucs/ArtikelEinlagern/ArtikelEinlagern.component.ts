import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";
import { ModalBase } from '../../services/Modal.service';
import {Article, ArticleComponent} from '../../core-components/article/article.component';
import {BorderContainerComponent} from '../../core-components/BorderContainer/BorderContainer.component';
import {InputComponent} from '../../core-components/input/input.component';
import {ButtonComponent} from '../../core-components/button/button.component';

@Component({
  selector: 'ls-artikel-einlagern',
  standalone: true,
  imports: [ModalContainerComponent, ArticleComponent, BorderContainerComponent, InputComponent, ButtonComponent],
  template: `
    <ls-modal-container [title]="'Artikel einlagern'">
      <ls-article [article]="article"></ls-article>
      <div class="container">
        <ls-border-container [title]="'im Lager'">
          <ul>
            <li>Reihe 5 - Platz 10</li>
            <li>Reihe 2 - Platz 8</li>
            <li>Reihe 29 - Platz 31</li>
          </ul>
        </ls-border-container>
        <form>
          <ls-input [icon]="'ladders'" [displayText]="'Reihe:'"/>
          <ls-input [icon]="'container'" [displayText]="'Platz:'"/>
        </form>
      </div>
      <div class="flex">
        <ls-button>einlagern</ls-button>
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtikelEinlagernComponent implements ModalBase {
  article: Article = {
    title: "Grünes T-Shirt",
    price: "3,00€",
    amountOrdered: 5,
    amountWarehouse: 28
  }
}
