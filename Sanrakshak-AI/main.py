from fastapi import FastAPI
from pydantic import BaseModel
from ai_engine import analyze_distress

app = FastAPI()

class DistressRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {
        "message": "Sanrakshak AI Running"
    }

@app.post("/analyze")
def analyze(request: DistressRequest):

    result = analyze_distress(request.message)

    return result