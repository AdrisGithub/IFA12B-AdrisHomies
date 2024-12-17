import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {ArticleService, DepositoryService, GetArticle, ServiceService} from '../gen';

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
         console.log(articles);
         });
       },
       createArticle(name: string){
         // will be called manually
         patchState(store, { })
       }
    }
  }),
  withComputed(({}) => ({
        nameToString: computed(() => " ")
  })),
  withHooks({
    onInit({loadArticles}){
      // load all the Articles at startup
      loadArticles();
    }
  })
)
