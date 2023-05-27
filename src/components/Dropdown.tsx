import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";

interface propTypes {
  label: string;
  items: { title: string; value: string }[];
  value: string;
  onChange: (e: SelectChangeEvent) => void;
}

const Dropdown: FC<propTypes> = ({ label, items, ...props }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select size="small" label={label} {...props}>
        {items.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
