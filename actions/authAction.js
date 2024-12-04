import axiosInstance from "../service/axiosInstance";

const authFactory = {};

authFactory.signupOTP = async (data) => {
  const response = await axiosInstance.post("signup-otp", data);
  return response;
};

authFactory.validateOTP = async (data) => {
  const response = await axiosInstance.post("verify-otp", data);
  return response;
};

authFactory.createAccount = async (data) => {
  const response = await axiosInstance.post("signup", data);
  return response;
};

authFactory.signin = async (data) => {
  const response = await axiosInstance.post("signin", data);
  return response;
};

authFactory.logout = async () => {
  const response = await axiosInstance.put("logout");
  return response;
};

export default authFactory;
