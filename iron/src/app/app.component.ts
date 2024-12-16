import {Component, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import {ArticleService} from './gen';
import { ModalTestViewComponent } from './views/ModalTestView/ModalTestView.component';

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

  service = inject(ArticleService);

  ngOnInit() {
    // this.service.reorderArticle({amount: 1,buyPrice: 1,sellPrice: 1,id: 1}).subscribe(value => console.log(value))
  }
}
