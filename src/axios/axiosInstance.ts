import axios, { AxiosInstance, AxiosResponse } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_CONTEXT,
});

axiosInstance.interceptors.request.use((req) => req);

axiosInstance.interceptors.response.use((res: AxiosResponse) => res);

export default axiosInstance;
