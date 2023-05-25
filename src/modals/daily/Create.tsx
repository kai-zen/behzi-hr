import { FC } from "react";
import { Dialog, Box, Typography } from "@mui/material";
import { Button, TextInput } from "../../components";
import { useFormik } from "formik";
import dailyReportFormSchema from "../../helpers/schema/dailyReport";
import { CheckCircle } from "@mui/icons-material";

interface propTypes {
  open: boolean;
  handleClose: () => void;
  submit: (dailyReportData: {
    title: string;
    description: string;
    items: string[];
  }) => void;
}

const initialValues: {
  title: string;
  typingItem: string;
  items: string[];
  description: string;
} = {
  title: "",
  typingItem: "",
  items: [],
  description: "",
};

const CreateDailyReportModal: FC<propTypes> = ({
  open,
  handleClose,
  submit,
}) => {
  // form stuff
  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema: dailyReportFormSchema,
    onSubmit: (values) => {
      const { title, description, items } = values;
      submit({ title, description, items });
    },
  });

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: "24px",
          display: "flex",
          width: "600px",
          flexDirection: "column",
          gap: "24px",
          alignItems: "flex-start",
        }}
      >
        <TextInput
          label="عنوان"
          name="title"
          onChange={handleChange}
          value={values.title}
          error={errors.title}
        />
        <TextInput
          label="موارد انجام شده"
          name="typingItem"
          onChange={handleChange}
          value={values.typingItem}
        />
        {values.items.map((item, index) => (
          <Typography key={index}>{item}</Typography>
        ))}
        <TextInput
          label="توضیحات بیشتر"
          name="description"
          onChange={handleChange}
          value={values.description}
          error={errors.description}
          multiline
          rows={4}
        />
        <Button type="submit" startIcon={<CheckCircle />}>
          ثبت گزارش
        </Button>
      </Box>
    </Dialog>
  );
};

export default CreateDailyReportModal;
