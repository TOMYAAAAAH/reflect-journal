import {describe, it, expect, beforeAll, afterAll} from 'vitest'
import request from 'supertest'
import {FastifyInstance} from "fastify";
import {buildApp} from '../src/app';
import {prisma} from "../src/prisma/prisma";

let app: FastifyInstance;

// for user_id == 1 and == 3
const token = process.env.JWT1;
let month: number;
let day: number;

beforeAll(async () => {
    app = buildApp();
    await app.ready();


    await prisma.answers.deleteMany({
        where: {question_id: 40, year: 2026, user_id: 1}
    })

    const question = await prisma.questions.findUnique({
        where: {id: 40}
    })
    month = question.month;
    day = question.day;

    await request(app.server)
        .post('/v1/answers')
        .set('Authorization', `Bearer ${token}`)
        .send({questionId: "40", content: "Marvellous", year: "2026"})

});
afterAll(async () => {
    await app.close();
});

describe('GET /calendar/:year', () => {

    it('✖️ 401 not authenticated', async () => {
        const res = await request(app.server)
            .get('/v1/calendar/2026')
        expect(res.statusCode).toBe(401)
    })
    it('✖️ 400 invalid year', async () => {
        const res = await request(app.server)
            .get('/v1/calendar/abc')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(400)
    })
    it('✔️ 200', async () => {
        const res = await request(app.server)
            .get('/v1/calendar/2026')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)

        const dates = res.body.dates as Record<string, number[]>
        expect(dates).toHaveProperty(month.toString())
        expect(dates[month.toString()]).toContain(day)

        const stats = res.body.stats as Record<string, number>
        expect(stats).toHaveProperty(month.toString())
        expect(stats[month.toString()]).toBeGreaterThan(0)
    })
})
