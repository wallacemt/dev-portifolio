import { LenguagesResponse, NavbarItens } from "@/types/utilis";
import { API } from "@/lib/axios";

export async function getNavbarItems(language = "pt"): Promise<NavbarItens> {
  const res = await API.get(`/utilis/navbar`, {
    params: { lenguage: language },
  });
  return res.data as NavbarItens;
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
