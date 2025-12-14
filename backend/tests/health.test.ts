import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { FastifyInstance } from "fastify";
import { buildApp } from '../src/app';

let app: FastifyInstance;

describe('Overall health check', () => {

    beforeAll(async () => {
        app = buildApp();
        await app.ready();
    });
    afterAll(async () => {
        await app.close();
    });

    it('API should be healthy', async () => {
        const res = await request(app.server).get('/v1/health')
        expect(res.statusCode).toBe(200)
    })

    it('invalid url should return 404', async () => {
        const res = await request(app.server).get('/v1/invalid-url')
        expect(res.statusCode).toBe(404)
    })
})