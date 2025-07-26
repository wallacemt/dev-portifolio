"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/services/projects";
import { Meta, Project, ProjectFilters } from "@/types/projects";
import ProjectCard from "./project-card";
import { useInView } from "react-intersection-observer";

interface ProjectTimelineListProps {
  language: string;
  initialProjects: Project[];
  initialMeta: Meta;
  filters: ProjectFilters;
}

export default function ProjectTimelineList({
  language,
  initialProjects,
  initialMeta,
  filters,
}: ProjectTimelineListProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [meta, setMeta] = useState(initialMeta);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView();

  useEffect(() => {
    setProjects(initialProjects);
    setMeta(initialMeta);
  }, [initialProjects, initialMeta]);

  useEffect(() => {
    if (!inView || !meta.hasNextPage || isLoading) return;

    const fetchNext = async () => {
      setIsLoading(true);
      try {
        const res = await getProjects(language, {
          ...filters,
          page: String(meta.page + 1),
        });

        setProjects((prev) => [...prev, ...res.projects]);
        setMeta(res.meta);
      } catch (error) {
        console.error("Error loading more projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNext();
  }, [inView, meta.hasNextPage, meta.page, filters, language, isLoading]);

  return (
    <>
      <ol className="flex flex-col items-start" style={{ listStyle: "none" }}>
        <li className="mx-auto md:border-s-2 border-roxo100/50">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </li>
      </ol>
      {meta.hasNextPage && (
        <div ref={ref} className="h-20 flex items-center justify-center">
          <span className="animate-spin rounded-full h-10 w-10 border-b-2 border-roxo100"></span>
        </div>
      )}
    </>
  );
}
