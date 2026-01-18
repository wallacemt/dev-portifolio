"use client";

import { Badge as BadgeType } from "@/types/badges";
import { BadgeCard } from "./badge-card";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface BadgesSectionProps {
  badges: BadgeType[];
  language: string;
  texts: {
    title: string;
    description: string;
  };
}

export function BadgesSection({ badges, language, texts }: BadgesSectionProps) {
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <motion.section
      className="py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Award className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-principal">{texts.title}</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-secundaria">{texts.description}</p>
        </motion.div>

        <motion.div
          className={`${badges.length <= 2 ? "flex items-center   justify-center  border-2" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}  gap-6`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <BadgeCard badge={badge} language={language} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
