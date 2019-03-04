import { VerbHandler } from '../handlers/verb.handler';

export function Post(route: string = ''): MethodDecorator {
    return (target, propertyKey) => {
        VerbHandler.handle(target, propertyKey as string, 'POST', route);
    };
}
