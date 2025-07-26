import { ProjectFilters, ProjectResponse } from "@/types/projects";
import { API, ownerId } from "@/lib/axios";

export const getProjects = async (language: string = "pt", filters?: ProjectFilters): Promise<ProjectResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (filters) {
      if (filters.search && filters.search.trim()) {
        queryParams.append("search", filters.search.trim());
      }
      if (filters.tech && filters.tech !== "all") {
        queryParams.append("tech", filters.tech);
      }
      if (filters.orderBy) {
        queryParams.append("orderBy", filters.orderBy);
      }
      if (filters.page) {
        queryParams.append("page", filters.page);
      }
    }

    queryParams.set("language", language);
    queryParams.set("limit", "5");

    const response = await API.get(`/projects/owner/${ownerId}?${queryParams.toString()}`);
    return response.data as ProjectResponse;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getTechsProject = async (): Promise<string[]> => {
  try {
    const response = await API.get(`/projects/owner/${ownerId}/techs`);
    return response.data as string[];
  } catch (error) {
    console.error("Error fetching project techs:", error);
    return [];
  }
};
