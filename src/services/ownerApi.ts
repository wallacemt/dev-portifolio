// export async function getNavbarItems(language = "pt") {
//   const res = await API.get(`/utilis/navbar`, {
//     params: { lenguage: language },
//   });
//   return res.data;
// }

import { OwnerResponse } from "@/types/owner";
import { API } from "./api";

export const getOwner = async (language: string = "pt"): Promise<OwnerResponse> => {
  try {
    const ownerId = process.env.OWNER_ID;
    const response = await API.get(`/owner/${ownerId}`);
    return response.data as OwnerResponse;
  } catch (error) {
    throw error;
  }
};

