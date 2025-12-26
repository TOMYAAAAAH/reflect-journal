import { FastifyInstance } from 'fastify';
import healthRoutes from './health';
import questionsRoutes from "./questions";
import answersRoutes from "./answers";
import dayRoutes from "./day";
import loginRoutes from "./login";

export default async function routes(fastify: FastifyInstance) {
    await fastify.register(healthRoutes);
    await fastify.register(questionsRoutes);
    await fastify.register(answersRoutes);
    await fastify.register(dayRoutes);
    await fastify.register(loginRoutes);
}