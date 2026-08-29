import { Project } from "@/types/projects";
import { Skill } from "@/types/skills";

export interface SkillWithCount {
  skill: Skill;
  count: number;
}

/**
 * Tallies how many of the given projects reference each skill. Used both to
 * pick which skills to feature (highest count) and to show "used in N
 * projects" — callers should pass the full project list for an accurate
 * count, not just a featured subset.
 */
export function tallySkillsByProject(projects: Project[]): SkillWithCount[] {
  const seen = new Map<string, SkillWithCount>();
  for (const project of projects) {
    for (const skill of project.skills?.content ?? []) {
      const entry = seen.get(skill.id);
      if (entry) entry.count += 1;
      else seen.set(skill.id, { skill, count: 1 });
    }
  }
  return [...seen.values()].sort((a, b) => b.count - a.count);
}
