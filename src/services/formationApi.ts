import { API, ownerId } from "@/lib/axios";
import { FormationResponse } from "@/types/formations";
export const getFormations = async (language: string = "pt"): Promise<FormationResponse> => {
  try {
    const response = await API.get<FormationResponse>(`/formations/owner/${ownerId}?language=${language}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
