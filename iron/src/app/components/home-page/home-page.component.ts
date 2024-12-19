import {Component, inject} from '@angular/core';
import {BorderContainerComponent} from '../../core-components/BorderContainer/BorderContainer.component';
import {ArticleComponent} from '../../core-components/article/article.component';
import {BubatzStore} from '../../store/ls-store';
import {ServiceComponent} from '../../core-components/service/service.component';

@Component({
  selector: 'ls-home-page',
  standalone: true,
  imports: [
    BorderContainerComponent,
    ArticleComponent,
    ServiceComponent
  ],
  template: `
    <header class="flex">
      <img src="logo.png" alt="Logo der Segitz-Therme">
      <div class="text">
        <h4>SEGITZ-THERME</h4>
        <p>Baden und Bestandhaltung, </p>
        <p>Ankauf, Transfer, Zahlungsabwicklung</p>
      </div>
    </header>
    <div class="home-container flex">
      <ls-border-container [title]="'Waren'">
        <div class="articles">
          @for (article of articles(); track article.id) {
            <div class="item">
                <ls-article [article]="article"></ls-article>
            </div>
          }
        </div>
      </ls-border-container>
      <ls-border-container [title]="'Dienstleistungen'">
        <div class="services">
          @for (service of services(); track service.id) {
            <div class="item">
                <ls-service [service]="service"></ls-service>
            </div>
          }
        </div>
      </ls-border-container>
    </div>
  `,
  styleUrl: 'home-page.component.css',
})
export class HomePageComponent {
  store = inject(BubatzStore);
  articles = this.store.getMappedArticles;
  services = this.store.getMappedServices;
}

