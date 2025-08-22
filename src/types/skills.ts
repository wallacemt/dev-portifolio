export const SkillTypeValues = {
  Framework: "framework" as const,
  ProgrammingLanguage: "programmingLanguage" as const,
  Technology: "technology" as const,
  DataBase: "database" as const,
  Lib: "lib" as const,
  Bundler: "bundler" as const,
  Cloud: "cloud" as const,
  Docs: "docs" as const,
  PackageManager: "packageManager" as const,
  Orm: "orm" as const,
  ArtificialIntelligence: "AI" as const,
  ContainerTool: "containerTool" as const,
  Testing: "test" as const
} as const;

export enum StackType {
  Frontend = "frontend",
  Backend = "backend",
  Mobile = "mobile",
  Design = "design",
  DevOps = "devops",
  Other = "other",
}

export enum SkillType {
  Framework = "framework",
  ProgrammingLanguage = "progamationLenguage",
  Technology = "technology",
}

export interface SkillAddRequest {
  title: string;
  image: string;
  stack: StackType;
  type: SkillType;
  subSkils: string[];
  ownerId: string;
}

export type SkillUpdateRequest = Partial<Omit<SkillAddRequest, "ownerId">>;

export interface Skill {
  id: string;
  title: string;
  image: string;
  stack: string;
  type: string;
  subSkils: string[];
  ownerId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SkillsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SkillResponse {
  skills: Skill[];
  texts: { 
    chooseText: string; 
    title: string; 
    description: string; 
  };
  pagination: SkillsPagination;
}

export interface SkillTypesResponse {
  SkillTypeValues: {
    [key: string]: SkillType;
  };
  StackTypeValues: {
    [key: string]: StackType;
  };
}

export interface SkillAdd {
  title: string;
  image: string;
  stack: StackType;
  type: SkillType;
  subSkils: string[];
}

export type SkillUpdate = Partial<SkillAdd>;
