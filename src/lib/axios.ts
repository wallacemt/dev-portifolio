import axios from "axios";

import { cookieUtils } from "./cookies";

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

export const setupAuth = async () => {
  let token = cookieUtils.getAuthToken();
  if (!token && typeof window === "undefined") {
    try {
      token = await cookieUtils.getServerAuthToken();
    } catch (error) {
      throw new Error(`Erro ao obter token de autenticação no servidor: ${error}`);
    }
  }
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }

  if (!token) {
    throw new Error("Token de autenticação não encontrado");
  }
  return token;
};
