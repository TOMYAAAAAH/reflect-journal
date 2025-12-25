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

            try {
                const answer = await prisma.answers.create({
                    data: {
                        user_id: Number(userId),
                        question_id: Number(questionId),
                        answer_text: content,
                        year: Number(year)
                    }
                });

                return reply.status(200).send({answer});

            } catch (err: any) {
                if (err.code === 'P2002') {
                    return reply.status(409).send({error: 'Answer already exists'})
                }
            }

        } catch (err) {
            console.error(err);
            return reply.status(500).send({error: 'Failed to post answer'});
        }
    });

    fastify.put('/answers/:id', async (request, reply) => {
        const {id} = request.params as { id: string }
        if (!Number.isInteger(Number(id))) {
            return reply.status(400).send({error: 'Invalid answer ID'})
        }

        const {content} = request.body as { content: string }
        if (!content) {
            return reply.status(400).send({error: 'Invalid body'})
        }

        try {
            const answer = await prisma.answers.update({
                where: {id: Number(id)},
                data: {answer_text: content},
            })
            return reply.status(200).send({answer})

        } catch (err: any) {
            if (err.code === 'P2025') {
                return reply.status(404).send({error: 'Answer not found'})
            }
            console.error(err)
            return reply.status(500).send({error: 'Failed to update answer'})
        }
    })

    fastify.delete('/answers/:id', async (request, reply) => {

        const {id} = request.params as { id: string }
        if (!Number.isInteger(Number(id))) {
            return reply.status(400).send({error: 'Invalid answer ID'});
        }

        try {

            try {
                const answer = await prisma.answers.delete({
                    where: {id: Number(id)},
                })

                return reply.status(200).send({message: 'Answer deleted'})

            } catch (err: any) {
                if (err.code === 'P2025') {
                    return reply.status(404).send({error: 'Answer not found'})
                }
            }

        } catch (err) {
            console.error(err);
            return reply.status(500).send({error: 'Failed to post answer'});
        }
    });

    fastify.get('/answers/question/:id', async (request, reply) => {

        const {id} = request.params as { id: string }
        if (!Number.isInteger(Number(id))) {
            return reply.status(400).send({error: 'Invalid question ID'});
        }

        try {

            const answers = await prisma.answers.findMany({
                where: {question_id: Number(id)},
            })

            return reply.status(200).send({answers})

        } catch (err) {
            console.error(err);
            return reply.status(500).send({error: 'Failed to post answer'});
        }
    });

}