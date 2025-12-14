import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { FastifyInstance } from "fastify";
import { buildApp } from '../src/server';

let app: FastifyInstance;

describe('GET /v1/questions/:id', () => {

    beforeAll(async () => {
        app = buildApp();
        await app.ready();
    });
    afterAll(async () => {
        await app.close();
    });

    it('returns 400 for invalid id', async () => {
        const res = await request(app.server).get('/v1/questions/abc')
        expect(res.statusCode).toBe(400)
    })

    it('returns 404 if not found', async () => {
        const res = await request(app.server).get('/v1/questions/99999')
        expect(res.statusCode).toBe(404)
    })

    it('returns 200 if valid', async () => {
        // Assuming ID 20 exists in your test database (or a mock is used)
        const res = await request(app.server).get('/v1/questions/20')
        expect(res.statusCode).toBe(200)
    })
})