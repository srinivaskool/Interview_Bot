import React from "react";
import "./ChatBubble.css";

const ChatBubble = ({ message, sender, timeStamp }) => {
  const alignClass = sender === "user1" ? "left" : "right";

  function getCurrentTime(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <div className={`chat-bubble ${alignClass}`}>
      <span className="message-text">{message}</span>
      {timeStamp && (
        <span className="timestamp">{getCurrentTime(timeStamp)}</span>
      )}
    </div>
  );
};

export default ChatBubble;
