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

describe('GET /questions/:id', () => {

    it('✖️ 400 invalid id', async () => {
        const res = await request(app.server).get('/v1/questions/abc')
        expect(res.statusCode).toBe(400)
    })

    it('✖️ 404 question not found', async () => {
        const res = await request(app.server).get('/v1/questions/99999')
        expect(res.statusCode).toBe(404)
    })
    it('✔️ 200', async () => {
        const res = await request(app.server).get('/v1/questions/20')
        expect(res.statusCode).toBe(200)
        expect(res.body.question.id).toBe(20)
    })
})

describe('GET /questions/day/:month/:day', () => {

    it('✖️ 400 invalid date type', async () => {
        const res = await request(app.server).get('/v1/questions/day/ab/5')
        expect(res.statusCode).toBe(400)
    })

    it('✖️ 404 question not found', async () => {
        const res = await request(app.server).get('/v1/questions/day/13/32')
        expect(res.statusCode).toBe(404)
    })

    it('✔️ 200 date matches', async () => {
        const res = await request(app.server).get('/v1/questions/day/1/1')
        expect(res.statusCode).toBe(200)
        expect(res.body.question.month).toBe(1)
        expect(res.body.question.day).toBe(1)
    })
})

describe('GET /questions/today', () => {

    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;

    it('✔️ 200 today date matches', async () => {
        const res = await request(app.server).get('/v1/questions/today')
        expect(res.statusCode).toBe(200)
        expect(res.body.question.month).toBe(todayMonth)
        expect(res.body.question.day).toBe(todayDay)
    })
})

describe('playlist handling (depends on today)', () => {

    it('✖️ 404 no playlist_id correspond', async () => {
        const res = await request(app.server).get('/v1/questions/today?playlist_id=99999')
        expect(res.statusCode).toBe(404)
    })

    it('✖️ 400 invalid playlist_id', async () => {
        const res1 = await request(app.server).get('/v1/questions/today?playlist_id=abc')
        const res2 = await request(app.server).get('/v1/questions/20?playlist_id=abc')
        const res3 = await request(app.server).get('/v1/questions/day/1/1?playlist_id=abc')
        expect(res1.statusCode).toBe(400)
        expect(res2.statusCode).toBe(400)
        expect(res3.statusCode).toBe(400)
    })

    it('✔️ 200 playlist_id matches', async () => {
        const res = await request(app.server).get('/v1/questions/today?playlist_id=1')
        expect(res.statusCode).toBe(200)
        expect(res.body.question.playlist_id).toBe(1)
    })
})