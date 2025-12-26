import {describe, it, expect, beforeAll, afterAll} from 'vitest';
import request from 'supertest';
import {FastifyInstance} from "fastify";
import {buildApp} from '../src/app';
import {prisma} from "../src/prisma/prisma";

let app: FastifyInstance;

// for user_id == 1
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNzY2Nzg0NzExLCJleHAiOjE3NjczODk1MTF9.6z5_NYvlaleCTd3EbnQJIpzL71vG6oRYEAWF8Gdpbqc";

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;

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
        .set('Authorization', `Bearer ${token}`)
        .send({questionId: res.body.question.id, content: "Wonderful", year: 2025, userId: 1})

});
afterAll(async () => {
    await app.close();
});

describe('GET /today', () => {


    it('✔️ 200 not connected', async () => {
        const res = await request(app.server)
            .get('/v1/today')
        expect(res.statusCode).toBe(200)
        expect(res.body.question.month).toBe(month)
        expect(res.body.question.day).toBe(day)
        expect(res.body.answers.length).toBe(0)
    })
    it('✔️ 200 connected', async () => {
        const res = await request(app.server)
            .get('/v1/today')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.question.month).toBe(month)
        expect(res.body.question.day).toBe(day)
        expect(res.body.answers.length).toBe(1)
    })
})
describe('GET /day/:month/:day', () => {

    it('✔️ 200 not connected', async () => {
        const res = await request(app.server)
            .get(`/v1/day/${month}/${day}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.question.month).toBe(month)
        expect(res.body.question.day).toBe(day)
        expect(res.body.answers.length).toBe(0)
    })
    it('✔️ 200 connected', async () => {
        const res = await request(app.server)
            .get(`/v1/day/${month}/${day}`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.question.month).toBe(month)
        expect(res.body.question.day).toBe(day)
        expect(res.body.answers.length).toBe(1)
    })
})