import * as yup from "yup";
import phoneRegExp from "../constants/regex";

export const appointmentSchema = yup.object().shape({
  patientName: yup.string().required("Patient name is required field"),
  mobile: yup
    .string()
    .required("Mobile number is required field")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Phone number is not valid")
    .max(10, "Phone number is not valid"),
  age: yup.string().required("Age is required field"),
  address: yup.string().required("Address is required field"),
  gender: yup.string().required("Gender is required field"),
  patientEmail: yup.string(),
});
