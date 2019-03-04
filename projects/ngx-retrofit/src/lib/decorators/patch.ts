import { VerbHandler } from '../handlers/verb.handler';

export function Patch(route: string = ''): MethodDecorator {
    return (target, propertyKey) => {
        VerbHandler.handle(target, propertyKey as string, 'PATCH', route);
    };
}
