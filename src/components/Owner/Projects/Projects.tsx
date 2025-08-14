import { getAllProjects } from "@/services/projects";
import type { Project } from "@/types/projects";
import { ProjectsClientManager } from "./ProjectsClientManager";
import { notFound } from "next/navigation";

interface ProjectsPageCRUDProps {
  state: Promise<{
    state: "edit" | "all" | "create";
    id?: string;
  }>;
}

export async function ProjectsPageCRUD({ state }: ProjectsPageCRUDProps) {
  const { projects } = await getAllProjects();
  const { state: projectState, id } = await state;

  let editProject: Project | null = null;
  if (projectState === "edit" && id) {
    editProject = projects.find((p) => p.id === id) || null;
    if (!editProject) {
      notFound();
    }
  }

  return <ProjectsClientManager projects={projects} currentState={projectState} editProject={editProject} />;
}
