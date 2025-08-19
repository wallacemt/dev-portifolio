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
import Image from "next/image";
import { Skill } from "@/types/skills";
import { getSkills } from "@/services/skillsApi";
import Link from "next/link";
import { PreviewImage } from "@/utilis/preview-image";
import z from "zod";
import { Switch } from "@/components/ui/switch";

interface ProjectAddProps {
  onSuccess?: (redirect: boolean) => void;
}

export function ProjectAdd({ onSuccess }: ProjectAddProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTech, setSearchTech] = useState("");
  const [screenshotInput, setScreenshotInput] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [imageLoadingStates, setImageLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [previewModalImage, setPreviewModalImage] = useState<string | null>(null);
  const [isFinishRedirect, setIsFinishRedirect] = useState(false);
  const [jsonError, setJsonError] = useState("");
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

  const fillFormFromJson = () => {
    setJsonError("");
    try {
      const obj: {
        nome: string;
        technologys: string[];
        descricao: string;
        screenshots: string[];
        deployment: string;
        frontend: string;
        backend: string;
        previewImage: string;
      } = JSON.parse(jsonInput);
      if (obj.nome) setValue("title", obj.nome);
      if (obj.previewImage) setValue("previewImage", obj.previewImage.trim());
      if (Array.isArray(obj.technologys)) setValue("techs", obj.technologys);
      if (obj.descricao) setValue("description", obj.descricao);
      if (Array.isArray(obj.screenshots)) setValue("screenshots", obj.screenshots);
      if (obj.deployment) setValue("deployment", obj.deployment);
      if (obj.frontend) setValue("frontend", obj.frontend);
      if (obj.backend) setValue("backend", obj.backend);
      toast.success("Campos preenchidos pelo JSON!");
      setJsonInput("");
    } catch (err) {
      console.error(err);
      setJsonError("JSON inválido. Verifique o formato.");
    }
  };

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
    setImageLoadingStates((prev) => {
      const newState = { ...prev };
      delete newState[screenshot];
      return newState;
    });
  };

  async function fetchSkills() {
    try {
      const data = await getSkills();
      setSkills(data.skills || []);
    } catch (err) {
      console.error(err);
      setSkills([]);
    }
  }
  const onSubmit: SubmitHandler<ProjectAddFormData> = async (data) => {
    try {
      setIsLoading(true);

      await postProject(data);
      toast.success("Projeto criado com sucesso!");
      reset();
      onSuccess?.(isFinishRedirect);
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

  const filteredSkills = searchTech.trim()
    ? skills.filter((skill) => skill.title.toLowerCase().includes(searchTech.trim().toLowerCase()))
    : skills;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-roxo700 font-secundaria">
      <CardContent className={`space-y-6 ${isLoading && "blur-xs"}`}>
        <div className="space-y-2 mb-4 flex flex-col">
          <div className="flex self-end items-center space-x-2">
            <Switch id="redirect" checked={isFinishRedirect} onCheckedChange={setIsFinishRedirect} />
            <Label htmlFor="redirect">Redirecionar após adicionar</Label>
          </div>
          <Label htmlFor="jsonInput">Preencher por JSON</Label>
          <Textarea
            id="jsonInput"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Cole aqui o JSON da skill..."
            rows={5}
            className="font-mono"
          />
          <div className="flex gap-2 mt-2">
            <Button type="button" onClick={fillFormFromJson} variant="secondary">
              Preencher campos
            </Button>
            {jsonError && <span className="text-red-500 text-sm">{jsonError}</span>}
          </div>
        </div>
        {previewImage && z.string().url().safeParse(previewImage).success && (
          <div className="mx-auto max-w-2xl">
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

          {/* Tecnologias - UI/UX melhorado */}
          <div className="space-y-2">
            <Label>Tecnologias *</Label>
            <div className="flex flex-col gap-2 max-h-60 overflow-auto w bg-roxo600/60 p-4 rounded-md">
              <div className="flex flex-col  md:items-center gap-2">
                <Input
                  type="text"
                  value={searchTech}
                  onChange={(e) => setSearchTech(e.target.value)}
                  placeholder="Pesquise por tecnologia..."
                  className="md:w-1/2"
                />
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
                        techs.includes(skill.title) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      } flex flex-col items-center gap-1 rounded-md px-2 py-1 text-sm font-medium shadow hover:bg-roxo400/60 transition  border border-roxo200`}
                      onClick={() => addTech(skill.title)}
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
      {isLoading && (
        <div className="flex flex-col items-center justify-center absolute inset-0">
          <span className="w-18 h-18  rounded-full animate-spin border-t-6 border-t-roxo100"></span>
          <p className="font-principal text-2xl ">Carregando</p>
        </div>
      )}

      {previewModalImage && (
        <PreviewImage previewImage={previewModalImage} setPreviewModalImage={setPreviewModalImage} />
      )}
    </Card>
  );
}
