import { FastifyInstance } from 'fastify';

export default async function questionsRoutes(fastify: FastifyInstance) {
    fastify.get('/questions/:id', async (request, reply) => {
        return { message: 'question du jour, t\'as peur quoi ?' };
    });

}