"use client";

import { useState } from "react";

import Image from "next/image";
import { Formation } from "@/types/formations";
import { FormationCrudCard } from "./formation-crud-card";
import { FormationEditModal } from "./formation-edit-modal";

interface FormationAllContentProps {
  formations: Formation[];
  onUpdate: () => void;
}

export function FormationsAllContent({ formations, onUpdate }: FormationAllContentProps) {
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);

  const handleEdit = (formation: Formation) => {
    setEditingFormation(formation);
  };

  const handleCloseEdit = () => {
    setEditingFormation(null);
  };

  const handleUpdateSuccess = () => {
    onUpdate();
  };

  if (formations.length === 0) {
    return (
      <div className="text-center py-12 flex flex-col items-center justify-center gap-2">
        <h3 className="text-lg font-semibold text-muted-foreground">Nenhuma formação encontrada</h3>
        <p className="text-sm text-muted-foreground mt-2">Comece criando sua primeira formação.</p>
        <Image
          src={"/images/empty.svg"}
          alt="Nenhuma formação encontrada"
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
