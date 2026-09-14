import { API } from "@/lib/axios";

export interface LandingTexts {
  projectsTitle: string;
  projectsDescription: string;
  skillsTitle: string;
  skillsDescription: string;
  latestVideoTitle: string;
  latestVideoDescription: string;
  viewAll: string;
  retry: string;
  projectsError: string;
  skillsError: string;
  statsError: string;
  videoError: string;
  sectionError: string;
  projectSingular: string;
  projectPlural: string;
  updatedAt: string;
  addedAt: string;
  updated: string;
}
export interface VideosTexts { title: string; description: string; error: string; empty: string; retry: string }

export async function getUiTexts<T>(context: "landing" | "videos", language: string): Promise<T> {
  const { data } = await API.get<T>("/utilis/ui-texts", { params: { context, language } });
  return data;
}
