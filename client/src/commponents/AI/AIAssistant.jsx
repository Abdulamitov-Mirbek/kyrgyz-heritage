import React, { useState } from "react";
import { MessageCircle, Send, X, Loader2 } from "lucide-react";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();

    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      // 🔥 THIS IS THE FIX - Call YOUR backend, not Groq directly
      const response = await fetch("http://localhost:5000/api/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
          language: "ru",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.answer,
          },
        ]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Извините, произошла ошибка. Пожалуйста, попробуйте позже.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            color: "white",
            padding: "15px 20px",
            borderRadius: "50px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(245, 158, 11, 0.4)",
          }}
        >
          💬 AI Ассистент
        </button>
      )}

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
            width: "380px",
            height: "550px",
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "18px 20px",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "24px" }}>🏛️</span>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Аманат AI
                </div>
                <div style={{ fontSize: "12px", opacity: 0.9 }}>
                  Эксперт по сакральным местам
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "5px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Suggested Questions */}
          {messages.length === 0 && (
            <div style={{ padding: "15px", borderBottom: "1px solid #f0f0f0" }}>
              <p
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginBottom: "10px",
                }}
              >
                Популярные вопросы:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[
                  "Что такое Манас Ордо?",
                  "Расскажи о Сулайман-Тоо",
                  'Что означает "Аманат"?',
                  "Какие святые источники есть?",
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(q)}
                    style={{
                      background: "#f3f4f6",
                      border: "1px solid #e5e7eb",
                      padding: "8px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      cursor: "pointer",
                      color: "#374151",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              background: "#fafafa",
            }}
          >
            {messages.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#999",
                  marginTop: "40px",
                }}
              >
                <span
                  style={{
                    fontSize: "48px",
                    display: "block",
                    marginBottom: "15px",
                  }}
                >
                  💬
                </span>
                <p style={{ fontSize: "14px" }}>
                  Задайте вопрос о сакральных местах Кыргызстана
                </p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent:
                      msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {msg.role === "assistant" && (
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #f59e0b, #d97706)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        marginRight: "10px",
                        fontSize: "16px",
                      }}
                    >
                      🏛️
                    </div>
                  )}
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "18px",
                      background:
                        msg.role === "user"
                          ? "linear-gradient(135deg, #f59e0b, #d97706)"
                          : "white",
                      color: msg.role === "user" ? "white" : "#1f2937",
                      maxWidth: "75%",
                      boxShadow:
                        msg.role === "assistant"
                          ? "0 2px 5px rgba(0,0,0,0.05)"
                          : "none",
                      fontSize: "14px",
                      lineHeight: "1.5",
                      wordWrap: "break-word",
                    }}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "10px",
                        fontSize: "16px",
                      }}
                    >
                      👤
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  🏛️
                </div>
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "18px",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Loader2
                    size={16}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                  <span style={{ fontSize: "14px", color: "#666" }}>
                    Думаю...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "15px 20px",
              background: "white",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              gap: "10px",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Задайте вопрос..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "12px 18px",
                border: "2px solid #e5e7eb",
                borderRadius: "30px",
                outline: "none",
                fontSize: "14px",
                transition: "border-color 0.2s",
                background: isLoading ? "#f9fafb" : "white",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#f59e0b")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: isLoading || !input.trim() ? 0.5 : 1,
                transition: "transform 0.2s",
              }}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default AIAssistant;
