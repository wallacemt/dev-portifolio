import { API, ownerId, setupAuth } from "@/lib/axios";
import type { Badge, BadgeInput, BadgeResponse } from "@/types/badges";

export const getAllBadges = async (language: string = "pt"): Promise<BadgeResponse> => {
  try {
    const response = await API.get<BadgeResponse>(`/badges/owner/${ownerId}?language=${language}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBadgeById = async (id: string, language: string = "pt"): Promise<Badge> => {
  try {
    const response = await API.get<Badge>(`/badges/${id}?language=${language}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBadge = async (data: BadgeInput): Promise<{ message: string; badge: Badge }> => {
  try {
    setupAuth();
    const response = await API.post("/badges/private/create", data);
    return response.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Erro ao criar badge",
    );
  }
};

export const updateBadge = async (
  id: string,
  data: Partial<BadgeInput>,
): Promise<{ message: string; badge: Badge }> => {
  try {
    setupAuth();
    const response = await API.put(`/badges/private/${id}/update`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Erro ao atualizar badge",
    );
  }
};

export const deleteBadge = async (id: string): Promise<{ message: string }> => {
  try {
    setupAuth();
    const response = await API.delete(`/badges/private/${id}/delete`);
    return response.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Erro ao deletar badge",
    );
  }
};
