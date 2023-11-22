import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { APIInterceptor } from './api.interceptor';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([APIInterceptor])),
    {
      useClass: CommonModule,
      provide: CommonModule,
    },
    {
      useClass: HttpClientModule,
      provide: HttpClientModule,
    },
  ],
};
