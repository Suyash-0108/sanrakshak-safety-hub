from app.services.classifier import classify_risk
from app.services.ai_service import get_ai_response

def analyze_message(text):

    classification = classify_risk(text)

    ai_response = get_ai_response(text)

    return {
        "message": ai_response,
        "risk_level": classification["risk_level"],
        "category": classification["category"]
    }