import { FC, ReactNode } from "react";
import { Button as MUIButton } from "@mui/material";

interface propTypes {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: "contained" | "text" | "outlined";
}

const Button: FC<propTypes> = ({
  children,
  variant = "contained",
  ...props
}) => {
  return (
    <MUIButton variant={variant} disableElevation {...props}>
      {children}
    </MUIButton>
  );
};

export default Button;
