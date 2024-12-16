import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {BASE_PATH} from './gen';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), {
    provide: BASE_PATH,
    useValue: 'http://localhost:8080'
  }, provideHttpClient(withInterceptorsFromDi())]
};
