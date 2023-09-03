import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Editor from "@monaco-editor/react";
import { getAuth } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ChatBubble from "../../components/ChatBubble";
import NavBar from "../../components/NavBar";
import SpeechSynthesisComp from "../../components/SpeechSynthesisComp";
import {
  getBasicInterviewPrompt,
  getCodeEvaluationPrompt,
  handleSendUserResponse,
} from "../../supportFunctions.js/InterviewBotFunctions";

import "./InterviewBot.css";

const InterviewBot = ({ isThisDSARoundPage }) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate, user]);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  // const [loadingTrackerInt, setLoadingTrackerInt] = useState(0);
  const [humanVoiceLOne, setHumanVoiceLOne] = useState("");
  const [humanVoiceLTwo, setHumanVoiceLTwo] = useState("");
  const [humanVoiceLThree, setHumanVoiceLThree] = useState("");
  const [utteranceVoice, setUtteranceVoice] = useState();
  const chatSectionRef = useRef(null); // Ref to the chat section
  const jumpToBottomButtonRef = useRef(null);
  const [hasUserGivenCode, setHasUserGivenCode] = useState(false);

  const [errorMesssage, setErrorMessage] = useState({
    role: "assistant",
    content: (
      <span style={{ textAligh: "center" }}>
        <FontAwesomeIcon
          icon="fa-solid fa-triangle-exclamation"
          style={{ margin: "0 10px" }}
          fade
        />
        Oops
        <FontAwesomeIcon
          icon="fa-solid fa-triangle-exclamation"
          style={{ margin: "0 10px" }}
          fade
        />
        <br />
        Somethings' wrong
      </span>
    ),
  });
  const [loadingMessage, setLoadingMessage] = useState({
    role: "assistant",
    content: (
      <>
        <FontAwesomeIcon icon="fa-solid fa-spinner" spin spinReverse />
        <FontAwesomeIcon
          icon="fa-solid fa-spinner"
          style={{ margin: "0 10px" }}
          spinPulse
        />
        <FontAwesomeIcon icon="fa-solid fa-spinner" spin spinReverse />
        <FontAwesomeIcon
          icon="fa-solid fa-spinner"
          style={{ margin: "0 10px" }}
          spinPulse
        />
        <FontAwesomeIcon icon="fa-solid fa-spinner" spin spinReverse />
      </>
    ),
  });
  const [conversation, setConversation] = useState([
    {
      role: "system",
      content: getBasicInterviewPrompt({
        role: "Junior Software Engineer position",
      }),
    },
    {
      role: "assistant",
      content: "Hey there!",
    },
  ]);
  const [codeEvaluateConversation, setCodeEvaluateConversation] = useState([
    {
      role: "system",
      content: getCodeEvaluationPrompt(),
    },
  ]);
  const [timeStamps, SetTimeStamps] = useState([new Date(), new Date()]);
  const [sentences, setSentences] = useState([]);
  const synth = window.speechSynthesis;

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    alert("Please allow microphone access");
  }

  useEffect(() => {
    scrollToBottomMessage();
  }, [conversation]);

  function scrollToBottomMessage() {
    chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
  }

  useEffect(() => {
    setHumanVoiceLOne(transcript);
    setHumanVoiceLThree(humanVoiceLTwo + " " + transcript);
  }, [transcript]);

  // useEffect(() => {
  //   console.log("dwaraka loadint changed in useeffect");
  //   if (loadingTrackerInt < 0) {
  //     console.log("dwaraka loadint changed in useeffect decrease");
  //     setLoading(true);
  //   } else {
  //     console.log("dwaraka loadint changed in useeffect increased");
  //     setLoading(false);
  //   }
  // }, [loadingTrackerInt]);

  useEffect(() => {
    // Display the "Jump to bottom" button if scrolled up
    const handleScroll = () => {
      if (
        chatSectionRef.current.scrollTop <
        chatSectionRef.current.scrollHeight -
          chatSectionRef.current.clientHeight -
          100
      ) {
        jumpToBottomButtonRef.current.classList.add("show");
      } else {
        jumpToBottomButtonRef.current.classList.remove("show");
      }
    };
    if (chatSectionRef.current) {
      chatSectionRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (chatSectionRef.current) {
        chatSectionRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  function handleJumpToBottomClick() {
    chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
  }

  function handleInputChange(event) {
    setHumanVoiceLThree(event.target.value);
    setHumanVoiceLOne("");
    setHumanVoiceLTwo(event.target.value);
  }

  const utteranceVoiceChange = (value) => {
    setUtteranceVoice(value);
  };

  async function handleInputSubmit(event) {
    event.preventDefault();
    SpeechRecognition.stopListening();
    if (humanVoiceLThree.trim() !== "") {
      const newUserMessage = {
        role: "user",
        content: humanVoiceLThree,
      };
      const newUserMessageTimeStamp = new Date();
      setConversation([...conversation, newUserMessage, loadingMessage]);
      SetTimeStamps([...timeStamps, newUserMessageTimeStamp]);
      const userReply = humanVoiceLThree;
      setHumanVoiceLThree("");
      setHumanVoiceLOne("");
      setHumanVoiceLTwo("");
      const totalString = await handleSendMessage(userReply);
      if (totalString.trim() !== "") {
      } else {
        setConversation([...conversation, newUserMessage, errorMesssage]);
      }
    }
  }

  library.add(fas);
  function handleEditorChange(value, event) {
    setCode(value);
  }

  const handleSendMessage = handleSendUserResponse(
    setLoading,
    setHasUserGivenCode,
    code,
    conversation,
    setSentences,
    utteranceVoice,
    synth,
    setConversation,
    SetTimeStamps,
    timeStamps,
    setCode,
    loading
  );

  const handleEvaluateCode = handleSendUserResponse(
    setLoading,
    setHasUserGivenCode,
    code,
    codeEvaluateConversation,
    setSentences,
    utteranceVoice,
    synth,
    setCodeEvaluateConversation,
    SetTimeStamps,
    timeStamps,
    setCode,
    loading
  );

  return (
    <div className="tyn-root">
      {/* {JSON.stringify(codeEvaluateConversation)} */}
      {loading && (
        <div className="loadingAnimationContainerDiv">
          <FontAwesomeIcon
            className="loadingAnimation"
            icon="fa-solid fa-spinner"
            spin
          />
        </div>
      )}
      <div className="tyn-content">
        <NavBar />
        {/* {JSON.stringify(loadingTrackerInt)} */}
        <div className="chat-container">
          <div className=" tyn-main tyn-main-boxed tyn-main-boxed-lg">
            <div className="tyn-chat-body">
              <div className="subheadings">
                <p className="my-2" onClick={scrollToBottomMessage}>
                  Bot{" "}
                  <SpeechSynthesisComp
                    utteranceVoiceChange={utteranceVoiceChange}
                  />
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
                      backgroundColor: `${
                        listening ? "rgb(191, 219, 254)" : "#fff"
                      }`,
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
          <div style={{display : isThisDSARoundPage ? "block" : "none"}}>
            <div className="code-section my-4">
              <Editor
                value={code}
                defaultLanguage="cpp"
                height={"496px"}
                theme="vs-dark"
                defaultValue={code}
                onChange={handleEditorChange}
              />
            </div>
            <div className=" tyn-chat-form mx-0">
              <div
                className={`send-code-button btn btn-sm m-auto ${
                  (code.trim() == "" || loading) && "disabled"
                }`}
                onClick={() => handleSendMessage("Code")}
              >
                Run code{" "}
                <FontAwesomeIcon
                  icon="fa-solid fa-play"
                  style={{ marginLeft: "5px", height: "20px", width: "20px" }}
                />
              </div>
              <div
                className={`send-code-button btn btn-sm m-auto ${
                  (code.trim() == "" || loading) && "disabled"
                }`}
                onClick={() => handleEvaluateCode("evaluateCode")}
              >
                Submit code{" "}
                <FontAwesomeIcon
                  icon="fa-solid fa-square-caret-right"
                  style={{ marginLeft: "5px", height: "20px", width: "20px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewBot;
