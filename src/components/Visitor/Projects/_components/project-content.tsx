"use client";
import { type ProjectFilters as Filter, ProjectResponse } from "@/types/projects";
import { motion } from "framer-motion";
import { ProjectFilters } from "./project-filters";
import ProjectTimelineList from "./project-list";

interface ProjectsContentProps {
  response: ProjectResponse;
  language: string;
  techList: string[];
  filters?: Filter;
}
export const ProjectsContent = ({ response, language, techList, filters }: ProjectsContentProps) => {
  return (
    <>
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-6 font-principal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {response.texts.title}
        </motion.h2>
        <motion.p
          className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-secundaria"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {response.texts.description}
        </motion.p>
      </motion.div>
      <ProjectFilters techsList={techList} />
      <ProjectTimelineList
        language={language}
        initialProjects={response.projects}
        initialMeta={response.meta}
        filters={filters || {}}
      />
    </>
  );
};
