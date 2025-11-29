import Fastify from 'fastify';
import { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import databaseConnector from './config/database';

dotenv.config();

const fastify: FastifyInstance = Fastify({
    logger: { level: 'error'},
});

fastify.register(cors, {
    origin: true,
});

fastify.register(swagger, {
    swagger: {
        info: {
            title: 'Reflect Journal API',
            description: 'API for daily reflection questions and answers',
            version: '1.0',
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
});

fastify.register(swaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
    },
});

fastify.register(databaseConnector);

fastify.get('/', async (request, reply) => {
    return { message: 'Reflect Journal API is running!' };
});

fastify.get('/health', async (request, reply) => {
    return { status: 'ok', timestamp: new Date().toISOString() };
});

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