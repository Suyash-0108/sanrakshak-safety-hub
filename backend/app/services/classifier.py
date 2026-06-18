def classify_risk(text: str):

    text = text.lower()

    # Critical Emergencies
    if any(word in text for word in [
        "kill",
        "suicide",
        "gun",
        "knife",
        "attack",
        "bleeding",
        "murder",
        "kidnap"
    ]):
        return {
            "risk_level": "CRITICAL",
            "risk_score": 100,
            "category": "EMERGENCY",
            "notify_guardian": True,
            "share_location": True,
            "call_police": True
        }

    # Threat / Stalking
    elif any(word in text for word in [
        "following me",
        "stalking",
        "harassing",
        "unsafe",
        "someone behind me",
        "being followed"
    ]):
        return {
            "risk_level": "HIGH",
            "risk_score": 85,
            "category": "THREAT",
            "notify_guardian": True,
            "share_location": True,
            "call_police": False
        }

    # Mental Health
    elif any(word in text for word in [
        "anxious",
        "panic",
        "stress",
        "depressed",
        "hopeless",
        "overwhelmed"
    ]):
        return {
            "risk_level": "MEDIUM",
            "risk_score": 50,
            "category": "MENTAL_HEALTH",
            "notify_guardian": False,
            "share_location": False,
            "call_police": False
        }

    # Default
    return {
        "risk_level": "LOW",
        "risk_score": 20,
        "category": "GENERAL",
        "notify_guardian": False,
        "share_location": False,
        "call_police": False
    }