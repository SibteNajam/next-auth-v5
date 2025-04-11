import * as yup from "yup";

export const ConnectDBR = yup.object({
  host: yup.string().required("Host name is required"),
  user: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});
