import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ArticleService} from './gen';

@Component({
  selector: 'ls-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'bubatz-ui';

  constructor(private service: ArticleService) {
  }

  ngOnInit() {
    this.service.reorderArticle({amount: 1,buyPrice: 1,sellPrice: 1,id: 1}).subscribe(value => console.log(value))
  }
}
