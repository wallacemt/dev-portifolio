import { ProjectAdd, ProjectAddResponse, ProjectFilters, ProjectResponse, ProjectUpdate } from "@/types/projects";
import { API, ownerId, setupAuth, SimpleResponse } from "@/lib/axios";

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
    queryParams.set("limit", "4");
    queryParams.set("activate", "true");

    const response = await API.get(`/projects/owner/${ownerId}?${queryParams.toString()}`);
    return response.data as ProjectResponse;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
export const getAllProjects = async (): Promise<ProjectResponse> => {
  try {
    const response = await API.get(`/projects/owner/${ownerId}`);
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

export const postProject = async (data: ProjectAdd): Promise<ProjectAddResponse> => {
  try {
    setupAuth();
    const response = await API.post(`/projects/private/create`, data);
    return response.data as ProjectAddResponse;
  } catch (error) {
    console.error("Error posting project:", error);
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error creating project"
    );
  }
};
export const putProject = async (id: string, data: ProjectUpdate): Promise<ProjectAddResponse> => {
  try {
    setupAuth();
    const res = await API.put(`/projects/private/${id}/update`, data);
    return res.data as ProjectAddResponse;
  } catch (error) {
   throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error creating project"
    );
  }
};

export const putProjectHandleActivate = async (id: string): Promise<ProjectAddResponse> => {
  try {
    setupAuth();
    const res = await API.put(`/projects/private/${id}/handle-activate`);
    return res.data as ProjectAddResponse;
  } catch (error) {
   throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error edit project"
    );
  }
};

export const deleteProject = async (id: string): Promise<SimpleResponse> => {
  try {
    setupAuth();
    const res = await API.delete(`/projects/private/${id}/delete`);
    return res.data as SimpleResponse;
  } catch (error) {
     throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error remove project"
    );
  }
};
