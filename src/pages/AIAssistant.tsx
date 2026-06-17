import { useState } from "react";
import { analyzeMessage } from "@/lib/ai";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const result = await analyzeMessage(input);
      setResponse(result);
    } catch (error) {
      console.error(error);
      alert("Failed to contact AI");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Sanrakshak AI Assistant
      </h1>

      <textarea
        className="w-full border rounded p-3"
        rows={4}
        placeholder="Describe your situation..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="mt-3 px-4 py-2 bg-black text-white rounded"
      >
        {loading ? "Analyzing..." : "Send"}
      </button>

      {response && (
        <div className="mt-6 border rounded p-4">
          <h2 className="font-bold text-lg mb-2">
            AI Response
          </h2>

          <p>{response.message}</p>

          <div className="mt-4">
            <p>
              <strong>Risk Level:</strong>{" "}
              {response.risk_level}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {response.category}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}