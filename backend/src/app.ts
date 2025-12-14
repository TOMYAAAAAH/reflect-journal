import Fastify, {FastifyInstance} from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import routes from './routes';

export function buildApp(): FastifyInstance {
    const app: FastifyInstance = Fastify({
        logger: {level: 'error'},
    });

    app.register(cors, {
        origin: true,
    });

    app.register(swagger, {
        swagger: {
            info: {
                title: 'Reflect Journal API',
                description: 'API for daily reflection questions and answers',
                version: '1.0',
            },
            host: 'localhost:3000',
            basePath: '/v1',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
    });

    app.register(swaggerUI, {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'list',
            deepLinking: false,
        },
    });

    app.register(routes, {prefix: '/v1'});

    return app;
}