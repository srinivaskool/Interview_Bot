import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Editor from "@monaco-editor/react";
import React from "react";

export default function CodeInputSection({
  code,
  handleEditorChange,
  loading,
  handleSendMessage,
  onSubmitCodeHandler,
}) {
  return (
    <div>
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
          onClick={onSubmitCodeHandler}
        >
          Submit and go to next question{" "}
          <FontAwesomeIcon
            icon="fa-solid fa-square-caret-right"
            style={{ marginLeft: "5px", height: "20px", width: "20px" }}
          />
        </div>
      </div>
    </div>
  );
}
