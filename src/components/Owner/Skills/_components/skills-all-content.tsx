"use client";

import { useState } from "react";
import { useOwnerList } from "../../use-owner-list";
import { OwnerListControls } from "../../owner-list-controls";
import { Skill } from "@/types/skills";

import { SkillCrudCard } from "./skills-crud-card";
import { SkillEditModal } from "./skills-edit-modal";

interface skillsAllContentProps {
  skills: Skill[];
  onUpdate: () => void;
}

export function SkillsAllContent({ onUpdate }: skillsAllContentProps) {
  const list = useOwnerList<Skill>("skills");
  const skills = list.items;
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
  };

  const handleCloseEdit = () => {
    setEditingSkill(null);
  };

  const handleUpdateSuccess = () => {
    list.refresh();
    onUpdate();
  };


  return (
    <>
      <OwnerListControls list={list} collection="skills" />
      {!list.loading && !list.error && skills.length === 0 && <p className="py-8 text-center">Nenhum resultado encontrado. Altere a busca ou os filtros.</p>}
      <div aria-busy={list.loading} className={list.view === "list" ? "grid grid-cols-1 gap-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
        {skills.map((skill) => (
          <SkillCrudCard key={skill.id} skill={skill} onEdit={handleEdit} onUpdate={handleUpdateSuccess} />
        ))}
      </div>

      <SkillEditModal
        skill={editingSkill}
        isOpen={!!editingSkill}
        onClose={handleCloseEdit}
        onSuccess={handleUpdateSuccess}
      />
    </>
  );
}
