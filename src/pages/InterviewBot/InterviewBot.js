import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { toast } from "react-toastify";
import CodeEvaluationMetricsAccordian from "../../components/CodeEvaluationMetricsAccordian/CodeEvaluationMetricsAccordian";
import CodeInputSection from "../../components/CodeInputSection/CodeInputSection";
import MainChatSection from "../../components/MainChatSection/MainChatSection";
import MainNavBar from "../../components/MainNavBar";
import ResumeUploadSection from "../../components/ResumeUploadSection/ResumeUploadSection";
import {
  addDataToFirestore,
  addDataToRealTimeDatabase,
  updateFirestoreVariable,
} from "../../supportFunctions.js/FirebaseFunctions";
import {
  getBasicInterviewPrompt,
  getCodeEvaluationPrompt,
  getDSAQuestionStartingPrompt,
  getResumeRoundPrompt,
  handleSendUserResponse,
} from "../../supportFunctions.js/InterviewBotFunctions";
import dsaQuestionsArray from "../../supportFunctions.js/dSAQuestions";
import "./InterviewBot.css";

const InterviewBot = ({ isThisDSARoundPage, isThisResumeRoundPage }) => {
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

  useEffect(() => {
    setStartThisRound(false);
    setIsADSAQuestionDone(false);
    setLoading(false);
  }, [isThisDSARoundPage, isThisResumeRoundPage]);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  // const [loadingTrackerInt, setLoadingTrackerInt] = useState(0);
  const [humanVoiceLOne, setHumanVoiceLOne] = useState("");
  const [humanVoiceLTwo, setHumanVoiceLTwo] = useState("");
  const [humanVoiceLThree, setHumanVoiceLThree] = useState("");
  const [utteranceVoice, setUtteranceVoice] = useState();
  const [jsonCodeEvaluatedData, setJsonCodeEvaluatedData] = useState(null);
  const chatSectionRef = useRef(null); // Ref to the chat section
  const jumpToBottomButtonRef = useRef(null);
  const [hasUserGivenCode, setHasUserGivenCode] = useState(false);
  const [latestBotMessage, setLatestBotMessage] = useState("Hey there!");
  const [extractedResumeText, setExtractedResumeText] = useState();
  const [realTimeDatabaseKeys, setRealTimeDatabaseKeys] = useState([]);
  const [thisDSARoundFirestoreID, setThisDSARoundFirestoreID] = useState();
  const [startThisRound, setStartThisRound] = useState(false);
  const [isADSAQuestionDone, setIsADSAQuestionDone] = useState(false);
  const [dsaQuestionCount, setDsaQuestionCount] = useState(0);
  const [isDoneWithDSARound, setIsDoneWithDSARound] = useState(false);
  const [dsaAllQuestionsData, setDsaAllQuestionsData] = useState([]);
  const [totalNumberDSAQuestions, setTotalNumberDSAQuestions] = useState(2);

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
      content: isThisDSARoundPage
        ? getDSAQuestionStartingPrompt({
            question:
              dsaQuestionsArray[
                Math.floor(Math.random() * dsaQuestionsArray.length)
              ],
          })
        : getBasicInterviewPrompt({
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
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // This is required for the alert to be shown in some browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (chatSectionRef.current) scrollToBottomMessage();
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
    if (chatSectionRef.current) {
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
    }
  }, []);

  // Function to update the extractedText state
  const updateExtractedResumeText = (newText) => {
    console.log("Dwaraka starting convo after 1 DSA question");
    if (isADSAQuestionDone) {
      setConversation([
        {
          role: "system",
          content: getDSAQuestionStartingPrompt({
            question:
              dsaQuestionsArray[
                Math.floor(Math.random() * dsaQuestionsArray.length)
              ],
          }),
        },
        {
          role: "assistant",
          content: "Are you ready for the next question?",
        },
      ]);
      console.log("Dwaraka setting convo after 1 DSA question");
      setCodeEvaluateConversation([
        {
          role: "system",
          content: getCodeEvaluationPrompt(),
        },
      ]);
      SetTimeStamps([new Date(), new Date()]);
    } else {
      isThisResumeRoundPage
        ? setConversation([
            {
              role: "system",
              content: getResumeRoundPrompt({
                resumeText: newText,
              }),
            },
            {
              role: "assistant",
              content:
                "Hello there! Shall we start the resume round of this interview",
            },
          ])
        : isThisDSARoundPage
        ? setConversation([
            {
              role: "system",
              content: getDSAQuestionStartingPrompt({
                question:
                  dsaQuestionsArray[
                    Math.floor(Math.random() * dsaQuestionsArray.length)
                  ],
              }),
            },
            {
              role: "assistant",
              content:
                "Hello there! Shall we start the DSA round of this interview",
            },
          ])
        : setConversation([
            {
              role: "system",
              content: getBasicInterviewPrompt({
                role: "Junior Software Engineer position",
              }),
            },
            {
              role: "assistant",
              content: "Hello there! Shall we start the interview",
            },
          ]);
    }
    console.log(conversation.length);
    setExtractedResumeText(newText);
    const utterance = new SpeechSynthesisUtterance(
      isThisResumeRoundPage
        ? "Hello there! Shall we start the resume round of this interview"
        : isADSAQuestionDone
        ? "Are you ready for the next question?"
        : isThisDSARoundPage
        ? "Hello there! Shall we start the DSA round of this interview"
        : "Hello there! Shall we start the interview"
    );
    if (utteranceVoice) {
      utterance.voice = utteranceVoice;
    }
    synth.speak(utterance);
    setStartThisRound(true);
    setIsADSAQuestionDone(false);
  };

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
        content: humanVoiceLThree.trim(),
      };
      const newUserMessageTimeStamp = new Date();
      setConversation([...conversation, newUserMessage, loadingMessage]);
      SetTimeStamps([...timeStamps, newUserMessageTimeStamp]);
      const userReply = humanVoiceLThree.trim();
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

  const handleSendMessage = handleSendUserResponse({
    setLoading: setLoading,
    setHasUserGivenCode: setHasUserGivenCode,
    code: code,
    conversation: conversation,
    setSentences: setSentences,
    utteranceVoice: utteranceVoice,
    synth: synth,
    setConversation: setConversation,
    SetTimeStamps: SetTimeStamps,
    timeStamps: timeStamps,
    setCode: setCode,
    loading: loading,
    setLatestBotMessage: setLatestBotMessage,
    isThisCodeEvaluation: false,
    setMainConversationArray: setConversation,
    setStartThisRound: setStartThisRound,
    setIsADSAQuestionDone: setIsADSAQuestionDone,
  });

  const handleEvaluateCode = handleSendUserResponse({
    setLoading: setLoading,
    setHasUserGivenCode: setHasUserGivenCode,
    code: code,
    conversation: codeEvaluateConversation,
    setSentences: setSentences,
    utteranceVoice: utteranceVoice,
    synth: synth,
    setConversation: setCodeEvaluateConversation,
    SetTimeStamps: SetTimeStamps,
    timeStamps: timeStamps,
    setCode: setCode,
    loading: loading,
    setLatestBotMessage: setLatestBotMessage,
    isThisCodeEvaluation: true,
    setMainConversationArray: setConversation,
    setStartThisRound: setStartThisRound,
    setIsADSAQuestionDone: setIsADSAQuestionDone,
  });

  const onSubmitCodeHandler = async () => {
    var currentQuestionCount = dsaQuestionCount + 1;
    setDsaQuestionCount(currentQuestionCount);

    var userCode = code;
    var botQuestion = latestBotMessage;
    const result = await handleEvaluateCode("evaluateCode");
    console.log("Dwarak result: ", result);
    console.log("Dwarak json: ", JSON.parse(result));
    setJsonCodeEvaluatedData(JSON.parse(result));
    const thisQuestionCompleteData = {
      "dsa_question": botQuestion,
      "evaluation_data": JSON.parse(result)
    };
    setDsaAllQuestionsData([...dsaAllQuestionsData, thisQuestionCompleteData]);
    storeThisDataInFirestore(JSON.parse(result), userCode, botQuestion);

    console.log("Dwarak currentQuestionCount: ", currentQuestionCount);
    console.log("Dwarak dsaQuestionCount: ", dsaQuestionCount);
    if (currentQuestionCount == totalNumberDSAQuestions) {
      console.log("Dwaraka dsaAllQuestionsData: ", dsaAllQuestionsData);
      setIsDoneWithDSARound(true);
    }
  };

  const storeThisDataInFirestore = async (e, userCode, botQuestion) => {
    setLoading(true);
    storeCodeQuestionDataInRealTimeDatabase(e, userCode, botQuestion)
      .then(async (newKey) => {
        if (newKey !== null) {
          var newArray = [...realTimeDatabaseKeys, newKey];
          console.log("Dwaraka neArray: ", newArray);
          if (!thisDSARoundFirestoreID) {
            const thisDSARoundID = await addDataToFirestore({
              DSAQuestionsRealTimeDatabaseKeysArray: newArray,
              parent_collection: "dsa-code-evaluation",
              parent_document: user.uid,
              child_collection: "interviewBot",
            });
            setThisDSARoundFirestoreID(thisDSARoundID);
            console.log(
              "DWarakaaaa const thisDSARoundID = await: ",
              thisDSARoundID
            );
          } else {
            await updateFirestoreVariable({
              parent_collection: "dsa-code-evaluation",
              parent_document: user.uid,
              child_collection: "interviewBot",
              child_document: thisDSARoundFirestoreID,
              variableToUpdate: "DSAQuestionsRealTimeDatabaseKeysArray",
              updatedValue: newArray,
            });
          }
          setLoading(false);
          toast.success("added to firestore");
        } else {
          // Handle the case where newKey is null
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
        setLoading(false);
      });
  };

  const storeCodeQuestionDataInRealTimeDatabase = async (
    e,
    userCode,
    botQuestion
  ) => {
    setLoading(true);
    const data = {
      user_id: user.uid,
      userCode_data: userCode,
      evaluation_data: e,
      dsa_question: botQuestion,
    };
    return addDataToRealTimeDatabase(data, "DSAQandAandEvaluation")
      .then((newKey) => {
        console.log("New key:", newKey);
        setRealTimeDatabaseKeys([...realTimeDatabaseKeys, newKey]);
        return newKey;
      })
      .catch((error) => {
        console.error("Error:", error);
        return null;
      });
  };

  return (
    <div className="tyn-root">
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
        <MainNavBar />
        <div className="chat-container">
          {isDoneWithDSARound ? (
            dsaAllQuestionsData.map((questionData) => {
              return (
                <CodeEvaluationMetricsAccordian
                  ratingsData={questionData}
                />
              );
            })
          ) : !startThisRound ? (
            <ResumeUploadSection
              onTextExtracted={updateExtractedResumeText}
              loading={loading}
              isResumeRound={isThisResumeRoundPage}
              isDsaRound={isThisDSARoundPage}
              isADSAQuestionDone={isADSAQuestionDone}
            />
          ) : (
            <>
              <MainChatSection
                scrollToBottomMessage={scrollToBottomMessage}
                utteranceVoiceChange={utteranceVoiceChange}
                chatSectionRef={chatSectionRef}
                conversation={conversation}
                timeStamps={timeStamps}
                utteranceVoice={utteranceVoice}
                user={user}
                jumpToBottomButtonRef={jumpToBottomButtonRef}
                handleJumpToBottomClick={handleJumpToBottomClick}
                handleInputSubmit={handleInputSubmit}
                loading={loading}
                humanVoiceLThree={humanVoiceLThree}
                handleInputChange={handleInputChange}
                listening={listening}
                setHumanVoiceLTwo={setHumanVoiceLTwo}
                humanVoiceLTwo={humanVoiceLTwo}
                humanVoiceLOne={humanVoiceLOne}
              />
              <div style={{ display: isThisDSARoundPage ? "block" : "none" }}>
                <CodeInputSection
                  code={code}
                  handleEditorChange={handleEditorChange}
                  loading={loading}
                  handleSendMessage={handleSendMessage}
                  onSubmitCodeHandler={onSubmitCodeHandler}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewBot;
