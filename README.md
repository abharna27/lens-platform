# Lens

A context-aware analytics and AI-agent platform. Give it an entity (a stock
today; products, restaurants or portfolios later) and it returns live data,
analytics, and an AI-generated explanation grounded in real data.

Status: Phase 0, foundations. Nothing is runnable yet.

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

## Planned tech stack

Python, FastAPI, PostgreSQL + TimescaleDB, Redis, React + TypeScript,
Docker, GitHub Actions, Terraform, Prometheus + Grafana.

## Roadmap

- [D] Phase 0: Repo, Docker Compose, CI
- [ ] Phase 1: Data layer and historical API
- [ ] Phase 2: Dashboard frontend
- [ ] Phase 3: Real-time pipeline
- [ ] Phase 4: Analytics engine
- [ ] Phase 5: News, sentiment and AI agent
- [ ] Phase 6: Auth and alerts
- [ ] Phase 7: Production DevOps
- [ ] Phase 8: Polish and demo

## Running locally

