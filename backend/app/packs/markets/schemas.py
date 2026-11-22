from datetime import datetime

from pydantic import BaseModel, ConfigDict


class EntityOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    symbol: str
    name: str


class MarketBarOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    ts: datetime
    open: float
    high: float
    low: float
    close: float
    volume: float
