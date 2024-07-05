import { ApplicationConfig } from '@angular/core';
import {Route, provideRouter, withComponentInputBinding} from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding())]
};