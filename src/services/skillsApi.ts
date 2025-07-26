import { API, ownerId } from "@/lib/axios";
import {  SkillResponse } from "@/types/skills";

export const getSkills = async (language: string = "pt"): Promise<SkillResponse> => {
  try {
    const response = await API.get(`/skills/owner/${ownerId}?language=${language}`);
    return response.data as SkillResponse;
  } catch (error) {
    throw error;
  }
};
