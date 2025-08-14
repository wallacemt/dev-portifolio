"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Plus, Loader2, Save } from "lucide-react";
import { projectUpdateSchema, ProjectUpdateFormData } from "@/lib/validations/project";
import { putProject } from "@/services/projects";
import { Project } from "@/types/projects";
import { toast } from "sonner";

interface ProjectEditModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProjectEditModal({ project, isOpen, onClose, onSuccess }: ProjectEditModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [screenshotInput, setScreenshotInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ProjectUpdateFormData>({
    resolver: zodResolver(projectUpdateSchema),
  });

  const techs = watch("techs") || [];
  const screenshots = watch("screenshots") || [];

  useEffect(() => {
    if (project && isOpen) {
      setValue("title", project.title);
      setValue("description", project.description.content);
      setValue("techs", project.techs.content);
      setValue("screenshots", project.screenshots);
      setValue("deployment", project.links.content.deployment.url);
      setValue("backend", project.links.content.backend.url);
      setValue("frontend", project.links.content.frontend.url);
      setValue("previewImage", project.previewImage);
    }
  }, [project, isOpen, setValue]);

  const addTech = () => {
    if (techInput.trim() && !techs.includes(techInput.trim())) {
      setValue("techs", [...techs, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setValue(
      "techs",
      techs.filter((t) => t !== tech)
    );
  };

  const addScreenshot = () => {
    if (screenshotInput.trim() && !screenshots.includes(screenshotInput.trim())) {
      setValue("screenshots", [...screenshots, screenshotInput.trim()]);
      setScreenshotInput("");
    }
  };

  const removeScreenshot = (screenshot: string) => {
    setValue(
      "screenshots",
      screenshots.filter((s) => s !== screenshot)
    );
  };

  const onSubmit = async (data: ProjectUpdateFormData) => {
    if (!project) return;

    try {
      setIsLoading(true);
      await putProject(project.id, data);
      toast.success("Projeto atualizado com sucesso!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
      toast.error("Erro ao atualizar projeto. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setTechInput("");
    setScreenshotInput("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="min-w-4xl w-full h-[90vh]  flex flex-col">
        <DialogHeader>
          <DialogTitle>Editar Projeto: {project?.title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" {...register("title")} placeholder="Nome do projeto" />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="previewImage">URL da Imagem de Preview</Label>
                <Input id="previewImage" {...register("previewImage")} placeholder="https://exemplo.com/imagem.jpg" />
                {errors.previewImage && <p className="text-sm text-red-500">{errors.previewImage.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" {...register("description")} placeholder="Descrição do projeto..." rows={4} />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Tecnologias</Label>
              <div className="flex gap-2">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Digite uma tecnologia"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                />
                <Button type="button" onClick={addTech}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {techs.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTech(tech)} />
                  </Badge>
                ))}
              </div>
              {errors.techs && <p className="text-sm text-red-500">{errors.techs.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deployment">URL de Deployment</Label>
                <Input id="deployment" {...register("deployment")} placeholder="https://meuapp.com" />
                {errors.deployment && <p className="text-sm text-red-500">{errors.deployment.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="backend">URL do Backend</Label>
                <Input id="backend" {...register("backend")} placeholder="https://github.com/user/backend" />
                {errors.backend && <p className="text-sm text-red-500">{errors.backend.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="frontend">URL do Frontend</Label>
                <Input id="frontend" {...register("frontend")} placeholder="https://github.com/user/frontend" />
                {errors.frontend && <p className="text-sm text-red-500">{errors.frontend.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Screenshots (URLs)</Label>
              <div className="flex gap-2">
                <Input
                  value={screenshotInput}
                  onChange={(e) => setScreenshotInput(e.target.value)}
                  placeholder="https://exemplo.com/screenshot.jpg"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addScreenshot())}
                />
                <Button type="button" onClick={addScreenshot}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {screenshots.map((screenshot, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm flex-1 truncate">{screenshot}</span>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeScreenshot(screenshot)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
