import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ArticleService} from './gen';

@Component({
  selector: 'ls-root',
  standalone: true,
  imports: [ ],
  template: `

    <h1>It works</h1>
  
  `,
  styles: `



  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  title = 'bubatz-ui';

  constructor(private service: ArticleService) {
  }

  ngOnInit() {
    // nthis.service.reorderArticle({amount: 1,buyPrice: 1,sellPrice: 1,id: 1}).subscribe(value => console.log(value))
  }
}
