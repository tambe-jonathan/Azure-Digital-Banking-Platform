# Azure Enterprise Banking Platform

## Project Overview

Azure Enterprise Banking Platform is a Phase 1 banking application that demonstrates a React frontend, a Node.js/Express API, and a PostgreSQL database working together locally.

```text
React Frontend
        |
        v
Node.js API
        |
        v
PostgreSQL Database
```

## Features

- Banking dashboard
- Account summary
- Transaction history
- Transfer funds workflow
- Containerized frontend and backend services
- Foundation for Infrastructure as Code
- Foundation for AKS deployment
- Foundation for Azure DevOps CI/CD
- Security controls with JWT-based API authentication
- Foundation for monitoring

## Local Deployment Process

1. Initialize the repository.

   ```bash
   git init
   ```

2. Create the folder structure.
3. Build the frontend.
4. Build the backend.
5. Install PostgreSQL.
6. Create the database.

   ```bash
   createdb bankingdb
   ```

7. Run the schema and seed scripts.

   ```bash
   psql bankingdb < database/schema.sql
   psql bankingdb < database/seed.sql
   ```

8. Run the backend.

   ```bash
   cd backend
   npm install
   npm run dev
   ```

9. Run the frontend.

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

10. Verify the flow:

    ```text
    Login -> Dashboard -> View Balance -> View Transactions -> Transfer Money
    ```

## Demo Credentials

- Username: `john`
- Password: `password123`

## API Endpoints

- `POST /api/auth/login`
- `GET /api/accounts`
- `GET /api/transactions`
- `POST /api/transactions/transfer`

## What Comes Next

Phase 2 will build the Azure-ready infrastructure around this application:

```text
Terraform
    |
    v
Azure Resource Group
    |
    v
Networking
    |
    v
Azure PostgreSQL
    |
    v
Azure Container Registry
    |
    v
AKS
    |
    v
Key Vault
    |
    v
Monitoring
```
