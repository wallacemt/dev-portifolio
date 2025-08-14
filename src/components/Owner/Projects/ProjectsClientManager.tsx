"use client";
import { useRouter } from "next/navigation";
import { Project } from "@/types/projects";
import { ProjectAdd } from "./_components/project-add";
import { ProjectsAllContent } from "./_components/projects-all-content";
import { ProjectEditModal } from "./_components/project-edit-modal";
import { Button } from "@/components/ui/button";
import { Plus, Code } from "lucide-react";
import { SiteHeader } from "@/components/ui/site-header";

interface ProjectsClientManagerProps {
  projects: Project[];
  currentState: "edit" | "all" | "create";
  editProject: Project | null;
}

export function ProjectsClientManager({ projects, currentState, editProject }: ProjectsClientManagerProps) {
  const router = useRouter();

  const handleUpdate = () => {
    router.refresh();
  };

  const handleNavigate = (state: "edit" | "all" | "create", id?: string) => {
    const params = new URLSearchParams();
    params.set("state", state);
    if (id) params.set("id", id);

    router.push(`/owner/projects?${params.toString()}`);
  };

  const handleCreateSuccess = () => {
    handleNavigate("all");
    handleUpdate();
  };

  const handleEditClose = () => {
    handleNavigate("all");
  };

  const handleEditSuccess = () => {
    handleNavigate("all");
    handleUpdate();
  };

  if (currentState === "create") {
    return (
      <div className="container mx-auto py-4 px-6">
        <div className="mb-8">
          <SiteHeader title="Criar Novo Projeto" icon={<Plus className="h-6 w-6" />} />
          <p className="text-white pl-6 mt-2">Preencha os dados para criar um novo projeto.</p>
        </div>

        <ProjectAdd onSuccess={handleCreateSuccess} />
      </div>
    );
  }

  if (currentState === "edit" && editProject) {
    return (
      <div className="container mx-auto py-8">
        <ProjectEditModal project={editProject} isOpen={true} onClose={handleEditClose} onSuccess={handleEditSuccess} />
        <ProjectsAllContent projects={projects} onUpdate={handleUpdate} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <div className="mb-8 flex justify-between items-center">
        <div className="flex flex-col justify-center">
          <SiteHeader title="Gerenciar Projetos" icon={<Code className="h-6 w-6" />} />
          <p className="text-white font-semibold pl-8 text-sm">
            Gerencie seus projetos: criar, editar, ativar/desativar e excluir.
          </p>
        </div>

        <Button onClick={() => handleNavigate("create")}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Projeto
        </Button>
      </div>

      <ProjectsAllContent projects={projects} onUpdate={handleUpdate} />
    </div>
  );
}
