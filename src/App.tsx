import { FC, useState } from "react";
import { Paper, Box } from "@mui/material";
import { Button, Container, Tabs } from "./components";
import { Add } from "@mui/icons-material";

const App: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <Paper square elevation={0}>
      <Container>
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
          <Button>اطلاعات کاربری</Button>
        </Box>
        <Box sx={{ my: "40px" }}>
          <Button startIcon={<Add />} variant="outlined">
            افزودن مورد جدید
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};

export default App;
