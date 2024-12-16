import {Component, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import { ModalTestViewComponent } from './views/ModalTestView/ModalTestView.component';
import {BubatzStore} from './store/ls-store';
import {HomePageComponent} from './components/home-page/home-page.component';

@Component({
  selector: 'ls-root',
  standalone: true,
  imports: [ModalTestViewComponent, HomePageComponent],
  template: `

    <ls-home-page/>

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
    this.store.nameToString();
  }
}
