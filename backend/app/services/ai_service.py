import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def get_ai_response(user_message):

    prompt = f"""
You are Sanrakshak AI.

Your job:
- Help users stay safe.
- Detect danger.
- Give concise advice.
- Never encourage risky behavior.

User:
{user_message}
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "llama3",
            "prompt": prompt,
            "stream": False
        }
    )

    return response.json()["response"]