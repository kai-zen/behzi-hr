import { Card, Typography } from "@mui/material";
import { FC } from "react";
import { dailyReportType } from "../helpers/types";

interface propTypes {
  data: dailyReportType;
}

const DailySubmitReviewReportCard: FC<propTypes> = ({ data }) => {
  const { title, description, items } = data;

  return (
    <Card>
      <Typography>{title}</Typography>
      {items.map((item, index) => (
        <Typography key={index}>{item}</Typography>
      ))}
      <Typography>{description}</Typography>
    </Card>
  );
};

export default DailySubmitReviewReportCard;
