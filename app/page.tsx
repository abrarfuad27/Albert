import Chatbot from "./components/Chatbot";

export default function Home() {
  return (
    <div className="flex justify-between items-center h-screen bg-gray-50">
      <div className="w-1/3 p-4 bg-white shadow-md rounded-lg">
        {/* Chat history section */}
        <div className="chat-history">
          Chat History
        </div>
      </div>
      <div className="w-2/3 p-4">
        <Chatbot />
      </div>
    </div>
  );
}
