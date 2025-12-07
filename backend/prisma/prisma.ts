import "dotenv/config";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from './generated/prisma/client';

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    connectTimeout: 30000,
});

export const prisma = new PrismaClient({
    adapter,
    log: ['query', 'error'], // optional, useful for debugging
});