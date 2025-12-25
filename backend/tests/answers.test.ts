import {describe, it, expect, beforeAll, afterAll} from 'vitest';
import request from 'supertest';
import {FastifyInstance} from "fastify";
import {buildApp} from '../src/app';
import {prisma} from "../src/prisma/prisma";

let app: FastifyInstance;

let createdAnswerId1: string;
let createdAnswerId2: string;

beforeAll(async () => {
    app = buildApp();
    await app.ready();

    await prisma.answers.deleteMany({
        where: { question_id: 20, year: 2025, user_id: 1 }
    })
    await prisma.answers.deleteMany({
        where: { question_id: 21, year: 2025, user_id: 1 }
    })
    await prisma.answers.deleteMany({
        where: { question_id: 22, year: 2025, user_id: 1 }
    })

    const res1 = await request(app.server)
        .post('/v1/answers')
        .send({questionId: "21", content: "Fine", year: "2025", userId: "1"})
    createdAnswerId1 = res1.body.answer.id

    const res2 = await request(app.server)
        .post('/v1/answers')
        .send({questionId: "22", content: "Fine", year: "2025", userId: "1"})
    createdAnswerId2 = res2.body.answer.id


});
afterAll(async () => {
    await app.close();
});

describe('POST /answers', () => {

    it('✖️ 400 invalid body', async () => {
        const res = await request(app.server)
            .post('/v1/answers')
            .send({questionId: "20", content: "Great"})
        expect(res.statusCode).toBe(400)
    })
    it('✖️ 409 answer already exists', async () => {
        const res = await request(app.server)
            .post('/v1/answers')
            .send({questionId: "21", content: "Great", year: "2025", userId: "1"})
        expect(res.statusCode).toBe(409)
    })
    it('✖️ 404 question not found', async () => {
        const res = await request(app.server)
            .post('/v1/answers')
            .send({questionId: "999999", content: "Great", year: "2025", userId: "1"})
        expect(res.statusCode).toBe(404)
    })
    it('✔️ 200', async () => {
        const res = await request(app.server)
            .post('/v1/answers')
            .send({questionId: "20", content: "Great", year: "2025", userId: "1"})
        expect(res.statusCode).toBe(200)
        expect(res.body.answer.answer_text).toBe("Great")
    })
})

describe('PUT /answers/:id', () => {

    it('✖️ 400 invalid body', async () => {
        const res = await request(app.server)
            .put('/v1/answers/' + createdAnswerId1)
            .send({nothing: "Fabulous"})
        expect(res.statusCode).toBe(400)
    })
    it('✖️ 400 invalid answer ID', async () => {
        const res = await request(app.server)
            .put('/v1/answers/abc')
            .send({content: "Fabulous"})
        expect(res.statusCode).toBe(400)
    })
    it('✖️ 404 answer not found', async () => {
        const res = await request(app.server)
            .put('/v1/answers/99999')
            .send({content: "Great"})
        expect(res.statusCode).toBe(404)
    })
    it('✔️ 200', async () => {
        const res = await request(app.server)
            .put('/v1/answers/' + createdAnswerId1)
            .send({content: "Fabulous"})
        expect(res.statusCode).toBe(200)
        expect(res.body.answer.answer_text).toBe("Fabulous")
    })
})

describe('DELETE /answers/:id', () => {

    it('✖️ 404 answer not found', async () => {
        const res = await request(app.server)
            .delete('/v1/answers/99999')
        expect(res.statusCode).toBe(404)
    })
    it('✔️ 200', async () => {
        const res = await request(app.server)
            .delete('/v1/answers/' + createdAnswerId2)
        expect(res.statusCode).toBe(200)
    })
})
