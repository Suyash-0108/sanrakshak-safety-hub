import { useState } from "react";
import { analyzeMessage } from "@/lib/ai";

const quickPrompts = [
  "Someone is following me",
  "I feel unsafe",
  "Medical emergency",
  "Panic attack",
  "Domestic violence",
];

export default function AIAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const speak = (text: string) => {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);
  };
  const handleSend = async (message?: string) => {
    const text = message || input;

    if (!text.trim()) return;

    setLoading(true);

    try {
      const result = await analyzeMessage(text, messages);

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: text,
        },
        {
          role: "assistant",
          content: result.message,
          risk_level: result.risk_level,
          risk_score: result.risk_score,
          category: result.category,
          notify_guardian: result.notify_guardian,
          share_location: result.share_location,
          call_police: result.call_police,
        },
      ]);
      speak(result.message);
      setInput("");
    } catch (error) {
      console.error(error);
      alert("Failed to contact AI");
    }

    setLoading(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "CRITICAL":
        return "bg-red-600";
      case "HIGH":
        return "bg-orange-500";
      case "MEDIUM":
        return "bg-yellow-500 text-black";
      default:
        return "bg-green-600";
    }
  };
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.start();

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;

      setInput(transcript);

      setIsListening(false);

      await handleSend(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">🤖 Sanrakshak AI Commander</h1>

          <p className="text-slate-400 mt-2">
            Safety Guidance • Risk Analysis • Emergency Support
          </p>
        </div>

        {/* Quick Prompts */}
        <div className="flex flex-wrap gap-3 mb-6">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Area */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6 min-h-[500px] max-h-[600px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500">
              Start a conversation with AI Commander
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === "user"
                      ? "ml-auto bg-blue-600"
                      : "bg-slate-800 border border-slate-700"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {msg.role === "assistant" && (
                    <>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-semibold ${getRiskColor(
                            msg.risk_level,
                          )}`}
                        >
                          {msg.risk_level}
                        </span>

                        <span className="px-3 py-1 text-xs rounded-full bg-slate-700">
                          {msg.category}
                        </span>

                        <span className="px-3 py-1 text-xs rounded-full bg-slate-700">
                          Risk Score: {msg.risk_score}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {msg.notify_guardian && (
                          <button className="px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-sm">
                            Notify Guardian
                          </button>
                        )}

                        {msg.share_location && (
                          <button className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm">
                            Share Location
                          </button>
                        )}

                        {msg.trigger_sos && (
                          <button className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm">
                            🚨 Trigger SOS
                          </button>
                        )}

                        {msg.call_police && (
                          <button className="px-3 py-2 rounded-lg bg-red-800 hover:bg-red-900 text-sm">
                            Call Emergency Services
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex gap-3 mb-4">
            <button
              onClick={startListening}
              className={`px-4 py-3 rounded-xl font-semibold ${
                isListening ? "bg-red-600" : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              {isListening ? "🎙 Listening..." : "🎤 Voice Input"}
            </button>
          </div>
          <textarea
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your situation..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                handleSend();
              }
            }}
          />

          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-slate-500">
              Press Ctrl + Enter to send
            </span>

            <button
              onClick={() => handleSend()}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 font-semibold disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Situation"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
