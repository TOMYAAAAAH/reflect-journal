import { FastifyInstance } from 'fastify';
import {prisma} from '../prisma/prisma';
import bcrypt from 'bcrypt';

export default async function loginRoutes(fastify: FastifyInstance) {

    fastify.post('/login', async (request, reply) => {
        const { email, password } = request.body as { email: string; password: string };

        const user = await prisma.users.findUnique({ where: { email: email } });

        if (!user) return reply.status(400).send({ error: 'No user with that email' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return reply.status(401).send({ error: 'Invalid credentials' });

        const token = fastify.jwt.sign({ userId: user.id.toString() });

        return reply.status(200).send({ token, user: { id: user.id, email: user.email } });
    });

    fastify.post('/register', async (request, reply) => {
        const { email, password } = request.body as { email: string; password: string };

        const existingUser = await prisma.users.findUnique({ where: { email: email } });
        if (existingUser) return reply.status(409).send({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data: { email: email, password: hashedPassword },
        });

        const token = fastify.jwt.sign({ userId: user.id.toString() });

        return reply.status(200).send({ token, user: { id: user.id, email: user.email } });
    });


}