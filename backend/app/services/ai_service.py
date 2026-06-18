import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def get_ai_response(
    user_message,
    history
):

    conversation = ""

    for msg in history[-10:]:

        role = msg.get(
            "role",
            "user"
        )

        content = msg.get(
            "content",
            ""
        )

        conversation += (
            f"{role}: {content}\n"
        )

    prompt = f"""
You are Sanrakshak AI Commander.

You help users stay safe.

Conversation history:

{conversation}

Current User Message:

{user_message}

Respond helpfully and briefly.
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