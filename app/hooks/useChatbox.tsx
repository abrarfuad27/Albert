import { useState } from "react";
import { OpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";

export const useChatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, `You: ${message}`]);

    const llm = new OpenAI({
      model: "gpt-4o-2024-05-13",
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      temperature: 0.7,
    });

    const template = new PromptTemplate({
      template: `You are a helpful math proof assistant. Answer the following question:\n\nQuestion: {input}`,
      inputVariables: ["input"],
    });

    const chain = new ConversationChain({
      llm,
      prompt: template,
    });

    const response = await chain.invoke({ input: message });
    setMessages((prev) => [...prev, `Assistant: ${response}`]);
  };

  return { messages, sendMessage };
};
