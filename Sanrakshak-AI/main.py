from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

class Incident(BaseModel):
    report: str

@app.post("/analyze")
def analyze(data: Incident):
    response = requests.post(
    "http://localhost:11434/api/generate",
    json={
        "model": "qwen3:4b",
        "prompt": f"""
You are Sanrakshak AI.

Analyze the following incident and respond ONLY in valid JSON.

Incident:
{data.report}

Output format:
{{
  "category": "",
  "severity": "",
  "summary": "",
  "actions": ["", "", ""]
}}

Rules:
- Summary must be under 20 words.
- Maximum 3 actions.
- No explanations.
- No markdown.
- No extra text.
""",
        "stream": False,
        "options": {
            "num_predict": 100
        }
    }
)