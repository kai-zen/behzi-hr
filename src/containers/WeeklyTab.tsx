import { FC, useState, useRef, Fragment, ChangeEvent } from "react";
import {
  Box,
  Grid,
  Divider,
  Typography,
  Avatar,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Button } from "@/components";
import { Add, Print } from "@mui/icons-material";
import CreateWeeklyReportModal from "@/modals/weekly/Create";
import { dailyReportType } from "@/helpers/types";
import { DailySubmitReviewReportCard } from "@/containers";
import { userData } from "@/helpers/types";
import moment from "moment-jalaali";
import BasicDatePicker from "@/components/DateInput";
import ReactToPrint from "react-to-print";
import EditDailyReportModal from "@/modals/daily/Edit";

interface propTypes {
  userInfo: userData;
}

const WeeklyTab: FC<propTypes> = ({ userInfo }) => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [submittedItems, setSubmittedItems] = useState<dailyReportType[]>([]);
  const [startDate, setStartDate] = useState<
    ChangeEvent<HTMLSelectElement> | undefined
  >();
  const [showActionButtons, setShowActionButtons] = useState<boolean>(false);
  const [editingData, setEditingData] = useState<dailyReportType>({
    id: 0,
    title: "",
    description: "",
    items: [],
  });

  const printingBox = useRef(null);

  return (
    <>
      <Grid container spacing="16px" sx={{ my: "40px" }}>
        <Grid item xs={12} lg={4}>
          <Box sx={styles.controller}>
            <BasicDatePicker
              value={startDate || undefined}
              onChange={(val) => val && setStartDate(val)}
            />
            <Box className="flex-8">
              <Button
                startIcon={<Add />}
                onClick={() => setOpenCreate(true)}
                sx={{ width: "50%" }}
              >
                مورد جدید
              </Button>
              <ReactToPrint
                content={() => printingBox.current}
                trigger={() => (
                  <Button
                    startIcon={<Print />}
                    variant="outlined"
                    onClick={() => setOpenCreate(true)}
                    sx={{ width: "50%" }}
                  >
                    دریافت گزارش
                  </Button>
                )}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Switch
                    checked={showActionButtons}
                    onChange={(e) => setShowActionButtons(e.target.checked)}
                  />
                }
                label="نمایش دکمه ها"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Box ref={printingBox} sx={styles.printingBox}>
            <Box sx={styles.printingHeader}>
              <Box sx={styles.user}>
                <Avatar
                  sx={{ width: "56px", height: "56px" }}
                  src={userInfo.image}
                />
                <Box sx={styles.userInfo}>
                  <Typography fontWeight="600">{userInfo.name}</Typography>
                  <Typography color="primary.main" fontSize="13px">
                    {userInfo.job}
                  </Typography>
                </Box>
              </Box>
              <img src="/logo.svg" style={{ width: "100px" }} />
            </Box>
            {submittedItems.map((item, index) => (
              <Fragment key={index}>
                <DailySubmitReviewReportCard
                  rowNumber={index + 1}
                  data={item}
                  deleteHandler={(id) =>
                    setSubmittedItems((prev) => {
                      const filtered = [...prev].filter(
                        (submittedItem) => submittedItem.id !== id
                      );
                      return filtered;
                    })
                  }
                  editHandler={(data: dailyReportType) => {
                    setEditingData(data);
                    setOpenEdit(true);
                  }}
                  showActionButtons={showActionButtons}
                />
                {index < submittedItems.length - 1 && (
                  <Divider sx={{ width: "96%" }} />
                )}
              </Fragment>
            ))}
            <Typography sx={styles.date}>
              {moment(String(startDate ?? moment())).format("jYYYY/jMM/jDD")}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <CreateWeeklyReportModal
        open={openCreate}
        handleClose={() => setOpenCreate(false)}
        submit={(item) =>
          setSubmittedItems((prev) => {
            const lastItem = submittedItems[submittedItems.length - 1];
            let lastId = 0;
            if (lastItem) {
              lastId = lastItem.id;
            }
            return [...prev, { ...item, id: lastId + 1 }];
          })
        }
      />
      <EditDailyReportModal
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        submit={(data) =>
          setSubmittedItems((prev) => {
            const copy = [...prev];
            const index = prev.findIndex(
              (submittedItem) => submittedItem.id === data.id
            );
            if (submittedItems[index]) {
              copy[index] = data;
            }
            return copy;
          })
        }
        initialValues={editingData}
      />
    </>
  );
};

const styles = {
  controller: { display: "flex", flexDirection: "column", gap: "16px" },
  printingBox: {
    border: "1px solid",
    borderColor: "divider",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    p: "16px",
    width: "100%",
    aspectRatio: "210 / 297",
  },
  printingHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    mb: "20px",
  },
  user: { display: "flex", alignItems: "center", gap: "8px" },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  date: {
    width: "100%",
    textAlign: "right",
    fontSize: "14px",
    fontWeight: "500",
    mt: "20px",
  },
};

export default WeeklyTab;
