import Editor from "@monaco-editor/react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CodeEvaluationMetricsAccordian from "../CodeEvaluationMetricsAccordian/CodeEvaluationMetricsAccordian";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "70%",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProblemDetailsModal({
  shouldOpenModel,
  setShouldOpenModel,
  dataForAccordian,
}) {
  const handleClose = () => {
    setShouldOpenModel(false);
  };
  if (!shouldOpenModel) {
    return null;
  }
  const accordianStyle = {
    transform: `scale(0.9)`,
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={shouldOpenModel}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={shouldOpenModel}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="subtitle2" component="h2">
            {dataForAccordian.dsa_question.content}
          </Typography>
          <div className="d-flex">
          <span style={accordianStyle}><CodeEvaluationMetricsAccordian ratingsData={dataForAccordian}  />
            </span>
            <Editor
            className="mt-4"
              value={dataForAccordian.userCode_data.replace(/^\/\/code/, "")}
              defaultLanguage="cpp"
              width={"500px"}
              height={"350px"}
              theme="vs-light"
              defaultValue={dataForAccordian.userCode_data.replace(
                /^\/\/code/,
                ""
              )}
              onChange={() => {}}
            />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
