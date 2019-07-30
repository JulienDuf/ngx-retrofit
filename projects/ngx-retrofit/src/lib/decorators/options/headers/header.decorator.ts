import { OptionsHandler } from '../../../handlers/options.handler';

export function Header(key: string, value: string): MethodDecorator {
    return (target, propertyKey) => {
        OptionsHandler.handle(target, 'headers', propertyKey as string, key, value);
    };
}
