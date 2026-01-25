import { FastifyInstance } from 'fastify';
import healthRoutes from './health';
import questionsRoutes from "./questions";
import answersRoutes from "./answers";
import dayRoutes from "./day";
import calendarRoutes from "./calendar";
import authenticationRoutes from "./authentication";

export default async function routes(fastify: FastifyInstance) {
    await fastify.register(healthRoutes);
    await fastify.register(questionsRoutes);
    await fastify.register(answersRoutes);
    await fastify.register(dayRoutes);
    await fastify.register(authenticationRoutes);
    await fastify.register(calendarRoutes);
}