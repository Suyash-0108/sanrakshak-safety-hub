def classify_risk(text: str):

    text = text.lower()

    if any(word in text for word in [
        "kill",
        "suicide",
        "gun",
        "knife",
        "attack",
        "bleeding"
    ]):
        return {
            "risk_level": "CRITICAL",
            "category": "EMERGENCY"
        }

    elif any(word in text for word in [
        "following me",
        "stalking",
        "harassing",
        "unsafe"
    ]):
        return {
            "risk_level": "HIGH",
            "category": "THREAT"
        }

    elif any(word in text for word in [
        "anxious",
        "panic",
        "stress",
        "depressed"
    ]):
        return {
            "risk_level": "MEDIUM",
            "category": "MENTAL_HEALTH"
        }

    return {
       {
    "risk_level": "HIGH",
    "risk_score": 85,
    "category": "STALKING",
    "notify_guardian": True,
    "share_location": True,
    "call_police": False
}
    }