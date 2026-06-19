from app.services.classifier import classify_risk
from app.services.ai_service import get_ai_response
from app.services.decision_engine import determine_actions


def analyze_message(text, history):

    classification = classify_risk(text)

    actions = determine_actions(
        classification["risk_score"]
    )

    ai_response = get_ai_response(
        text,
        history
    )

    return {
        "message": ai_response,
        **classification,
        **actions
    }