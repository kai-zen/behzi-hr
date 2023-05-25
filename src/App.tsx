import { FC, useState, useRef, Fragment } from "react";
import { Paper, Box, Grid, Divider } from "@mui/material";
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
    <Paper square elevation={0} component="main">
      <Container sx={{ my: "20px" }}>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <Grid container spacing="16px" sx={{ my: "40px" }}>
          <Grid item xs={12} lg={4}>
            <Box sx={styles.controller}>
              <BasicDatePicker
                value={startDate}
                onChange={(val) => val && setStartDate(val)}
              />
              <Box className="flex-8">
                <Button
                  startIcon={<Add />}
                  onClick={() => setOpenCreate(true)}
                  sx={{ width: "50%" }}
                >
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
                      sx={{ width: "50%" }}
                    >
                      دریافت گزارش
                    </Button>
                  )}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Box ref={printingBox} sx={styles.printingBox}>
              {submittedItems.map((item, index) => (
                <Fragment key={index}>
                  <DailySubmitReviewReportCard data={item} />
                  {index < submittedItems.length - 1 && (
                    <Divider sx={{ width: "96%" }} />
                  )}
                </Fragment>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <CreateDailyReportModal
        open={openCreate}
        handleClose={() => setOpenCreate(false)}
        submit={(item) => setSubmittedItems((prev) => [...prev, item])}
      />
    </Paper>
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
  },
};

export default App;
