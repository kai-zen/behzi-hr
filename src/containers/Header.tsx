import { Box, Typography } from "@mui/material";
import { Button, Tabs } from "../components";
import { Person } from "@mui/icons-material";
import { FC } from "react";

interface propTypes {
  activeTab: number;
  setActiveTab: (val: number) => void;
  open: () => void;
}

const Header: FC<propTypes> = ({ activeTab, setActiveTab, open }) => {
  return (
    <Box component="header">
      <Typography variant="h5" sx={styles.title}>
        سامانه گزارش دهی پروژه{" "}
        <Box component="span" sx={{ color: "primary.main" }}>
          بهزی
        </Box>
      </Typography>
      <Box sx={styles.secondRow}>
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          tabItems={["روزانه", "هفتگی"]}
        />
        <Button startIcon={<Person />} onClick={open}>
          اطلاعات کاربری
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  title: { textAlign: "center", my: "20px", fontWeight: "600" },
  secondRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default Header;
