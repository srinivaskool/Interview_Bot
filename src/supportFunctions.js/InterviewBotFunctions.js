import "./dSAQuestions";

export function handleSendUserResponse({
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
  loading,
  isThisCodeEvaluation,
}) {
  return async (method) => {
    setLoading(true);
    if (method === "Code") {
      setHasUserGivenCode(true);
    }
    try {
      let shouldEvaluateCode = method === "evaluateCode";
      console.log("Dwaraka-method: ", method);
      let data =
        method === "Code"
          ? `//code\n${code}`
          : method === "evaluateCode"
          ? `//code\n${code}`
          : method;
      let userMessage = data;
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
            max_tokens: 1000,
            temperature: 0.7,
            n: 1,
            messages:
              // shouldEvaluateCode
              //   ? conversation.concat([
              //       {
              //         role: "system",
              //         content: getCodeEvaluationPrompt({}),
              //       },
              //       { role: "user", content: data },
              //     ])
              //   :
              conversation.concat([{ role: "user", content: data }]),
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
          utteranceVoice,
          synth,
          isThisCodeEvaluation
          // setLoadingTrackerInt,
          // loadingTrackerInt
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
      setLoading(false);
      setCode("");
      setHasUserGivenCode(false);
      return totalString;
    } catch (error) {
      console.log("Error:", error);
      setHasUserGivenCode(false);
      setLoading(loading);
      return "";
    }
  };
}

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
  synth,
  isThisCodeEvaluation
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
    if (!isThisCodeEvaluation) {
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(newSentence);
        if (utteranceVoice) {
          utterance.voice = utteranceVoice;
        }
        synth.speak(utterance);
      }, 2000);
    }
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

export function getBasicInterviewPrompt({ role }) {
  return `I want you to act as an interviewer. I will be the candidate and you will ask me coding interview questions for a ${role}. Provide constructive feedback on the candidates answers, offer suggestions for improvement, and discuss techniques for effective communication.Your personality type is friendLy and warm.Limit your responses to 3 sentences.Do not respond with Lists or ask multiple questions at once.End every response with a question to keep the conversation going.I want you to only reply as the interviewer.Do not write all the conversation at once.I want you to only do the interview with me.Ask me the questions and wait for my answers.Do not write explanations.Ask me the questions one by one like an interviewer does and wait for my answers.Ask me random questions from one of the following topics and ask follow- up questions: Data Structure, Algorithm, Operating System, System Design, Network and Security.please dont explain the amswer first say that the answer is wrong and explain the answer in maximum of 1 - 2 lines.While in -between questions dont give the entire answer give pointers like hints and let me guess the answer. You are a job interview partner, assisting someone in preparing for their upcoming job interview. Your task is to simulate a realistic job interview experience. Please validate all my answers and tell its either correct or partially correct or wrong, ls be a little hard on my answers. At a point pls ask only one question. The important thing is dont write the sure line at the start and last line only ask questions , evaluate and answer them. Dont ask the same question again will they couldnt answer it. Start with some theory question like differences between array and linked and basic coding questions like Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice. This is important that you always check if the code is optimal and best time complexity otherwise even if the code works tell that its not efficient`;
}

export function getDSAQuestionStartingPrompt({question}){
  return `You are the interviewer, and I need your evaluation expertise in Data Structures and Algorithms (DSA). I'll need you to ask this DSA question from the perspective of an interviewer asking this question to a intervewee. The question is ${question}. I need you to ask me this question`
}

