import 'reflect-metadata';
import { PATH, ROUTE_CONFIG } from '../constant';

export class RouteHandler {
    public static handle(target: object, type: string, property: string, name: string, index: number) {
        const key = ROUTE_CONFIG.replace('{property}', property);
        const data = Reflect.getMetadata(key, target) || {};
        const dataType =  data[type] || {};
        dataType[name] = index;
        data[type] = dataType;
        Reflect.defineMetadata(key, data, target);
    }
}
