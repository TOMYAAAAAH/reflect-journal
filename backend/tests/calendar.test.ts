import {describe, it, expect, beforeAll, afterAll} from 'vitest'
import request from 'supertest'
import {FastifyInstance} from "fastify";
import {buildApp} from '../src/app';

let app: FastifyInstance;

// for user_id == 1 and == 3
const token = process.env.JWT1;

beforeAll(async () => {
    app = buildApp();
    await app.ready();
});
afterAll(async () => {
    await app.close();
});

describe('GET /calendar', () => {

    it('✔️ 200', async () => {
        const res = await request(app.server)
            .get('/v1/calendar')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })
})
