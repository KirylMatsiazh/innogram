# Innogram - Social Media Application

A social media application foundation using a monorepo structure.

## Project Structure

- `apps/core_microservice/` - Core NestJS API
- `apps/auth_microservice/` - Authentication service
- `apps/notifications_consumer_microservice/` - Notifications consumer
- `apps/client_app/` - Next.js frontend
- `packages/shared/` - Shared utilities
- `packages/types/` - Shared TypeScript types
- `scripts/` - Development and deployment scripts
- `docker/` - Docker configurations
- `.github/workflows/` - CI/CD workflows

## Prerequisites

- Node.js LTS
- npm
- Git for Windows (Git Bash)
- Docker Desktop

## Initial Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Start infrastructure with `npm run docker:up`.

## Infrastructure

- PostgreSQL on port 5432
- Redis on port 6379
- RabbitMQ on port 5672
- RabbitMQ management UI on port 15672

## Note

This script creates the initial project structure and configuration.
Application implementations, database migrations, and tests must
be added separately.
