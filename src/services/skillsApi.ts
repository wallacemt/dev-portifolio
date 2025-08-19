import { API, ownerId, setupAuth, SimpleResponse } from "@/lib/axios";
import { SkillAddFormData, SkillUpdateFormData } from "@/lib/validations/skills";
import type { Skill, SkillResponse } from "@/types/skills";

export const getSkills = async (language: string = "pt"): Promise<SkillResponse> => {
  try {
    const response = await API.get(`/skills/owner/${ownerId}?language=${language}`);
    return response.data as SkillResponse;
  } catch (error) {
    throw error;
  }
};

export const getSkillsTypes = async () => {
  try {
    const res = await API.get("/skills/types");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postSkill = async (data: SkillAddFormData): Promise<Skill> => {
  try {
    setupAuth();
    const res = await API.post("/skills/private/create", data);
    return res.data as Skill;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error creating skill"
    );
  }
};

export const putSKill = async (id: string, data: SkillUpdateFormData): Promise<Skill> => {
  try {
    setupAuth();
    console.log(data);
    const res = await API.put(`/skills/private/${id}/update`, data);
    return res.data as Skill;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error edit skill"
    );
  }
};

export const deleteSkill = async (id: string): Promise<SimpleResponse> => {
  try {
    setupAuth();
    const res = await API.delete(`/skills/private/${id}/delete`);
    return res.data as SimpleResponse;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error remove skill"
    );
  }
};
