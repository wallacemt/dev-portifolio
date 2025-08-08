import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export const baseURL = process.env.API_URL || "http://localhost:8081";
export const API = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
export interface SimpleResponse {
  message: string;
}

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === "ECONNABORTED" && error.config && !error.config.__isRetryRequest) {
      error.config.__isRetryRequest = true;
      return API(error.config);
    }
    return Promise.reject(error);
  }
);

export const ownerId = process.env.OWNER_ID || "";
export const handleToken = (apiInstance: AxiosInstance) => {
  const token = Cookies.get("authToken");
  if (token) {
    return (apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  }
  return;
};
