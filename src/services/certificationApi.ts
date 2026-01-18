import { API, ownerId, setupAuth } from "@/lib/axios";
import type { Certification, CertificationInput } from "@/types/badges";

export const getAllCertifications = async (language: string = "pt"): Promise<Certification[]> => {
  try {
    const response = await API.get<Certification[]>(`/certifications/owner/${ownerId}?language=${language}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCertificationById = async (id: string, language: string = "pt"): Promise<Certification> => {
  try {
    const response = await API.get<Certification>(`/certifications/${id}?language=${language}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCertification = async (
  data: CertificationInput,
): Promise<{ message: string; certification: Certification }> => {
  try {
    setupAuth();
    const response = await API.post("/certifications/private/create", data);
    return response.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Erro ao criar certificação",
    );
  }
};

export const updateCertification = async (
  id: string,
  data: Partial<CertificationInput>,
): Promise<{ message: string; certification: Certification }> => {
  try {
    setupAuth();
    const response = await API.put(`/certifications/private/${id}/update`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Erro ao atualizar certificação",
    );
  }
};

export const deleteCertification = async (id: string): Promise<{ message: string }> => {
  try {
    setupAuth();
    const response = await API.delete(`/certifications/private/${id}/delete`);
    return response.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Erro ao deletar certificação",
    );
  }
};
