import { FC, ChangeEvent, KeyboardEvent } from "react";
import { TextField } from "@mui/material";

interface propTypes {
  error?: string;
  label?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  multiline?: boolean;
  rows?: number;
  onKeydown?: (e: KeyboardEvent<HTMLInputElement>) => void;
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
