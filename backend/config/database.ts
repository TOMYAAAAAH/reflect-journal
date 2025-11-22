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
        connectionString: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    });

    fastify.addHook('onReady', async () => {
        try {
            const connection = await fastify.mysql.getConnection();
            console.log('✅ Database connected successfully');
            connection.release();
        } catch (err) {
            console.error('❌ Database connection error:', err);
            process.exit(1);
        }
    });
}

export default fp(databaseConnector);