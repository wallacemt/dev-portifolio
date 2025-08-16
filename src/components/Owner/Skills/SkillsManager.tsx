"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, SmartphoneCharging } from "lucide-react";
import { SiteHeader } from "@/components/ui/site-header";
import { Skill } from "@/types/skills";
import { SkillsAllContent } from "./_components/skills-all-content";
import { SkillEditModal } from "./_components/skills-edit-modal";
import { SkillAdd } from "./_components/skill-add";
 
interface ProjectsClientManagerProps {
  skills: Skill[];
  currentState: "edit" | "all" | "create";
  editSkill: Skill | null;
}

export function SkillsManager({ skills, currentState, editSkill }: ProjectsClientManagerProps) {
  const router = useRouter();

  const handleUpdate = () => {
    router.refresh();
  };

  const handleNavigate = (state: "edit" | "all" | "create", id?: string) => {
    const params = new URLSearchParams();
    params.set("state", state);
    if (id) params.set("id", id);

    router.push(`/owner/skills?${params.toString()}`);
  };

  const handleCreateSuccess = () => {
    handleNavigate("all");
    handleUpdate();
  };

  const handleEditClose = () => {
    handleNavigate("all");
  };

  // const handleEditSuccess = () => {
  //   handleNavigate("all");
  //   handleUpdate();
  // };

  if (currentState === "create") {
    return (
      <div className="container mx-auto py-4 px-6">
        <div className="mb-8">
          <SiteHeader title="Adicionar nova Skill" icon={<Plus className="h-6 w-6" />} />
          <p className="text-white pl-6 mt-2">Preencha os dados para adiciona nova skill.</p>
        </div>

        <SkillAdd onSuccess={handleCreateSuccess} />
      </div>
    );
  }

  if (currentState === "edit" && editSkill) {
    return (
      <div className="container mx-auto py-8">
        <SkillEditModal skill={editSkill} isOpen={true} onClose={handleEditClose} 
        // onSuccess={handleEditSuccess}
         />
        <SkillsAllContent skills={skills} onUpdate={handleUpdate} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <div className="mb-8 flex justify-between items-center">
        <div className="flex flex-col justify-center">
          <SiteHeader title="Gerenciar Skills" icon={<SmartphoneCharging className="h-6 w-6" />} />
          <p className="text-white font-semibold pl-8 text-sm">Gerencie suas skills: criar, editar, e excluir.</p>
        </div>

        <Button onClick={() => handleNavigate("create")}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Projeto
        </Button>
      </div>

      <SkillsAllContent skills={skills} onUpdate={handleUpdate} />
    </div>
  );
}
