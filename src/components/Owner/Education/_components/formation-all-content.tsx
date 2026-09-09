"use client";

import { useState } from "react";
import { useOwnerList } from "../../use-owner-list";
import { OwnerListControls } from "../../owner-list-controls";


import { Formation } from "@/types/formations";
import { FormationCrudCard } from "./formation-crud-card";
import { FormationEditModal } from "./formation-edit-modal";

interface FormationAllContentProps {
  formations: Formation[];
  onUpdate: () => void;
}

export function FormationsAllContent({ onUpdate }: FormationAllContentProps) {
  const list = useOwnerList<Formation>("formations");
  const formations = list.items;
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);

  const handleEdit = (formation: Formation) => {
    setEditingFormation(formation);
  };

  const handleCloseEdit = () => {
    setEditingFormation(null);
  };

  const handleUpdateSuccess = () => {
    list.refresh();
    onUpdate();
  };


  return (
    <>
      <OwnerListControls list={list} collection="formations" />
      {!list.loading && !list.error && formations.length === 0 && <p className="py-8 text-center">Nenhum resultado encontrado. Altere a busca ou os filtros.</p>}
      <div aria-busy={list.loading} className={list.view === "list" ? "grid grid-cols-1 gap-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
        {formations.map((formation) => (
          <FormationCrudCard key={formation.id} formation={formation} onEdit={handleEdit} onUpdate={handleUpdateSuccess} />
        ))}
      </div>

      <FormationEditModal
        formation={editingFormation}
        isOpen={!!editingFormation}
        onClose={handleCloseEdit}
        onSuccess={handleUpdateSuccess}
      />
    </>
  );
}
