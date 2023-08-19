import React from "react";
import "./ChatBubble.css";

const ChatBubble = ({ message, sender, timestamp }) => {
  const alignClass = sender === "user1" ? "left" : "right";

  return (
    <div className={`chat-bubble ${alignClass}`}>
      <span className="message-text">{message}</span>
      <span className="timestamp">{timestamp}</span>
    </div>
  );
};

export default ChatBubble;
