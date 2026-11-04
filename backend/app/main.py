from fastapi import FastAPI

app = FastAPI(title="Lens API")

@app.get("/health")
def health():
    return {"status": "ok"}