import { API, ownerId } from "@/lib/axios";
import {  ServicesResponse } from "@/types/services";


export const getService = async (language: string = "pt"): Promise<ServicesResponse> => {
  try {
    const response = await API.get(`/services/owner/${ownerId}?language=${language}`);
    return response.data as ServicesResponse;
  } catch (error) {
    throw error;
  }
};
