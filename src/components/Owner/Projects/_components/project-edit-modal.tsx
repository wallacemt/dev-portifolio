"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Plus, Loader2, Save, RefreshCcw } from "lucide-react";
import { projectUpdateSchema, ProjectUpdateFormData } from "@/lib/validations/project";
import { putProject } from "@/services/projects";
import { Project } from "@/types/projects";
import { toast } from "sonner";
import { Skill } from "@/types/skills";
import { getSkills } from "@/services/skillsApi";
import Image from "next/image";
import Link from "next/link";

interface ProjectEditModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProjectEditModal({ project, isOpen, onClose, onSuccess }: ProjectEditModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [screenshotInput, setScreenshotInput] = useState("");
  const [searchTech, setSearchTech] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);
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

  const addTech = (tech: string) => {
    if (tech.trim() && !techs.includes(tech.trim())) {
      setValue("techs", [...techs, tech.trim()]);
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
      toast.error((error as { message: string }).message || "Erro ao atualizar Projeto. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  async function fetchSkills() {
    setIsLoading(true);
    try {
      const data = await getSkills();
      setSkills(data.skills || []);
    } catch (err) {
      console.error(err);
      setSkills([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSkills();
  }, []);
  const handleClose = () => {
    reset();
    setScreenshotInput("");
    onClose();
  };
  const filteredSkills = searchTech.trim()
    ? skills.filter((skill) => skill.title.toLowerCase().includes(searchTech.trim().toLowerCase()))
    : skills;

 

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="min-w-4xl w-full h-[90vh]  flex flex-col">
        <DialogHeader>
          <DialogTitle>Editar Projeto: {project?.title}</DialogTitle>
        </DialogHeader>

        <div className={`flex-1 overflow-y-auto p-4 ${isLoading && "blur-xs"}`}>
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
              <Label>Tecnologias *</Label>
              <div className="flex flex-col gap-2 max-h-60 overflow-auto w bg-roxo600/60 p-4 rounded-md">
                <div className="flex flex-col  md:items-center gap-2">
                  <div className="w-full flex items-center gap-2 justify-center">
                    <Input
                      type="text"
                      value={searchTech}
                      onChange={(e) => setSearchTech(e.target.value)}
                      placeholder="Pesquise por tecnologia..."
                      className="md:w-1/2"
                    />
                    <Button
                      variant="secondary"
                      size={"icon"}
                      type="button"
                      onClick={async () => {
                        setSearchTech("");
                        await fetchSkills();
                      }}
                    >
                      <RefreshCcw />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {techs.map((tech) => (
                      <div
                        key={tech}
                        className="bg-gray-800 flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium shadow"
                      >
                        {tech}
                        <X className="h-4 w-4 cursor-pointer" onClick={() => removeTech(tech)} />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-roxo100">Selecione uma skill abaixo ou pesquise</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 min-h-[60px]">
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map((skill) => (
                      <button
                        type="button"
                        key={skill.id}
                        className={`bg-roxo300/40 ${
                          techs.includes(skill.title.toLowerCase()) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                        } flex flex-col items-center gap-1 rounded-md px-2 py-1 text-sm font-medium shadow hover:bg-roxo400/60 transition  border border-roxo200`}
                        onClick={() => addTech(skill.title.toLowerCase())}
                      >
                        <Image src={skill.image} width={62} height={62} alt={skill.title} className="rounded" />
                        <span className="truncate w-20">{skill.title}</span>
                      </button>
                    ))
                  ) : (
                    <div className="flex flex-col items-center w-full py-4">
                      <span className="text-roxo100 text-sm">Nenhuma skill encontrada.</span>
                      <Link href="/owner/skills/add" className="mt-2 text-roxo200 underline hover:text-roxo100 text-xs">
                        Adicionar nova skill
                      </Link>
                    </div>
                  )}
                </div>

                {errors.techs && <p className="text-sm text-red-500 mt-2">{errors.techs.message}</p>}
              </div>
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
              <div className="space-y-2 flex flex-wrap gap-4">
                {screenshots.map((screenshot, index) => (
                  <div key={index} className="flex relative items-center">
                    <Image
                      src={screenshot}
                      width={120}
                      height={120}
                      alt={`Screenshot ${index + 1}`}
                      className="rounded"
                    />
                    <Button
                      type="button"
                      className="absolute top-2 rounded-full right-0 w-6 h-6"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeScreenshot(screenshot)}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="cursor-pointer disabled:cursor-not-allowed"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading} className="cursor-pointer disabled:cursor-not-allowed">
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
        {isLoading && (
          <div className="flex flex-col w-40 h-40 mx-auto translate-y-1/2 items-center justify-center absolute inset-0">
            <span className="w-18 h-18  rounded-full animate-spin border-t-6 border-t-roxo100"></span>
            <p className="font-principal text-2xl ">Carregando</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
