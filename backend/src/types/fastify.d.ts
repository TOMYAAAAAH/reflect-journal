import 'fastify';
import { Pool } from 'mysql2/promise';

declare module 'fastify' {
    interface FastifyInstance {
        mysql: Pool;
    }
}