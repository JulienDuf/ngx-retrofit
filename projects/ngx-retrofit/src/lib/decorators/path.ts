import { PathHandler } from '../handlers/path.handler';

export function Path(path: string = ''): ClassDecorator {
    return target => {
        PathHandler.handle(target, path);
    };
}
