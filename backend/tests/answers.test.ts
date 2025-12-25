import {describe, it, expect, beforeAll, afterAll} from 'vitest'
import request from 'supertest'
import {FastifyInstance} from "fastify";
import {buildApp} from '../src/app';

let app: FastifyInstance;

beforeAll(async () => {
    app = buildApp();
    await app.ready();
});
afterAll(async () => {
    await app.close();
});

describe('POST /answers', () => {

    it('✖️ 400 invalid body', async () => {
        const res = await request(app.server)
            .post('/v1/answers')
            .send({ "questionId": "20", "content": "Great" })
        expect(res.statusCode).toBe(400)
    })

    it('✖️ 404 question not found', async () => {
        const res = await request(app.server)
            .post('/v1/answers')
            .send({ "questionId": "999999", "content": "Great", "year": "2025" })
        expect(res.statusCode).toBe(404)
    })
    it.skip('✔️ 200', async () => {
        const res = await request(app.server)
            .post('/v1/answers')
            .send({ questionId: "22", content: "Great", year: "2025", userId: "1" })
        expect(res.statusCode).toBe(200)
    })
})

describe('PUT /answers/:id', () => {

    it('✖️ 400 invalid body', async () => {
        const res = await request(app.server)
            .put('/v1/answers/1')
            .send({ nothing: "Fabulous" })
        expect(res.statusCode).toBe(400)
    })

    it('✖️ 400 invalid answer ID', async () => {
        const res = await request(app.server)
            .put('/v1/answers/abc')
            .send({ content: "Fabulous" })
        expect(res.statusCode).toBe(400)
    })

    it('✖️ 404 answer not found', async () => {
        const res = await request(app.server)
            .put('/v1/answers/99999')
            .send({ content: "Great" })
        expect(res.statusCode).toBe(404)
    })
    it('✔️ 200', async () => {
        const res = await request(app.server)
            .put('/v1/answers/1')
            .send({ content: "Fabulous" })
        expect(res.statusCode).toBe(200)
    })
})
