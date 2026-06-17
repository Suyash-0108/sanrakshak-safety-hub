from fastapi import APIRouter
from pydantic import BaseModel

from app.services.safety_engine import analyze_message

router = APIRouter()

class AIRequest(BaseModel):
    message: str

@router.post("/analyze")

def analyze(req: AIRequest):
    return analyze_message(req.message)