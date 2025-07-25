import { Skill } from "./skills";

export interface Project {
  activate: boolean;
  ownerId: string;
  id: string;
  title: string;
  description: { title: string; content: string };
  techs: { title: string; content: string[] };
  screenshots: string[];
  previewImage: string;
  lastUpdate: Date | null;
  skills: { title: string; content: Skill[] };
  links: {
    title: string;
    content: {
      deployment: string;
      backend: string;
      frontend: string;
    };
  };
  cta: string;
}

export interface ProjectResponse {
  projects: Project[];
  meta: Meta;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}

export interface ProjectFilters {
  page?: string;
  limit?: string;
  tech?: string;
  activate?: string;
  orderBy?: string;
  search?: string;
}
