from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import asc
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.models import Entity
from app.packs.markets.models import MarketBar
from app.packs.markets.schemas import EntityOut, MarketBarOut

router = APIRouter(prefix="/api/v1", tags=["markets"])


@router.get("/entities", response_model=list[EntityOut])
def list_entities(db: Session = Depends(get_db)):
    return db.query(Entity).order_by(Entity.symbol).all()


@router.get("/entities/{symbol}/bars", response_model=list[MarketBarOut])
def get_bars(
    symbol: str,
    limit: int = Query(default=100, le=1000),
    db: Session = Depends(get_db),
):
    entity = db.query(Entity).filter(Entity.symbol == symbol).first()
    if not entity:
        raise HTTPException(status_code=404, detail=f"Unknown symbol: {symbol}")

    bars = (
        db.query(MarketBar)
        .filter(MarketBar.entity_id == entity.id)
        .order_by(asc(MarketBar.ts))
        .limit(limit)
        .all()
    )
    return bars
