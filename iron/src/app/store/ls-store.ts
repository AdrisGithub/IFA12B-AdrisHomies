import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {
  ArticleItem,
  ArticleService,
  DepositoryService,
  GetArticle,
  GetService, PatchArticle,
  PickupSpot,
  PostArticle,
  ServiceService
} from '../gen';
import {Article} from '../core-components/article/article.component';
import {Service} from '../core-components/service/service.component';
import {ToastService} from '../services/toast.service';

type BubatzState = {
  allArticles: GetArticle[],
  allServices: GetService[],
  selectedInstance: ArticleItem | undefined,
  currentlyActiveArticle: GetArticle | undefined,
  currentlyActiveService: GetService | undefined,
  pickupSpots : PickupSpot[],
};

const initalState: BubatzState = {
  allArticles: [],
  allServices: [],
  selectedInstance: undefined,
  currentlyActiveArticle: undefined,
  currentlyActiveService: undefined,
  pickupSpots : []
}

export const BubatzStore = signalStore(
  {providedIn: "root"},
  withState(initalState),
  withMethods((store) => {
    const article = inject(ArticleService);
    const service = inject(ServiceService);
    const depository = inject(DepositoryService);
    const toast = inject(ToastService);

    return {
       loadArticles(){
         // no need to call this manually
         depository.getArticles().subscribe({
           next: articles => {
             patchState(store, {allArticles: articles});
           },
           error: err => {
             console.error(err)
             toast.addToast({message: 'Server Fehler', detail: 'Artikel konnten nicht geladen werden', severity: 'error'})
           }
         });
       },
       loadServices(){
         service.getServices().subscribe({
           next: services => {
             patchState(store, {allServices: services});
           },
           error: err => {
             console.error(err)
             toast.addToast({message: 'Server Fehler', detail: 'Dienstleistungen konnten nicht geladen werden', severity: 'error'})
           }
         })
       },
       createArticle(newArticle: PostArticle){
        article.createArticle(newArticle).subscribe({
          next: createdArticle => {
            patchState(store, { allArticles: [...store.allArticles(), createdArticle]})
            toast.addToast({message: 'Erfolgreich angelegt' , detail: 'Artikel wurde erfolgreich angelegt' ,severity: "success"})
          },
          error: err => {
            console.error(err)
            toast.addToast({message: 'Server Fehler', detail: 'Artikel konnten nicht angelegt werden', severity: 'error'})
          }
        })
      },
       storeArticle(id: number, row: number, column: number){
         depository.storeArticle({ id, reihenNr: row, spaltenNr: column}).subscribe({
           next: value => {

             const articles = store.allArticles().map(article => {
               if (article.id == value.id){
                 return value;
               }
               return article;
             })

             patchState(store, {allArticles: articles})
             toast.addToast({message: 'Erfolgreich eingelagert' , detail: 'Artikel wurde erfolgreich eingelagert' ,severity: "success"})
           },
           error: err => {
             console.error(err)
             toast.addToast({message: 'Server Fehler', detail: 'Artikel konnten nicht eingelagert werden', severity: 'error'})
           }
         })
       },
       selectArticle(articleId: number) {
         patchState(store, () => {
           const article = store.allArticles().find(a => a.id === articleId)
           return {currentlyActiveArticle: article}
         });
       },
      selectService(serviceId: number) {
        patchState(store, () => {
          const service = store.allServices().find(service => service.id === serviceId);
          return {currentlyActiveService: service}
        })
      },
      changeServiceAvailability(serviceId: number, desiredState: boolean) {
        service.bookService(serviceId, {id: serviceId, state: desiredState}).subscribe({
          next: () => {

            patchState(store, () => {
              const service = store.currentlyActiveService()!;

              service.available = !service.available;

              return {currentlyActiveService: service}
            })

            const services = store.allServices().map(service => {
              if (service.id == serviceId) {
                service.available = desiredState;
                return service;
              }
              return service;
            })
            patchState(store, {allServices: services})
          },
          error: err => {
            console.error(err)
            toast.addToast({message: 'Server Fehler', detail: 'Dienstleistungsbuchung konnten nicht geändert werden', severity: 'error'})
          }
        })
      },
      sellArticle(articleId: number, amount: number) {
         depository.sellArticle(articleId, {amount}).subscribe({
           next: value => {
             const articles = store.allArticles().map (article => {
               if (article.id == value.article.id) {
                 return value.article;
               }
               return article;
             })
             patchState(store, {allArticles: articles, pickupSpots: value.spots})
             toast.addToast({message: 'Erfolgreich verkauft' , detail: 'Artikel wurde erfolgreich verkauft' ,severity: "success"})
           },
           error: err => {
             console.error(err)
             toast.addToast({message: 'Server Fehler', detail: 'Artikel konnte nicht verkauft werden', severity: 'error'})
           }
         });
      },
      reorderArticle(particle : PatchArticle) {
        article.reorderArticle(particle).subscribe({
          next: value => {
            const articles = store.allArticles().map(article => {
              if (article.id == value.id){
                return value;
              }
              return article;
            })

            patchState(store, {allArticles: articles})
            toast.addToast({message: 'Erfolgreich nachbestellt' , detail: 'Artikel wurde erfolgreich nachbestellt' ,severity: "success"})
          },
          error: err => {
            console.error(err)
            toast.addToast({message: 'Server Fehler', detail: 'Artikel konnte nicht erneut gebucht werden', severity: 'error'})
          }
        })
      },
      selectInstance(instance: ArticleItem) {
         patchState(store, {selectedInstance: instance });
      }
    }
  }),
  withComputed(({allArticles, allServices, currentlyActiveArticle, pickupSpots}) => ({
    getMappedArticles: computed(() => allArticles().map(getArticle => mapArticle(getArticle))),
    getMappedServices: computed(() => allServices().map(getService => mapService(getService))),
    currentlyActiveArticle: computed<GetArticle | undefined>(() => currentlyActiveArticle()),
    currentlyActiveArticleWithAmounts: computed<Article | undefined>(() => {
      const a = currentlyActiveArticle();
      return a ? mapArticle(a) : undefined;
    }),
    getPickupSpots: computed<PickupSpot[]> (() => pickupSpots())
  })),
  withHooks({
    onInit({loadArticles, loadServices}){
      // load all the Articles at startup
      loadArticles();
      // load all the Services at startup
      loadServices()
    }
  })
);

function mapArticle(getArticle: GetArticle): Article {
  let amountInWarehouse = 0;
  let amountIsOrdered = 0;
  const items = getArticle.items;
  items.forEach(item => {
    if (item.reihenNr===null){
      amountIsOrdered = amountIsOrdered + item.amount;
    }
    else {
      amountInWarehouse = amountInWarehouse + item.amount;
    }
  })
  return {
    id: getArticle.id,
    description: getArticle.description,
    title: getArticle.name,
    price: getArticle.sellPrice,
    amountWarehouse: amountInWarehouse,
    amountOrdered: amountIsOrdered,
    items: getArticle.items
  };
}

function mapService(getService: GetService): Service {
  return {
    description: getService.description,
    price: getService.price,
    available: getService.available,
    name: getService.name,
    id: getService.id
  }
}
