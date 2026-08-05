import { API, ownerId, setupAuth } from "@/lib/axios";
import { AiConfigResponse, OwnerDataOptionalRequest, OwnerResponse, UpdateAiConfigRequest } from "@/types/owner";

export const getOwner = async (language: string = "pt"): Promise<OwnerResponse> => {
  try {
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

export const updateOwner = async (data: OwnerDataOptionalRequest): Promise<OwnerResponse> => {
  try {
    setupAuth();
    const response = await API.put(`/owner/private/update`, data);
    return response.data as OwnerResponse;
  } catch (error) {
    throw error;
  }
};

export const getAiConfig = async (): Promise<AiConfigResponse> => {
  try {
    await setupAuth();
    const response = await API.get<AiConfigResponse>(`/owner/private/ai-config`);
    return response.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Erro ao carregar configuração de IA"
    );
  }
};

export const updateAiConfig = async (data: UpdateAiConfigRequest): Promise<AiConfigResponse> => {
  try {
    await setupAuth();
    const response = await API.patch<AiConfigResponse>(`/owner/private/ai-config`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Erro ao atualizar modelo de IA"
    );
  }
};
