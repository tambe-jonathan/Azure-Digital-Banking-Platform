# Architecture

## Phase 1 Runtime Flow

```text
User logs in
    |
    v
Frontend calls API
    |
    v
Backend validates request
    |
    v
Backend queries PostgreSQL
    |
    v
Response returned to frontend
    |
    v
Dashboard updated
```

## Components

- `frontend/`: React application built with Vite.
- `backend/`: Node.js and Express REST API.
- `database/`: PostgreSQL schema and seed data.

## Security Notes

Phase 1 uses JWT authentication and bearer tokens for protected API routes. Production deployments should add hardened password policy, secure secret storage, HTTPS-only cookies or token handling, audit logging, rate limiting, and managed identities where possible.
