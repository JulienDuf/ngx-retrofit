import 'reflect-metadata';
import { ROUTE_OPTIONS } from '../constant';

export class OptionsHandler {
    // tslint:disable-next-line:unified-signatures
    public static handle(target: object, type: string, property: string, name: string, value: unknown);
    public static handle(target: object, type: string, property: string, value: unknown);
    public static handle(...args: any[]) {
        const [target, type, property, nameOrValue, value] = args as [object, string, string, string | unknown, unknown];
        const key = ROUTE_OPTIONS.replace('{property}', property);
        const data = Reflect.getMetadata(key, target) || {};
        if (value) {
            const dataType = data[type] || {};
            dataType[nameOrValue as string] = value;
            data[type] = dataType;
        } else {
            data[type] = nameOrValue;
        }
        Reflect.defineMetadata(key, data, target);
    }
}
