import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { ModalBase } from '../../services/Modal.service';
import { ModalContainerComponent } from "../../core-components/modal-container/modal-container.component";
import {ArtikelInstanzComponent} from '../../components/ArtikelInstanz/ArtikelInstanz.component';
import {BorderContainerComponent} from '../../core-components/BorderContainer/BorderContainer.component';
import {BubatzStore} from '../../store/ls-store';
import {ArticleItem, PickupSpot} from '../../gen';

@Component({
  selector: 'ls-lagerplaetze',
  standalone: true,
  imports: [ModalContainerComponent, ArtikelInstanzComponent, BorderContainerComponent],
  template: `
  <ls-modal-container [title]="'Lagerplätze'">
    <ls-border-container class="instanzen" title="hier abholen">
      <div class="list">
        @for (item of pickupSpots(); track $index) {
          <ls-artikel-instanz [clickable]="false" [instanz]="mapItem(item)" />
        }
      </div>
    </ls-border-container>
  </ls-modal-container>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LagerplaetzeComponent implements ModalBase {

  store = inject(BubatzStore);
  pickupSpots = this.store.pickupSpots;

  mapItem(item: PickupSpot): ArticleItem {
    // due to not being clickable, we do not need an id but the component requires it
    return item as ArticleItem;
  }
}
