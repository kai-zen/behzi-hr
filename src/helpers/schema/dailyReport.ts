import * as yup from "yup";

const dailyReportFormSchema = yup.object({
  title: yup
    .string()
    .required("عنوان وارد شود")
    .max(120, "حداکثر 120 کاراکتر باشد"),
  items: yup
    .array()
    .of(yup.string().max(100, "حداکثر 100 کاراکتر باشد"))
    .max(10, "حداکثر ده مورد عنوان شود"),
  description: yup.string().max(500, "حداکثر 500 کاراکتر باشد"),
});

export default dailyReportFormSchema;
