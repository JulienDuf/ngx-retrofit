import { VerbHandler } from '../../handlers/verb.handler';

export function Delete(route: string = ''): MethodDecorator {
    return (target, propertyKey) => {
        VerbHandler.handle(target, propertyKey as string, 'DELETE', route);
    };
}
