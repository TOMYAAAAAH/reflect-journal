import { FastifyInstance } from 'fastify';
import { prisma } from '../prisma';

export default async function questionsRoutes(fastify: FastifyInstance) {
    fastify.get('/questions', async (request, reply) => {


        try {
            // Fetch all questions (or add filters if you want)
            const questions = await prisma.questions.findMany();

            return { questions };
        } catch (err) {
            console.error(err);
            return reply.status(500).send({ error: 'Failed to fetch questions' });
        }

    });

}