import { Paper, Typography, Box, IconButton } from "@mui/material";
import { FC } from "react";
import { dailyReportType } from "../helpers/types";
import { Delete, Edit } from "@mui/icons-material";

interface propTypes {
  data: dailyReportType;
  showActionButtons: boolean;
  rowNumber: number;
  deleteHandler: (id: number) => void;
}

const DailySubmitReviewReportCard: FC<propTypes> = ({
  data,
  showActionButtons,
  rowNumber,
  deleteHandler,
}) => {
  const { title, description, items, id } = data;

  return (
    <Paper sx={styles.card} elevation={0}>
      <Box sx={styles.firstRow}>
        <Typography variant="h6">
          {rowNumber}. {title}
        </Typography>
        {showActionButtons && (
          <Box className="flex-8">
            <IconButton sx={{ color: "warning.main" }}>
              <Edit />
            </IconButton>
            <IconButton
              sx={{ color: "error.main" }}
              onClick={() => deleteHandler(id)}
            >
              <Delete />
            </IconButton>
          </Box>
        )}
      </Box>
      {items.length > 0 && (
        <Box sx={styles.items}>
          {items.map((item, index) => (
            <Box key={index} sx={styles.item}>
              <Box sx={styles.bullet} />
              <Typography variant="caption">{item}</Typography>
            </Box>
          ))}
        </Box>
      )}
      {description && <Typography>{description}</Typography>}
    </Paper>
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
  firstRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    height: "32px",
  },
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
