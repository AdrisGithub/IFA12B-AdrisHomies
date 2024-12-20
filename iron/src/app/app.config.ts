import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';

import {BASE_PATH} from './gen';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),  {
    provide: BASE_PATH,
    useValue: 'http://api.segitztherme.de'
  },
    {
      provide: LOCALE_ID, useValue: 'de'
    },
    provideHttpClient(withInterceptorsFromDi())]
};
