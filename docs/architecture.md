# Lens Architecture

## Status
- **Phase 0:** Complete (Monorepo, Docker Compose, CI, FastAPI & React skeletons).
- **Phase 1:** Complete (Database models, TimescaleDB hypertable, Alembic migrations, idempotent historical data loader, REST API v1 endpoints, tests, and CI service).

---

## High-Level Architecture

```
                    ┌─────────────────────────┐
                    │      Clients            │
                    │ (React / TypeScript UI) │
                    └───────────┬─────────────┘
                                │ HTTP / REST (/api/v1)
                                ▼
                    ┌─────────────────────────┐
                    │      FastAPI App        │
                    │  (app/packs/markets)    │
                    └───────────┬─────────────┘
                                │ SQLAlchemy ORM
                                ▼
              ┌─────────────────────────────────────┐
              │    PostgreSQL + TimescaleDB         │
              │ ─────────────────────────────────── │
              │ • entities    (Relational table)    │
              │ • market_bars (Timescale Hypertable)│
              └─────────────────────────────────────┘
```

---

## Architectural Principles

1. **Monorepo Structure**: Backend and frontend reside in one repo with independent package management.
2. **Core vs. Packs Separation**:
   - `app/core/`: Domain-agnostic entities, database session management, shared base classes.
   - `app/packs/markets/`: Stock market models, Pydantic schemas, and endpoints. Core must never import from packs.
3. **Database as Single Source of Truth**:
   - PostgreSQL for relational data (`entities`).
   - TimescaleDB hypertables for time-series candles (`market_bars`).
   - Alembic for programmatic, version-controlled migrations.
4. **API-First Design**: Versioned REST endpoints (`/api/v1`) with strictly typed Pydantic response models.

---

## Architecture Decision Records (ADRs)

- [ADR 001: Monorepo Structure](adr/001-monorepo-structure.md)
- [ADR 002: PostgreSQL + TimescaleDB for Relational and Time-Series Data](adr/002-timescaledb-for-timeseries.md)
- [ADR 003: REST API Versioning, SQLAlchemy ORM, and Alembic Migrations](adr/003-rest-api-versioning-and-sqlalchemy.md)
