import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./ChatBubble.css";
import TypingEffect from "./TypingEffect";

const ChatBubble = ({ message, sender, timeStamp, scrollToBottomMessage, utteranceVoice }) => {
  const alignClass = sender === "user1" ? "left" : "right";
  const [speaking, setSpeaking] = useState(false);

  const synth = window.speechSynthesis;
  let currentUtterance = null;

  const handelScrollToBottomMessage = () => {
    scrollToBottomMessage()
  };

  function getCurrentTime(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function handleStopClick() {
    setSpeaking(false);
    synth.cancel();
  }

  function handleSpeakerClick() {
    if (currentUtterance && synth.speaking) {
      synth.cancel();
    }
    setSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.voice = utteranceVoice
    currentUtterance = utterance;

    utterance.onend = () => {
      currentUtterance = null;
      setSpeaking(false);
    };
    utterance.oncancel = () => {
      setSpeaking(false);
      currentUtterance = null;
    };

    synth.speak(utterance);
  }

  return (
    <div className={`chat-bubble-container ${alignClass}`}>
      {/* {sender === "user2" && (
        <span
          className="icon-container"
          // onClick={handleJumpToBottomClick}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-volume-high"
            style={{ marginRight: "15px", transform: "rotateZ(180deg)" }}
          />
        </span>
      )} */}
      <span className={`chat-bubble`}>
        <span className="message-text">
        {sender === "user1" && timeStamp ?  <TypingEffect textToType={message} scrollOnType={handelScrollToBottomMessage}/> : message}
        </span>
        {timeStamp && (
          <span className="timestamp">{getCurrentTime(timeStamp)}</span>
        )}
      </span>
      {sender === "user1" && timeStamp && (
        <span className="icon-container">
          {!speaking ? (
            <FontAwesomeIcon
              onClick={handleSpeakerClick}
              icon="fa-solid fa-volume-high"
              style={{ marginLeft: "15px", color: "#535333" }}
            />
          ) : (
            <FontAwesomeIcon
              onClick={handleStopClick}
              icon="fa-solid fa-circle-stop"
              style={{ marginLeft: "15px", color: "#000" }}
            />
          )}
        </span>
      )}
    </div>
  );
};

export default ChatBubble;
