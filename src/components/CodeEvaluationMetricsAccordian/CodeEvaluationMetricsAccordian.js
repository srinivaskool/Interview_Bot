import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import * as React from "react";
import StarRatings from "react-star-ratings";
import "./CodeEvaluationMetricsAccordian.css";

export default function CodeEvaluationMetricsAccordian({ ratingsData }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const dsaQuestion = ratingsData.dsa_question.content;
  const evaluationRatings = ratingsData.evaluation_data.Ratings;

  function getOverAllRating() {
    var ratingSum = 0;
    {
      Object.keys(evaluationRatings).map((ratingKey, index) => {
        if (typeof evaluationRatings[ratingKey] === "object") {
          ratingSum += parseFloat(
            evaluationRatings[ratingKey].rating.split("/")[0]
          );
        }
      });
    }
    return ratingSum / 6;
  }

  return (
    <div className="metrics-accordian-frame">
      <Accordion
        expanded={expanded === "panelQuestion"}
        onChange={handleChange("panelQuestion")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            variant="h6"
            sx={{ width: "40%", flexShrink: 0, color: "#2463eb" }}
          >
            Question
          </Typography>
          <Typography
            variant="body1"
            sx={{ width: "60%", flexShrink: 0, color: "#2463eb" }}
          >
            {dsaQuestion.length > 40
              ? dsaQuestion.slice(0, 40) + "..."
              : dsaQuestion}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2">{dsaQuestion}</Typography>
        </AccordionDetails>
      </Accordion>
      {Object.keys(evaluationRatings).map((ratingKey, index) => {
        if (typeof evaluationRatings[ratingKey] === "object") {
          return (
            <Accordion
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  variant="body2"
                  sx={{ width: "40%", flexShrink: 0 }}
                >
                  {ratingKey}
                </Typography>
                <StarRatings
                  rating={parseFloat(
                    evaluationRatings[ratingKey].rating.split("/")[0]
                  )}
                  starDimension="18px"
                  starRatedColor={getStarColor(
                    evaluationRatings[ratingKey].rating.split("/")[0]
                  )}
                  numberOfStars={5}
                  name={""}
                />
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle2">
                  {evaluationRatings[ratingKey].feedback}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        } else {
          return (
            <Accordion
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant="h6" sx={{ width: "40%", flexShrink: 0 }}>
                  {ratingKey}
                </Typography>
                <StarRatings
                  rating={getOverAllRating()}
                  starDimension="24px"
                  starRatedColor={getStarColor(getOverAllRating())}
                  numberOfStars={5}
                  name={""}
                />
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{evaluationRatings[ratingKey]}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        }
      })}
    </div>
  );
}
function getStarColor(rating) {
  if (rating > 4) {
    return "#035f2b";
  } else if (rating > 3) {
    return "#92d04f";
  } else if (rating > 2) {
    return "#fec922";
  } else if (rating > 1) {
    return "#fa9924";
  } else {
    return "#ea0001";
  }
}
