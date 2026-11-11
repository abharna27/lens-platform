from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from app.core.db import Base


class MarketBar(Base):
    __tablename__ = "market_bars"

    id = Column(Integer, primary_key=True)
    entity_id = Column(Integer, ForeignKey("entities.id"), nullable=False, index=True)
    ts = Column(DateTime(timezone=True), primary_key=True, nullable=False, index=True)
    open = Column(Float, nullable=False)
    high = Column(Float, nullable=False)
    low = Column(Float, nullable=False)
    close = Column(Float, nullable=False)
    volume = Column(Float, nullable=False)