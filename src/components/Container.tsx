import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface propTypes {
  children: ReactNode;
  sx?: {
    [properties: string]: string;
  };
}

const Container: FC<propTypes> = ({ children, sx }) => {
  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          vs: "calc(100% - 24px)",
          sm: "516px",
          md: "696px",
          lg: "936px",
          vl: "1116px",
          xl: "1296px",
        },
        mx: "auto",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
