import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";
import { ButtonComponent } from "../../core-components/button/button.component";
import { ModalBase } from '../../services/Modal.service';
import {BorderContainerComponent} from '../../core-components/BorderContainer/BorderContainer.component';
import {StatusComponent} from '../../core-components/status/status.component';
import {InputComponent} from '../../core-components/input/input.component';
import {BubatzStore} from '../../store/ls-store';

@Component({
  selector: 'ls-artikel-verkaufen',
  standalone: true,
  imports: [ModalContainerComponent, BorderContainerComponent, StatusComponent, InputComponent, ButtonComponent],
  template: `
    <ls-modal-container [title]="'Artikel verkaufen'">
      <h3>{{ article.title }}</h3>
      <ls-border-container [title]="'Beschreibung'">
        <p>{{ article.description }}</p>
      </ls-border-container>
      <ls-border-container [title]="'Artikel verkaufen'">
        <div class="availability">
          @if (article.amountOrdered) {
            <ls-status [statusColour]="'orange'" [displayText]="'nachbestellt'"
                       [amount]="article.amountOrdered" [fontSize]="20"></ls-status>
          }
          @if (!article.amountWarehouse) {
            <ls-status [statusColour]="'red'" [displayText]="'nicht verfügbar'" [fontSize]="20"></ls-status>
          }
          @else {
            <ls-status [statusColour]="'green'" [displayText]="'verfügbar'"
                       [amount]="article.amountWarehouse" [fontSize]="20"></ls-status>
          }
        </div>
        <div class="input">
         <ls-input [displayText]="'gewünschte Verkaufsmenge:'" [fontSize]="20"></ls-input>
        </div>
        <div class="button">
        <ls-button (onClick)="sellArticle()">Artikel verkaufen</ls-button>
        </div>
      </ls-border-container>
    </ls-modal-container>
  `,
  styleUrl: 'ArtikelVerkaufen.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ArtikelVerkaufenComponent implements ModalBase {

  store = inject(BubatzStore);

  article : Article = {
    id: 1,
    title: 'Grünes T-Shirt',
    description: 'Das ist ein grünes T-Shirt und wir wünschen euch frohe Weihnacht falalalalalalalala',
    amountWarehouse: 20,
    amountOrdered: 20,
  }

  sellArticle() {

  }
}

export type Article = {
  id: number,
  title: string,
  description: string,
  amountWarehouse?: number,
  amountOrdered?: number;
}


