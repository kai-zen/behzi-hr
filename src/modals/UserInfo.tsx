import { ChangeEvent, FC, useState } from "react";
import { Dialog, Box, Typography, Avatar } from "@mui/material";
import { useFormik } from "formik";
import { CheckCircle } from "@mui/icons-material";
import { Button, TextInput } from "@/components";
import { userData } from "@/helpers/types";
import userInfoFormSchema from "@/helpers/schema/userInfo";

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
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(
    localStorage.getItem("uploadedImage")
  );

  // form stuff
  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema: userInfoFormSchema,
    onSubmit: (values) => {
      const { name, job } = values;
      localStorage.setItem("job", job);
      localStorage.setItem("name", name);
      submit({ name, job, image: uploadedPhoto || "" });
      handleClose();
    },
  });

  const handleUploadedPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const photoFile = e?.target?.files?.[0];
    if (photoFile) {
      const reader = new FileReader();
      reader.readAsDataURL(photoFile);
      reader.addEventListener("load", () => {
        setUploadedPhoto(String(reader.result));
        localStorage.setItem("uploadedImage", String(reader.result));
      });
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        <Typography variant="h6">اطلاعات کاربری</Typography>
        <label htmlFor="addPhoto">
          <input
            accept="image/*"
            id="addPhoto"
            type="file"
            hidden
            onChange={handleUploadedPhoto}
          />
          <Avatar
            sx={{ width: "56px", height: "56px", cursor: "pointer" }}
            src={localStorage.getItem("uploadedImage") || ""}
          />
        </label>
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