export function getCodeEvaluationPrompt() {
  console.log("dwaraka-inside evalutate prompt");
  //   return `
  //   You are the interviewer, and I need your evaluation expertise in Data Structures and Algorithms (DSA). I'll provide you with a code snippet related to a DSA question. Your task is to assess the code based on the following five criteria, each rated out of 5:

  //   Evaluate the provided DSA code based on the following criteria, each rated out of 5:
  //   your response should look like this:

  // "Correctness - X.X/5 : one liner feedback about Correctness
  // Handling Edge Cases - X.X/5 : one liner feedback about Handling Edge Cases
  // Code Structure and Readability - X.X/5 : one liner feedback about Code Structure and Readability
  // Problem Decomposition - X.X/5 : one liner feedback about Problem Decomposition
  // Algorithm Efficiency - X.X/5 : one liner feedback about Algorithm Efficiency
  // Overall Code Evaluation - X.X/5 : one liner feedback about Overall Code Evaluation

  // [Provide a concise summary about the overall code quality.]"
  //    `;

  return `
You are the interviewer, and I need your evaluation expertise in Data Structures and Algorithms (DSA). I'll provide you with a code snippet related to a DSA question. Your task is to assess the code based on the following five criteria, each rated out of 5:

Evaluate the provided DSA code based on the following criteria, each rated out of 5. I want this entire response in the form of stringified JSON object
your response should look like this: 
{
"Title": "Here's the evaluation of the provided code snippet based on some important criteria:"
[
  "Correctness": {
    "rating": "X.X (out of 5)",
    "feedback": "One-liner feedback about Correctness"
  },
  "HandlingEdgeCases": {
    "rating": "X.X (out of 5)",
    "feedback": "One-liner feedback about Handling Edge Cases"
  },
  "CodeStructure andReadability": {
    "rating": "X.X (out of 5)",
    "feedback": "One-liner feedback about Code Structure and Readability"
  },
  "ProblemDecomposition": {
    "rating": "X.X (out of 5)",
    "feedback": "One-liner feedback about Problem Decomposition"
  },
  "AlgorithmEfficiency": {
    "rating": "X.X (out of 5)",
    "feedback": "One-liner feedback about Algorithm Efficiency"
  },
  "OverallCodeEvaluation": {
    "rating": "X.X (out of 5)",
    "feedback": "One-liner feedback about Overall Code Evaluation"
  },
  "finalFeedBack": "Concise 2 liner summary about the overall code quality"
]
}

for your reference, below is the exact example of how your response should look be structured exactly like like.
"
{
  "Title": "Here's the evaluation of the provided code snippet based on some important criteria:",
  "Ratings": {
    "Correctness": {
      "rating": "3.5/5",
      "feedback": "The code correctly finds a pair of elements in the input vector 'a' whose sum equals the given target. However, it doesn't handle the case where there is no such pair, and it simply returns an empty vector. It would be better to handle this scenario more explicitly with a meaningful return value or message."
    },
    "HandlingEdgeCases": {
      "rating": "2.5/5",
      "feedback": "The code doesn't handle the edge case where there are multiple pairs that satisfy the target sum condition. It returns the indices of the first pair found, which might not be what the user expects. Additionally, it doesn't handle cases where the input vector is empty."
    },
    "CodeStructureAndReadability": {
      "rating": "3.0/5",
      "feedback": "The code lacks comments and meaningful variable names, making it less readable. It would be beneficial to add comments explaining the purpose of the code blocks and use descriptive variable names. The indentation is consistent, which is good for readability."
    },
    "ProblemDecomposition": {
      "rating": "3.0/5",
      "feedback": "The problem is not well decomposed in the code. It uses a straightforward brute-force approach with nested loops to check all possible pairs, which is not efficient for larger inputs. A more efficient algorithm could be employed."
    },
    "AlgorithmEfficiency": {
      "rating": "2.5/5",
      "feedback": "The current code has a time complexity of O(n^2) due to the nested loops, where 'n' is the size of the input vector. This is not efficient for larger inputs, and a more efficient algorithm like using a hash table (unordered_map) to store seen elements and their indices could reduce the time complexity to O(n)."
    },
    "OverallCodeEvaluation": {
      "rating": "2.9/5",
      "feedback": "The code works for small inputs and provides a correct answer. However, it lacks robustness, efficiency, and readability. It can be improved by handling edge cases, using better variable names, adding comments, and employing a more efficient algorithm."
    },
    "finalFeedback": "Overall, the code needs some improvements to make it more reliable and efficient, especially for larger input sizes."
  }
}
"
`;
}
