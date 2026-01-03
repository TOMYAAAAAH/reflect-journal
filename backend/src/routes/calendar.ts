import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {prisma} from '../prisma/prisma';
import getValidatedPlaylistId from '../helper/validatePlaylistId';
import {getUserIdFromToken} from "../helper/getUserIdFromToken";

export default async function calendarRoutes(fastify: FastifyInstance) {

    fastify.get('/calendar/:year', async (request, reply) => {


        const {year} = request.params as { year: string }

        if (!Number.isInteger(Number(year))) {
            return reply.status(400).send({error: 'Invalid year'});
        }


        let userId: number;
        try {
            userId = await getUserIdFromToken(request)
        } catch {
            return reply.status(401).send({error: 'Not authenticated'})
        }


        try {

            const answers = await prisma.answers.findMany({
                where: {year: Number(year), user_id: userId},
            })

            const questionIds = answers.map(answer => answer.question_id);

            const questions = await prisma.questions.findMany({
                where: {id: {in: questionIds}},
            })

            const dates: Record<number, number[]> = {}
            const stats: Record<number, number> = {}

            questions.forEach(question => {
                if (!dates[question.month]) {
                    dates[question.month] = [question.day]
                    stats[question.month] = 1
                }
                else {
                    dates[question.month].push(question.day)
                    stats[question.month]++
                }
            })

            return reply.status(200).send({dates, stats})

        } catch (err) {
            console.error(err);
            return reply.status(500).send({error: 'Failed to get calendar'});
        }
    });


}