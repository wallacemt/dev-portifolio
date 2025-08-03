import { LenguagesResponse, NavbarItens } from "@/types/utilis";
import { API } from "@/lib/axios";

export async function getNavbarItems(language = "pt"): Promise<NavbarItens> {
  const res = await API.get(`/utilis/navbar`, {
    params: { language },
  });
  return res.data as NavbarItens;
}



export async function getAvailableLanguages(): Promise<LenguagesResponse> {
  try {
    const res = await API.get<LenguagesResponse>(`/utilis/languages`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
