import { PrismaClient } from '../prisma/generated/prisma/client';

const prisma = new PrismaClient();

async function test() {
    try {
        await prisma.$connect();
        console.log('✅ Connected to database');
    } catch (err) {
        console.error('❌ Connection failed', err);
    } finally {
        await prisma.$disconnect();
    }
}

test();