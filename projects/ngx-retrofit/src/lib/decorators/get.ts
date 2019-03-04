import { VerbHandler } from '../handlers/verb.handler';

export function Get(route: string = ''): MethodDecorator {
    return (target, propertyKey) => {
        VerbHandler.handle(target, propertyKey as string, 'GET', route);
    };
}
