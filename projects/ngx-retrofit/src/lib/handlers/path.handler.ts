import 'reflect-metadata';
import { PATH } from '../constant';

export class PathHandler {
    public static handle(target: object, path: string) {
        Reflect.defineMetadata(PATH, path, target);
    }
}
