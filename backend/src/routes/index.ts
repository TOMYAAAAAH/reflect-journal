import { FastifyInstance } from 'fastify';
import healthRoutes from './health';
import questionsRoutes from "./questions";

export default async function routes(fastify: FastifyInstance) {
    await fastify.register(healthRoutes);
    await fastify.register(questionsRoutes);
}