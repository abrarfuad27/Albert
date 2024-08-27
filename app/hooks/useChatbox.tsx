import { useState, useEffect } from "react";
import { auth, db } from "../config/firebaseConfig"; // Assuming firebaseConfig has both auth and db (Firestore) exports
import { addDoc, collection } from "firebase/firestore";
import { User } from "firebase/auth";

export const useChatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const storeMessageInFirestore = async (message: string) => {
    if (user) {
      try {
        await addDoc(collection(db, "messages"), {
          uid: user.uid,
          message,
          timestamp: new Date(),
        });
      } catch (error) {
        console.error("Error storing message in Firestore:", error);
      }
    }
  };

  const sendMessage = async (message: string) => {
    const userMessage = `You: ${message}`;
    setMessages((prev) => [...prev, userMessage]);

    // Store the user's message in Firestore
    await storeMessageInFirestore(userMessage);

    const conversationHistory = messages.concat(userMessage).join("\n");

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
          const parsedChunk = chunk.split("\n").filter(Boolean);

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

                // Store the assistant's message in Firestore
              }
            } catch (e) {
              console.error("Error parsing JSON chunk:", e);
            }
          });
        }
        await storeMessageInFirestore(`Assistant: ${assistantResponse}`);
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
