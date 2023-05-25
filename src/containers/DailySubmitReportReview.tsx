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
    <Card sx={styles.card} elevation={0}>
      <Box sx={styles.firstRow}>
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
      <Box sx={styles.items}>
        {items.map((item, index) => (
          <Box key={index} sx={styles.item}>
            <Box sx={styles.bullet} />
            <Typography variant="caption">{item}</Typography>
          </Box>
        ))}
      </Box>

      <Typography>{description}</Typography>
    </Card>
  );
};

const styles = {
  card: {
    p: "16px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  firstRow: { display: "flex", justifyContent: "space-between", gap: "20px" },
  bullet: {
    width: "4px",
    height: "4px",
    borderRadius: "2px",
    bgcolor: "primary.main",
    opacity: ".75",
  },
  item: { display: "flex", alignItems: "center", gap: "4px" },
  items: { isplay: "flex", flexDirection: "column", gap: "10px" },
};

export default DailySubmitReviewReportCard;
