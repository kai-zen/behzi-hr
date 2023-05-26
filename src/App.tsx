import { FC, useState, useRef, Fragment } from "react";
import {
  Paper,
  Box,
  Grid,
  Divider,
  Typography,
  Avatar,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Button, Container } from "./components";
import { Add, Print } from "@mui/icons-material";
import CreateDailyReportModal from "./modals/daily/Create";
import { MUIDate, dailyReportType } from "./helpers/types";
import { DailySubmitReviewReportCard } from "./containers";
import moment from "moment-jalaali";
import BasicDatePicker from "./components/DateInput";
import ReactToPrint from "react-to-print";
import Header from "./containers/Header";
import UserInfoModal from "./modals/UserInfo";

const App: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUserInfo, setOpenUserInfo] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({
    image: "",
    name: "",
    job: "",
  });

  const [submittedItems, setSubmittedItems] = useState<dailyReportType[]>([]);
  const [startDate, setStartDate] = useState<MUIDate>();
  const [showActionButtons, setShowActionButtons] = useState<boolean>(false);

  const printingBox = useRef(null);

  return (
    <Paper square elevation={0} component="main">
      <Container sx={{ my: "20px" }}>
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          open={() => setOpenUserInfo(true)}
        />
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
                    showActionButtons={showActionButtons}
                  />
                  {index < submittedItems.length - 1 && (
                    <Divider sx={{ width: "96%" }} />
                  )}
                </Fragment>
              ))}
              <Typography sx={styles.date}>
                {moment(startDate).format("jYYYY/jMM/jDD")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <CreateDailyReportModal
        open={openCreate}
        handleClose={() => setOpenCreate(false)}
        submit={(item) => setSubmittedItems((prev) => [...prev, item])}
      />
      <UserInfoModal
        open={openUserInfo}
        handleClose={() => setOpenUserInfo(false)}
        submit={setUserInfo}
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
    p: "16px",
    bgcolor: "primary.light",
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

export default App;
