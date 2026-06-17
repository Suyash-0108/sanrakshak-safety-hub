const API_URL = "http://127.0.0.1:8000";

export async function analyzeMessage(message: string) {
  const response = await fetch(`${API_URL}/ai/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze message");
  }

  return response.json();
}