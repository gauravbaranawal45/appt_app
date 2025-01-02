import axiosInstance from "../service/axiosInstance";

const appointmentFactory = {};

appointmentFactory.getFees = async (id) => {
  const response = await axiosInstance.get("get-fees", {
    params: {
      id,
    },
  });
  return response;
};

appointmentFactory.schedules = async (id) => {
  const response = await axiosInstance.get("schedules", {
    params: {
      id,
    },
  });
  return response;
};

appointmentFactory.getMember = async (data) => {
  const response = await axiosInstance.get("get-member", data);
  return response;
};

appointmentFactory.addMember = async (data) => {
  const response = await axiosInstance.post("add-member", data);
  return response;
};

appointmentFactory.deleteMember = async (id) => {
  const response = await axiosInstance.get("delete-member", {
    params: {
      id,
    },
  });
  return response;
};

appointmentFactory.createAppointment = async (data) => {
  const response = await axiosInstance.post("create-appointment", data);
  return response;
};

appointmentFactory.getAppointments = async ({ limit, apptType }) => {
  const response = await axiosInstance.get("appointments", {
    params: {
      limit: limit,
      apptType,
    },
  });
  return response;
};

appointmentFactory.appointmentDetail = async (id) => {
  const response = await axiosInstance.get("appointmentDetail", {
    params: {
      id,
    },
  });
  return response;
};

appointmentFactory.cancelAppointment = async (data, id) => {
  const response = await axiosInstance.post("cancel-appointment", data, {
    params: {
      id,
    },
  });
  return response;
};

appointmentFactory.rescheduleAppt = async (data, id) => {
  const response = await axiosInstance.post("reschedule-appt", data, {
    params: {
      id,
    },
  });
  return response;
};

appointmentFactory.getschedulelist = async (docId) => {
  const response = await axiosInstance.get("get-schedule", {
    params: {
      docId,
    },
  });
  return response;
};

export default appointmentFactory;
