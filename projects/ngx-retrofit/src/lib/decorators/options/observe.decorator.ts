import { OptionsHandler } from '../../handlers/options.handler';
import { ObserveType } from '../../models/observe-type';
import { ResponseType } from '../../models/response-type';

export function Observe(observe: ObserveType): MethodDecorator {
    return (target, propertyKey) => {
        OptionsHandler.handle(target, 'observe', propertyKey as string, observe);
    };
}
