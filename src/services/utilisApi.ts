import { LenguagesResponse } from "@/types/utilis";
import { API } from "./api";

export async function getNavbarItems(language = "pt") {
  const res = await API.get(`/utilis/navbar`, {
    params: { lenguage: language },
  });
  return res.data;
}

export async function getServiceItems(language = "pt") {
  const res = await API.get(`/utilis/services`, {
    params: { lenguage: language },
  });
  return res.data;
}

export async function getAvailableLanguages(): Promise<LenguagesResponse> {
  try {
    const res = await API.get<LenguagesResponse>(`/utilis/lenguages`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
