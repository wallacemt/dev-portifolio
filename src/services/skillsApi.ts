import { API, ownerId } from "@/lib/axios";
import { Skill } from "@/types/skills";

export const getSkills = async (language: string = "pt"): Promise<Skill[]> => {
  try {
    const response = await API.get(`/skills/owner/${ownerId}?=language=${language}`);
    return response.data as Skill[];
  } catch (error) {
    throw error;
  }
};
