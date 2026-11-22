# ADR 003: REST API Versioning, SQLAlchemy ORM, and Alembic Migrations

## Status
Accepted

## Context
As the Lens data layer develops, we need a reliable way to define database schemas, track schema evolutions over time across developer and CI environments, and expose data to the web frontend without tight coupling to database row formats.

## Decision
1. **FastAPI with Explicit API Versioning (`/api/v1`)**:
   - All domain routes are organized under `APIRouter(prefix="/api/v1")`.
   - Versioning provides a stable contract for consumers (web dashboard, future browser extensions) and allows backward-compatible deprecation paths.

2. **SQLAlchemy ORM + Pydantic Schemas (Core/Packs Split)**:
   - SQLAlchemy ORM models define database tables, columns, indexes, and constraints.
   - Pydantic schemas (`EntityOut`, `MarketBarOut`) define the explicit response shapes with `from_attributes=True` (`ConfigDict`), preventing accidental leakage of internal database fields and enforcing data contracts.
   - The codebase strictly enforces a core/packs split: `app/core/` contains domain-agnostic foundations (`Base`, `get_db`, `Entity`), while `app/packs/markets/` encapsulates market-specific logic (`MarketBar`, market endpoints). Core never imports from packs.

3. **Alembic Database Migrations**:
   - Schema alterations are never applied via manual ad-hoc SQL.
   - All table creations and modifications are tracked in version-controlled migration files in `alembic/versions/` executed sequentially with `alembic upgrade head`.

## Consequences
### Positive
- Clean separation between storage schema (SQLAlchemy) and public API interface (Pydantic).
- Reproducible, audit-friendly database evolution across local machines, Docker, and CI workflows.
- Extensibility: new domain packs (e.g. e-commerce products) can plug in without rewriting core entity management.

### Tradeoffs
- Composite primary keys on hypertables require explicit `autoincrement=True` in SQLAlchemy for sequence generation.
- Slightly higher initial boilerplate compared to raw queries and untyped dictionaries.
