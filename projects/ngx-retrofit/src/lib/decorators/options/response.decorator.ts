import { OptionsHandler } from '../../handlers/options.handler';
import { ResponseType } from '../../models/response-type';

export function Response(type: ResponseType): MethodDecorator {
    return (target, propertyKey) => {
        OptionsHandler.handle(target, 'responseType', propertyKey as string, type);
    };
}
