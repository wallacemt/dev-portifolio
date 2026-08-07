import axios from "axios";

import { cookieUtils } from "./cookies";

export function getBaseURL() {
  if (typeof window === "undefined") {
    return process.env.API_URL || "https://api.wallacedev.com.br";
  }
  return process.env.NEXT_PUBLIC_API_URL || "https://api.wallacedev.com.br";
}

export function getSiteURL() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://wallacedev.com.br";
}

// ponytail: hardcoded default is the production owner's real id (single-tenant
// app, only one owner ever exists). Override via NEXT_PUBLIC_OWNER_ID when the
// locally-registered owner has a different Mongo _id (fresh local DB) — the
// SSE analytics channel is keyed by this id, so a mismatch here means the
// dashboard and the public tracking calls talk to two different channels.
export const ownerId =
  process.env.NEXT_PUBLIC_OWNER_ID ?? "685b41be6ba068f5fbe56d71";

export const API = axios.create({
  baseURL: getBaseURL(),
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
  },
);

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
