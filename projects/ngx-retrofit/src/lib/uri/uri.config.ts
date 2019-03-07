export interface UriConfig {
    host: string;
    path: string;
    route: string;
    param?: {[key: string]: number};
    query?: {[key: string]: number};
}
