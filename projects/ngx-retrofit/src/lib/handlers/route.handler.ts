import 'reflect-metadata';
import { ROUTE_CONFIG } from '../constant';

export class RouteHandler {
    public static handle(target: object, type: string, property: string, name: string, index: number) {
        const key = ROUTE_CONFIG.replace('{property}', property);
        const data = Reflect.getMetadata(key, target) || {};

        if (name) {
            const dataType = data[type] || {};
            if (typeof dataType === 'number') {
                return;
            }

            dataType[name] = index;
            data[type] = dataType;
        } else {
            data[type] = index;
        }
        Reflect.defineMetadata(key, data, target);
    }
}
