import { FC, ReactNode } from "react";
import { Button as MUIButton } from "@mui/material";

interface propTypes {
  children: ReactNode;
}

const Button: FC<propTypes> = ({ children, ...props }) => {
  return (
    <MUIButton variant="contained" disableElevation {...props}>
      {children}
    </MUIButton>
  );
};

export default Button;
