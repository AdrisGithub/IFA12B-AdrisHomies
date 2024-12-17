import {Component, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import { ModalTestViewComponent } from './views/ModalTestView/ModalTestView.component';
import {BubatzStore} from './store/ls-store';

@Component({
  selector: 'ls-root',
  standalone: true,
  imports: [ModalTestViewComponent],
  template: `

    <ls-modal-test-view/>

  `,
  styles: `



  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  title = 'bubatz-ui';

  store = inject(BubatzStore);

  ngOnInit() {
    this.store.createArticle("Hier ist ein neuer name")
  }
}
