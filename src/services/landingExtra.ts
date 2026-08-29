import { FeaturedProject } from "@/components/Visitor/Landing/_components/featured-projects-section";
import { getProjectGithubLastPush } from "@/lib/github";
import { getProjects } from "./projects";

export async function attachGithubRecency(language: string): Promise<FeaturedProject[]> {
  const projects = (await getProjects(language)).projects;
  const withRecency = await Promise.all(
    projects.map(async (project) => ({
      project,
      githubLastPush: await getProjectGithubLastPush(project.links?.content),
    })),
  );

  return withRecency.sort((a, b) => {
    if (a.githubLastPush && b.githubLastPush) return b.githubLastPush.getTime() - a.githubLastPush.getTime();
    if (a.githubLastPush) return -1;
    if (b.githubLastPush) return 1;
    return 0;
  });
}
