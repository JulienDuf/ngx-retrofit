import { VerbHandler } from '../../handlers/verb.handler';

export function Put(route: string = ''): MethodDecorator {
    return (target, propertyKey) => {
        VerbHandler.handle(target, propertyKey as string, 'PUT', route);
    };
}
