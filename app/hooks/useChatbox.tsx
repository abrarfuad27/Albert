import { useState } from "react";

export const useChatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, `You: ${message}`]);

    const conversationHistory = messages.concat(`You: ${message}`).join("\n");

    const prompt = `You are a helpful math proof assistant. Continue the following conversation:\n\n${conversationHistory}\nAssistant:`;

    try {
      const response = await fetch("https://api.cohere.ai/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command",
          prompt: prompt,
          max_tokens: 100,
          temperature: 0.7,
          stream: true,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      let assistantResponse = "";
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          // Parse each chunk as JSON
          const parsedChunk = chunk.split("\n").filter(Boolean); // Filter out any empty lines

          parsedChunk.forEach((chunk) => {
            try {
              const json = JSON.parse(chunk);
              if (json.text) {
                assistantResponse += json.text;

                setMessages((prev) => {
                  const newMessages = [...prev];
                  if (
                    newMessages[newMessages.length - 1].startsWith("Assistant:")
                  ) {
                    newMessages[
                      newMessages.length - 1
                    ] = `Assistant: ${assistantResponse}`;
                  } else {
                    newMessages.push(`Assistant: ${assistantResponse}`);
                  }
                  return newMessages;
                });
              }
            } catch (e) {
              console.error("Error parsing JSON chunk:", e);
            }
          });
        }
      }

      console.log("Streaming complete");
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
