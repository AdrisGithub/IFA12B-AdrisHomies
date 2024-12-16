import { Component } from '@angular/core';

@Component({
  selector: 'ls-article',
  standalone: true,
  imports: [],
  template: `
  <article>
    <h4>Grünes T-Shirt</h4>
    <div>
      <p class="price">25,50€</p>

    </div>
  </article>

  `,
  styles:
    `
     
    article {
      background: var(--card-bg);
      width: 25%;
      padding: 1em;
      font-family: Arial, sans-serif;
    }

    div {
      display: flex;
      margin-top: 0.2em;
    }

    p {
      font-size: 1.5em;
    }
    `
  ,
})
export class ArticleComponent {

}
