import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {HomePageComponent} from './components/home-page/home-page.component';
import { ModalDisplayerComponent } from './core-components/modal-displayer/modal-displayer.component';
import {AsyncPipe} from '@angular/common';
import {ToastComponent} from './core-components/toast/toast.component';
import {ToastService} from './services/toast.service';

@Component({
    selector: 'ls-root',
    imports: [HomePageComponent, ModalDisplayerComponent, AsyncPipe, ToastComponent],
    template: `
    @for (toast of toasts.getToasts() | async; track toast.id) {
      <ls-toast (close)="closeToast(toast.id)" [toast]="toast"></ls-toast>
    }
    <ls-modal-displayer/>
    <ls-home-page/>

  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  closeToast(id: number) {
     this.toasts.removeToast(id);
  }

  title = 'bubatz-ui';
  toasts = inject(ToastService);

}
