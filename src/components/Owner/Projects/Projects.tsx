import { getAllProjects } from "@/services/projects";
import type { Project } from "@/types/projects";
import { ProjectsClientManager } from "./ProjectsClientManager";
import { notFound } from "next/navigation";
import { CrudState } from "@/types/utilis";

export async function ProjectsPageCRUD({ state }: { state: CrudState }) {
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
