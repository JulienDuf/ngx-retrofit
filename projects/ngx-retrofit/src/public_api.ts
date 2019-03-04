import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxRetrofitBuilder } from './lib/ngx-retrofit.builder';
import { NGX_RETROFIT_CONFIG, NgxRetrofitConfig } from './lib/ngx-retrofit.config';
import { ngxRetrofitFactory } from './lib/ngx-retrofit.factory';

@NgModule({
    imports: [HttpClientModule]
})
export class NgxRetrofitModule {
    public static forRoot(config: NgxRetrofitConfig, providers: object[] = []): ModuleWithProviders {
        return {
            ngModule: NgxRetrofitModule,
            providers: [
                NgxRetrofitBuilder,
                {
                    provide: NGX_RETROFIT_CONFIG,
                    useValue: config
                },
                ...providers.map(x => {
                    return {
                        provide: x,
                        useFactory: ngxRetrofitFactory(x as () => void),
                        deps: [HttpClient, NgxRetrofitBuilder]
                    };
                })
            ]
        };
    }
}
