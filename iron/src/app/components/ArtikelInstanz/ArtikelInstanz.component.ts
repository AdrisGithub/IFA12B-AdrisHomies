import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ArticleItem } from '../../gen';
import { StatusComponent } from '../../core-components/status/status.component';
import { ModalService } from '../../services/Modal.service';
import { ArtikelEinlagernComponent } from '../../modals-ucs/ArtikelEinlagern/ArtikelEinlagern.component';
import { BubatzStore } from '../../store/ls-store';

@Component({
    selector: 'ls-artikel-instanz',
    imports: [StatusComponent],
    template: `
  
    <div [class]="['instanz', clickable() && isInOrder() && 'clickable']" (click)="handleClick()">
      <span class="amount">
        Anzahl: {{ instanz().amount }}
      </span>
      @if(!isInOrder()) {
        <div class="location">
          <img src="./container.svg">
          <p>
            Reihe: {{ instanz().reihenNr }} <br>
            Spalte: {{ instanz().spaltenNr }}
          </p>
      </div>
      }
      @else {
        <ls-status class="status" [amount]="instanz().amount" [statusColour]="'orange'" displayText="bestellt" />
      }
    </div>

  `,
    styles: `
    :host {
      display: inline block;
    }

    .instanz {
    background-color: var(--card-bg);
    border-radius: 10px;
    padding: .4em 1em;
    display: flex;
    justify-content: space-between;
}

.location img {
    height: 40px;
    margin: auto 0;
}

.location p {
    width: max-content;
}

.amount {
    margin: auto 1em auto 0;
}

.location {
    color: var(--text-secondary);
    display: flex;
    gap: 10px;
    font-size: 21px;
} 

.status {
  height: max-content;
  margin: auto 0;
}

.clickable {
  cursor: pointer;
}

  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtikelInstanzComponent { 
  instanz = input.required<ArticleItem>();
  clickable = input<boolean>(false);

  isInOrder = computed<boolean>(() => !this.instanz().reihenNr && !this.instanz().spaltenNr)

  modalService = inject(ModalService);
  store = inject(BubatzStore);

  handleClick = () => {
    if (this.clickable() && !this.instanz().reihenNr && !this.instanz().spaltenNr) {
      this.store.selectInstance(this.instanz());
      this.modalService.openModal(ArtikelEinlagernComponent);
    }
  }
}
