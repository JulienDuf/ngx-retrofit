import { RouteHandler } from '../handlers/route.handler';

export function Param(name: string): ParameterDecorator {
    return (target, propertyKey, parameterIndex) => {
        RouteHandler.handle(target, 'param', propertyKey as string, name, parameterIndex);
    };
}
