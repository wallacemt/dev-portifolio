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
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Erro ao fazer login"
    );
  }
};
