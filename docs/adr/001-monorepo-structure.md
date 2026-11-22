# ADR 001: Monorepo Structure

## Status
Accepted

## Context
Lens consists of a FastAPI Python backend, a React/TypeScript frontend (`web/`), and shared DevOps/configuration infrastructure (Docker Compose, GitHub Actions, Alembic migrations). As an individual engineer learning full-stack and DevOps practices, managing multiple independent repositories creates unnecessary overhead in cross-cutting changes, CI configuration, and version synchronisation.

## Decision
Adopt a monorepo structure with top-level `backend/` and `web/` directories:
- `backend/`: FastAPI application, Alembic migrations, historical data scripts, and Python virtualenv.
- `web/`: Vite, React, TypeScript, and front-end tooling.
- Root: Docker Compose orchestration, GitHub Actions CI workflows, environment definitions, and cross-project documentation (`docs/`).

## Consequences
### Positive
- Single pull request and commit history can span backend and frontend changes.
- Unified Docker Compose and CI orchestration in one place.
- Easier cross-service development and local orchestration.

### Tradeoffs
- Root-level scripts must manage working directories explicitly (e.g. `cd backend`).
- CI workflows must trigger selectively or run parallel jobs per directory.
