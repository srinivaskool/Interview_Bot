import React, { useState } from "react";
import "./ResumeUploadSection.css";

export default function ResumeUploadSection() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

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

  return (
    <div className="frame">
      <div className="center">
        <div className="title">
          <h1>Drop your resume to start</h1>
        </div>
        <div className="dropzone">
          <img
            src="http://100dayscss.com/codepen/upload.svg"
            className="upload-icon"
          />
          <input type="file" className="upload-input" onChange={onFileChange}/>
        </div>
        <button type="button" className="btn btn-primary " name="uploadbutton">
          Start the interview
        </button>
        {file && (
          <div className="file-info">
            <p>Selected File: {file.name}</p>
            <p>Extracted Text:</p>
            <div className="extracted-text">{text}</div>
          </div>
        )}
      </div>
    </div>
  );
}
