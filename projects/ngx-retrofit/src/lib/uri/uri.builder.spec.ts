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

        it('build should return valid uri with param config', () => {
            const uri = UriBuilder.build({
                host: 'http://localhost:4200',
                path: '{id}',
                route: '',
                param: {
                    id: 0
                }
            }, [1]);

            expect(uri).toEqual('http://localhost:4200/1');
        });

        it('build should return valid uri with multiple params config', () => {
            const uri = UriBuilder.build({
                host: 'http://localhost:4200',
                path: '{id}',
                route: '{testId}',
                param: {
                    id: 0,
                    testId: 1
                }
            }, [1, 2]);

            expect(uri).toEqual('http://localhost:4200/1/2');
        });

        it('build should return valid uri with param, query, path and route config', () => {
            const uri = UriBuilder.build({
                host: 'http://localhost:4200',
                path: 'test/{id}',
                route: 'test/{testId}',
                query: {
                    test: 0,
                    hello: 1
                },
                param: {
                    id: 2,
                    testId: 3
                }
            }, ['test', 'world', 1, 2]);

            expect(uri).toEqual('http://localhost:4200/test/1/test/2?test=test&hello=world');
        });
    });
});
