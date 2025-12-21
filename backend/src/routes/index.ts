import { FastifyInstance } from 'fastify';
import healthRoutes from './health';
import questionsRoutes from "./questions";
import answersRoutes from "./answers";

export default async function routes(fastify: FastifyInstance) {
    await fastify.register(healthRoutes);
    await fastify.register(questionsRoutes);
    await fastify.register(answersRoutes);
}