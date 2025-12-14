import { FastifyInstance } from 'fastify';
import { prisma } from '../prisma/prisma';

export default async function questionsRoutes(fastify: FastifyInstance) {
    fastify.get('/questions/:id', async (request, reply) => {

        const { id } = request.params as { id: string }
        if (!Number.isInteger(Number(id))) {
            return reply.status(400).send({ error: 'Invalid question ID' });
        }

        try {
            const question = await prisma.questions.findUnique({
                where:{
                    id: Number(id)
                }
            });

            if (!question) {
                return reply.status(404).send({ error: 'Question not found' });
            }

            return { question };

        } catch (err) {
            console.error(err);
            return reply.status(500).send({ error: 'Failed to fetch question' });
        }

    });

}