import pytest
from fastapi.testclient import TestClient

from app.core.db import SessionLocal
from app.core.models import Entity
from app.main import app

client = TestClient(app)


def test_list_entities_includes_seeded_symbol():
    db = SessionLocal()
    existing = db.query(Entity).filter(Entity.symbol == "TCS.NS").first()
    db.close()

    if not existing:
        pytest.skip("Run scripts/load_historical.py first to seed data")

    response = client.get("/api/v1/entities")
    assert response.status_code == 200
    symbols = [e["symbol"] for e in response.json()]
    assert "TCS.NS" in symbols


def test_unknown_symbol_returns_404():
    response = client.get("/api/v1/entities/FAKE_SYMBOL/bars")
    assert response.status_code == 404
