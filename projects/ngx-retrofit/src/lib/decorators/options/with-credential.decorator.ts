import { OptionsHandler } from '../../handlers/options.handler';
import { ResponseType } from '../../models/response-type';

export function WithCredentials(withCredentials = true): MethodDecorator {
    return (target, propertyKey) => {
        OptionsHandler.handle(target, 'withCredentials', propertyKey as string, withCredentials);
    };
}
