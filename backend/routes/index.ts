import { FastifyInstance } from 'fastify';
import healthRoutes from './health';
import questionsRoutes from "./questions";
import authRoutes from "./auth";

export default async function routes(fastify: FastifyInstance) {
    await fastify.register(healthRoutes);
    await fastify.register(questionsRoutes);
    await fastify.register(authRoutes);
}