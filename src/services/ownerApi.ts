import { API } from "@/lib/axios";
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

