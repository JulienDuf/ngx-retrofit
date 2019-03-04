import { InjectionToken } from '@angular/core';

export interface NgxRetrofitConfig {
    host: string;
}

export const NGX_RETROFIT_CONFIG = new InjectionToken<NgxRetrofitConfig>('NgxRetrofitConfig');
