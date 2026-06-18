from fastapi import APIRouter
from pydantic import BaseModel

from app.services.safety_engine import analyze_message

router = APIRouter()

from typing import List, Dict

class AIRequest(BaseModel):
    message: str
    history: List[Dict] = []

@router.post("/analyze")

def analyze(req: AIRequest):
    return analyze_message(
    req.message,
    req.history
)