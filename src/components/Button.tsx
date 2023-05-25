/* eslint-disable @typescript-eslint/ban-types */
import { FC, MouseEventHandler, ReactNode } from "react";
import { Button as MUIButton } from "@mui/material";

interface propTypes {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: "contained" | "text" | "outlined";
  type?: "submit" | "button" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
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
