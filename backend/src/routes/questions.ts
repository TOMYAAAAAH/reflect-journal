import {FastifyInstance} from 'fastify';
import {prisma} from '../prisma/prisma';
import getValidatedPlaylistId from '../helper/validatePlaylistId';

export default async function questionsRoutes(fastify: FastifyInstance) {

    fastify.get('/questions/:id', async (request, reply) => {

        const {id} = request.params as { id: string }
        if (!Number.isInteger(Number(id))) {
            return reply.status(400).send({error: 'Invalid question ID'});
        }

        const {playlist_id} = request.query as { playlist_id?: string }
        const validatedPlaylistId = getValidatedPlaylistId(playlist_id);
        if (validatedPlaylistId === -1) {
            return reply.status(400).send({error: 'Invalid playlist ID'});
        }

        try {
            const question = await prisma.questions.findUnique({
                where: {
                    id: Number(id),
                    playlist_id: validatedPlaylistId
                }
            });

            if (!question) {
                return reply.status(404).send({error: 'Question not found'});
            }

            return {question};

        } catch (err) {
            console.error(err);
            return reply.status(500).send({error: 'Failed to fetch question'});
        }

    });


    fastify.get('/questions/date/:month/:day', async (request, reply) => {

        const {month, day} = request.params as { month: string, day: string }

        if (!Number.isInteger(Number(month)) || !Number.isInteger(Number(day))) {
            return reply.status(400).send({error: 'Invalid date'});
        }

        const {playlist_id} = request.query as { playlist_id?: string }
        const validatedPlaylistId = getValidatedPlaylistId(playlist_id);
        if (validatedPlaylistId === -1) {
            return reply.status(400).send({error: 'Invalid playlist ID'});
        }

        try {
            const question = await prisma.questions.findFirst({
                where: {
                    month: Number(month),
                    day: Number(day),
                    playlist_id: validatedPlaylistId
                }
            });

            if (!question) {
                return reply.status(404).send({error: 'Question not found'});
            }

            return {question};

        } catch (err) {
            console.error(err);
            return reply.status(500).send({error: 'Failed to fetch question'});
        }
    });


    fastify.get('/questions/today', async (request, reply) => {

        const today = new Date();
        const todayDay = today.getDate();
        const todayMonth = today.getMonth() + 1;

        const {playlist_id} = request.query as { playlist_id?: string }
        const validatedPlaylistId = getValidatedPlaylistId(playlist_id);
        if (validatedPlaylistId === -1) {
            return reply.status(400).send({error: 'Invalid playlist ID'});
        }

        try {
            const question = await prisma.questions.findFirst({
                where: {
                    month: todayMonth,
                    day: todayDay,
                    playlist_id: validatedPlaylistId
                }
            });

            if (!question) {
                return reply.status(404).send({error: 'Question not found'});
            }

            return {question};

        } catch (err) {
            console.error(err);
            return reply.status(500).send({error: 'Failed to fetch question'});
        }
    });


}