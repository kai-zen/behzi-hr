import { Card, Typography, Box, IconButton } from "@mui/material";
import { FC } from "react";
import { dailyReportType } from "../helpers/types";
import { Delete, Edit } from "@mui/icons-material";

interface propTypes {
  data: dailyReportType;
}

const DailySubmitReviewReportCard: FC<propTypes> = ({ data }) => {
  const { title, description, items } = data;

  return (
    <Card
      sx={{
        p: "16px",
        border: "1px solid",
        borderColor: "divider",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
      elevation={0}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }}
      >
        <Typography variant="h6">{title}</Typography>
        <Box className="flex-8">
          <IconButton sx={{ color: "warning.main" }}>
            <Edit />
          </IconButton>
          <IconButton sx={{ color: "error.main" }}>
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ isplay: "flex", flexDirection: "column", gap: "10px" }}>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Box
              sx={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                bgcolor: "primary.main",
                opacity: ".75",
              }}
            />
            <Typography>{item}</Typography>
          </Box>
        ))}
      </Box>

      <Typography>{description}</Typography>
    </Card>
  );
};

export default DailySubmitReviewReportCard;
