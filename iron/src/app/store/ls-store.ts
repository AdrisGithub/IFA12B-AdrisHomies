import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {ArticleItem, ArticleService, DepositoryService, GetArticle, GetService, ServiceService} from '../gen';
import {Article} from '../core-components/article/article.component';
import {Service} from '../core-components/service/service.component';

type BubatzState = {
  allArticles: GetArticle[],
  allServices: GetService[],
  selectedInstance: ArticleItem | undefined,
  currentlyActiveArticle: GetArticle | undefined,
};

const initalState: BubatzState = {
  allArticles: [],
  allServices: [],
  selectedInstance: undefined,
  currentlyActiveArticle: undefined,
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
      selectArticle(articleId: number) {
        patchState(store, () => {
          const article = store.allArticles().find(a => a.id === articleId)
          return {currentlyActiveArticle: article}
        });
      },
      selectInstance(instance: ArticleItem) {
        patchState(store, {selectedInstance: instance });
      }
    }
  }),
  withComputed(({allArticles, allServices, currentlyActiveArticle}) => ({
    getMappedArticles: computed(() => allArticles().map(getArticle => mapArticle(getArticle))),
    getMappedServices: computed(() => allServices().map(getService => mapService(getService))),
    currentlyActiveArticle: computed<GetArticle | undefined>(() => currentlyActiveArticle()),
    currentlyActiveArticleWithAmounts: computed<Article | undefined>(() => mapArticle(currentlyActiveArticle()))
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

function mapArticle(getArticle?: GetArticle): Article | undefined{
  if (!getArticle) {
    return undefined;
  }
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
