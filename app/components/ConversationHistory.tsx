"use client";

import { User } from "firebase/auth";

interface ConversationHistoryProps {
  user: User | null;
}

export default function ConversationHistory({
  user,
}: ConversationHistoryProps) {
  return (
    <div className="w-1/3 p-4 bg-white shadow-md rounded-lg">
      {/* Chat history section */}
      <div className="chat-history">
        {user
          ? `Welcome, ${user.displayName || user.email}!`
          : "Sign in to access chat history"}
      </div>
    </div>
  );
}
