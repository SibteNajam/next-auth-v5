import * as yup from "yup";

export const ConnectDBR = yup.object({
  hostname: yup.string().required("Host name is required"),
  portnumber: yup.string().required("Port number is required"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});
