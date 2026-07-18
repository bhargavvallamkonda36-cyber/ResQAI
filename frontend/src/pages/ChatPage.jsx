import { useState } from "react";

function ChatPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const getReply = () => {
    const msg = message.toLowerCase();

    if (msg.includes("earthquake")) {
      setReply(
        "✅ Stay calm. Drop, Cover and Hold. Stay away from windows. Move to an open area after shaking stops."
      );
    } else if (msg.includes("flood")) {
      setReply(
        "🌊 Move to higher ground immediately. Avoid walking or driving through flood water."
      );
    } else if (msg.includes("fire")) {
      setReply(
        "🔥 Leave the building immediately. Use stairs instead of elevators. Call the fire department."
      );
    } else if (msg.includes("cyclone")) {
      setReply(
        "🌀 Stay indoors. Keep emergency supplies ready and follow government evacuation orders."
      );
    } else if (msg.includes("tsunami")) {
      setReply(
        "🌊 Move to higher ground immediately and stay away from the coastline."
      );
    } else {
      setReply(
        "🤖 Please contact local emergency services (112 in India) if this is an emergency."
      );
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        🤖 AI Emergency Assistant
      </h1>

      <textarea
        rows="5"
        className="w-full border rounded-lg p-4"
        placeholder="Ask something like:
What should I do during an earthquake?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={getReply}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
      >
        Ask AI
      </button>

      {reply && (
        <div className="mt-6 bg-gray-100 rounded-lg p-5">
          <h2 className="font-bold text-xl mb-2">Response</h2>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}

export default ChatPage;