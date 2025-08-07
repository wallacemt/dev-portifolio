import { API, ownerId } from "@/lib/axios";
import { OwnerResponse } from "@/types/owner";

export const getOwner = async (language: string = "pt"): Promise<OwnerResponse> => {
  try {
    const ownerId = process.env.OWNER_ID || "";
    const response = await API.get(`/owner/${ownerId}?language=${language}`);
    return response.data as OwnerResponse;
  } catch (error) {
    throw error;
  }
};

export const verifySecretWord = async (secretWord: string): Promise<{ message: string; isValid: boolean }> => {
  try {
    const response = await API.post(`/owner/${ownerId}/verify-secret-word`, { secretWord });
    return response.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Erro ao verificar palavra secreta"
    );
  }
};
