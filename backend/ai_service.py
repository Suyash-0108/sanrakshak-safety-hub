import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "sanrakshak-ai-v2"


def generate_reply(message):
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL,
            "prompt": message,
            "stream": False,
            "options": {
                "temperature": 0.7
            }
        }
    )

    return response.json()["response"]


def analyze_message(message):
    prompt = f"""
You are a threat assessment system.

Analyze the following user message.

Message:
"{message}"

Classify the message into ONE of these intents:

- safety
- mental_health
- general

Risk Score Rules:

0-20:
Normal conversation

20-50:
Mild emotional distress or concern

50-80:
Significant emotional distress or safety concern

80-100:
Serious danger, crisis, emergency, self-harm risk, stalking, assault, fire, accident, violence

Return ONLY valid JSON.

Example:

{{
    "intent": "safety",
    "risk_score": 85
}}
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0
            }
        }
    )

    raw_response = response.json()["response"]

    print("\n=== ANALYSIS RESPONSE ===")
    print(raw_response)
    print("=========================\n")

    try:
        return json.loads(raw_response)
    except:
        return {
            "intent": "general",
            "risk_score": 0
        }