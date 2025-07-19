import { ProjectFilters, ProjectResponse } from "@/types/projects";
import { API } from "@/lib/axios";

const ownerId = process.env.OWNER_ID || "";
export const getProjects = async (language: string = "pt", filters?: ProjectFilters): Promise<ProjectResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (filters) {
      if (filters.search) queryParams.append("search", filters.search);
      if (filters.tech && filters.tech !== "all") queryParams.append("tech", filters.tech);
      if (filters.orderBy) queryParams.append("orderBy", filters.orderBy);
      if (filters.page) queryParams.append("page", filters.page);
    }

    queryParams.set("language", language);
    queryParams.set("limit", "4");

    const response = await API.get(`/projects/owner/${ownerId}?${queryParams.toString()}`);
    return response.data as ProjectResponse;
  } catch (error) {
    throw error;
  }
};

export const getTechsProject = async (): Promise<string[]> => {
  try {
    const response = await API.get(`/projects/owner/${ownerId}/techs`);
    return response.data as string[];
  } catch (error) {
    throw error;
  }
};
