from fastapi import FastAPI
from models import ChatRequest
from ai_service import generate_reply, analyze_message

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Sanrakshak AI Backend Running"}


@app.post("/chat")
def chat(data: ChatRequest):

    analysis = analyze_message(data.message)

    reply = generate_reply(data.message)

    return {
        "reply": reply,
        "intent": analysis["intent"],
        "risk_score": analysis["risk_score"]
    }