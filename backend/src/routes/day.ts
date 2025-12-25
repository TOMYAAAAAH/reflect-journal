import {FastifyInstance} from 'fastify';
import {prisma} from '../prisma/prisma';
import getValidatedPlaylistId from '../helper/validatePlaylistId';

export default async function dayRoutes(fastify: FastifyInstance) {

    fastify.get('/today', async (request, reply) => {

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

            console.log(question)
            if (!question) {
                return reply.status(404).send({error: 'Question not found'});
            }

            const answers = await prisma.answers.findMany({
                where: {question_id: Number(question.id)},
            })

            return reply.status(200).send({question, answers});

        } catch (err) {
            console.error(err);
            return reply.status(500).send({error: 'Failed to fetch question'});
        }
    });

}