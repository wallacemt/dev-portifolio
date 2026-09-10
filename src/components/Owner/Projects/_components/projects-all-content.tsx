"use client";

import { useState } from "react";
import { useOwnerList } from "../../use-owner-list";
import { OwnerListControls } from "../../owner-list-controls";
import { Project } from "@/types/projects";
import { ProjectCrudCard } from "./project-crud-card";
import { ProjectEditModal } from "./project-edit-modal";


interface ProjectsAllContentProps {
  projects: Project[];
  onUpdate: () => void;
}

export function ProjectsAllContent({ onUpdate }: ProjectsAllContentProps) {
  const list = useOwnerList<Project>("projects");
  const projects = list.items;
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleCloseEdit = () => {
    setEditingProject(null);
  };

  const handleUpdateSuccess = () => {
    list.refresh();
    onUpdate();
  };


  return (
    <>
      <OwnerListControls list={list} collection="projects" />
      {!list.loading && !list.error && projects.length === 0 && <p className="py-8 text-center">Nenhum resultado encontrado. Altere a busca ou os filtros.</p>}
      <div aria-busy={list.loading} className={list.view === "list" ? "grid grid-cols-1 gap-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
        {projects.map((project) => (
          <ProjectCrudCard key={project.id} project={project} onEdit={handleEdit} onUpdate={handleUpdateSuccess} />
        ))}
      </div>

      <ProjectEditModal
        project={editingProject}
        isOpen={!!editingProject}
        onClose={handleCloseEdit}
        onSuccess={handleUpdateSuccess}
      />
    </>
  );
}
