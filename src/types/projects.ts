import { Skill } from "./skills";

export interface Project {
  activate: boolean;
  ownerId: string;
  videos: string[];
  /** @deprecated mirrors videos[0], kept for API backward compatibility. Read-only fallback. */
  previewVideoUrl?: string | null;
  id: string;
  isMostRecent: {
    isRecent: boolean;
    text: string;
  };
  title: string;
  description: { title: string; content: string };
  techs: { title: string; content: string[] };
  screenshots: string[];
  previewImage: string;
  lastUpdate?: string | Date | null;
  /** ISO date the project was created. Sent by the backend alongside `dateLabelKey: "addedAt"`. */
  createdAt?: string | null;
  /** Which label to show next to the formatted date. Absent when the backend hasn't migrated yet (see `lastUpdateText`). */
  dateLabelKey?: "updatedAt" | "addedAt";
  skills: { title: string; content: Skill[] };
  links: {
    title: string;
    content: {
      deployment: { title: string; url: string };
      backend: { title: string; url: string };
      frontend: { title: string; url: string };
    };
  };
  cta: string;
  /** @deprecated legacy pre-formatted string, kept as a fallback until the backend sends `lastUpdate`/`dateLabelKey`. */
  lastUpdateText?: string;
}

export interface ProjectResponse {
  projects: Project[];
  texts: {
    title: string;
    description: string;
  };
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
export interface ProjectAdd {
  title: string;
  description: string;
  techs: string[];
  screenshots: string[];
  deployment: string;
  backend?: string;
  frontend?: string;
  previewImage: string;
  videos?: string[];
}

export interface ProjectAddResponse {
  message: string;
  projectCreated: {
    id: string;
    title: string;
    description: string;
    techs: string[];
    screenshots: string[];
    deployment: string;
    backend: string;
    frontend: string;
    previewImage: string;
    lastUpdate: Date;
    ownerId: string;
    activate: boolean;
  };
}
export type ProjectUpdate = Partial<ProjectAdd>;
