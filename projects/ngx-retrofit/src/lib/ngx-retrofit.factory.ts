import { HttpClient } from '@angular/common/http';
import { NgxRetrofitBuilder } from './ngx-retrofit.builder';

export function ngxRetrofitFactory(provider: () => void) {
    return (http: HttpClient, builder: NgxRetrofitBuilder) => {
        return builder.build(http, provider);
    };
}
