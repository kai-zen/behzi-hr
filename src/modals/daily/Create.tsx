import { FC } from "react";
import { Dialog, Box, Typography, IconButton } from "@mui/material";
import { Button, TextInput } from "../../components";
import { useFormik } from "formik";
import dailyReportFormSchema from "../../helpers/schema/dailyReport";
import { Add, CheckCircle } from "@mui/icons-material";

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
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: dailyReportFormSchema,
    onSubmit: (values) => {
      const { title, description, items } = values;
      submit({ title, description, items });
      resetForm();
      handleClose();
    },
  });

  const addItemHandler = () => {
    if (values.typingItem) {
      setFieldValue("items", [...values.items, values.typingItem]);
      setFieldValue("typingItem", "");
    }
  };

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
        <Typography variant="h6">افزودن به گزارش روزانه</Typography>
        <TextInput
          label="عنوان"
          name="title"
          onChange={handleChange}
          value={values.title}
          error={errors.title}
        />
        <Box className="flex-8" sx={{ width: "100%" }}>
          <TextInput
            label="موارد انجام شده"
            name="typingItem"
            onChange={handleChange}
            value={values.typingItem}
            onKeydown={addItemHandler}
          />
          <IconButton
            sx={{
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
              color: "common.white",
            }}
            size="small"
            onClick={addItemHandler}
          >
            <Add />
          </IconButton>
        </Box>

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
        <Button
          type="submit"
          startIcon={<CheckCircle />}
          disabled={!values.title}
        >
          ثبت گزارش
        </Button>
      </Box>
    </Dialog>
  );
};

export default CreateDailyReportModal;