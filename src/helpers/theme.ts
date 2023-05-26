import { createTheme } from "@mui/material";

export const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "rgb(112,130,245)",
      light: "rgba(112,130,245, 0.05)",
    },
    secondary: {
      main: "#FF8D14",
    },
  },
  typography: {
    fontFamily: "IRANSansfa",
  },
});
