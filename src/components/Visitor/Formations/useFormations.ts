"use client";

import { useState } from "react";
import { Formation } from "@/types/formations";

export function useFormations() {
  const [activeFormation, setActiveFormation] = useState<string | null>(null);
  const [hoveredFormation, setHoveredFormation] = useState<string | null>(null);
  const handleFormationHover = (formationId: string | null) => {
    setHoveredFormation(formationId);
    if (formationId) {
      setActiveFormation(formationId);
    }
  };
  const handleFormationClick = (formationId: string) => {
    setActiveFormation(formationId);
    const element = document.getElementById(`formation-${formationId}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const getFormationsByType = (formations: Formation[]) => {
    const types = formations.reduce((acc, formation) => {
      if (!acc[formation.type]) {
        acc[formation.type] = [];
      }
      acc[formation.type].push(formation);
      return acc;
    }, {} as Record<string, Formation[]>);

    return types;
  };

  const getFormationStats = (formations: Formation[]) => {
    const totalWorkload = formations.reduce(
      (sum, formation) => sum + ((formation.concluded && formation.workload) || 0),
      0
    );
    const typesCount = Object.keys(getFormationsByType(formations)).length;
    const institutionsCount = new Set(formations.map((f) => f.institution)).size;
    const certificatesCount = formations.filter((f) => f.certificationUrl).length;

    return {
      total: formations.length,
      totalWorkload,
      typesCount,
      institutionsCount,
      certificatesCount,
    };
  };

  return {
    activeFormation,
    hoveredFormation,
    handleFormationHover,
    handleFormationClick,
    getFormationsByType,
    getFormationStats,
  };
}
