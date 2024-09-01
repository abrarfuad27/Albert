"use client";
import Chatbot from "./components/Chatbot";
import ConversationHistory from "./components/ConversationHistory";
import { auth } from "./config/firebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  return (
    <div className="flex justify-between items-center h-screen bg-gray-50">
      <ConversationHistory user={user} />
      <div className="w-2/3 p-4">
        <Chatbot />
      </div>
    </div>
  );
}
