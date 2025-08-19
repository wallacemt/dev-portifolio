"use client";

import { useState } from "react";
import { Project } from "@/types/projects";
import { ProjectCrudCard } from "./project-crud-card";
import { ProjectEditModal } from "./project-edit-modal";
import Image from "next/image";

interface ProjectsAllContentProps {
  projects: Project[];
  onUpdate: () => void;
}

export function ProjectsAllContent({ projects, onUpdate }: ProjectsAllContentProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleCloseEdit = () => {
    setEditingProject(null);
  };

  const handleUpdateSuccess = () => {
    onUpdate();
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 flex flex-col items-center justify-center gap-2">
        <h3 className="text-lg font-semibold text-muted-foreground">Nenhum projeto encontrado</h3>
        <p className="text-sm text-muted-foreground mt-2">Comece criando seu primeiro projeto.</p>
        <Image
          src={"/images/empty.svg"}
          alt="Nenhum projeto encontrado"
          className="animate-float"
          width={200}
          height={200}
          priority
        />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
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
