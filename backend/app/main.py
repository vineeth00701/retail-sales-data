from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import data, models, analysis

app = FastAPI(title="Retail Sales Analysis API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(data.router, prefix="/api/data", tags=["Data"])
app.include_router(models.router, prefix="/api/models", tags=["Models"])
app.include_router(analysis.router, prefix="/api/analysis", tags=["Analysis"])

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
