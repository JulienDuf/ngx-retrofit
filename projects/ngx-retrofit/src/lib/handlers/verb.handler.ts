import 'reflect-metadata';
import { ROUTE, VERB } from '../constant';

export class VerbHandler {
    public static handle(target: object, property: string, verb: string, route: string) {
        Reflect.defineMetadata(VERB.replace('{property}', property), verb, target);
        Reflect.defineMetadata(ROUTE.replace('{property}', property), route, target);
    }
}
