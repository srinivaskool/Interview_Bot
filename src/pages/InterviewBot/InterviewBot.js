import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Editor from "@monaco-editor/react";
import { getAuth } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ChatBubble from "../../components/ChatBubble";
import NavBar from "../../components/NavBar";
import SpeechSynthesisComp from "../../components/SpeechSynthesisComp";

import "./InterviewBot.css";

const InterviewBot = ({ history }) => {
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
  const [humanVoiceLOne, setHumanVoiceLOne] = useState("");
  const [humanVoiceLTwo, setHumanVoiceLTwo] = useState("");
  const [humanVoiceLThree, setHumanVoiceLThree] = useState("");
  const chatSectionRef = useRef(null); // Ref to the chat section
  const jumpToBottomButtonRef = useRef(null);

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
      content:
        "I want you to act as an interviewer. I will be the candidate and you will ask me coding interview questions for a Junior Software Engineer position. Provide constructive feedback on the candidates answers, offer suggestions for improvement, and discuss techniques for effective communication.Your personality type is friendLy and warm.Limit your responses to 3 sentences.Do not respond with Lists or ask multiple questions at once.End every response with a question to keep the conversation going.I want you to only reply as the interviewer.Do not write all the conversation at once.I want you to only do the interview with me.Ask me the questions and wait for my answers.Do not write explanations.Ask me the questions one by one like an interviewer does and wait for my answers.Ask me random questions from one of the following topics and ask follow- up questions: Data Structure, Algorithm, Operating System, System Design, Network and Security.please dont explain the amswer first say that the answer is wrong and explain the answer in maximum of 1 - 2 lines.While in -between questions dont give the entire answer give pointers like hints and let me guess the answer. You are a job interview partner, assisting someone in preparing for their upcoming job interview. Your task is to simulate a realistic job interview experience. Please validate all my answers and tell its either correct or partially correct or wrong, ls be a little hard on my answers. At a point pls ask only one question. The important thing is dont write the sure line at the start and last line only ask questions , evaluate and answer them. Dont ask the same question again will they couldnt answer it. Start with some theory question like differences between array and linked and basic coding questions like Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice. This is important that you always check if the code is optimal and best time complexity otherwise even if the code works tell that its not efficient",
    },
    {
      role: "assistant",
      content: "Hey there!",
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

  async function handleInputSubmit(event) {
    event.preventDefault();
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

  const handleSendMessage = async (method) => {
    try {
      let data = method === "Code" ? code : transcript;

      let userMessage = method;
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.REACT_APP_CHATGPT_API_KEY,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            max_tokens: 100,
            temperature: 0.7,
            n: 1,
            messages: conversation.concat([{ role: "user", content: data }]),
            stream: true,
          }),
        }
      );

      const reader = response.body?.getReader();
      if (!reader) {
        console.error("Error: fail to read data from response");
        return;
      }
      let totalString = "";

      let currentSentence = "";
      let currentTexSentenceTillNow = "";
      setSentences([]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const textDecoder = new TextDecoder("utf-8");
        const chunk = textDecoder.decode(value);

        let deltaText = "";
        for (const line of chunk.split("\n")) {
          const trimmedLine = line.trim();
          if (!trimmedLine || trimmedLine === "data: [DONE]") {
            continue;
          }

          const json = trimmedLine.replace("data: ", "");
          const obj = JSON.parse(json);
          const content =
            obj &&
            obj.choices &&
            obj.choices[0] &&
            obj.choices[0].delta &&
            obj.choices[0].delta.content
              ? obj.choices[0].delta.content.toString()
              : "";
          deltaText = deltaText.concat(content);
        }
        totalString = totalString + deltaText;

        currentSentence = currentSentence + deltaText;

        const updatedSentences = updateSentences(
          currentSentence,
          setSentences,
          sentences
        );

        currentSentence = updatedSentences.currentSentence;

        if (updatedSentences.newSentence) {
          currentTexSentenceTillNow += updatedSentences.newSentence;

          setTimeout(() => {
            updateConversationArrays(
              userMessage,
              currentTexSentenceTillNow,
              setConversation,
              conversation,
              SetTimeStamps,
              timeStamps
            );
          }, 2000);
        }
      }
      console.log("Dwaraka-sentences: ", sentences);
      return totalString;
    } catch (error) {
      console.error("Error:", error);
      return "";
    }
  };

  return (
    <div className="app mt-5 pt-1">
      {/* {JSON.stringify(sentences)} */}
      <Container>
        <NavBar />
        <div className="chat-container">
          <div className="chat-section">
            <div className="subheadings">
              <p>Bot</p>
              <p>You</p>
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
                        style={{ color: "#000000", transform: "scale(2.5)" }}
                        onClick={SpeechRecognition.stopListening}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon="microphone"
                        onClick={() => {
                          setHumanVoiceLTwo(humanVoiceLTwo + humanVoiceLOne);
                          SpeechRecognition.startListening();
                        }}
                      />
                    )}
                  </div>
                  <textarea
                    type="text"
                    placeholder="Type a message"
                    className="input-field"
                    autoFocus
                    value={humanVoiceLThree}
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
      </Container>
      <SpeechSynthesisComp />
    </div>
  );
};

