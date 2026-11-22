import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Find .env in project root or current directory
env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=env_path)

DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://lens:change_me@localhost:5432/lens")
if "@db:" in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.replace("@db:", "@localhost:")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()