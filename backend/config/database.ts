import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyMysql from '@fastify/mysql';
import dotenv from 'dotenv';

dotenv.config();

async function databaseConnector(
    fastify: FastifyInstance,
    options: FastifyPluginOptions
): Promise<void> {
    await fastify.register(fastifyMysql, {
        promise: true, // ← IMPORTANT: Enable promise support
        connectionString: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    });

    fastify.addHook('onReady', async () => {
        try {
            await fastify.mysql.query('SELECT 1');
            console.log('✅ Database connected successfully');
        } catch (err) {
            console.error('❌ Database connection error:', err);
            process.exit(1);
        }
    });
}

export default fp(databaseConnector);