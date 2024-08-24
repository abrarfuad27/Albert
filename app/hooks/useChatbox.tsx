import { useState } from "react";
import axios from "axios";

export const useChatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, `You: ${message}`]);

    // Prepare the prompt for Cohere
    const prompt = `You are a helpful math proof assistant. Answer the following question:\n\nQuestion: ${message}`;

    try {
      // Call Cohere API to get the response
      const response = await axios.post(
        "https://api.cohere.ai/generate",
        {
          model: "command", // Choose the model size based on your need
          prompt: prompt,
          max_tokens: 100, // Adjust the number of tokens as needed
          temperature: 0.7, // Adjust the temperature for more or less creativity
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_COHERE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      const assistantResponse = response.data.text.trim();

      // Update the messages state with the assistant's response
      setMessages((prev) => [...prev, `Assistant: ${assistantResponse}`]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        "Assistant: Sorry, something went wrong.",
      ]);
    }
  };

  return { messages, sendMessage };
};
