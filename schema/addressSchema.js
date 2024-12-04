import * as yup from "yup";
import phoneRegExp from "../constants/regex";

export const addressSchema = yup.object().shape({
  fullName: yup.string().required("Fullname is required field"),
  phoneNumber: yup
    .string()
    .required("Mobile number is required field")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Phone number is not valid")
    .max(10, "Phone number is not valid"),
  pinCode: yup.string().required("Pincode is required field"),
  state: yup.string().required("State is required field"),
  city: yup.string().required("City is required field"),
  house_street: yup
    .string()
    .required("House No./ Street Name/ Area is required field"),
  colony_area: yup
    .string()
    .required("Colony / Area / Locality is required field"),
});
