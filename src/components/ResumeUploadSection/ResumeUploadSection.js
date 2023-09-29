import React, { useState } from "react";
import Lottie from "react-lottie";
import documentAnimation from "../../Images/documentAnimation.json";
import resumeScan from "../../Images/resumeScan.gif";
import robotHiAnimation from "../../Images/robotHiAnimation.json";
import robotThinkingAnimation from "../../Images/robotThinkingAnimation.json";
import "./ResumeUploadSection.css";

export default function ResumeUploadSection({
  onTextExtracted,
  isResumeRound,
  isDsaRound,
  isADSAQuestionDone,
}) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: isDsaRound
      ? robotThinkingAnimation
      : isResumeRound
      ? documentAnimation
      : robotHiAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onFileChange = async (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      // Display the selected file name and read its content
      setFile(uploadedFile);

      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        const arrayBuffer = event.target.result;

        // Initialize PDF.js
        import("pdfjs-dist/build/pdf")
          .then((pdfjs) => {
            pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
            return pdfjs.getDocument({ data: arrayBuffer }).promise;
          })
          .then((pdf) => {
            let fullText = "";
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
              pdf.getPage(pageNum).then((page) => {
                page.getTextContent().then((textContent) => {
                  const pageText = textContent.items
                    .map((item) => item.str)
                    .join(" ");
                  fullText += pageText + "\n";
                  if (pageNum === pdf.numPages) {
                    setText(fullText);
                  }
                });
              });
            }
          });
      };

      fileReader.readAsArrayBuffer(uploadedFile);
    }
  };

  const handleStartResumeSection = () => {
    onTextExtracted(text);
  };
  return (
    <div className="resumeUploadSection-frame">
      <div className="resumeUploadSection-center p-2">
        <div className="resumeUploadSection-title">
          {isResumeRound ? (
            <h1>Drop your resume to start</h1>
          ) : isDsaRound ? (
            <h1>Coding Skills</h1>
          ) : (
            <h1>Intro Journey</h1>
          )}
          {file && (
            <p>
              <strong>File:</strong> {file.name}
            </p>
          )}
        </div>
        {!isResumeRound && (
          <Lottie
            options={defaultOptions}
            height={isDsaRound ? 150 : 250}
            width={isDsaRound ? 150 : 250}
          />
        )}
        {isResumeRound && (
          <div className="resumeUploadSection-dropzone">
            <img className="resumeUploadImage mt-1" src={resumeScan} style={{ width: "150px" }} />
            <input
              type="file"
              className="resumeUploadSection-upload-input"
              onChange={onFileChange}
            />
          </div>
        )}
        <button
          type="button"
          className="btn btn-primary "
          name="uploadbutton"
          disabled={!file && isResumeRound}
          onClick={handleStartResumeSection}
        >
          Lets get Started
        </button>
      </div>
    </div>
  );
}
