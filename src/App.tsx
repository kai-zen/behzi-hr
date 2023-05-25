import { FC, useState } from "react";
import { Paper, Box, Typography } from "@mui/material";
import { Button, Container, Tabs } from "./components";
import { Add, Person, Print } from "@mui/icons-material";
import CreateDailyReportModal from "./modals/daily/Create";
import { MUIDate, dailyReportType } from "./helpers/types";
import { DailySubmitReviewReportCard } from "./containers";
import BasicDatePicker from "./components/DateInput";

const App: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [submittedItems, setSubmittedItems] = useState<dailyReportType[]>([]);
  const [startDate, setStartDate] = useState<MUIDate>();

  return (
    <Paper square elevation={0}>
      <Container sx={{ my: "20px" }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", my: "20px", fontWeight: "600" }}
        >
          سامانه گزارش دهی پروژه{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            بهزی
          </Box>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            tabItems={["روزانه", "ماهانه", "هفتگی"]}
          />
          <Button startIcon={<Person />}>اطلاعات کاربری</Button>
        </Box>
        <Box
          sx={{
            my: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <BasicDatePicker
            value={startDate}
            onChange={(val) => val && setStartDate(val)}
          />
          {submittedItems.map((item, index) => (
            <DailySubmitReviewReportCard data={item} key={index} />
          ))}
          <Box className="flex-8">
            <Button startIcon={<Add />} onClick={() => setOpenCreate(true)}>
              افزودن مورد جدید
            </Button>
            <Button
              startIcon={<Print />}
              variant="outlined"
              onClick={() => setOpenCreate(true)}
            >
              دریافت گزارش
            </Button>
          </Box>
        </Box>
      </Container>
      <CreateDailyReportModal
        open={openCreate}
        handleClose={() => setOpenCreate(false)}
        submit={(item) => setSubmittedItems((prev) => [...prev, item])}
      />
    </Paper>
  );
};

export default App;