export default InterviewBot;
function updateConversationArrays(
  userMessage,
  totalString,
  setConversation,
  conversation,
  SetTimeStamps,
  timeStamps
) {
  const newUserMessageTimeStamp = new Date();
  const newUserMessage = {
    role: "user",
    content: userMessage,
  };
  const newAssistantMessage = {
    role: "assistant",
    content: totalString,
  };
  const newAssistantMessageTimeStamp = new Date();
  setConversation([...conversation, newUserMessage, newAssistantMessage]);
  SetTimeStamps([
    ...timeStamps,
    newUserMessageTimeStamp,
    newAssistantMessageTimeStamp,
  ]);
}

function updateSentences(currentSentence, setSentences, sentences) {
  let newSentence = "";
  if (
    currentSentence.includes(".") ||
    currentSentence.includes("?") ||
    currentSentence.includes("!") ||
    currentSentence.includes(",") ||
    currentSentence.includes(":")
  ) {
    let dCurrentSentence = currentSentence + "";
    newSentence =
      (dCurrentSentence.includes(".")
        ? dCurrentSentence.split(".")[0] + "."
        : "") +
      (dCurrentSentence.includes("?")
        ? dCurrentSentence.split("?")[0] + "?"
        : "") +
      (dCurrentSentence.includes("!")
        ? dCurrentSentence.split("!")[0] + "!"
        : "") +
      (dCurrentSentence.includes(",")
        ? dCurrentSentence.split(",")[0] + ","
        : "") +
      (dCurrentSentence.includes(":")
        ? dCurrentSentence.split(":")[0] + ":"
        : "");
    setSentences((prevSentences) => [...prevSentences, newSentence]);

    setTimeout(() => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(newSentence);
      synth.speak(utterance);
    }, 2000);
    let d1CurrentSentence = currentSentence + "";
    let d2CurrentSentence =
      (d1CurrentSentence.includes(".") &&
      d1CurrentSentence.split(".").length > 1
        ? d1CurrentSentence.split(".")[1]
        : "") + d1CurrentSentence.includes("?") &&
      d1CurrentSentence.split("?").length > 1
        ? d1CurrentSentence.split("?")[1]
        : "" + d1CurrentSentence.includes("!") &&
          d1CurrentSentence.split("!").length > 1
        ? d1CurrentSentence.split("!")[1]
        : "" + d1CurrentSentence.includes(",") &&
          d1CurrentSentence.split(",").length > 1
        ? d1CurrentSentence.split(",")[1]
        : "" + d1CurrentSentence.includes(":") &&
          d1CurrentSentence.split(":").length > 1
        ? d1CurrentSentence.split(":")[1]
        : "";
    currentSentence = d2CurrentSentence;
  }
  return { currentSentence, newSentence };
}
