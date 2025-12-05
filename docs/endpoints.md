# API Routes Plan - Reflect Journal

## 1. Authentication Routes `routes/auth.ts`

| Method | Endpoint              | Description           | Auth? | Body                                                                |
|--------|-----------------------|-----------------------|-------|---------------------------------------------------------------------|
| POST   | /api/v1/auth/register | Create account        | -     | `{ "username": "string", "email": "string", "password": "string" }` |
| POST   | /api/v1/auth/login    | Login, returns JWT    | -     | `{ "email": "string", "password": "string" }`                       |
| GET    | /api/v1/auth/me       | Get current user info | 🔒    |                                                                     |

## 2. Questions Routes `routes/questions.ts`

| Method | Endpoint                           | Description                                | Auth? | Body                               |
|--------|------------------------------------|--------------------------------------------|-------|------------------------------------|
| GET    | /api/v1/questions/today            | Get today's question (optionally playlist) | -     | Optional query: `?playlist=string` |
| GET    | /api/v1/questions/:id              | Get question by ID                         | -     |                                    |
| GET    | /api/v1/questions/date/:month/:day | Get question by date                       | -     |                                    |

## 3. Answers Routes `routes/answers.ts`

| Method | Endpoint                     | Description                       | Auth? | Body                                                                |
|--------|------------------------------|-----------------------------------|-------|---------------------------------------------------------------------|
| POST   | /api/v1/answers              | Save answer for a year            | 🔒    | `{ "questionId": "string", "content": "string", "year": "string" }` |
| GET    | /api/v1/answers/today        | Get my answer for today           | 🔒    |                                                                     |
| GET    | /api/v1/answers/question/:id | Get all my answers for a question | 🔒    |                                                                     |
| PUT    | /api/v1/answers/:id          | Update answer                     | 🔒    | `{ "content": "string" }`                                           |
| DELETE | /api/v1/answers/:id          | Delete answer                     | 🔒    |                                                                     |
