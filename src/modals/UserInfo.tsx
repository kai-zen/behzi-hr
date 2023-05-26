import { FC } from "react";
import { Dialog, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import dailyReportFormSchema from "../helpers/schema/dailyReport";
import { CheckCircle } from "@mui/icons-material";
import { Button, TextInput } from "../components";
import { userData } from "../helpers/types";

interface propTypes {
  open: boolean;
  handleClose: () => void;
  submit: (userData: userData) => void;
}

const initialValues: {
  name: string;
  job: string;
} = {
  name: localStorage.getItem("name") || "",
  job: localStorage.getItem("job") || "",
};

const UserInfoModal: FC<propTypes> = ({ open, handleClose, submit }) => {
  // form stuff
  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema: dailyReportFormSchema,
    onSubmit: (values) => {
      const photo = localStorage.getItem("uploadedImage");
      const { name, job } = values;
      localStorage.setItem("job", job);
      localStorage.setItem("name", name);
      submit({ name, job, image: photo || "" });
      handleClose();
    },
  });

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        <Typography variant="h6">اطلاعات کاربری</Typography>
        <TextInput
          label="نام"
          name="name"
          onChange={handleChange}
          value={values.name}
          error={errors.name}
        />
        <TextInput
          label="عنوان شغلی"
          name="job"
          onChange={handleChange}
          value={values.job}
          error={errors.job}
        />
        <Button
          type="submit"
          startIcon={<CheckCircle />}
          disabled={!values.name || !values.job}
        >
          ثبت اطلاعات
        </Button>
      </Box>
    </Dialog>
  );
};

const styles = {
  form: {
    p: "24px",
    display: "flex",
    width: "600px",
    flexDirection: "column",
    gap: "24px",
    alignItems: "flex-start",
  },
};

export default UserInfoModal;
