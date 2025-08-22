import { useState, useMemo, useCallback, useEffect } from "react";
import { Skill, StackType } from "@/types/skills";

export function useSkillsFilter(skills: Skill[], onFilterChange?: () => void) {
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
      acc[category] =
        category === "all" ? skills.length : skills.filter((skill) => skill.stack === activeCategory).length;
      return acc;
    }, {} as Record<string, number>);
  }, [categories, skills, activeCategory]);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setActiveCategory(category);
      onFilterChange?.();
    },
    [onFilterChange]
  );

  // Reset category when skills change (e.g., when switching pages)
  useEffect(() => {
    if (filteredSkills.length === 0 && skills.length > 0 && activeCategory !== "all") {
      setActiveCategory("all");
    }
  }, [skills, filteredSkills.length, activeCategory]);

  return {
    activeCategory,
    setActiveCategory: handleCategoryChange,
    categories,
    filteredSkills,
    categoryCount,
  };
}
