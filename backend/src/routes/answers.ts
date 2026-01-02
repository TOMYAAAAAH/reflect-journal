import {FastifyInstance, FastifyRequest} from 'fastify';
import {prisma} from '../prisma/prisma';
import JwtPayload from "../types/JwtPayload";
import {getUserIdFromToken} from "../helper/getUserIdFromToken";

export default async function answersRoutes(fastify: FastifyInstance) {
    
    type ParsedBodyAndParams = {
        content: string
        questionId: number
        year: number
    }

    const getBodyAndParams = (request: FastifyRequest): ParsedBodyAndParams => {
        const {content} = request.body as { content: string }
        const {questionId, year} = request.params as { questionId: string; year: string }

        if (!content) throw new Error('content')
        if (!Number.isInteger(Number(questionId))) throw new Error('questionId')
        if (!Number.isInteger(Number(year))) throw new Error('year')

        return {
            content,
            questionId: Number(questionId),
            year: Number(year),
        }
    }
    
    type ParsedParams = {
        questionId: number
        year: number
    }

    const getParams = (request: FastifyRequest): ParsedParams => {
        const {questionId, year} = request.params as { questionId: string; year: string }

        if (!Number.isInteger(Number(questionId))) throw new Error('questionId')
        if (!Number.isInteger(Number(year))) throw new Error('year')

        return {
            questionId: Number(questionId),
            year: Number(year),
        }
    }

    fastify.post('/answers/question/:questionId/year/:year', async (request, reply) => {

        let userId: number;
        try {
            userId = await getUserIdFromToken(request)
        } catch {
            return reply.status(401).send({error: 'Not authenticated'})
        }

        let input: ParsedBodyAndParams
        try {
            input = getBodyAndParams(request)
        } catch {
            return reply.status(400).send({error: 'Invalid body or params'})
        }
        const {content, questionId, year} = input

        try {
            const question = await prisma.questions.findUnique({
                where: {
                    id: questionId,
                }
            });
            if (!question) {
                return reply.status(404).send({error: 'Question not found'});
            }

            try {
                const answer = await prisma.answers.create({
                    data: {
                        user_id: userId,
                        question_id: questionId,
                        answer_text: content,
                        year: year
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
    })

    fastify.put('/answers/question/:questionId/year/:year', async (request, reply) => {

        let userId: number;
        try {
            userId = await getUserIdFromToken(request)
        } catch {
            return reply.status(401).send({error: 'Not authenticated'})
        }

        let input: ParsedBodyAndParams
        try {
            input = getBodyAndParams(request)
        } catch {
            return reply.status(400).send({error: 'Invalid body or params'})
        }
        const {content, questionId, year} = input

        try {
            const answer = await prisma.answers.update({
                where: {
                    user_id_question_id_year: { // composite key
                        user_id: userId,
                        question_id: questionId,
                        year: year,
                    }
                },
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

    fastify.delete('/answers/question/:questionId/year/:year', async (request, reply) => {

        let userId: number;
        try {
            userId = await getUserIdFromToken(request)
        } catch {
            return reply.status(401).send({error: 'Not authenticated'})
        }

        let input: ParsedParams
        try {
            input = getParams(request)
        } catch {
            return reply.status(400).send({error: 'Invalid params'})
        }
        const {questionId, year} = input

        try {

            try {
                await prisma.answers.delete({
                    where: {
                        user_id_question_id_year: { // composite key
                            user_id: userId,
                            question_id: questionId,
                            year: year,
                        }
                    }
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
    })

    fastify.post('/answers', async (request, reply) => {

        let userId: number;
        try {
            userId = await getUserIdFromToken(request)
        } catch {
            return reply.status(401).send({error: 'Not authenticated'})
        }

        const {questionId, content, year} = request.body as { questionId: string, content: string, year: string }
        if (!questionId || !content || !year) {
            return reply.status(400).send({error: 'Invalid body'})
        }

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
                        user_id: userId,
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

        let userId: number;
        try {
            userId = await getUserIdFromToken(request)
        } catch {
            return reply.status(401).send({error: 'Not authenticated'})
        }

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
                where: {id: Number(id), user_id: userId},
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

        let userId: number;
        try {
            userId = await getUserIdFromToken(request)
        } catch {
            return reply.status(401).send({error: 'Not authenticated'})
        }

        const {id} = request.params as { id: string }
        if (!Number.isInteger(Number(id))) {
            return reply.status(400).send({error: 'Invalid answer ID'});
        }

        try {

            try {
                await prisma.answers.delete({
                    where: {id: Number(id), user_id: userId}
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

        let userId: number;
        try {
            userId = await getUserIdFromToken(request)
        } catch {
            return reply.status(401).send({error: 'Not authenticated'})
        }

        const {id} = request.params as { id: string }
        if (!Number.isInteger(Number(id))) {
            return reply.status(400).send({error: 'Invalid question ID'});
        }

        try {

            const answers = await prisma.answers.findMany({
                where: {question_id: Number(id), user_id: userId},
            })

            return reply.status(200).send({answers})

        } catch (err) {
            console.error(err);
            return reply.status(500).send({error: 'Failed to post answer'});
        }
    });

}