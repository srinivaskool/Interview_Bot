import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./ChatBubble.css";
import TypingEffect from "./TypingEffect";

const ChatBubble = ({
  message,
  sender,
  timeStamp,
  scrollToBottomMessage,
  utteranceVoice,
  user,
}) => {
  const alignClass = sender === "user1" ? "left" : "right";
  const [speaking, setSpeaking] = useState(false);

  const synth = window.speechSynthesis;
  let currentUtterance = null;

  const handelScrollToBottomMessage = () => {
    scrollToBottomMessage();
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
    utterance.voice = utteranceVoice;
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
        <div className="tyn-qa-avatar">
          <div className="tyn-media tyn-size-md">
            <img
              src={
                sender != "user1"
                  ? user.profilepic
                  : "https://connectme-html.themeyn.com/images/avatar/bot-1.jpg"
              }
              alt=""
            />
          </div>
        </div>
        <span className="message-text">
          {sender === "user1" && timeStamp ? (
            <TypingEffect
              textToType={message}
              scrollOnType={handelScrollToBottomMessage}
            />
          ) : sender != "user1" && message.startsWith("//code") ? (
            <>
              <h6 className="tyn-code-block-title tyn-overline mb-0">Your code</h6>
              <pre className="chat-bubble-code-area">
                <code className="chat-bubble-code">
                  {message.replace(/^\/\/code/, "")}
                </code>
              </pre>
            </>
          ) : (
            message
          )}
        </span>
        {timeStamp && (
          <span className="timestamp">{getCurrentTime(timeStamp)}</span>
        )}
      </span>
      {sender === "user1" && timeStamp && (
        <span className="icon-container speak-icon">
          {!speaking ? (
            <FontAwesomeIcon
              onClick={handleSpeakerClick}
              icon="fa-solid fa-volume-high"
            />
          ) : (
            <FontAwesomeIcon
              onClick={handleStopClick}
              icon="fa-solid fa-circle-stop"
            />
          )}
        </span>
      )}
    </div>
  );
};

export default ChatBubble;
