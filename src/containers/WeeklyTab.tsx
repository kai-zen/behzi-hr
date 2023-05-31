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
import { Button, TextInput } from "@/components";
import { Add, Print } from "@mui/icons-material";
import CreateWeeklyReportModal from "@/modals/weekly/Create";
import { WeeklySubmitReviewReportCard } from "@/containers";
import { userData, weeklyReportType } from "@/helpers/types";
import moment from "moment-jalaali";
import BasicDatePicker from "@/components/DateInput";
import ReactToPrint from "react-to-print";
import EditWeeklyReportModal from "@/modals/weekly/Edit";

interface propTypes {
  userInfo: userData;
}

const WeeklyTab: FC<propTypes> = ({ userInfo }) => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [submittedItems, setSubmittedItems] = useState<weeklyReportType[]>([]);
  const [startDate, setStartDate] = useState<
    ChangeEvent<HTMLSelectElement> | undefined
  >();
  const [showActionButtons, setShowActionButtons] = useState<boolean>(false);
  const [editingData, setEditingData] = useState<weeklyReportType>({
    id: 0,
    title: "",
    description: "",
    items: [],
    immediateLevel: "1",
    importanceLevel: "1",
  });
  const [title, setTitle] = useState("");

  const printingBox = useRef(null);

  return (
    <>
      <Grid container spacing="16px" sx={{ my: "40px" }}>
        <Grid item xs={12} lg={4}>
          <Box sx={styles.controller}>
            <TextInput
              label="عنوان"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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
            <Typography variant="h5" fontWeight="600">
              {title}
            </Typography>
            {submittedItems.map((item, index) => (
              <Fragment key={index}>
                <WeeklySubmitReviewReportCard
                  data={item}
                  deleteHandler={(id) =>
                    setSubmittedItems((prev) => {
                      const filtered = [...prev].filter(
                        (submittedItem) => submittedItem.id !== id
                      );
                      return filtered;
                    })
                  }
                  editHandler={(data: weeklyReportType) => {
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
            <Box sx={styles.dateBox}>
              <Typography sx={styles.date}>
                {moment(String(startDate ?? moment())).format("jYYYY/jMM/jDD")}
              </Typography>
              <Typography>تا</Typography>
              <Typography sx={styles.date}>
                {moment(String(startDate ?? moment()))
                  .add(7, "days")
                  .format("jYYYY/jMM/jDD")}
              </Typography>
            </Box>
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
      <EditWeeklyReportModal
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
  dateBox: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  date: {
    fontSize: "14px",
    fontWeight: "500",
  },
};

export default WeeklyTab;
