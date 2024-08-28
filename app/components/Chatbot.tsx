"use client";
import React, { useState } from "react";
import { useChatbot } from "../hooks/useChatbox";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import { BlockMath, InlineMath } from "react-katex"; // Import components for rendering LaTeX

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

  const renderMessage = (msg: string) => {
    const inlineLatexRegex = /\$(.*?)\$/g;
    const blockLatexRegex = /\$\$(.*?)\$\$/g;

    return msg.split("\n").map((line, index) => (
      <p key={index}>
        {line.split(inlineLatexRegex).map((segment, i) => {
          if (i % 2 === 1) {
            return <InlineMath key={i}>{segment}</InlineMath>;
          }
          return segment;
        })}
      </p>
    ));
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {messages.map((msg: string, idx: number) => {
          const isUser = msg.startsWith("You:");
          const formattedMessage = msg.replace(/^Assistant:\s*/, "");

          return (
            <div
              key={idx}
              className={`message ${isUser ? "user-message" : "bot-message"}`}
            >
              {renderMessage(formattedMessage)}
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
          placeholder="Ask a math question"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
