import { prisma } from '../src/prisma/prisma';

async function test() {
    try {
        await prisma.$connect();
        console.log('✅ Connected to database');

        // const raw = await prisma.$queryRaw`SELECT 1`;
        // console.log('✅ Raw test:', raw);

        const question = await prisma.questions.findFirst();
        console.log('✅ First question:', question);

    } catch (err) {
        console.error('❌ Query failed', err);
    } finally {
        await prisma.$disconnect();
    }
}

test();
