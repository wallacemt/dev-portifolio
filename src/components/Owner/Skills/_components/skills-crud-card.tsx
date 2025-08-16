"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { Skill } from "@/types/skills";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";

interface SkillCrudCardProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  // onUpdate: () => void;
}

export function SkillCrudCard({ skill, onEdit }: SkillCrudCardProps) {
  // const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // const handleToggleActivate = async () => {
  //   try {
  //     setIsToggling(true);
  //     await putSkillHandleActivate(Skill.id);
  //     toast.success(Skill.activate ? "Projeto desativado com sucesso!" : "Projeto ativado com sucesso!");
  //     onUpdate();
  //   } catch (error) {
  //     console.error("Erro ao alterar status do projeto:", error);
  //     toast.error("Erro ao alterar status do projeto.");
  //   } finally {
  //     setIsToggling(false);
  //   }
  // };

  setIsDeleting(true);
  // const handleDelete = async () => {
  //   try {
  //     await deleteSkill(Skill.id);
  //     toast.success("Projeto removido com sucesso!");
  //     onUpdate();
  //   } catch (error) {
  //     console.error("Erro ao remover projeto:", error);
  //     toast.error("Erro ao remover projeto.");
  //   } finally {
  //     setIsDeleting(false);
  //     setShowDeleteConfirm(false);
  //   }
  // };

  return (
    <>
      <Card className={`w-fit mx-auto bg-roxo600`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                <span className="font-principal truncate">{skill.title}</span>
              </CardTitle>
            </div>
            <div className="flex gap-2 ml-4">
              <Button variant="outline" size="sm" onClick={() => onEdit(skill)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setShowDeleteConfirm(true)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 flex flex-col items-center justify-center space-x-4">
          <Image
            src={skill.image}
            width={100}
            height={80}
            alt={skill.title}
            className="rounded animate-float hover:scale-120"
          />

          <div className="flex flex-wrap overflow-x-auto max-h-30 max-w-80 gap-4">
            <div className="flex flex-wrap gap-2 ">
              {skill.subSkils.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent className="bg-background p-6 rounded-lg flex flex-col gap-2 max-w-md w-full mx-4">
            <DialogHeader>
              <h3 className="text-lg font-semibold mb-2 font-principal">Confirmar Exclusão</h3>
              <p className="text-sm text-muted-foreground mb-4 font-secundaria">
                Tem certeza que deseja excluir a skill <span className="text-Destaque">{skill.title}</span>? Esta ação
                não pode ser desfeita.
              </p>
            </DialogHeader>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                // onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  "Excluir"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
}
