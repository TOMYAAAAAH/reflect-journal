import {FastifyInstance} from 'fastify';
import {prisma} from '../prisma/prisma';
import getValidatedPlaylistId from '../helper/validatePlaylistId';
import JwtPayload from "../types/JwtPayload";

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

        let userId: string | null = null;
        try {
            const payload = await request.jwtVerify<JwtPayload>();
            userId = payload.userId;
        } catch {}

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

            if (userId) {
                const answers = await prisma.answers.findMany({
                    where: {
                        question_id: Number(question.id),
                        user_id: Number(userId)
                    },
                })
                return reply.status(200).send({question, answers});
            }
            return reply.status(200).send({question, answers: []});


        } catch (err) {
            console.error(err);
            return reply.status(500).send({error: 'Failed to fetch question'});
        }
    });


    fastify.get('/day/:month/:day', async (request, reply) => {

        const {month, day} = request.params as { month: string, day: string }

        if (!Number.isInteger(Number(month)) || !Number.isInteger(Number(day))) {
            return reply.status(400).send({error: 'Invalid date'});
        }

        const {playlist_id} = request.query as { playlist_id?: string }
        const validatedPlaylistId = getValidatedPlaylistId(playlist_id);
        if (validatedPlaylistId === -1) {
            return reply.status(400).send({error: 'Invalid playlist ID'});
        }

        let userId: string | null = null;
        try {
            const payload = await request.jwtVerify<JwtPayload>();
            userId = payload.userId;
        } catch {}

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

            if (userId) {
                const answers = await prisma.answers.findMany({
                    where: {
                        question_id: Number(question.id),
                        user_id: Number(userId)
                    },
                })
                return reply.status(200).send({question, answers});
            }
            return reply.status(200).send({question, answers: []});


        } catch (err) {
            console.error(err);
            return reply.status(500).send({error: 'Failed to fetch question'});
        }
    });

}