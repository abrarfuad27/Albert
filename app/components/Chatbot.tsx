"use client";
import React, { useState } from "react";
import { useChatbot } from "../hooks/useChatbox";

const Chatbot = () => {
  const { messages, sendMessage } = useChatbot();
  const [input, setInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setInput("");
      await sendMessage(input);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {messages.map((msg: string, idx: number) => {
          const isUser = msg.startsWith("You:");
          return (
            <div
              key={idx}
              className={`message ${isUser ? "user-message" : "bot-message"}`}
            >
              {msg}
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input text-black"
          placeholder="Ask Albert a question"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
