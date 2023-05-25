import { FC, useState, useRef } from "react";
import { Paper, Box } from "@mui/material";
import { Button, Container } from "./components";
import { Add, Print } from "@mui/icons-material";
import CreateDailyReportModal from "./modals/daily/Create";
import { MUIDate, dailyReportType } from "./helpers/types";
import { DailySubmitReviewReportCard } from "./containers";
import BasicDatePicker from "./components/DateInput";
import ReactToPrint from "react-to-print";
import Header from "./containers/Header";

const App: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [submittedItems, setSubmittedItems] = useState<dailyReportType[]>([]);
  const [startDate, setStartDate] = useState<MUIDate>();

  const printingBox = useRef(null);

  return (
    <Paper square elevation={0} component="main" ref={printingBox}>
      <Container sx={{ my: "20px" }}>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <Box sx={StyleSheet.contentBox}>
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
            <ReactToPrint
              content={() => printingBox.current}
              documentTitle="AwesomeFileName"
              trigger={() => (
                <Button
                  startIcon={<Print />}
                  variant="outlined"
                  onClick={() => setOpenCreate(true)}
                >
                  دریافت گزارش
                </Button>
              )}
            />
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

const stlyes = {
  contentBox: {
    my: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
    alignItems: "flex-start",
  },
};

export default App;
