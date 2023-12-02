import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { getMetaData, HttpLoaderFactory } from './@common/utils';

import { URBAN_URL } from './@common/constants/providers.constant';

import { CabinetInterceptor } from './@common/interceptors/cabinet.interceptor';
import { JwtInterceptor } from './@common/interceptors/jwt.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: CabinetInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    { provide: URBAN_URL, useValue: getMetaData('urbanUrl') },
  ],
};
