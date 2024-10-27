import {
  ApplicationConfig,
  InjectionToken,
  provideZoneChangeDetection,
  StaticProvider,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { appSettings } from '../settings/app.settings';
import { AppEffects } from '../store/effects/app.effect';
import { appReducer, appStateName } from '../store/reducer/app.reducer';
import { routes } from './app.routes';

export interface IConfig {
  apiUrl: string;
}

export const CONFIG = new InjectionToken<IConfig>('config');

export function provideConfig(): StaticProvider {
  return {
    provide: CONFIG,
    useValue: appSettings,
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideConfig(),
    provideHttpClient(),
    provideStore({ [appStateName]: appReducer }),
    provideEffects(AppEffects),
  ],
};
