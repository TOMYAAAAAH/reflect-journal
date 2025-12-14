import { FastifyInstance } from 'fastify';
import { prisma } from '../prisma/prisma';

const default_playlist_id = "1";

export default async function questionsRoutes(fastify: FastifyInstance) {
    fastify.get('/questions/:id', async (request, reply) => {

        const { id } = request.params as { id: string }
        let { playlist_id } = request.query as { playlist_id?: string }
        playlist_id = playlist_id ? playlist_id : default_playlist_id

        if (!Number.isInteger(Number(id))) {
            return reply.status(400).send({ error: 'Invalid question ID' });
        }

        try {
            const question = await prisma.questions.findUnique({
                where:{
                    id: Number(id),
                    playlist_id: Number(playlist_id)
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



    fastify.get('/questions/date/:month/:day', async (request, reply) => {

        const { month, day } = request.params as { month: string, day: string }
        let { playlist_id } = request.query as { playlist_id?: string }
        playlist_id = playlist_id ? playlist_id : default_playlist_id

        if (!Number.isInteger(Number(month)) || !Number.isInteger(Number(day))) {
            return reply.status(400).send({ error: 'Invalid date format' });
        }

        try {
            const question = await prisma.questions.findFirst({
                where:{
                    month: Number(month),
                    day: Number(day),
                    playlist_id: Number(playlist_id)
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