import * as yup from 'yup';

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const validateEmail = (email) => {
  return yup.string().email().isValidSync(email);
};
export const validatePhone = (phone) => {
  return yup
    .number()
    .integer()
    .positive()
    .test((phone) => {
      return phone && phone.toString().length === 10 ? true : false;
    })
    .isValidSync(phone);
};
