import sys
from pathlib import Path

# Ensure backend root is on sys.path
backend_dir = Path(__file__).resolve().parents[1]
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

import yfinance as yf

from app.core.db import SessionLocal
from app.core.models import Entity
from app.packs.markets.models import MarketBar

SYMBOLS = ["RELIANCE.NS", "TCS.NS", "INFY.NS"]


def get_or_create_entity(db, symbol: str, name: str) -> Entity:
    entity = db.query(Entity).filter(Entity.symbol == symbol).first()
    if entity:
        return entity
    entity = Entity(symbol=symbol, name=name)
    db.add(entity)
    db.commit()
    db.refresh(entity)
    return entity


def load_symbol(db, symbol: str):
    print(f"Fetching {symbol}...")
    ticker = yf.Ticker(symbol)
    df = ticker.history(period="2y", interval="1d")

    entity = get_or_create_entity(db, symbol, ticker.info.get("longName", symbol))

    inserted = 0
    for ts, row in df.iterrows():
        exists = (
            db.query(MarketBar)
            .filter(MarketBar.entity_id == entity.id, MarketBar.ts == ts)
            .first()
        )
        if exists:
            continue
        bar = MarketBar(
            entity_id=entity.id,
            ts=ts,
            open=float(row["Open"]),
            high=float(row["High"]),
            low=float(row["Low"]),
            close=float(row["Close"]),
            volume=float(row["Volume"]),
        )
        db.add(bar)
        inserted += 1

    db.commit()
    print(f"  Inserted {inserted} new bars for {symbol}")


if __name__ == "__main__":
    db = SessionLocal()
    try:
        for symbol in SYMBOLS:
            load_symbol(db, symbol)
    finally:
        db.close()
