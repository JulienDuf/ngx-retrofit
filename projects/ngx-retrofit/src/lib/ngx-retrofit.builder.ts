import 'reflect-metadata';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NGX_RETROFIT_CONFIG, NgxRetrofitConfig } from './ngx-retrofit.config';
import { NgxRetrofitScanner } from './ngx-retrofit.scanner';

abstract class Retrofit {
    public http: HttpClient;
    public abstract buildUrl(config: RequestConfig, arg: any[]);
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
        retrofit.buildUrl = this.buildUrl;
        return retrofit;
    }

    private buildUrl(config: RequestConfig, arg: any[]): string {
        let url = `${config.host}/${config.path}/${config.route}`;

        if (config.query) {
            url += '?';
            for (const key in config.query) {
                if (!config.query.hasOwnProperty(key)) {
                    continue;
                }
                url += `${key}=${arg[config.query[key]]}`;
            }
        }

        return url;
    }

    private delete(config: RequestConfig): (...arg: any[]) => Observable<unknown> {
        return function(...arg: any[]) {
            return this.http.delete(this.buildUrl(config, arg));
        };
    }

    private get(config: RequestConfig): (...arg: any[]) => Observable<unknown> {
        return function(...arg: any[]) {
            return this.http.get(this.buildUrl(config, arg));
        };
    }

    private patch(config: RequestConfig): (...arg: any[]) => Observable<unknown> {
        return function(...arg: any[]) {
            return this.http.patch(this.buildUrl(config, arg), config.body);
        };
    }

    private post(config: RequestConfig): (...arg: any[]) => Observable<unknown> {
        return function(...arg: any[]) {
            return this.http.post(this.buildUrl(config, arg), config.body);
        };
    }

    private put(config: RequestConfig): (...arg: any[]) => Observable<unknown> {
        return function(...arg: any[]) {
            return this.http.put(this.buildUrl(config, arg), config.body);
        };
    }
}
