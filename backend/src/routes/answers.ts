import {FastifyInstance} from 'fastify';
import {prisma} from '../prisma/prisma';
import getValidatedPlaylistId from '../helper/validatePlaylistId';

export default async function answersRoutes(fastify: FastifyInstance) {

    fastify.post('/answers', async (request, reply) => {

        const {questionId, content, year} = request.body as { questionId: string, content: string, year: string }
        if (!questionId || !content || !year) {
            return reply.status(400).send({error: 'Invalid body'})
        }

        const {userId} = request.body as { userId: string }

        try {
            const question = await prisma.questions.findUnique({
                where: {
                    id: Number(questionId),
                }
            });
            if (!question) {
                return reply.status(404).send({error: 'Question not found'});
            }


            const answer = await prisma.answers.create({
                data : {
                    user_id: Number(userId),
                    question_id: Number(questionId),
                    answer_text: content,
                    year: Number(year)
                }
            });

            return reply.status(200).send({answer});

        } catch (err) {
            console.error(err);
            return reply.status(500).send({error: 'Failed to post answer'});
        }

    });


}