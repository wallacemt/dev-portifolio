"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, EyeOff, Calendar, Loader2, ExternalLink } from "lucide-react";
import { Project } from "@/types/projects";
import { putProjectHandleActivate, deleteProject } from "@/services/projects";
import { toast } from "sonner";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";

interface ProjectCrudCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onUpdate: () => void;
}

export function ProjectCrudCard({ project, onEdit, onUpdate }: ProjectCrudCardProps) {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggleActivate = async () => {
    try {
      setIsToggling(true);
      await putProjectHandleActivate(project.id);
      toast.success(project.activate ? "Projeto desativado com sucesso!" : "Projeto ativado com sucesso!");
      onUpdate();
    } catch (error) {
      console.error("Erro ao alterar status do projeto:", error);
      toast.error("Erro ao alterar status do projeto.");
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteProject(project.id);
      toast.success("Projeto removido com sucesso!");
      onUpdate();
    } catch (error) {
      console.error("Erro ao remover projeto:", error);
      toast.error("Erro ao remover projeto.");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Data não informada";
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <>
      <Card className={`w-full max-w-4xl mx-auto bg-roxo600 ${!project.activate ? "opacity-60" : ""}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                <span className="font-principal truncate">{project.title}</span>

                <Badge variant={project.activate ? "default" : "secondary"} className="text-xs">
                  {project.activate ? "Ativo" : "Inativo"}
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1 max-h-14 overflow-auto">{project.description.content}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleToggleActivate} disabled={isToggling}>
                {isToggling ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : project.activate ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setShowDeleteConfirm(true)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 grid-cols-1 grid md:grid-cols-2 space-x-4">
          {project.previewImage && (
            <div className="col-span-1 md:col-span-2 relative">
              <Image
                height={500}
                width={500}
                src={project.previewImage}
                alt={project.title}
                className="w-full h-48 object-cover rounded-md"
              />
              {project.isMostRecent && (
                <Badge variant="default" className="bg-roxo100 text-white text-xs absolute top-2 right-2">
                  Mais Recente
                </Badge>
              )}
            </div>
          )}
          <div className="grid grid-flow-row gap-4">
            <div className="flex flex-wrap gap-2 ">
              {project.skills.content.map((skill) => (
                <Badge key={skill.id} variant="secondary" className="text-xs">
                  {skill.title}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Atualizado em: {formatDate(project.lastUpdate)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {project.links.content.deployment.url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.links.content.deployment.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Deploy
                  </a>
                </Button>
              )}
              {project.links.content.frontend.url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.links.content.frontend.url} target="_blank" rel="noopener noreferrer">
                    <GithubLogoIcon className="h-4 w-4 mr-1" />
                    Frontend
                  </a>
                </Button>
              )}
              {project.links.content.backend.url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.links.content.backend.url} target="_blank" rel="noopener noreferrer">
                    <GithubLogoIcon className="h-4 w-4 mr-1" />
                    Backend
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent className="bg-background p-6 rounded-lg flex flex-col gap-2 max-w-md w-full mx-4">
            <DialogHeader>
              <h3 className="text-lg font-semibold mb-2 font-principal">Confirmar Exclusão</h3>
              <p className="text-sm text-muted-foreground mb-4 font-secundaria">
                Tem certeza que deseja excluir o projeto <span className="text-Destaque">{project.title}</span>? Esta
                ação não pode ser desfeita.
              </p>
            </DialogHeader>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
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
