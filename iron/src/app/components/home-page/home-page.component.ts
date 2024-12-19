import {Component, inject} from '@angular/core';
import {BorderContainerComponent} from '../../core-components/BorderContainer/BorderContainer.component';
import {ArticleComponent} from '../../core-components/article/article.component';
import {BubatzStore} from '../../store/ls-store';
import {ServiceComponent} from '../../core-components/service/service.component';
import {ButtonComponent} from '../../core-components/button/button.component';
import {ModalService} from '../../services/Modal.service';
import {ArtikelVerkaufenComponent} from '../../modals-ucs/ArtikelVerkaufen/ArtikelVerkaufen.component';
import {ArtikelNachbestellenComponent} from '../../modals-ucs/ArtikelNachbestellen/ArtikelNachbestellen.component';

@Component({
  selector: 'ls-home-page',
  standalone: true,
  imports: [
    BorderContainerComponent,
    ArticleComponent,
    ServiceComponent,
    ButtonComponent
  ],
  template: `
    <header class="flex">
      <img src="logo.png" alt="Logo der Segitz-Therme">
      <div class="text">
        <h2>SEGITZ-THERME</h2>
        <p>Baden und Bestandhaltung, </p>
        <p>Ankauf, Transfer, Zahlungsabwicklung</p>
      </div>
    </header>
    <div class="home-container flex">
      <ls-border-container [title]="'Waren'">
          <ls-button [fullWidth]="true" (onClick)="createArticle()">neuen Artikel anlegen</ls-button>
          <div class="article-items">
            @for (article of articles(); track article.id) {
              <div class="item">
                <ls-article [article]="article"></ls-article>
              </div>
            }
          </div>
      </ls-border-container>
      <ls-border-container [title]="'Dienstleistungen'">
          <ls-button [fullWidth]="true" (onClick)="createService()">neue Dienstleistung anlegen</ls-button>
          <div class="service-items">
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
  modalService = inject(ModalService);
  store = inject(BubatzStore);
  articles = this.store.getMappedArticles;
  services = this.store.getMappedServices;

  createArticle() {
    this.modalService.openModal(ArtikelVerkaufenComponent)
  }

  createService() {
    this.modalService.openModal(ArtikelNachbestellenComponent)
  }
}

