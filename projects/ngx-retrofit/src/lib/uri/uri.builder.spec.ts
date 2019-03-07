import { UriBuilder } from './uri.builder';

describe('UriBuilder', () => {
    describe('build', () => {
        it('build should return a valid uri with basic config', () => {
            const uri = UriBuilder.build({
                host: 'http://localhost:4200',
                path: '',
                route: ''
            });

            expect(uri).toEqual('http://localhost:4200');
        });

        it('build should return valid uri with path config', () => {
            const uri = UriBuilder.build({
                host: 'http://localhost:4200',
                path: 'test',
                route: ''
            });

            expect(uri).toEqual('http://localhost:4200/test');
        });

        it('build should return valid uri with path and route config', () => {
            const uri = UriBuilder.build({
                host: 'http://localhost:4200',
                path: 'test',
                route: 'test'
            });

            expect(uri).toEqual('http://localhost:4200/test/test');
        });

        it('build should return valid uri with query config', () => {
            const uri = UriBuilder.build({
                host: 'http://localhost:4200',
                path: '',
                route: '',
                query: {
                    test: 0
                }
            }, ['test']);

            expect(uri).toEqual('http://localhost:4200?test=test');
        });

        it('build should return valid uri with multiple queries config', () => {
            const uri = UriBuilder.build({
                host: 'http://localhost:4200',
                path: '',
                route: '',
                query: {
                    test: 0,
                    hello: 1
                }
            }, ['test', 'world']);

            expect(uri).toEqual('http://localhost:4200?test=test&hello=world');
        });

        it('build should return valid uri with query and path config', () => {
            const uri = UriBuilder.build({
                host: 'http://localhost:4200',
                path: 'test',
                route: '',
                query: {
                    test: 0,
                    hello: 1
                }
            }, ['test', 'world']);

            expect(uri).toEqual('http://localhost:4200/test?test=test&hello=world');
        });

        it('build should return valid uri with query, path and rote config', () => {
            const uri = UriBuilder.build({
                host: 'http://localhost:4200',
                path: 'test',
                route: 'test',
                query: {
                    test: 0,
                    hello: 1
                }
            }, ['test', 'world']);

            expect(uri).toEqual('http://localhost:4200/test/test?test=test&hello=world');
        });
    });
});
