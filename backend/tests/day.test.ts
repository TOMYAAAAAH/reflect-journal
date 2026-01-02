import {describe, it, expect, beforeAll, afterAll} from 'vitest';
import request from 'supertest';
import {FastifyInstance} from "fastify";
import {buildApp} from '../src/app';
import {prisma} from "../src/prisma/prisma";

let app: FastifyInstance;

// for user_id == 1
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNzY2Nzg0NzExLCJleHAiOjE3NjczODk1MTF9.6z5_NYvlaleCTd3EbnQJIpzL71vG6oRYEAWF8Gdpbqc";

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
let userCreationYear: number;
let numberOfAnswers: number;

beforeAll(async () => {
    app = buildApp();
    await app.ready();

    const question = await prisma.questions.findFirst({
        where: {month, day, playlist_id: 1}
    })

    const user = await prisma.users.findUnique({
        where: {id: 1}
    })
    userCreationYear = user.created_at.getFullYear();
    numberOfAnswers = year - userCreationYear + 1;

    await prisma.answers.deleteMany({
        where: {question_id: question.id, user_id: 1}
    })

    await request(app.server)
        .post(`/v1/answers/question/${question.id}/year/${userCreationYear}`)
        .set('Authorization', `Bearer ${token}`)
        .send({content: "Wonderful"})

});
afterAll(async () => {
    await app.close();
});

describe('GET /today', () => {


    it('✔️ 200 not connected', async () => {
        const res = await request(app.server)
            .get('/v1/today')
        expect(res.statusCode).toBe(200)
        expect(res.body.question.month).toBe(month)
        expect(res.body.question.day).toBe(day)
        expect(res.body.answers.length).toBe(0)
    })
    it('✔️ 200 connected', async () => {
        const res = await request(app.server)
            .get('/v1/today')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.question.month).toBe(month)
        expect(res.body.question.day).toBe(day)
        expect(res.body.answers.length).toBe(numberOfAnswers)
        expect(res.body.answers[0].isExisting).toBe(true)
        expect(res.body.answers[1].isExisting).toBe(false)
    })
})
describe('GET /day/:month/:day', () => {

    it('✖️ 400 invalid date', async () => {
        const res = await request(app.server)
            .get(`/v1/day/ab/bc`)
        expect(res.statusCode).toBe(400)
    })
    it('✖️ 404 question not found', async () => {
        const res = await request(app.server)
            .get(`/v1/day/15/12`)
        expect(res.statusCode).toBe(404)
    })
    it('✔️ 200 not connected', async () => {
        const res = await request(app.server)
            .get(`/v1/day/${month}/${day}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.question.month).toBe(month)
        expect(res.body.question.day).toBe(day)
        expect(res.body.answers.length).toBe(0)
    })
    it('✔️ 200 connected', async () => {
        const res = await request(app.server)
            .get(`/v1/day/${month}/${day}`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.question.month).toBe(month)
        expect(res.body.question.day).toBe(day)
        expect(res.body.answers.length).toBe(numberOfAnswers)
        expect(res.body.answers[0].isExisting).toBe(true)
        expect(res.body.answers[1].isExisting).toBe(false)
    })
})

// ANSWERS
describe('GET /answers/today', () => {

    it('✖️ 401 not connected', async () => {
        const res = await request(app.server)
            .get('/v1/answers/today')
        expect(res.statusCode).toBe(401)
    })
    it('✔️ 200 connected', async () => {
        const res = await request(app.server)
            .get('/v1/answers/today')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.answers.length).toBe(numberOfAnswers)
        expect(res.body.answers[0].isExisting).toBe(true)
        expect(res.body.answers[1].isExisting).toBe(false)
    })
})

describe('GET /answers/day/:month/:day', () => {

    it('✖️ 400 invalid date', async () => {
        const res = await request(app.server)
            .get(`/v1/answers/day/ab/bc`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(400)
    })
    it('✖️ 401 not connected', async () => {
        const res = await request(app.server)
            .get(`/v1/answers/day/${month}/${day}`)
        expect(res.statusCode).toBe(401)
    })
    it('✔️ 200 connected', async () => {
        const res = await request(app.server)
            .get(`/v1/answers/day/${month}/${day}`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.answers.length).toBe(numberOfAnswers)
        expect(res.body.answers[0].isExisting).toBe(true)
        expect(res.body.answers[1].isExisting).toBe(false)
    })
})