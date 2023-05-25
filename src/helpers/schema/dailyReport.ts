import * as yup from "yup";

const dailyReportFormSchema = yup.object({
  title: yup
    .string()
    .required("عنوان وارد شود")
    .max(100, "حداکثر 100 کاراکتر باشد"),
  items: yup
    .array()
    .of(yup.string().max(100, "حداکثر 100 کاراکتر باشد"))
    .max(10, "حداکثر ده مورد عنوان شود"),
  description: yup.string().max(250, "حداکثر 250 کاراکتر باشد"),
});

export default dailyReportFormSchema;
