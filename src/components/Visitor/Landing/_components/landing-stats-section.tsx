"use client";
import { motion } from "framer-motion";
import { Formation } from "@/types/formations";
import { useFormations } from "../../Formations/useFormations";
import { FormationStats } from "../../Formations/_components/formation-stats";

interface LandingStatsSectionProps {
  formations: Formation[];
  texts: {
    formations: string;
    studyHours: string;
    institution: string;
    certificaos: string;
  };
  language: string;
}

export function LandingStatsSection({ formations, texts }: LandingStatsSectionProps) {
  const { getFormationStats } = useFormations();

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto px-4 md:px-12 py-8"
    >
      <FormationStats stats={getFormationStats(formations)} texts={{ stats: texts }} />
    </motion.section>
  );
}
