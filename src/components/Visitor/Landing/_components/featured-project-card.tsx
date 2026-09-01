"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/projects";
import { useLanguage } from "@/contexts/LanguageContext";
import { OptimizedImage } from "../../SEO/OptimizedImage";
import { ProjectModal } from "../../Projects/_components/project-modal-view";
import { formatRelativeUpdate, formatProjectDate } from "@/utilis/project-date";

interface FeaturedProjectCardProps {
  project: Project;
  githubLastPush: Date | null;
}

export function FeaturedProjectCard({ project, githubLastPush }: FeaturedProjectCardProps) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const updatedLabel = githubLastPush
    ? formatRelativeUpdate(githubLastPush, language)
    : formatProjectDate(project, language);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden text-left cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 [&>div]:h-full">
          <OptimizedImage src={project.logoUrl || project.previewImage} fill alt={project.title} title={project.title} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-roxo700 via-roxo700/20 to-transparent" />

        {updatedLabel && (
          <span className="absolute top-4 right-4 rounded-full glass px-3 py-1 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            {updatedLabel}
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-semibold text-foreground font-principal">{project.title}</h3>
          <p className="text-sm text-foreground/70 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 line-clamp-2">
            {project.description.content}
          </p>
        </div>
      </motion.button>

      {open && <ProjectModal project={project} open={open} setOpen={() => setOpen(false)} />}
    </>
  );
}
