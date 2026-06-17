from fastapi import FastAPI
from app.api.ai import router as ai_router

app = FastAPI(
    title="Sanrakshak AI API"
)

app.include_router(
    ai_router,
    prefix="/ai",
    tags=["AI"]
)