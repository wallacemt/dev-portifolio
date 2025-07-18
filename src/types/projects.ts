
import { Skill } from "./skills";

export interface Project {
  activate: boolean;
  ownerId: string;
  id: string;
  title: string;
  description: string;
  techs: string[];
  screenshots: string[];
  deployment: string;
  backend: string;
  frontend: string;
  previewImage: string;
  lastUpdate: Date | null;
  skills: Skill[];
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
