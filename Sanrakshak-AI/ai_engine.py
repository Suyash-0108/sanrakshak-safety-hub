from google import genai
from dotenv import load_dotenv
from prompts import SYSTEM_PROMPT
import os
import json

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def analyze_distress(message):

    prompt = f"""
    {SYSTEM_PROMPT}

    Analyze this distress message:

    {message}

    Return ONLY valid JSON in this format:

    {{
      "threat_level": "",
      "category": "",
      "confidence_score": 0,
      "actions": []
    }}
    """

    try:

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        content = response.text.strip()

        content = content.replace("```json", "")
        content = content.replace("```", "")
        content = content.strip()

        return json.loads(content)

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }