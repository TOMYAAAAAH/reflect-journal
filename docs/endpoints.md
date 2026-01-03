# Reflect Journal - API Routes

```
➖ not implemented
✔️ implemented
❗ unused, probably to remove
```

## 1. Authentication Routes `routes/auth.ts`

|    | Method | Endpoint     | Description           | Auth? | Body                                          |
|----|--------|--------------|-----------------------|-------|-----------------------------------------------|
| ✔️ | POST   | /v1/register | Create account        | -     | `{ "email": "string", "password": "string" }` |
| ✔️ | POST   | /v1/login    | Login, returns JWT    | -     | `{ "email": "string", "password": "string" }` |
| ➖  | GET    | /v1/me       | Get current user info | 🔒    |                                               |

## 2. Questions Routes `routes/questions.ts`

|    | Method | Endpoint                       | Description          | Auth? | Body |
|----|--------|--------------------------------|----------------------|-------|------|
| ❗️ | GET    | /v1/questions/:id              | Get question by ID   | -     |      |
| ✔️ | GET    | /v1/questions/date/:month/:day | Get question by date | -     |      |
| ✔️ | GET    | /v1/questions/today            | Get today's question | -     |      |

## 3. Answers Routes `routes/answers.ts`

|    | Method | Endpoint                                    | Description                           | Auth? | Body                                                                |
|----|--------|---------------------------------------------|---------------------------------------|-------|---------------------------------------------------------------------|
| ❗  | POST   | /v1/answers                                 | Save answer for a year                | 🔒    | `{ "questionId": "string", "content": "string", "year": "string" }` |
| ❗️ | PUT    | /v1/answers/:id                             | Update answer by ID                   | 🔒    | `{ "content": "string" }`                                           |
| ❗️ | DELETE | /v1/answers/:id                             | Delete answer by ID                   | 🔒    |                                                                     |
| ✔️ | GET    | /v1/answers/question/:questionId            | Get all my answers by question ID     | 🔒    |                                                                     |
| ✔️ | POST   | /v1/answers/question/:questionId/year/:year | Save answer by question ID and year   | 🔒    | `{ "content": "string" }`                                           |
| ✔️ | PUT    | /v1/answers/question/:questionId/year/:year | Update answer by question ID and year | 🔒    | `{ "content": "string" }`                                           |
| ✔️ | DELETE | /v1/answers/question/:questionId/year/:year | Delete answer by question ID and year | 🔒    |                                                                     |

## 4. Day Routes `routes/day.ts`

_If not authenticated, returns only the question_

|    | Method | Endpoint                    | Description                       | Auth?  | Body |
|----|--------|-----------------------------|-----------------------------------|--------|------|
| ❗️ | GET    | /v1/day/:month/:day         | Get question and answers by date  | 🔒 & - |      |
| ❗️ | GET    | /v1/today                   | Get question and answers of today | 🔒 & - |      |
| ✔️ | GET    | /v1/answers/day/:month/:day | Get answers by date               | 🔒     |      |
| ✔️ | GET    | /v1/answers/today           | Get answers of today              | 🔒     |      |

## 5. Calendar Routes `routes/calendar.ts`

|    | Method | Endpoint           | Description                     | Auth? | Body |
|----|--------|--------------------|---------------------------------|-------|------|
| ✔️ | GET    | /v1/calendar/:year | Get days with an answer by year | 🔒    |      |

## 6. other Routes `routes/health.ts`

|    | Method | Endpoint   | Description         | Auth? | Body |
|----|--------|------------|---------------------|-------|------|
| ✔️ | GET    | /v1/       | Get welcome message |       |      |
| ✔️ | GET    | /v1/health | Get api health      |       |      |
