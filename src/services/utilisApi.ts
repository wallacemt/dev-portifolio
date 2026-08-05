import { AiModelsResponse, LenguagesResponse, NavbarItens } from "@/types/utilis";
import { API, setupAuth } from "@/lib/axios";

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

export async function getAiModels(): Promise<AiModelsResponse> {
  try {
    await setupAuth();
    const res = await API.get<AiModelsResponse>(`/utilis/ai-models`);
    return res.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Erro ao carregar modelos de IA"
    );
  }
}
