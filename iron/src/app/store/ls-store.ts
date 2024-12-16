import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {ArticleService, DepositoryService, ServiceService} from '../gen';

type BubatzState = {
  name: string
};

const initalState: BubatzState = {
  name: ''
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
         const articles = depository.getArticles();
         patchState(store, {name: 'Hier muss dann irgendwann der aufruf gemappt werden'})
       },
       createArticle(name: string){
         // will be called manually
         patchState(store, { name})
       }
    }
  }),
  withComputed(({name}) => ({
        nameToString: computed(() => name.toString())
  })),
  withHooks({
    onInit({loadArticles}){
      // load All the Articles at startup
      loadArticles();
    }
  })
)
