import { useState, useMemo } from "react";
import { Skill, StackType } from "@/types/skills";


export function useSkillsFilter(skills: Skill[]) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = useMemo(() => {
    return ["all", ...Object.values(StackType)];
  }, []);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return skills;
    return skills.filter((skill) => skill.stack === activeCategory);
  }, [skills, activeCategory]);

  const categoryCount = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category] = category === "all" ? skills.length : skills.filter((skill) => skill.stack === category).length;
      return acc;
    }, {} as Record<string, number>);
  }, [categories, skills]);

  return {
    activeCategory,
    setActiveCategory,
    categories,
    filteredSkills,
    categoryCount,
  };
}
