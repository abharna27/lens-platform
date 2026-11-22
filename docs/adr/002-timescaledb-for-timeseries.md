# ADR 002: PostgreSQL + TimescaleDB for Relational and Time-Series Data

## Status
Accepted

## Context
Lens needs to store both relational entity metadata (stocks, symbols, company names, later users and watchlists) and high-volume, ordered time-series market price data (OHLCV bars). Storing time-series data in traditional relational tables becomes slow over millions of rows, while using a completely separate time-series database (like InfluxDB) introduces dual-database operational overhead, foreign key disconnects, and synchronization complexity.

## Decision
Use PostgreSQL extended with the **TimescaleDB** extension via the `timescale/timescaledb` Docker image.
- Standard relational tables (e.g. `entities`) use standard PostgreSQL table structures and foreign key constraints.
- Time-series price tables (e.g. `market_bars`) are converted to TimescaleDB **hypertables** partitioned by timestamp (`ts`).

## Consequences
### Positive
- Single database engine for relational and time-series data: one connection string, one backup pipeline, one migration system.
- Hypertables automatically chunk data across time intervals (e.g. 7-day chunks), keeping memory and index sizes manageable for fast range queries.
- Full relational integrity: `market_bars` enforces a foreign key back to `entities.id`.

### Tradeoffs
- TimescaleDB requires the partitioning timestamp column (`ts`) to be included in any composite primary key constraint on the hypertable (`PRIMARY KEY (id, ts)`).
- Specific Docker image required (`timescale/timescaledb:latest-pg16`) rather than vanilla PostgreSQL.
