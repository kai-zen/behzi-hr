import { FC, ChangeEvent } from "react";
import { TextField } from "@mui/material";
import jMoment from "moment-jalaali";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import JalaliUtils from "@date-io/jalaali";

jMoment.loadPersian({
  dialect: "persian-modern",
  usePersianDigits: true,
});

interface propTypes {
  value: ChangeEvent<HTMLSelectElement> | undefined;
  onChange: (
    value: ChangeEvent<HTMLSelectElement> | null,
    keyboardInputValue?: string | undefined
  ) => void;
  future?: boolean;
  minDate?: ChangeEvent<HTMLSelectElement> | undefined;
  disabled?: boolean;
  maxDate?: ChangeEvent<HTMLSelectElement> | undefined;
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
