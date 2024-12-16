import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";
import { ModalBase } from '../../services/Modal.service';
import {Article, ArticleComponent} from '../../core-components/article/article.component';
import {BorderContainerComponent} from '../../core-components/BorderContainer/BorderContainer.component';

@Component({
  selector: 'ls-artikel-einlagern',
  standalone: true,
  imports: [ModalContainerComponent, ArticleComponent, BorderContainerComponent],
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
          <input type="text">
          <input type="text">
        </form>
      </div>
    </ls-modal-container>
  `,
  styles: `
    :host {
      display: block;
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
