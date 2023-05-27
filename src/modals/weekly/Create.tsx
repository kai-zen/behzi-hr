import { FC } from "react";
import { Dialog, Box, Typography, IconButton } from "@mui/material";
import { Button, Dropdown, TextInput } from "../../components";
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
  immediateLevel: "1" | "2" | "3";
  importanceLevel: "1" | "2" | "3";
} = {
  title: "",
  typingItem: "",
  items: [],
  description: "",
  immediateLevel: "1",
  importanceLevel: "1",
};

const CreateWeeklyReportModal: FC<propTypes> = ({
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

  const deleteItemHandler = (item: string) => {
    if (item) {
      const filtered = [...values.items].filter((i) => i !== item);
      setFieldValue("items", filtered);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        <Typography variant="h6">افزودن به گزارش هفتگی</Typography>
        <TextInput
          label="عنوان"
          name="title"
          onChange={handleChange}
          value={values.title}
          error={errors.title}
        />
        <Box className="flex-8" sx={{ width: "100%" }}>
          <TextInput
            label="موارد انجام"
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
        <Box sx={styles.items}>
          {values.items.map((item, index) => (
            <Box key={index} sx={styles.item}>
              <Box sx={styles.bullet} />
              <Typography
                variant="caption"
                sx={{
                  "&:hover": {
                    color: "error.main",
                    cursor: "pointer",
                  },
                }}
                onClick={() => deleteItemHandler(item)}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
        <TextInput
          label="توضیحات بیشتر"
          name="description"
          onChange={handleChange}
          value={values.description}
          error={errors.description}
          multiline
          rows={4}
        />
        <Box className="flex-12" sx={{ width: "100%" }}>
          <Dropdown
            value={values.immediateLevel}
            label="درجه فوریت"
            onChange={(e) => setFieldValue("immediateLevel", e.target.value)}
            items={[
              { value: "1", title: "غیر فوری" },
              { value: "2", title: "نیمه فوری" },
              { value: "3", title: "کاملا مهم" },
            ]}
          />
          <Dropdown
            value={values.importanceLevel}
            label="درجه اهمیت"
            onChange={(e) => setFieldValue("importanceLevel", e.target.value)}
            items={[
              { value: "1", title: "کم اهمیت" },
              { value: "2", title: "نیمه مهم" },
              { value: "3", title: "کاملا مهم" },
            ]}
          />
        </Box>

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

const styles = {
  form: {
    p: "24px",
    display: "flex",
    width: "600px",
    flexDirection: "column",
    gap: "24px",
    alignItems: "flex-start",
  },
  bullet: {
    width: "4px",
    height: "4px",
    borderRadius: "2px",
    bgcolor: "primary.main",
    opacity: ".75",
  },
  item: { display: "flex", alignItems: "center", gap: "4px" },
  items: { isplay: "flex", flexDirection: "column", gap: "10px" },
};

export default CreateWeeklyReportModal;
