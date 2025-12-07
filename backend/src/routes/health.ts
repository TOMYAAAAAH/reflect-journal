import { FastifyInstance } from 'fastify';

export default async function healthRoutes(fastify: FastifyInstance) {
    fastify.get('/', async (request, reply) => {
        return { message: 'Reflect Journal API is running!' };
    });

    fastify.get('/health', async (request, reply) => {
        return { status: 'ok', timestamp: new Date().toISOString() };
    });
}