import axiosInstance from "../service/axiosInstance";

const notificationFactory = {};

notificationFactory.notificationList = async () => {
  const response = await axiosInstance.get("notification-list");
  return response;
};

export default notificationFactory;
