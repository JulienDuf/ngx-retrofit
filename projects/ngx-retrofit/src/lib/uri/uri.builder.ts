import { UriConfig } from './uri.config';

export class UriBuilder {
    public static build(config: UriConfig, args: any[] = []): string {
        let uri = `${config.host}/${config.path}/${config.route}`;
        while (uri.endsWith('/')) {
            uri = uri.slice(0, uri.length - 1);
        }
        uri = this.replaceParam(uri, config.param, args);
        uri += this.addQuery(config.query, args);
        return uri;
    }

    private static addQuery(query: { [key: string]: number } | number, args: any[]): string {
        let uri = '';
        if (typeof query === 'undefined' || query === null) {
            return uri;
        }

        if (typeof query === 'number') {
            if (typeof args[query] !== 'object') {
                return uri;
            }

            const data = args[query];
            for (const key in data) {
                if (!data.hasOwnProperty(key)) {
                    continue;
                }
                uri += uri.length ? '&' : '?';
                uri += `${key}=${data[key]}`;
            }
            return uri;
        }

        for (const key in query) {
            if (!query.hasOwnProperty(key)) {
                continue;
            }
            uri += uri.length ? '&' : '?';
            uri += `${key}=${args[query[key]]}`;
        }
        return uri;
    }

    private static replaceParam(uri: string, param: { [key: string]: number }, args: any[]): string {
        if (!param) {
            return uri;
        }

        for (const key in param) {
            if (!param.hasOwnProperty(key)) {
                continue;
            }
            uri = uri.replace(`{${key}}`, args[param[key]]);
        }
        return uri;
    }
}
