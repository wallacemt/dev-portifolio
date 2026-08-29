import { API, setupAuth } from "@/lib/axios";

export interface GithubRepoSummary {
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  updatedAt: string;
  fork: boolean;
}

export interface ProjectSuggestion {
  title: string;
  description: string;
  techs: string[];
  missingSkills: string[];
}

export const getGithubRepos = async (username: string): Promise<GithubRepoSummary[]> => {
  await setupAuth();
  const response = await API.get(`/projects/private/github/repos?username=${encodeURIComponent(username)}`);
  return response.data as GithubRepoSummary[];
};

export const getGithubSuggestion = async (username: string, repo: string): Promise<ProjectSuggestion> => {
  await setupAuth();
  const response = await API.get(
    `/projects/private/github/suggest?username=${encodeURIComponent(username)}&repo=${encodeURIComponent(repo)}`,
  );
  return response.data as ProjectSuggestion;
};
