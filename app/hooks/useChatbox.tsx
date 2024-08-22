import { useState } from "react";
import { OpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";

export const useChatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, `You: ${message}`]);

    const llm = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7,
    });

    const template = new PromptTemplate({
      template: `You are a helpful math proof assistant. Answer the following question:\n\nQuestion: {input}`,
      inputVariables: ["input"],
    });

    const chain = new ConversationChain({
      llm,
      promptTemplate: template,
    });

    const response = await chain.run({ input: message });
    setMessages((prev) => [...prev, `Assistant: ${response}`]);
  };

  return { messages, sendMessage };
};
