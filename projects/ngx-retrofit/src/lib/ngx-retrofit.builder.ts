import 'reflect-metadata';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NGX_RETROFIT_CONFIG, NgxRetrofitConfig } from './ngx-retrofit.config';
import { NgxRetrofitScanner } from './ngx-retrofit.scanner';
import { UriBuilder } from './uri/uri.builder';

abstract class Retrofit {
    public http: HttpClient;
}

interface RequestConfig {
    host: string;
    path: string;
    route: string;
    query?: {[key: string]: number};
    body?: any;
}

@Injectable()
export class NgxRetrofitBuilder {
    private readonly verb: { [verb: string]: (config: RequestConfig) => (...arg: any[]) => Observable<unknown> };

    constructor(@Inject(NGX_RETROFIT_CONFIG) private config: NgxRetrofitConfig) {
        this.verb = {
            DELETE: this.delete,
            GET: this.get,
            PATCH: this.patch,
            POST: this.post,
            PUT: this.put
        };
    }

    public build(http: HttpClient, target: () => void): object {
        const scanner = new NgxRetrofitScanner(target);
        for (const method in target.prototype) {
            if (!target.prototype.hasOwnProperty(method)) {
                continue;
            }
            target.prototype[method] = this.verb[scanner.getVerb(method)]({
                host: this.config.host,
                path: scanner.getPath(),
                route: scanner.getRoute(method),
                query: scanner.getQuery(method)
            });
        }

        const retrofit = new target.prototype.constructor() as Retrofit;
        retrofit.http = http;
        return retrofit;
    }

    private delete(config: RequestConfig): (...arg: any[]) => Observable<unknown> {
        return function(...arg: any[]) {
            return this.http.delete(UriBuilder.build(config, arg));
        };
    }

    private get(config: RequestConfig): (...arg: any[]) => Observable<unknown> {
        return function(...arg: any[]) {
            return this.http.get(UriBuilder.build(config, arg));
        };
    }

    private patch(config: RequestConfig): (...arg: any[]) => Observable<unknown> {
        return function(...arg: any[]) {
            return this.http.patch(UriBuilder.build(config, arg), config.body);
        };
    }

    private post(config: RequestConfig): (...arg: any[]) => Observable<unknown> {
        return function(...arg: any[]) {
            return this.http.post(UriBuilder.build(config, arg), config.body);
        };
    }

    private put(config: RequestConfig): (...arg: any[]) => Observable<unknown> {
        return function(...arg: any[]) {
            return this.http.put(UriBuilder.build(config, arg), config.body);
        };
    }
}
