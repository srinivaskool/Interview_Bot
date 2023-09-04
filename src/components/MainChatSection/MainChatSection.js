import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import SpeechRecognition from "react-speech-recognition";
import ChatBubble from "../ChatBubble";
import SpeechSynthesisComp from "../SpeechSynthesisComp";


export default function MainChatSection({
  scrollToBottomMessage,
  utteranceVoiceChange,
  chatSectionRef,
  conversation,
  timeStamps,
  utteranceVoice,
  user,
  jumpToBottomButtonRef,
  handleJumpToBottomClick,
  handleInputSubmit,
  loading,
  humanVoiceLThree,
  handleInputChange,
  listening,
  setHumanVoiceLTwo,
  humanVoiceLTwo,
  humanVoiceLOne,
}) {
  return (
    <div className=" tyn-main tyn-main-boxed tyn-main-boxed-lg">
      <div className="tyn-chat-body">
        <div className="subheadings">
          <p className="my-2" onClick={scrollToBottomMessage}>
            Bot{" "}
            <SpeechSynthesisComp utteranceVoiceChange={utteranceVoiceChange} />
          </p>
          <p className="m-2">You</p>
        </div>
        <div className="chat-bubbles-section" ref={chatSectionRef}>
          {conversation
            .filter((item) => item.role != "system")
            .map((message, index) => (
              <ChatBubble
                key={index}
                message={message.content}
                sender={message.role === "assistant" ? "user1" : "user2"}
                timeStamp={timeStamps[index + 1]}
                scrollToBottomMessage={scrollToBottomMessage}
                utteranceVoice={utteranceVoice}
                user={user}
              />
            ))}
          <div
            className="jump-to-bottom-button"
            ref={jumpToBottomButtonRef}
            onClick={handleJumpToBottomClick}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-circle-down"
              style={{ color: "#ffffff", marginRight: "5px" }}
            />
            Jump to bottom
          </div>
        </div>
      </div>
      <div className=" tyn-chat-form">
        <form onSubmit={handleInputSubmit} style={{ width: "100%" }}>
          <div className="tyn-chat-form-enter">
            <textarea
              type="text"
              placeholder="Type a message"
              className="tyn-chat-form-input"
              autoFocus
              rows={1}
              disabled={loading}
              value={humanVoiceLThree}
              onChange={handleInputChange}
            />
            <div
              className={`microphone-icon input-bar-icon ${
                loading && "disabledIcon"
              }`}
              style={{
                backgroundColor: `${listening ? "rgb(191, 219, 254)" : "#fff"}`,
              }}
              onClick={() => {
                if (!loading) {
                  setHumanVoiceLTwo(humanVoiceLTwo + humanVoiceLOne);
                  SpeechRecognition.startListening();
                }
              }}
            >
              {listening ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-microphone-lines"
                  flip
                  className={`${loading && "disabledIcon"}`}
                  style={{
                    color: "#2563eb",
                    transform: "scale(2.5)",
                  }}
                  onClick={() => {
                    if (!loading) {
                      SpeechRecognition.stopListening;
                    }
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  className={`${loading && "disabledIcon"}`}
                  icon="microphone"
                />
              )}
            </div>
            <div
              className={`send-icon input-bar-icon ${
                loading && "disabledIcon"
              }`}
              onClick={handleInputSubmit}
            >
              <FontAwesomeIcon
                className={`${loading && "disabledIcon"}`}
                icon="fa-solid fa-paper-plane"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
