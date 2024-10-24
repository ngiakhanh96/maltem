import { InjectionToken, StaticProvider } from '@angular/core';
import { config } from '../assets/config';

export interface IConfig {
  apiUrl: string;
}

//export const CONFIG = new InjectionToken<IConfig>('config');

// export function provideConfig(config: IConfig): StaticProvider {
//   return {
//     provide: CONFIG,
//     useValue: config,
//   };
// }

// export function fetchConfig(): Promise<IConfig> {
//   return fetch('assets/config.json').then((res) => res.json());
// }

export const CONFIG = new InjectionToken<IConfig>('config');

export function provideConfig(): StaticProvider {
  return {
    provide: CONFIG,
    useValue: config,
  };
}
