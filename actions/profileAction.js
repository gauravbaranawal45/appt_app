import axiosInstance from "../service/axiosInstance";

const profileFactory = {};

profileFactory.getState = async () => {
  const response = await axiosInstance.get("get-states");
  return response;
};

profileFactory.getCity = async () => {
  const response = await axiosInstance.get("get-cities");
  return response;
};

profileFactory.accounts = async () => {
  const response = await axiosInstance.get("accounts");
  return response;
};

profileFactory.getProfile = async () => {
  const response = await axiosInstance.get("get-profile");
  return response;
};

profileFactory.changePassword = async (data) => {
  const response = await axiosInstance.post("change-password", data);
  return response;
};

profileFactory.updateProfile = async (data) => {
  const response = await axiosInstance.post("updateprofile", data);
  return response;
};

profileFactory.uploadimg = async (data) => {
  const response = await axiosInstance.post("profile-img", data);
  return response;
};

profileFactory.saveAddress = async (data) => {
  const response = await axiosInstance.post("save-address", data);
  return response;
};

profileFactory.getAddress = async () => {
  const response = await axiosInstance.get("get-address");
  return response;
};

profileFactory.updateAddress = async (data, id) => {
  const response = await axiosInstance.post("update-address", data, {
    params: {
      id,
    },
  });
  return response;
};

profileFactory.deleteAddress = async (id) => {
  const response = await axiosInstance.get("delete-address", {
    params: {
      id,
    },
  });
  return response;
};

profileFactory.getUserOwnReview = async () => {
  const response = await axiosInstance.get("get-userOwnReview", {
    params: {},
  });
  return response;
};

profileFactory.deleteOwnReview = async (id) => {
  const response = await axiosInstance.get("delete-review", {
    params: {
      id,
    },
  });
  return response;
};

profileFactory.getStaticPage = async (data) => {
  const response = await axiosInstance.get("get-single_static_page", {
    params: {
      name: data,
    },
  });
  return response;
};

export default profileFactory;
