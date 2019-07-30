import { RouteHandler } from '../handlers/route.handler';

export function Query(name?: string): ParameterDecorator {
    return (target, propertyKey, parameterIndex) => {
        RouteHandler.handle(target, 'query', propertyKey as string, name, parameterIndex);
    };
}
