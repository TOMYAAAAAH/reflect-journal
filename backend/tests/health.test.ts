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

it('✔️ 200 index', async () => {
    const res = await request(app.server).get('/v1')
    expect(res.statusCode).toBe(200)
})

it('✔️ 200 health check ok', async () => {
    const res = await request(app.server).get('/v1/health')
    expect(res.statusCode).toBe(200)
})

it('✖️ 404 invalid url', async () => {
    const res = await request(app.server).get('/v1/invalid-url')
    expect(res.statusCode).toBe(404)
})