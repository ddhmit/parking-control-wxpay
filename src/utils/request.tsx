import axios, { AxiosError } from "axios";
import apiConfig from "../config/api";
import env from "./env";

let axiosInstance = axios.create({
  timeout: apiConfig.Timeout,
  baseURL: apiConfig.BaseUrl,
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      error.message = error.response.data.msg || error.response.data.message;
    }
    // timeout: ECONNABORTED timeout of 5000ms exceeded
    // offline: undefined Network Error
    // message.error(error.message);
    // 非生产环境下的请求报错
    !env.IsProd && console.log("axios error =>", error.toJSON());
    throw error;
  }
);

export default axiosInstance;
