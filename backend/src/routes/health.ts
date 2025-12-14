import { FastifyInstance } from 'fastify';

export default async function healthRoutes(fastify: FastifyInstance) {
    fastify.get('/', async (request, reply) => {
        return reply.status(200).send({message: 'Reflect Journal API is running!'});
    });

    fastify.get('/health', async (request, reply) => {
        return reply.status(200).send({message: 'OK', timestamp: new Date().toISOString()});
    });

}