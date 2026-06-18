def determine_actions(risk_score):

    return {
        "notify_guardian": risk_score >= 70,
        "share_location": risk_score >= 80,
        "trigger_sos": risk_score >= 90,
        "call_police": risk_score >= 95
    }