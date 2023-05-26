import * as yup from "yup";

const userInfoFormSchema = yup.object({
  name: yup.string().required("نام وارد شود").max(60, "حداکثر 60 کاراکتر باشد"),
  job: yup
    .string()
    .required("عنوان شغلی وارد شود")
    .max(60, "حداکثر 60 کاراکتر باشد"),
});

export default userInfoFormSchema;
