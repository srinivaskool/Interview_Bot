import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { getDataFromRealtimeDatabase } from "../../supportFunctions.js/FirebaseFunctions";
import CodeEvaluationMetricsAccordian from "../CodeEvaluationMetricsAccordian/CodeEvaluationMetricsAccordian";
import TabLabelComponent from "./TabLabelComponent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
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

export default function AllRecordsVerticalTabs({ allInterviewRecords }) {
  const [value, setValue] = React.useState(0);
  const [dataForQuestions, setDataForQuestions] = useState([]);

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
      {/* {JSON.stringify(allInterviewRecords[0].timestamp)} */}
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
          <TabPanel key={index} value={value} index={index}>
            {dataForQuestions
              .filter((item) => item.sourceIndex === index)
              .map((item, i) => (
                <CodeEvaluationMetricsAccordian
                  key={i}
                  ratingsData={item.data}
                />
              ))}
          </TabPanel>
        );
      })}
    </Box>
  );
}
