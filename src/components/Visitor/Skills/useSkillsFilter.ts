import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Skill, StackType } from "@/types/skills";

export function useSkillsFilter(skills: Skill[], onFilterChange?: () => void) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const activeCategoryRef = useRef(activeCategory);
  activeCategoryRef.current = activeCategory;

  const categories = useMemo(() => {
    return ["all", ...Object.values(StackType)];
  }, []);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return skills;
    return skills.filter((skill) => skill.stack === activeCategory);
  }, [skills, activeCategory]);

  const categoryCount = useMemo(() => {
    return categories.reduce(
      (acc, category) => {
        acc[category] =
          category === "all" ? skills.length : skills.filter((skill) => skill.stack === activeCategory).length;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [categories, skills, activeCategory]);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setActiveCategory(category);
      onFilterChange?.();
    },
    [onFilterChange],
  );

  // Reset category when skills (page) changes and the current filter yields no results
  useEffect(() => {
    const current = activeCategoryRef.current;
    if (current === "all" || skills.length === 0) return;
    const hasResults = skills.some((skill) => skill.stack === current);
    if (!hasResults) {
      setActiveCategory("all");
    }
  }, [skills]);

  return {
    activeCategory,
    setActiveCategory: handleCategoryChange,
    categories,
    filteredSkills,
    categoryCount,
  };
}
