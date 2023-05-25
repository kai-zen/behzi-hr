import { FC } from "react";
import { TextField } from "@mui/material";
import jMoment from "moment-jalaali";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import JalaliUtils from "@date-io/jalaali";
import { MUIDate, MUIDateChangeHandler } from "../helpers/types";

jMoment.loadPersian({
  dialect: "persian-modern",
  usePersianDigits: true,
});

interface propTypes {
  value: MUIDate;
  onChange: MUIDateChangeHandler;
  future?: boolean;
  minDate?: MUIDate;
  disabled?: boolean;
  maxDate?: MUIDate;
}

const DateInput: FC<propTypes> = ({ ...props }) => {
  return (
    <LocalizationProvider dateAdapter={JalaliUtils} adapterLocale="fa">
      <DesktopDatePicker
        disableMaskedInput
        {...props}
        inputFormat="jYYYY/jM/jD"
        renderInput={(params) => (
          <TextField
            fullWidth
            size="small"
            {...params}
            onKeyDown={(e) => e.preventDefault()}
            label="تاریخ"
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
