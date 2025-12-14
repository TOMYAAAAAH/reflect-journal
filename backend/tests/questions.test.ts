import {describe, it, expect, beforeAll, afterAll} from 'vitest'
import request from 'supertest'
import {FastifyInstance} from "fastify";
import {buildApp} from '../src/server';

let app: FastifyInstance;

describe('GET /questions/:id', () => {

    beforeAll(async () => {
        app = buildApp();
        await app.ready();
    });
    afterAll(async () => {
        await app.close();
    });

    describe('❌', () => {

        it('400 - invalid id type', async () => {
            const res = await request(app.server).get('/v1/questions/abc')
            expect(res.statusCode).toBe(400)
        })

        it('404 - no id correspond', async () => {
            const res = await request(app.server).get('/v1/questions/99999')
            expect(res.statusCode).toBe(404)
        })

        it('404 - no playlist_id correspond', async () => {
            const res = await request(app.server).get('/v1/questions/20?playlist_id=99999')
            expect(res.statusCode).toBe(404)
        })
    })

    describe('✅', () => {
        it('200 - id matches', async () => {
            // Assuming ID 20 exists in your test database (or a mock is used)
            const res = await request(app.server).get('/v1/questions/20')
            expect(res.statusCode).toBe(200)
            expect(res.body.question.id).toBe(20)
        })
        it('200 - playlist_id matches', async () => {
            // Assuming ID 20 exists in your test database (or a mock is used)
            const res = await request(app.server).get('/v1/questions/20?playlist_id=1')
            expect(res.statusCode).toBe(200)
            expect(res.body.question.playlist_id).toBe(1)
        })
    })
})

describe('GET /questions/date/:month/:day', () => {

    beforeAll(async () => {
        app = buildApp();
        await app.ready();
    });
    afterAll(async () => {
        await app.close();
    });

    describe('❌', () => {

        it('400 - invalid date type', async () => {
            const res = await request(app.server).get('/v1/questions/date/ab/5')
            expect(res.statusCode).toBe(400)
        })

        it('404 - no date correspond', async () => {
            const res = await request(app.server).get('/v1/questions/date/13/32')
            expect(res.statusCode).toBe(404)
        })
    })

    describe('✅', () => {

        it('200 - date matches', async () => {
            // Assuming ID 20 exists in your test database (or a mock is used)
            const res = await request(app.server).get('/v1/questions/date/1/1')
            expect(res.statusCode).toBe(200)
            expect(res.body.question.month).toBe(1)
            expect(res.body.question.day).toBe(1)
        })
    })
})