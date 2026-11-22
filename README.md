# Lens

A context-aware analytics and AI-agent platform. Give it an entity (a stock
today; products, restaurants or portfolios later) and it returns live data,
analytics, and an AI-generated explanation grounded in real data.

Status: Phase 1 complete. Database models, TimescaleDB hypertable, historical loader, and REST API v1 are operational.

## Vision

- Real-time and historical market data, shown on a live web dashboard
- An analytics engine (indicators, correlations, anomaly detection)
- A news and sentiment pipeline
- An AI agent that answers questions using verified data, not guesses
- Built API-first so a browser extension and other domains can plug in later

## Planned architecture

Clients (React dashboard, later a browser extension)
→ FastAPI backend → PostgreSQL/TimescaleDB + Redis
→ background workers (ingestion, news, sentiment, alerts)

See [docs/architecture.md](docs/architecture.md) and [docs/adr/](docs/adr/) for detailed architectural decisions.

## Planned tech stack

Python, FastAPI, PostgreSQL + TimescaleDB, Redis, React + TypeScript,
Docker, GitHub Actions, Terraform, Prometheus + Grafana.

## Roadmap

- [x] Phase 0: Repo, Docker Compose, CI
- [x] Phase 1: Data layer and historical API
- [ ] Phase 2: Dashboard frontend
- [ ] Phase 3: Real-time pipeline
- [ ] Phase 4: Analytics engine
- [ ] Phase 5: News, sentiment and AI agent
- [ ] Phase 6: Auth and alerts
- [ ] Phase 7: Production DevOps
- [ ] Phase 8: Polish and demo

## REST API (v1)

Once the backend is running, interactive API documentation is available at `http://localhost:8000/docs`:

- `GET /health` — Service health check.
- `GET /api/v1/entities` — List tracked stock entities.
- `GET /api/v1/entities/{symbol}/bars?limit=100` — Retrieve historical OHLCV price bars for a symbol (e.g. `TCS.NS`, `RELIANCE.NS`, `INFY.NS`).

## Running locally

### 1. Start the database
```powershell
docker compose up -d db
```

### 2. Run migrations
```powershell
cd backend
.venv\Scripts\Activate.ps1
alembic upgrade head
```

### 3. Load historical stock data
```powershell
python scripts/load_historical.py
```

### 4. Run the API
```powershell
uvicorn app.main:app --reload
```
