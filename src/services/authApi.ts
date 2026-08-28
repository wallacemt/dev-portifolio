import { API } from "@/lib/axios";
import { LoginResponse } from "@/types/auth";
import { OwnerResponse } from "@/types/owner";

export const loginOwner = async (
  email: string,
  password: string
): Promise<LoginResponse & { owner: OwnerResponse }> => {
  try {
    const response = await API.post(`/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    const apiError = (error as { response?: { data?: { error?: unknown } } }).response?.data?.error;
    const message = typeof apiError === "string" ? apiError : "Erro ao fazer login";
    throw new Error(message);
  }
};
