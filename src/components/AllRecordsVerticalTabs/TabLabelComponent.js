import Rating from "@mui/material/Rating";
import React from "react";
import "./AllRecordsVerticalTabs.css";

export default function TabLabelComponent({ interviewRecordData }) {
  const jsDate = interviewRecordData.timestamp.toDate();

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(jsDate);
  return (
    <div class="tab_label_component_main_div">
      <Rating name="customized-10" defaultValue={0.5} max={1} precision={0.2} />
      <div class="css-1av3ddr-InterviewSummary e5i1odf3">
        <div class="css-cxpqvl-InterviewSummaryEleCont e5i1odf4">
          <span class="css-1oyvkl0-InterviewSummaryLeftEle e5i1odf6">
            Title
          </span>
          <span class="css-cgnmkp-InterviewSummaryRightEle e5i1odf7">
            <span class="css-1a8mw5b-InterviewStatusDisplayCont e5i1odf5">
              overall score
            </span>
          </span>
        </div>
        <div class="css-cxpqvl-InterviewSummaryEleCont e5i1odf4">
          <span class="css-1oyvkl0-InterviewSummaryLeftEle e5i1odf6">
            Online Assessment
          </span>
          <span class="css-cgnmkp-InterviewSummaryRightEle e5i1odf7">
          {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
}
