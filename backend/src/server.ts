import dotenv from 'dotenv';
import {buildApp} from "./app";

dotenv.config();

const fastify = buildApp();

const start = async (): Promise<void> => {
    try {
        const port = parseInt(process.env.PORT || '3000');
        await fastify.listen({port, host: '0.0.0.0'});
        console.log(`🚀 Server is running on http://localhost:${port}`);
        console.log(`📚 Documentation available at http://localhost:${port}/documentation`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
