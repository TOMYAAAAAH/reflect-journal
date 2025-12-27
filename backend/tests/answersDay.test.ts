import {describe, it, expect, beforeAll, afterAll} from 'vitest';
import request from 'supertest';
import {FastifyInstance} from "fastify";
import {buildApp} from '../src/app';
import {prisma} from "../src/prisma/prisma";

let app: FastifyInstance;

// for user_id == 1 and == 3
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNzY2Nzg0NzExLCJleHAiOjE3NjczODk1MTF9.6z5_NYvlaleCTd3EbnQJIpzL71vG6oRYEAWF8Gdpbqc";
const otherToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzIiwiaWF0IjoxNzY2NzcxNDg4LCJleHAiOjE3NjczNzYyODh9.bYCiXlRWZNuUUxSLUrFVH5NFa91po8DZHGBuMDm30bQ";

beforeAll(async () => {
    app = buildApp();
    await app.ready();

    await prisma.answers.deleteMany({
        where: {question_id: 30, year: 2025, user_id: 1}
    })
    await prisma.answers.deleteMany({
        where: {question_id: 31, year: 2025, user_id: 1}
    })
    await prisma.answers.deleteMany({
        where: {question_id: 32, year: 2025, user_id: 1}
    })

    await request(app.server)
        .post('/v1/answers/question/31/year/2025')
        .set('Authorization', `Bearer ${token}`)
        .send({content: "Fine"})

    await request(app.server)
        .post('/v1/answers/question/32/year/2025')
        .set('Authorization', `Bearer ${token}`)
        .send({content: "Fine"})

});
afterAll(async () => {
    await app.close();
});

describe('POST /answers/question/:questionId/year/:year', () => {

    it('✖️ 400 invalid content', async () => {
        const res = await request(app.server)
            .post('/v1/answers/question/30/year/2025')
            .set('Authorization', `Bearer ${token}`)
            .send({nothing: "Great"})
        expect(res.statusCode).toBe(400)
    })
    it('✖️ 409 answer already exists', async () => {
        const res = await request(app.server)
            .post('/v1/answers/question/31/year/2025')
            .set('Authorization', `Bearer ${token}`)
            .send({content: "Great"})
        expect(res.statusCode).toBe(409)
    })
    it('✖️ 404 question not found', async () => {
        const res = await request(app.server)
            .post('/v1/answers/question/99999/year/2025')
            .set('Authorization', `Bearer ${token}`)
            .send({content: "Great"})
        expect(res.statusCode).toBe(404)
    })
    it('✖️ 401 not connected', async () => {
        const res = await request(app.server)
            .post('/v1/answers/question/30/year/2025')
            .send({content: "Great"})
        expect(res.statusCode).toBe(401)
    })
    it('✔️ 200', async () => {
        const res = await request(app.server)
            .post('/v1/answers/question/30/year/2025')
            .set('Authorization', `Bearer ${token}`)
            .send({content: "Great"})
        expect(res.statusCode).toBe(200)
        expect(res.body.answer.answer_text).toBe("Great")
    })
})

describe('PUT /answers/question/:questionId/year/:year', () => {

    it('✖️ 400 invalid content', async () => {
        const res = await request(app.server)
            .put('/v1/answers/question/31/year/2025')
            .set('Authorization', `Bearer ${token}`)
            .send({nothing: "Fabulous"})
        expect(res.statusCode).toBe(400)
    })
    it('✖️ 400 invalid answer ID', async () => {
        const res = await request(app.server)
            .put('/v1/answers/abc')
            .set('Authorization', `Bearer ${token}`)
            .send({content: "Fabulous"})
        expect(res.statusCode).toBe(400)
    })
    it('✖️ 404 answer not found', async () => {
        const res = await request(app.server)
            .put('/v1/answers/question/31/year/1')
            .set('Authorization', `Bearer ${token}`)
            .send({content: "Great"})
        expect(res.statusCode).toBe(404)
    })
    it('✖️ 401 not connected', async () => {
        const res = await request(app.server)
            .put('/v1/answers/question/31/year/2025')
            .send({content: "Great"})
        expect(res.statusCode).toBe(401)
    })
    it('✖️ 404 answer of an other person', async () => {
        const res = await request(app.server)
            .put('/v1/answers/question/31/year/2025')
            .set('Authorization', `Bearer ${otherToken}`)
            .send({content: "Great"})
        expect(res.statusCode).toBe(404)
    })
    it('✔️ 200', async () => {
        const res = await request(app.server)
            .put('/v1/answers/question/31/year/2025')
            .set('Authorization', `Bearer ${token}`)
            .send({content: "Fabulous"})
        expect(res.statusCode).toBe(200)
        expect(res.body.answer.answer_text).toBe("Fabulous")
    })
})

describe('DELETE /answers/question/:questionId/year/:year', () => {

    it('✖️ 404 answer not found', async () => {
        const res = await request(app.server)
            .delete('/v1/answers/question/32/year/1')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(404)
    })
    it('✖️ 400 invalid params', async () => {
        const res = await request(app.server)
            .delete('/v1/answers/question/abc/year/2025')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(400)
    })
    it('✖️ 401 not connected', async () => {
        const res = await request(app.server)
            .delete('/v1/answers/question/32/year/2025')
        expect(res.statusCode).toBe(401)
    })
    it('✖️ 404 answer of an other person', async () => {
        const res = await request(app.server)
            .delete('/v1/answers/question/32/year/2025')
            .set('Authorization', `Bearer ${otherToken}`)
        expect(res.statusCode).toBe(404)
    })
    it('✔️ 200', async () => {
        const res = await request(app.server)
            .delete('/v1/answers/question/32/year/2025')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })
})
