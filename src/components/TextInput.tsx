import { FC } from "react";
import { TextField } from "@mui/material";
import { changeHandler, keydownHandler } from "@/helpers/types";

interface propTypes {
  error?: string;
  label?: string;
  name?: string;
  value?: string;
  onChange?: changeHandler;
  multiline?: boolean;
  rows?: number;
  onKeydown?: keydownHandler;
}

const TextInput: FC<propTypes> = ({ error, ...props }) => {
  return (
    <TextField
      size="small"
      fullWidth
      autoComplete="off"
      InputLabelProps={{ style: { color: "inherit" } }}
      error={Boolean(error)}
      helperText={error}
      {...props}
      sx={{
        color: "text.primary",
        borderRadius: "8px",
      }}
    />
  );
};

export default TextInput;
