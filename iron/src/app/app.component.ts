import {Component, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import {BubatzStore} from './store/ls-store';
import {HomePageComponent} from './components/home-page/home-page.component';
import { ModalDisplayerComponent } from './core-components/modal-displayer/modal-displayer.component';

@Component({
  selector: 'ls-root',
  standalone: true,
  imports: [HomePageComponent, ModalDisplayerComponent],
  template: `

    <ls-modal-displayer/> 
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
  }
}
