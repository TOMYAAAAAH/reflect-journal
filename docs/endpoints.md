# Reflect Journal - API Routes

## 1. Authentication Routes `routes/auth.ts`

|    | Method | Endpoint         | Description           | Auth? | Body                                          |
|----|--------|------------------|-----------------------|-------|-----------------------------------------------|
| ✔️ | POST   | /api/v1/register | Create account        | -     | `{ "email": "string", "password": "string" }` |
| ✔️ | POST   | /api/v1/login    | Login, returns JWT    | -     | `{ "email": "string", "password": "string" }` |
|    | GET    | /api/v1/me       | Get current user info | 🔒    |                                               |

## 2. Questions Routes `routes/questions.ts`

|    | Method | Endpoint                           | Description          | Auth? | Body |
|----|--------|------------------------------------|----------------------|-------|------|
| ✔️ | GET    | /api/v1/questions/:id              | Get question by ID   | -     |      |
| ✔️ | GET    | /api/v1/questions/date/:month/:day | Get question by date | -     |      |
| ✔️ | GET    | /api/v1/questions/today            | Get today's question | -     |      |

## 3. Answers Routes `routes/answers.ts`

|    | Method | Endpoint                     | Description                       | Auth? | Body                                                                |
|----|--------|------------------------------|-----------------------------------|-------|---------------------------------------------------------------------|
| ✔️ | POST   | /api/v1/answers              | Save answer for a year            | 🔒    | `{ "questionId": "string", "content": "string", "year": "string" }` |
| ✔️ | PUT    | /api/v1/answers/:id          | Update answer by ID               | 🔒    | `{ "content": "string" }`                                           |
| ✔️ | DELETE | /api/v1/answers/:id          | Delete answer by ID               | 🔒    |                                                                     |
| ✔️ | GET    | /api/v1/answers/question/:id | Get all my answers by question ID | 🔒    |                                                                     |

## 4. Day Routes `routes/day.ts`
_If not authenticated, returns only the question_

|    | Method | Endpoint                | Description                       | Auth?  | Body |
|----|--------|-------------------------|-----------------------------------|--------|------|
| ✔️ | GET    | /api/v1/day/:month/:day | Get question and answers by date  | 🔒 & - |      |
| ✔️ | GET    | /api/v1/today           | Get question and answers of today | 🔒 & - |      |
