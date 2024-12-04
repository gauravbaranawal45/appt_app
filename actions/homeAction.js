import axiosInstance from "../service/axiosInstance";

const homeFactory = {};

homeFactory.accounts = async () => {
  const response = await axiosInstance.get("accounts");
  return response;
};

homeFactory.doctorSearch = async ({ query }) => {
  const response = await axiosInstance.get("doctorSearch", {
    params: {
      query,
    },
  });
  return response;
};

homeFactory.getDoctors = async ({ limit, specialization }) => {
  const response = await axiosInstance.get("doctors-list", {
    params: {
      limit,
      specialization,
    },
  });
  return response;
};

homeFactory.home = async ({ limit }) => {
  const response = await axiosInstance.get("home", {
    params: {
      limit: limit,
    },
  });
  return response;
};

homeFactory.getAllSpecialization = async (param) => {
  const response = await axiosInstance.get("specializatio-list", {
    params: {
      ...param,
    },
  });
  return response;
};

homeFactory.doctorDetail = async (id) => {
  const response = await axiosInstance.get("doctor-detail", {
    params: {
      id,
    },
  });
  return response;
};

homeFactory.doctorSpecialization = async (id) => {
  const response = await axiosInstance.get("doctor-specialization", {
    params: {
      id,
    },
  });
  return response;
};

homeFactory.cities = async () => {
  const response = await axiosInstance.get("city-list");
  return response;
};

homeFactory.savePatientReview = async (data) => {
  const response = await axiosInstance.post("save-patientReview", data);
  return response;
};

homeFactory.getDoctorReview = async ({ id, filter, limit, page }) => {
  const response = await axiosInstance.get("get-patientReview", {
    params: {
      id,
      filter,
      limit,
      page,
    },
  });
  return response;
};

homeFactory.getUserOwnReview = async ({ id, filter, limit, page }) => {
  const response = await axiosInstance.get("get-patientReview", {
    params: {
      id,
      filter,
      limit,
      page,
    },
  });
  return response;
};

homeFactory.getReviewDetails = async (id) => {
  const response = await axiosInstance.get("get-reviewDetails", {
    params: {
      id,
    },
  });
  return response;
};

homeFactory.editPatientReview = async (data, id) => {
  const response = await axiosInstance.post("edit-patientReview", data, {
    params: {
      id,
    },
  });
  return response;
};

export default homeFactory;
