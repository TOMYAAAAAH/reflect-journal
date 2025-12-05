import {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import bcrypt from 'bcrypt';

interface RegisterBody {
    email: string;
    password: string;
}

export default async function authRoutes(fastify: FastifyInstance) {

    // POST /api/auth/register
    fastify.post<{ Body: RegisterBody }>('/api/auth/register',

        async (request: FastifyRequest<{ Body: RegisterBody }>, reply: FastifyReply) => {
            const {email, password} = request.body;

            // Check if email already exists
            const [existingUsers]: any = await fastify.mysql.query(
                'SELECT id FROM users WHERE email = ?',
                [email]
            );

            if (existingUsers.length > 0) {
                return reply.code(409).send({
                    error: 'Email already exists'
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user
            const [result]: any = await fastify.mysql.query(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                [email, hashedPassword]
            );

            return reply.code(201).send({
                id: result.insertId,
                email: email,
                message: 'User created successfully'
            });
        }
    );
}