"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X, Plus, Loader2, Eye } from "lucide-react";
import { projectAddSchema, type ProjectAddFormData } from "@/lib/validations/project";
import { postProject } from "@/services/projects";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";
import { Skill } from "@/types/skills";
import { getSkills } from "@/services/skillsApi";

interface ProjectAddProps {
  onSuccess?: () => void;
}

export function ProjectAdd({ onSuccess }: ProjectAddProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [screenshotInput, setScreenshotInput] = useState("");
  const [imageLoadingStates, setImageLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [previewModalImage, setPreviewModalImage] = useState<string | null>(null);

  const form = useForm<ProjectAddFormData>({
    resolver: zodResolver(projectAddSchema),
    defaultValues: {
      techs: [],
      screenshots: [],
      deployment: "",
      backend: "",
      frontend: "",
      lastUpdate: new Date(),
      title: "",
      description: "",
      previewImage: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = form;

  const techs = watch("techs") || [];
  const screenshots = watch("screenshots") || [];
  const previewImage = watch("previewImage");
  const [skills, setSkills] = useState<Skill[]>([]);
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
    setImageLoadingStates((prev) => {
      const newState = { ...prev };
      delete newState[screenshot];
      return newState;
    });
  };

  async function fetchSkills() {
    try {
      const data = await getSkills();
      return setSkills(data.skills);
    } catch (_error) {
      return [];
    }
  }
  const onSubmit: SubmitHandler<ProjectAddFormData> = async (data) => {
    try {
      setIsLoading(true);

      await postProject(data);
      toast.success("Projeto criado com sucesso!");
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao criar projeto. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchSkills();
  }, []);
  return (
    <Card className="w-full max-w-4xl mx-auto bg-roxo700 font-secundaria">
      <CardContent className="space-y-6">
        {previewImage && (
          <div className=" mx-auto max-w-2xl">
            <p className="text-sm mb-4 font-principal">Preview Image:</p>
            <div
              className="relative w-full h-40 rounded-md overflow-hidden border group cursor-pointer"
              onClick={() => setPreviewModalImage(previewImage)}
            >
              {imageLoadingStates[previewImage] && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              )}
              <Image
                src={previewImage}
                height={500}
                width={500}
                alt="Preview da imagem"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div className="hidden absolute inset-0 items-center justify-center bg-muted text-muted-foreground text-sm">
                Erro ao carregar imagem
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input id="title" {...register("title")} placeholder="Nome do projeto" />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="previewImage">URL da Imagem de Preview *</Label>
              <Input id="previewImage" {...register("previewImage")} placeholder="https://exemplo.com/imagem.jpg" />
              {errors.previewImage && <p className="text-sm text-red-500">{errors.previewImage.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea id="description" {...register("description")} placeholder="Descrição do projeto..." rows={4} />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Tecnologias *</Label>

            {skills && skills.length > 0 && (
              <div className="bg-roxo600/60 p-4 rounded-md max-w-full h-54 flex flex-col items-center justify-center">
                <p className="text-white self-start font-semibold">Suas Skills</p>
                <div className="flex  gap-2 mt-2 overflow-x-auto">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-roxo300/40 flex flex-col cursor-pointer  items-center gap-1 rounded-md px-2 py-1 text-sm font-medium"
                      onClick={() => {
                        setTechInput(skill.title);
                        addTech();
                      }}
                    >
                      <Image src={skill.image} width={100} height={200} alt={skill.title} />
                      <p>{skill.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {techs.map((tech) => (
                <div
                  key={tech}
                  className="bg-gray-800 flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium"
                >
                  {tech}
                  <X className="h-4 w-4 cursor-pointer" onClick={() => removeTech(tech)} />
                </div>
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
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addScreenshot())}
              />
              <Button type="button" onClick={addScreenshot}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {screenshots.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-3">Preview das Screenshots:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {screenshots.map((screenshot, index) => (
                    <div key={index} className="relative group">
                      <div
                        className="aspect-video rounded-md overflow-hidden border bg-muted cursor-pointer"
                        onClick={() => setPreviewModalImage(screenshot)}
                      >
                        {imageLoadingStates[screenshot] && (
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                          </div>
                        )}
                        <Image
                          src={screenshot}
                          height={500}
                          width={500}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="h-5 w-5 text-white" />
                        </div>
                        <div className="hidden w-full h-full items-center justify-center text-xs text-muted-foreground">
                          Erro ao carregar
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeScreenshot(screenshot);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => reset()} disabled={isLoading}>
              Limpar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar Projeto"
              )}
            </Button>
          </div>
        </form>
      </CardContent>

      {/* Modal de Preview da Imagem */}
      {previewModalImage && (
        <PreviewImage previewImage={previewModalImage} setPreviewModalImage={setPreviewModalImage} />
      )}
    </Card>
  );
}

function PreviewImage({
  previewImage,
  setPreviewModalImage,
}: {
  previewImage: string;
  setPreviewModalImage: (image: string) => void;
}) {
  return (
    <Dialog open={!!previewImage} onOpenChange={() => setPreviewModalImage("")}>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <p className="text-xl font-principal text-roxo100 mb-2">Preview:</p>
        </DialogHeader>
        <div className="mt-2">
          <Image
            src={previewImage}
            height={500}
            width={500}
            alt="Preview em tamanho completo"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
