import {ChangeDetectorRef, Component, computed, effect, inject} from '@angular/core';
import {ModalService} from '../../services/Modal.service';
import {BubatzStore} from '../../store/ls-store';
import {BorderContainerComponent} from '../../core-components/BorderContainer/BorderContainer.component';
import {ButtonComponent} from '../../core-components/button/button.component';
import {ModalContainerComponent} from '../../core-components/modal-container/modal-container.component';
import {StatusComponent} from '../../core-components/status/status.component';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'ls-servicedetails',
  standalone: true,
  template: `
    <ls-modal-container [title]="service()!.name">
      <div class="availability">
        @if (service()!.available) {
          <ls-status [displayText]="'verfügbar'" [statusColour]="'green'"></ls-status>
        } @else {
          <ls-status [displayText]="'gebucht'" [statusColour]="'red'"></ls-status>
        }
      </div>
      <div class="container">
        <ls-border-container [title]="'Beschreibung'">
          <p>{{ service()!.description }}</p>
        </ls-border-container>
      </div>
      <div class="container">
        <ls-border-container class="zusatz" title="Zusatzinformationen">
          <table>
            @for (info of addInfos(); track info.key) {
              <tr>
                <td>{{ info.key }}:</td>
                <td>{{ info.value }}</td>
              </tr>
            }
          </table>
        </ls-border-container>
        <div class="button">
          @if (service()!.available) {
            <ls-button [fullWidth]="true" (onClick)="bookService()">buchen</ls-button>
          } @else {
            <ls-button [fullWidth]="true" (onClick)="unbookService()">freigeben</ls-button>
          }
        </div>
      </div>
    </ls-modal-container>
  `,
  imports: [
    BorderContainerComponent,
    ButtonComponent,
    ModalContainerComponent,
    StatusComponent,
  ],
  styles: `
    .container {
      margin-top: 1em;
      min-width: 30vw;
    }
    .button {
      margin-top: 1em;
    }
  `
})
export class ServiceDetailsComponent{

  modalService = inject(ModalService);
  store = inject(BubatzStore);
  toasts = inject(ToastService);
  detector = inject(ChangeDetectorRef);

  service = this.store.currentlyActiveService;

  addInfos = computed<Pair[]>(() => {
    const article = this.service()!;
    const keys = Object.keys(article.infos);
    return keys.map(key => ({key, value: article.infos[key]}))
  })

  bookService = () => {
    this.store.changeServiceAvailability(this.service()!.id, false)
    this.modalService.closeModal() // TODO should just be a toggle button
  };

  unbookService = () => {
    this.store.changeServiceAvailability(this.service()!.id, true)
    this.modalService.closeModal() // TODO should just be a toggle button
  };
}

type Pair = {key: string, value: string}
