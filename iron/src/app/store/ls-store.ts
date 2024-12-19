import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {
  ArticleItem,
  ArticleService,
  DepositoryService,
  GetArticle,
  GetService, PatchArticle,
  PickupSpot,
  ServiceService
} from '../gen';
import {Article} from '../core-components/article/article.component';
import {Service} from '../core-components/service/service.component';

type BubatzState = {
  allArticles: GetArticle[],
  allServices: GetService[],
  selectedInstance: ArticleItem | undefined,
  currentlyActiveArticle: GetArticle | undefined,
  pickupSpots : PickupSpot[],
};

const initalState: BubatzState = {
  allArticles: [],
  allServices: [],
  selectedInstance: undefined,
  currentlyActiveArticle: undefined,
  pickupSpots : []
}

export const BubatzStore = signalStore(
  {providedIn: "root"},
  withState(initalState),
  withMethods((store) => {
    const article = inject(ArticleService);
    const service = inject(ServiceService);
    const depository = inject(DepositoryService);

    return {
       loadArticles(){
         // no need to call this manually
         depository.getArticles().subscribe(articles => {
         patchState(store, {allArticles: articles});
         });
       },
       loadServices(){
         service.getServices().subscribe(services => {
           patchState(store, {allServices: services})
         })
       },
       createArticle(name: string){
         // will be called manually
         patchState(store, { })
       },
       storeArticle(id: number, row: number, column: number){
         depository.storeArticle({ id, reihenNr: row, spaltenNr: column}).subscribe(value => {

           const articles = store.allArticles().map(article => {
             if (article.id == value.id){
               return value;
             }
             return article;
           })

           patchState(store, {allArticles: articles})
         })
       },
       selectArticle(articleId: number) {
         patchState(store, () => {
           const article = store.allArticles().find(a => a.id === articleId)
           return {currentlyActiveArticle: article}
         });
       },
      sellArticle(articleId: number, amount: number) {
         depository.sellArticle(articleId, {amount}).subscribe(value => {
           const articles = store.allArticles().map (article => {
             if (article.id == value.article.id) {
                return value.article;
             }
             return article;
           })
           patchState(store, {allArticles: articles, pickupSpots: value.spots})
         });
      },
      reorderArticle(particle : PatchArticle) {
        article.reorderArticle(particle).subscribe(value => {
          const articles = store.allArticles().map(article => {
            if (article.id == value.id){
              return value;
            }
            return article;
          })

          patchState(store, {allArticles: articles})
        })
      },
      selectInstance(instance: ArticleItem) {
         patchState(store, {selectedInstance: instance });
       },
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
