import { getProjects } from "@/services/projects";
import { getFormations } from "@/services/formationApi";
import { getService } from "@/services/servicesApi";
import { getProjectGithubLastPush } from "@/lib/github";
import { Skill } from "@/types/skills";
import { Project } from "@/types/projects";
import { FeaturedProjectsSection, FeaturedProject } from "./_components/featured-projects-section";
import { SkillsHighlightsSection } from "./_components/skills-highlights-section";
import { LandingStatsSection } from "./_components/landing-stats-section";
import { LandingCtaSection } from "./_components/landing-cta-section";

export const revalidate = 60;

interface LandingExtrasProps {
  language: string;
}

async function attachGithubRecency(projects: Project[]): Promise<FeaturedProject[]> {
  const withRecency = await Promise.all(
    projects.map(async (project) => ({
      project,
      githubLastPush: await getProjectGithubLastPush(project.links?.content),
    }))
  );

  return withRecency.sort((a, b) => {
    if (a.githubLastPush && b.githubLastPush) return b.githubLastPush.getTime() - a.githubLastPush.getTime();
    if (a.githubLastPush) return -1;
    if (b.githubLastPush) return 1;
    return 0;
  });
}

function topSkillsFromProjects(projects: Project[], limit = 10): Skill[] {
  const seen = new Map<string, { skill: Skill; count: number }>();
  for (const project of projects) {
    for (const skill of project.skills?.content ?? []) {
      const entry = seen.get(skill.id);
      if (entry) entry.count += 1;
      else seen.set(skill.id, { skill, count: 1 });
    }
  }
  return [...seen.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map((entry) => entry.skill);
}

export async function LandingExtras({ language }: LandingExtrasProps) {
  const [projectsRes, formationsRes, servicesRes] = await Promise.all([
    getProjects(language).catch((error) => {
      console.error("Error fetching featured projects:", error);
      return { projects: [], texts: { title: "", description: "" }, meta: { page: 1, limit: 3, total: 0, hasNextPage: false } };
    }),
    getFormations(language).catch((error) => {
      console.error("Error fetching formations for stats strip:", error);
      return null;
    }),
    getService(language).catch((error) => {
      console.error("Error fetching services for landing CTA:", error);
      return null;
    }),
  ]);

  const featuredProjects = await attachGithubRecency(projectsRes.projects);
  const topSkills = topSkillsFromProjects(projectsRes.projects);

  return (
    <>
      {featuredProjects.length > 0 && <FeaturedProjectsSection projects={featuredProjects} language={language} />}
      {topSkills.length > 0 && <SkillsHighlightsSection skills={topSkills} language={language} />}
      {formationsRes && formationsRes.formations.length > 0 && (
        <LandingStatsSection formations={formationsRes.formations} texts={formationsRes.texts.stats} language={language} />
      )}
      {servicesRes && servicesRes.texts.cta && (
        <LandingCtaSection texts={servicesRes.texts} language={language} />
      )}
    </>
  );
}
