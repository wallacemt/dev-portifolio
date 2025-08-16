"use client";

import { useState } from "react";
import { Skill } from "@/types/skills";
import Image from "next/image";
import { SkillCrudCard } from "./skills-crud-card";
import { SkillEditModal } from "./skills-edit-modal";

interface skillsAllContentProps {
  skills: Skill[];
  onUpdate: () => void;
}

export function SkillsAllContent({ skills }: skillsAllContentProps) {
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
  };

  const handleCloseEdit = () => {
    setEditingSkill(null);
  };

  // const handleUpdateSuccess = () => {
  //   onUpdate();
  // };

  if (skills.length === 0) {
    return (
      <div className="text-center py-12 flex flex-col items-center justify-center gap-2">
        <h3 className="text-lg font-semibold text-muted-foreground">Nenhuma Skill encontrada</h3>
        <p className="text-sm text-muted-foreground mt-2">Comece criando sua primeira Skill.</p>
        <Image
          src={"/images/empty.svg"}
          alt="Nenhuma Skill encontrada"
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
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <SkillCrudCard key={skill.id} skill={skill} onEdit={handleEdit} 
          // onUpdate={handleUpdateSuccess}
           />
        ))}
      </div>

      <SkillEditModal
        skill={editingSkill}
        isOpen={!!editingSkill}
        onClose={handleCloseEdit}
        // onSuccess={handleUpdateSuccess}
      />
    </>
  );
}
