import {
  Paper,
  Typography,
  Box,
  IconButton,
  Checkbox,
  Chip,
} from "@mui/material";
import { FC } from "react";
import { weeklyReportType } from "@/helpers/types";
import { Delete, Edit } from "@mui/icons-material";
import { immediateLevels, importanceLevels } from "@/helpers/constants";

interface propTypes {
  data: weeklyReportType;
  showActionButtons: boolean;
  deleteHandler: (id: number) => void;
  editHandler: (data: weeklyReportType) => void;
}

const WeeklySubmitReviewReportCard: FC<propTypes> = ({
  data,
  showActionButtons,
  deleteHandler,
  editHandler,
}) => {
  const { title, description, items, id, immediateLevel, importanceLevel } =
    data;

  const immediateLabel =
    immediateLevels.find((item) => item.value === immediateLevel)?.title || "";
  const importanceLabel =
    importanceLevels.find((item) => item.value === importanceLevel)?.title ||
    "";

  return (
    <Paper sx={styles.card} elevation={0}>
      <Box sx={styles.firstRow}>
        <Typography variant="h6">
          <Checkbox /> {title}
        </Typography>
        {showActionButtons && (
          <Box className="flex-8">
            <IconButton
              sx={{ color: "warning.main" }}
              onClick={() => editHandler(data)}
            >
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
      {description && (
        <Typography sx={{ pl: "32px" }}>{description}</Typography>
      )}
      <Box sx={{ display: "flex", gap: "6px" }}>
        <Chip label={importanceLabel} />
        <Chip label={immediateLabel} />
      </Box>
    </Paper>
  );
};

const styles = {
  card: {
    p: "16px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
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
  items: { isplay: "flex", flexDirection: "column", gap: "10px", pl: "46px" },
};

export default WeeklySubmitReviewReportCard;
