import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideConfig } from '../config/config.service';
import { AppEffects } from '../store/effects/app.effect';
import { appReducer, appStateName } from '../store/reducer/app.reducer';
import { routes } from './app.routes';

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
