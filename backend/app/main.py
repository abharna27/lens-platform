from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.packs.markets.routes import router as markets_router

app = FastAPI(title="Lens API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(markets_router)


@app.get("/health")
def health():
    return {"status": "ok"}
