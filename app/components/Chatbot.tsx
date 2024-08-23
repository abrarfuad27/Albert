"use client"
import React, { useState } from "react";
import { useChatbot } from "../hooks/useChatbox";

const Chatbot = () => {
  const { messages, sendMessage } = useChatbot();
  const [input, setInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="p-4">
      <div className="border p-4 rounded h-64 overflow-y-auto bg-gray-100 text-black">
        {messages.map((msg: string, idx: number) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded text-black"
          placeholder="Ask Albert a question"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
