import {describe, it, expect, beforeAll, afterAll} from 'vitest';
import request from 'supertest';
import {FastifyInstance} from "fastify";
import {buildApp} from '../src/app';
import {prisma} from "../src/prisma/prisma";

let app: FastifyInstance;

// for user_id == 1
const token = process.env.JWT1;

beforeAll(async () => {
    app = buildApp();
    await app.ready();

    await prisma.users.deleteMany({
        where: {email: "test"}
    })
    await prisma.users.deleteMany({
        where: {email: "test2"}
    })

    await request(app.server)
        .post('/v1/register')
        .send({email: "test2", password: "StrongPassword123!"})
});
afterAll(async () => {
    await app.close();
});

describe('POST /register', () => {


    it('✖️ 409 user already exists', async () => {
        const res = await request(app.server)
            .post('/v1/register')
            .send({email: "test2", password: "StrongPassword123*"})
        expect(res.statusCode).toBe(409)
    })
    it('✔️ 200', async () => {
        const res = await request(app.server)
            .post('/v1/register')
            .send({email: "test", password: "StrongPassword123*"})
        expect(res.statusCode).toBe(200)
        expect(res.body.user.email).toBe("test")

        const passwordHash = await prisma.users.findUnique({where: {email: "test"}}).then(user => user?.password)
        expect(passwordHash).toContain("$2b$10$")
    })
})

describe('POST /login', () => {

    it('✖️ 401 wrong password', async () => {
        const res = await request(app.server)
            .post('/v1/login')
            .send({email: "test2", password: "WrongPassword123!"})
        expect(res.statusCode).toBe(401)
    })
    it('✖️ 400 user does not exist', async () => {
        const res = await request(app.server)
            .post('/v1/login')
            .send({email: "test3", password: "WrongPassword123!"})
        expect(res.statusCode).toBe(400)
    })
    it('✔️ 200', async () => {
        const res = await request(app.server)
            .post('/v1/login')
            .send({email: "test2", password: "StrongPassword123!"})
        expect(res.statusCode).toBe(200)
        expect(res.body.user.email).toBe("test2")
    })
})

describe('GET /me', () => {

    it('✖️ 401 not authenticated', async () => {
        const res = await request(app.server)
            .get('/v1/me')
        expect(res.statusCode).toBe(401)
    })
    it('✔️ 200', async () => {
        const res = await request(app.server)
            .get('/v1/me')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.user.name).toBe("test")
    })
})