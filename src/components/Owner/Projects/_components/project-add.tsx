"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X, Loader2, Eye, RefreshCcw, Plus, Github, Sparkles, FileText } from "lucide-react";
import { projectAddSchema, type ProjectAddFormData } from "@/lib/validations/project";
import { postProject } from "@/services/projects";
import { toast } from "sonner";
import Image from "next/image";
import { Skill } from "@/types/skills";
import { getSkillNotFilter } from "@/services/skillsApi";
import { getGithubRepos, getGithubReadme, getGithubSuggestion, type GithubRepoSummary } from "@/services/githubSuggestion";
import Link from "next/link";
import { PreviewImage } from "@/utilis/preview-image";
import { FileUpload } from "@/components/ui/file-upload";
import z from "zod";
import { Switch } from "@/components/ui/switch";
import { isYoutubeUrl, youtubeEmbedUrl } from "@/utilis/youtube";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ownerGithubUsername } from "@/lib/axios";
import { cn } from "@/lib/utils";

interface ProjectAddProps {
  onSuccess?: (redirect: boolean) => void;
}

export function ProjectAdd({ onSuccess }: ProjectAddProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTech, setSearchTech] = useState("");
  const [videoInput, setVideoInput] = useState("");
  const [videoInputError, setVideoInputError] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [imageLoadingStates, setImageLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [previewModalImage, setPreviewModalImage] = useState<string | null>(null);
  const [isFinishRedirect, setIsFinishRedirect] = useState(false);
  const [jsonError, setJsonError] = useState("");
  const [githubUsername, setGithubUsername] = useState(ownerGithubUsername);
  const [githubRepos, setGithubRepos] = useState<GithubRepoSummary[]>([]);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [isFetchingRepos, setIsFetchingRepos] = useState(false);
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);
  const [readme, setReadme] = useState<string | null>(null);
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);
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
      logoUrl: "",
      videos: [],
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
  const videos = watch("videos") || [];
  const previewImage = watch("previewImage");
  const logoUrl = watch("logoUrl");
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
        logoUrl?: string;
      } = JSON.parse(jsonInput);
      if (obj.nome) setValue("title", obj.nome);
      if (obj.previewImage) setValue("previewImage", obj.previewImage.trim());
      if (obj.logoUrl) setValue("logoUrl", obj.logoUrl.trim());
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

  const handleScreenshotsUploaded = (results: { url: string }[]) => {
    const newUrls = results.map((r) => r.url).filter((url) => !screenshots.includes(url));
    if (newUrls.length > 0) {
      setValue("screenshots", [...screenshots, ...newUrls]);
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

  const addVideo = () => {
    const url = videoInput.trim();
    if (!url) return;
    if (videos.length >= 5) {
      setVideoInputError("No máximo 5 vídeos são permitidos");
      return;
    }
    if (!isYoutubeUrl(url)) {
      setVideoInputError("Informe um link válido do YouTube");
      return;
    }
    if (videos.includes(url)) {
      setVideoInputError("Esse vídeo já foi adicionado");
      return;
    }
    setValue("videos", [...videos, url]);
    setVideoInput("");
    setVideoInputError("");
  };

  const removeVideo = (video: string) => {
    setValue(
      "videos",
      videos.filter((v) => v !== video)
    );
  };

  async function fetchSkills() {
    setIsLoading(true);
    try {
      const data = await getSkillNotFilter();
      setSkills(data.skills || []);
    } catch (err) {
      console.error(err);
      setSkills([]);
    } finally {
      setIsLoading(false);
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
  async function fetchGithubRepos() {
    const username = githubUsername.trim();
    if (!username) return;
    setIsFetchingRepos(true);
    setSelectedRepo("");
    setReadme(null);
    try {
      const repos = await getGithubRepos(username);
      setGithubRepos(repos);
      if (repos.length === 0) toast.info("Nenhum repositório encontrado para esse usuário.");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao buscar repositórios do GitHub.");
      setGithubRepos([]);
    } finally {
      setIsFetchingRepos(false);
    }
  }

  async function selectRepo(repoName: string) {
    setSelectedRepo(repoName);
    setReadme(null);
    setIsLoadingReadme(true);
    try {
      const content = await getGithubReadme(githubUsername.trim(), repoName);
      setReadme(content);
    } catch (err) {
      console.error(err);
      setReadme(null);
    } finally {
      setIsLoadingReadme(false);
    }
  }

  async function generateAiSuggestion() {
    if (!selectedRepo) return;
    setIsGeneratingSuggestion(true);
    try {
      const suggestion = await getGithubSuggestion(githubUsername.trim(), selectedRepo);
      setValue("title", suggestion.title);
      setValue("description", suggestion.description);
      setValue("techs", Array.from(new Set([...techs, ...suggestion.techs])));
      if (suggestion.missingSkills.length > 0) {
        toast.info(`Techs detectadas que ainda não estão no seu perfil: ${suggestion.missingSkills.join(", ")}`, {
          description: "Adicione-as na aba Skills se quiser usá-las.",
        });
      }
      toast.success("Formulário preenchido pela sugestão IA! Revise os campos antes de salvar.");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao gerar sugestão a partir do repositório.");
    } finally {
      setIsGeneratingSuggestion(false);
    }
  }

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
        <div className="space-y-2 mb-4 flex flex-col bg-roxo600/60 p-4 rounded-md">
          <Label className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> Sugestão IA a partir do GitHub
          </Label>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex items-center gap-2 flex-1">
              <Github className="h-4 w-4 shrink-0 text-roxo100" />
              <Input
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="Seu username do GitHub"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), fetchGithubRepos())}
              />
            </div>
            <Button type="button" variant="secondary" onClick={fetchGithubRepos} disabled={isFetchingRepos || !githubUsername.trim()}>
              {isFetchingRepos ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buscar repositórios"}
            </Button>
          </div>
          {githubRepos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 max-h-72 overflow-auto pr-1">
              {githubRepos.map((repo) => (
                <button
                  key={repo.fullName}
                  type="button"
                  onClick={() => selectRepo(repo.name)}
                  className={cn(
                    "text-left rounded-md border p-3 transition hover:border-roxo100",
                    selectedRepo === repo.name ? "border-roxo100 bg-roxo500/40" : "border-roxo300/40 bg-roxo700/40",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium truncate">{repo.name}</span>
                    {repo.language && (
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {repo.language}
                      </Badge>
                    )}
                  </div>
                  {repo.description && <p className="text-xs text-roxo100 mt-1 line-clamp-2">{repo.description}</p>}
                  <p className="text-[10px] text-roxo100/70 mt-1">
                    Atualizado em {new Date(repo.updatedAt).toLocaleDateString("pt-BR")}
                  </p>
                </button>
              ))}
            </div>
          )}
          {selectedRepo && (
            <div className="mt-3 space-y-2 border-t border-roxo300/30 pt-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <Label className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4" /> README de {selectedRepo}
                </Label>
                <Button type="button" size="sm" onClick={generateAiSuggestion} disabled={isGeneratingSuggestion}>
                  {isGeneratingSuggestion ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-1 h-4 w-4" /> Gerar sugestão
                    </>
                  )}
                </Button>
              </div>
              <ScrollArea className="h-48 rounded-md border border-roxo300/30 bg-roxo700/60 p-3">
                {isLoadingReadme ? (
                  <div className="flex items-center gap-2 text-sm text-roxo100">
                    <Loader2 className="h-4 w-4 animate-spin" /> Carregando README...
                  </div>
                ) : readme ? (
                  <pre className="whitespace-pre-wrap text-xs font-mono text-roxo100">{readme}</pre>
                ) : (
                  <p className="text-sm text-roxo100">Esse repositório não tem README.</p>
                )}
              </ScrollArea>
            </div>
          )}
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
              <Label>Imagem de Preview *</Label>
              <FileUpload
                accept="image/*"
                uploadOptions={{ folder: "portifolio/projects/preview", resourceType: "image" }}
                existingUrls={previewImage ? [previewImage] : []}
                onRemoveExisting={() => setValue("previewImage", "")}
                onUploadComplete={(results) => results[0]?.url && setValue("previewImage", results[0].url)}
                onUploadError={(error) => toast.error("Erro no upload", { description: error })}
                description="Arraste e solte ou clique para selecionar"
              />
              {errors.previewImage && <p className="text-sm text-red-500">{errors.previewImage.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Logo do Projeto (opcional)</Label>
              <FileUpload
                accept="image/*"
                uploadOptions={{ folder: "portifolio/projects/logo", resourceType: "image" }}
                existingUrls={logoUrl ? [logoUrl] : []}
                onRemoveExisting={() => setValue("logoUrl", "")}
                onUploadComplete={(results) => results[0]?.url && setValue("logoUrl", results[0].url)}
                onUploadError={(error) => toast.error("Erro no upload", { description: error })}
                description="Usado em destaques compactos (landing); sem ele, usa a imagem de preview"
              />
              {errors.logoUrl && <p className="text-sm text-red-500">{errors.logoUrl.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
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
            <Label>Vídeos (URLs do YouTube, máx. 5)</Label>
            <div className="flex gap-2">
              <Input
                value={videoInput}
                onChange={(e) => {
                  setVideoInput(e.target.value);
                  setVideoInputError("");
                }}
                placeholder="https://youtube.com/watch?v=oE56g61mW44"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addVideo())}
              />
              <Button type="button" onClick={addVideo}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {videoInputError && <p className="text-sm text-red-500">{videoInputError}</p>}
            {errors.videos && <p className="text-sm text-red-500">{errors.videos.message}</p>}

            {videos.length > 0 && (
              <div className="space-y-4 mt-2">
                {videos.map((video) => (
                  <div
                    key={video}
                    className="relative border border-purple-600/60 hover:border-purple-800 hover:border-2 transition-all rounded-2xl flex items-center justify-center p-2"
                  >
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 p-0 z-10"
                      onClick={() => removeVideo(video)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <iframe
                      className="w-full h-82"
                      src={youtubeEmbedUrl(video)}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Screenshots</Label>
            <FileUpload
              multiple
              accept="image/*"
              uploadOptions={{ folder: "portifolio/projects/screenshots", resourceType: "image" }}
              onUploadComplete={handleScreenshotsUploaded}
              onUploadError={(error) => toast.error("Erro no upload", { description: error })}
              description="Arraste e solte ou clique para selecionar (várias imagens)"
            />

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
          <span
            className="w-18 h-18  rounded-full animate-spin border-t-6 border-t-roxo100"
            style={{ transform: "none" }}
          ></span>
          <p className="font-principal text-2xl ">Carregando</p>
        </div>
      )}

      {previewModalImage && (
        <PreviewImage previewImage={previewModalImage} setPreviewModalImage={setPreviewModalImage} />
      )}
    </Card>
  );
}
