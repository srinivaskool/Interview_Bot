import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { getDataFromRealtimeDatabase } from "../../supportFunctions.js/FirebaseFunctions";
import ProblemDetailsModal from "./ProblemDetailsModal";
import TabLabelComponent from "./TabLabelComponent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="w-80"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function NewAllRecordsVerticalTabs({ allInterviewRecords }) {
  const [value, setValue] = React.useState(0);
  const [dataForQuestions, setDataForQuestions] = useState([]);
  const [dataForAccordian, setDataForAccordian] = useState();
  const [shouldOpenModel, setShouldOpenModel] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const newDataForQuestions = await Promise.all(
        allInterviewRecords.flatMap((interviewRecord, index) =>
          interviewRecord.DSAQuestionsRealTimeDatabaseKeysArray.map(
            async (DSAQuestionDataKey) => {
              const data = await fetchDataForQuestion(DSAQuestionDataKey);
              return { data, sourceIndex: index }; // Store data along with source index
            }
          )
        )
      );
      setDataForQuestions(
        newDataForQuestions.filter((item) => item.data !== null)
      );
    };
    fetchData();
  }, []);

  const fetchDataForQuestion = async (DSAQuestionDataKey) => {
    try {
      const data = await getDataFromRealtimeDatabase(
        `/DSAQandAandEvaluation/${DSAQuestionDataKey}`
      );
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 504,
      }}
    >
      <ProblemDetailsModal
        shouldOpenModel={shouldOpenModel}
        setShouldOpenModel={setShouldOpenModel}
        dataForAccordian={dataForAccordian}
      />
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {allInterviewRecords.map((interviewRecord) => {
          return (
            <Tab
              label={
                <TabLabelComponent interviewRecordData={interviewRecord} />
              }
              {...a11yProps(0)}
            />
          );
        })}
      </Tabs>
      {allInterviewRecords.map((interviewRecord, index) => {
        console.log("in a interview round: ", index);
        return (
          <TabPanel
            key={index}
            value={value}
            index={index}
            style={{ width: "70%" }}
          >
            {dataForQuestions
              .filter((item) => item.sourceIndex === index)
              .map((item, i) => (
                <div
                  class="css-xkn2kk-QuestionItemContainer e5i1odf7"
                  style={{ backgroundColor: "#dbeafe" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="30px"
                    height="30px"
                    class="icon__1Md2 css-1tyj4in-QuestionItemIcon e5i1odf8"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 2l6 6v12c0 1.1-.9 2-2 2H5.99C4.89 22 4 21.1 4 20V4c0-1.1.9-2 2-2h8zm4 18V9h-5V4H6v16h12zM8 16h8v2H8v-2zm0-4h8v2H8v-2z"
                    ></path>
                  </svg>
                  <div class="css-1n4xofq-QuestionItemInfo e5i1odf9">
                    <span class="css-12tgxhh-QuestionLink e5i1odf11">
                      Question - {i+1}
                    </span>
                    <div class="css-vjt3mz-TestcaseProgressContainer e5i1odf0">
                      <span class="css-oqomka-TestcaseProgressDetails e5i1odf1">
                        83 / 83 Testcases Passed
                      </span>
                    </div>
                  </div>
                  <div class="css-cwdo40-QuestionItemDetails e5i1odf10">
                    <span
                      data-question-idx="0"
                      onClick={() => {
                        setDataForAccordian(item.data),
                          setShouldOpenModel(true);
                      }}
                    >
                      Details
                    </span>
                  </div>
                </div>
              ))}
          </TabPanel>
        );
      })}
    </Box>
  );
}
