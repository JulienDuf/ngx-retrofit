import 'reflect-metadata';
import { PATH, ROUTE, ROUTE_CONFIG, VERB } from './constant';

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
}
