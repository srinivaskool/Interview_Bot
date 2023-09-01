export function updateConversationArrays(
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
  
  export function updateSentences(
    currentSentence,
    setSentences,
    utteranceVoice,
    synth
    // setLoadingTrackerInt,
    // loadingTrackerInt
  ) {
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
        const utterance = new SpeechSynthesisUtterance(newSentence);
        if (utteranceVoice) {
          utterance.voice = utteranceVoice;
        }
        synth.speak(utterance);
        // setLoadingTrackerInt(loadingTrackerInt - 1);
        // console.log("Dwaraka load so, ---");
        // utterance.onend = () => {
        //   console.log("Dwaraka load done so, +++");
        //   setLoadingTrackerInt(loadingTrackerInt + 1);
        // };
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
  