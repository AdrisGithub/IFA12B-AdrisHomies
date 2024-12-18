import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {ArticleService, DepositoryService, GetArticle, ServiceService} from '../gen';
import {Article} from '../core-components/article/article.component';

type BubatzState = {
  allArticles: GetArticle[]
};

const initalState: BubatzState = {
  allArticles: []
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
       createArticle(name: string){
         // will be called manually
         patchState(store, { })
       }
    }
  }),
  withComputed(({allArticles}) => ({
    getMappedArticles: computed(() => allArticles().map(getArticle => mapArticle(getArticle))),
    currentlyActiveArticle: computed<GetArticle | undefined>(() => allArticles()[2])
  })),
  withHooks({
    onInit({loadArticles}){
      // load all the Articles at startup
      loadArticles();

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
    title: getArticle.name,
    price: getArticle.sellPrice,
    amountWarehouse: amountInWarehouse,
    amountOrdered: amountIsOrdered
  };
}
