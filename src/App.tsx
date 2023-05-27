import { FC, useState } from "react";
import { Paper } from "@mui/material";
import { Container } from "@/components";
import Header from "@/containers/Header";
import UserInfoModal from "@/modals/UserInfo";
import DailyTab from "@/containers/DailyTab";
import WeeklyTab from "@/containers/WeeklyTab";

const App: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [openUserInfo, setOpenUserInfo] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({
    image: localStorage.getItem("uploadedImage") || "",
    name: localStorage.getItem("name") || "",
    job: localStorage.getItem("job") || "",
  });

  return (
    <Paper square elevation={0} component="main">
      <Container sx={{ my: "20px" }}>
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          open={() => setOpenUserInfo(true)}
        />
        {activeTab === 1 && <DailyTab userInfo={userInfo} />}
        {activeTab === 2 && <WeeklyTab userInfo={userInfo} />}
      </Container>
      <UserInfoModal
        open={openUserInfo}
        handleClose={() => setOpenUserInfo(false)}
        submit={setUserInfo}
      />
    </Paper>
  );
};

export default App;
