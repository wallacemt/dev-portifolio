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
}

export interface ProjectResponse {
  projects: Project[];
  meta: {
    page: number;
    limit: number;
    total: number;
    hasNextPage: boolean;
  };
}
