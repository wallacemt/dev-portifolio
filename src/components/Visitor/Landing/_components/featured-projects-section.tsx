"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/types/projects";
import { useLanguage } from "@/contexts/LanguageContext";
import { FeaturedProjectCard } from "./featured-project-card";

export interface FeaturedProject {
  project: Project;
  githubLastPush: Date | null;
}

interface FeaturedProjectsSectionProps {
  projects: FeaturedProject[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  const { language } = useLanguage();
  return (
    <section id="projetos" className="w-full max-w-6xl mx-auto px-4 md:px-12 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
      >
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold font-principal text-foreground">
            {language === "pt" ? (
              <>
                Últimos <span className="text-roxo100">projetos</span>
              </>
            ) : (
              <>
                Recent <span className="text-roxo100">projects</span>
              </>
            )}
          </h2>
          <p className="text-foreground/70 mt-2">
            {language === "pt"
              ? "O que venho construindo mais recentemente, com atualização puxada direto do GitHub."
              : "What I've been building lately, with recency pulled straight from GitHub."}
          </p>
        </div>
        <Link
          href={`/watch/${language}/projects`}
          className="shrink-0 text-roxo100 hover:text-roxo300 transition-colors font-medium"
        >
          {language === "pt" ? "Ver todos →" : "View all →"}
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(({ project, githubLastPush }, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FeaturedProjectCard project={project} githubLastPush={githubLastPush} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
