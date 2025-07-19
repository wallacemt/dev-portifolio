"use client";

import { useEffect, useRef, useState } from "react";
import { getProjects } from "@/services/projects";
import { ProjectFilters } from "@/types/projects";
import ProjectCard from "./project-card";
import { useInView } from "react-intersection-observer";

interface ProjectTimelineListProps {
  language: string;
  initialProjects: any[];
  initialMeta: any;
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

  const { ref, inView } = useInView(); // Detecta quando chega no fim da lista

  const loadMore = async () => {
    if (!meta.hasNextPage || isLoading) return;

    setIsLoading(true);
    const res = await getProjects(language, {
      ...filters,
      page: String(meta.page + 1),
    });

    setProjects((prev) => [...prev, ...res.projects]);
    setMeta(res.meta);
    setIsLoading(false);
  };

  useEffect(() => {
    if (inView) loadMore();
  }, [inView]);

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
