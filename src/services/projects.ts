import { ProjectResponse } from "@/types/projects";
import { API } from "./api";

export const getProjects = async (language: string = "pt"): Promise<ProjectResponse> => {
  try {
    const ownerId = process.env.OWNER_ID || "";
    const response = await API.get(`/projects/owner/${ownerId}?lenguage=${language}`);
    return response.data as ProjectResponse;
  } catch (error) {
    throw error;
  }
};
