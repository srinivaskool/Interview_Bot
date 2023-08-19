import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatBubble from "./components/ChatBubble";
import "./App.css";

const user1Messages = [
  { message: "Hey, how's it going?", timestamp: "09:00 AM", user: "A" },
  { message: "Did you watch that movie?", timestamp: "09:05 AM", user: "A" },
  {
    message: "I'm thinking of ordering some food.",
    timestamp: "09:10 AM",
    user: "A"
  },
  { message: "Did you watch that movie?", timestamp: "09:15 AM", user: "A" },
  {
    message: "I'm thinking of ordering some food.",
    timestamp: "09:20 AM",
    user: "A"
  },
  { message: "Did you watch that movie?", timestamp: "09:25 AM", user: "A" },
  {
    message: "I'm thinking of ordering some food.",
    timestamp: "09:30 AM",
    user: "A"
  }
];

const user2Messages = [
  { message: "Hi there!", timestamp: "09:32 AM", user: "B" },
  {
    message: "Yes, I watched it. It was amazing!",
    timestamp: "09:37 AM",
    user: "B"
  },
  { message: "Hi there!", timestamp: "09:42 AM", user: "B" },
  {
    message: "Yes, I watched it. It was amazing!",
    timestamp: "09:47 AM",
    user: "B"
  },
  { message: "Hi there!", timestamp: "09:07 AM", user: "B" },
  {
    message: "Yes, I watched it. It was amazing!",
    timestamp: "10:07 AM",
    user: "B"
  },
  { message: "Sure, what are you craving?", timestamp: "10:12 AM", user: "B" }
];

const App = () => {
  const [code, setCode] = useState("");
  const [inputMessage, setInputMessage] = useState(""); // Track user input
  const [messages, setMessages] = useState([
    ...user1Messages,
    ...user2Messages
  ]);
  const chatSectionRef = useRef(null); // Ref to the chat section
  const jumpToBottomButtonRef = useRef(null); // Ref to the "Jump to bottom" button

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    alert("Please allow microphone access");
  }

  useEffect(() => {
    chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    setInputMessage(transcript);
  }, [transcript]);

  useEffect(() => {
    // Display the "Jump to bottom" button if scrolled up
    const handleScroll = () => {
      if (
        chatSectionRef.current.scrollTop <
        chatSectionRef.current.scrollHeight -
          chatSectionRef.current.clientHeight -
          150
      ) {
        jumpToBottomButtonRef.current.classList.add("show");
      } else {
        jumpToBottomButtonRef.current.classList.remove("show");
      }
    };

    chatSectionRef.current.addEventListener("scroll", handleScroll);

    return () => {
      chatSectionRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleJumpToBottomClick() {
    chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
  }

  function handleInputChange(event) {
    setInputMessage(event.target.value);
  }

  function handleInputSubmit(event) {
    event.preventDefault();
    console.log("ayyyy");

    if (inputMessage.trim() !== "") {
      setMessages([
        ...messages,
        { message: inputMessage, timestamp: getCurrentTime(), user: "B" }
      ]);
      setInputMessage("");
    }
  }

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  library.add(fas);
  function handleEditorChange(value, event) {
    setCode(value);
  }

  return (
    <div className="app">
      <h1 style={{ marginLeft: "20px" }}>Interview Bot</h1>
      <div className="chat-container">
        <div className="chat-section">
          <div className="subheadings">
            <p>Bot</p>
            <p>You</p>
          </div>
          <div className="chat-bubbles-section" ref={chatSectionRef}>
            {messages
              .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
              .map((message, index) => (
                <ChatBubble
                  key={index}
                  message={message.message}
                  sender={message.user === "A" ? "user1" : "user2"}
                  timestamp={message.timestamp}
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
          <div className="input-area">
            <form onSubmit={handleInputSubmit}>
              <div className="input-container">
                <div className="microphone-icon">
                  {listening ? (
                    <FontAwesomeIcon
                      icon="fa-solid fa-microphone-lines"
                      flip
                      style={{ color: "#000000", transform: "scale(1.5)" }}
                      onClick={SpeechRecognition.stopListening}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon="microphone"
                      onClick={SpeechRecognition.startListening}
                    />
                  )}
                </div>
                <textarea
                  type="text"
                  placeholder="Type a message"
                  className="input-field"
                  autoFocus
                  value={inputMessage}
                  onChange={handleInputChange}
                />
                <div className="send-icon">
                  <FontAwesomeIcon
                    icon="fa-solid fa-angle-right"
                    onClick={handleInputSubmit}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="code-section">
          <Editor
            value={code}
            defaultLanguage="cpp"
            theme="vs-dark"
            defaultValue={code}
            onChange={handleEditorChange}
          />
          <div style={{ margin: "auto" }}>
            <center className="send-code-button">
              Submit code{" "}
              <FontAwesomeIcon
                icon="fa-solid fa-square-caret-right"
                style={{ marginLeft: "5px" }}
              />
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
