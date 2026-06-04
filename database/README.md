# Database

PostgreSQL database setup for the Azure Enterprise Banking Platform.

## Create Database

```bash
createdb bankingdb
```

## Run Schema

```bash
psql bankingdb < schema.sql
```

## Seed Data

```bash
psql bankingdb < seed.sql
```

## Demo User

- Username: `john`
- Password: `password123`
