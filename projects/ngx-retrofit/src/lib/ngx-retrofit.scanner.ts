import 'reflect-metadata';
import { PATH, ROUTE, ROUTE_CONFIG, ROUTE_OPTIONS, VERB } from './constant';
import { ObserveType } from './models/observe-type';
import { ResponseType } from './models/response-type';

export class NgxRetrofitScanner {
    constructor(private target: () => void) {}

    public getPath(): string {
        return Reflect.getMetadata(PATH, this.target);
    }

    public getVerb(property: string): string {
        return Reflect.getMetadata(VERB.replace('{property}', property), this.target.prototype);
    }

    public getRoute(property: string): string {
        return Reflect.getMetadata(ROUTE.replace('{property}', property), this.target.prototype);
    }

    public getQuery(property: string): {[key: string]: number} {
        const route = Reflect.getMetadata(ROUTE_CONFIG.replace('{property}', property), this.target.prototype);
        return route.query;
    }

    public getParam(property: string): {[key: string]: number} {
        const route = Reflect.getMetadata(ROUTE_CONFIG.replace('{property}', property), this.target.prototype);
        return route.param;
    }

    public getOptions(property: string): any {
        const options = Reflect.getMetadata(ROUTE_OPTIONS.replace('{property}', property), this.target.prototype) || {};
        if (!options.responseType) {
            options.responseType = ResponseType.Json;
        }
        if (!options.observe) {
            options.observe = ObserveType.Body;
        }
    }
}
