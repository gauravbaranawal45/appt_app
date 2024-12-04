import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const imgPath = "http://172.20.10.13:4001/";
export const imgPath = "http://192.168.1.8:4001/";

// export const apipath = "http://172.20.10.13:4001/api/";
export const apipath = "http://192.168.1.8:4001/api/";

const axiosInstance = axios.create({
  baseURL: apipath,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("__token");
    // console.log("tokentokentoken", token);
    if (token) {
      config.headers.Authorization = "Bearer " + token;
      //console.log(config.headers.Authorization)
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
