import {describe, it, expect, beforeAll, afterAll} from 'vitest';
import request from 'supertest';
import {FastifyInstance} from "fastify";
import {buildApp} from '../src/app';
import {prisma} from "../src/prisma/prisma";

let app: FastifyInstance;

beforeAll(async () => {
    app = buildApp();
    await app.ready();

    const res = await request(app.server)
        .get('/v1/questions/today')

    await prisma.answers.deleteMany({
        where: {question_id: res.body.question.id, year: 2025, user_id: 1}
    })

    await request(app.server)
        .post('/v1/answers')
        .send({questionId: res.body.question.id, content: "Wonderful", year: 2025, userId: 1})
});
afterAll(async () => {
    await app.close();
});

describe('GET /today', () => {

    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;

    it('✔️ 200', async () => {
        const res = await request(app.server)
            .get('/v1/today')
        expect(res.statusCode).toBe(200)
        expect(res.body.answers.length).toBe(1)
        expect(res.body.question.month).toBe(todayMonth)
        expect(res.body.question.day).toBe(todayDay)
    })
})