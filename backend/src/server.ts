import Fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import routes from './routes';

dotenv.config();

export function buildApp(): FastifyInstance {
    const app: FastifyInstance = Fastify({
        logger: { level: 'error'},
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

    app.register(routes, { prefix: '/v1' });

    return app;
}

// 3. Keep the start logic for the actual executable file (server startup)
if (require.main === module) {
    const fastify = buildApp();

    const start = async (): Promise<void> => {
        try {
            const port = parseInt(process.env.PORT || '3000');
            await fastify.listen({ port, host: '0.0.0.0' });
            console.log(`🚀 Server is running on http://localhost:${port}`);
            console.log(`📚 Documentation available at http://localhost:${port}/documentation`);
        } catch (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    };
    start();
}