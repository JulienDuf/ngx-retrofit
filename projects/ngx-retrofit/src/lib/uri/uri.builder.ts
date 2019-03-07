import { UriConfig } from './uri.config';

export class UriBuilder {
    public static build(config: UriConfig, args: any[] = []) {
        let uri = `${config.host}/${config.path}/${config.route}`;
        while (uri.endsWith('/')) {
            uri = uri.slice(0, uri.length - 1);
        }
        uri += this.addQuery(config.query, args);
        return uri;
    }

    private static addQuery(query: { [key: string]: number }, args: any[]) {
        let uri = '';
        if (query) {
            for (const key in query) {
                if (!query.hasOwnProperty(key)) {
                    continue;
                }
                uri += uri.length ? '&' : '?';
                uri += `${key}=${args[query[key]]}`;
            }
        }
        return uri;
    }
}
