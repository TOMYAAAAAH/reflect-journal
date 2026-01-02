import Fastify, {FastifyInstance} from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import routes from './routes';
import fastifyJwt from "@fastify/jwt";
import {PostHog} from "posthog-node";
import JwtPayload from "./types/JwtPayload";


// Initialize PostHog
const posthog = new PostHog(
    process.env.POSTHOG_API_KEY || '<ph_project_api_key>',
    {
        host: 'https://eu.i.posthog.com',
        enableExceptionAutocapture: true
    }
);

export function buildApp(): FastifyInstance {
    const app: FastifyInstance = Fastify({
        logger: {level: 'error'},
    });

    app.register(cors, {
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    });

    // JWT authentication
    app.register(fastifyJwt, {
        secret: process.env.JWT_SECRET || 'supersecret',
        sign: {expiresIn: '6m'}
    });

    app.register(swagger, {
        swagger: {
            info: {
                title: 'Reflect Journal API',
                description: 'API for daily reflection questions and answers',
                version: '1.0',
            },
            host: 'localhost:3000',
            basePath: '/v1',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
    });

    app.register(swaggerUI, {
        routePrefix: '/v1/documentation',
        uiConfig: {
            docExpansion: 'list',
            deepLinking: false,
        },
    });

    app.setErrorHandler(async (error: Error, request, reply) => {
        // Extract user ID from JWT
        let userId = 'anonymous';
        try {
            const payload = await request.jwtVerify<JwtPayload>()
            userId = payload.userId || 'authenticated-user';
        } catch {}

        // Capture exception with PostHog
        posthog.captureException(error, userId, {
            path: request.url,
            method: request.method,
            environment: process.env.NODE_ENV,
        });

        // Log and respond
        app.log.error(error);
        reply.status(500).send({
            error: 'Internal Server Error',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    });

    // Graceful shutdown
    app.addHook('onClose', async () => {
        await posthog.shutdown();
    });

    app.register(routes, {prefix: '/v1'});

    return app;
}