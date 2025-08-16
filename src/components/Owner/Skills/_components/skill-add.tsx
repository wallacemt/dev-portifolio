"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X, Plus, Loader2, Eye, Trash } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { SkillTypeValues, StackType } from "@/types/skills";
import { postSkill } from "@/services/skillsApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type SkillAddFormData, skillSchema } from "@/lib/validations/skills";

import { PreviewImage } from "@/utilis/preview-image";
import z from "zod";

interface ProjectAddProps {
  onSuccess?: () => void;
}

export function SkillAdd({ onSuccess }: ProjectAddProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [subSkillInput, setSubSkillInput] = useState("");
  const [previewModalImage, setPreviewModalImage] = useState<string | null>(null);
  const [jsonInput, setJsonInput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const fillFormFromJson = () => {
    setJsonError("");
    try {
      const obj = JSON.parse(jsonInput);
      if (obj.nome) setValue("title", obj.nome);
      if (obj.icon) setValue("image", obj.icon);
      if (obj.stack) setValue("stack", obj.stack);
      if (obj.type) setValue("type", obj.type);
      if (Array.isArray(obj.habilidades)) setValue("subSkils", obj.habilidades);
      toast.success("Campos preenchidos pelo JSON!");
      setJsonInput("");
    } catch (err) {
      console.error(err);
      setJsonError("JSON inválido. Verifique o formato.");
    }
  };

  const form = useForm<SkillAddFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      title: "",
      stack: "",
      type: "",
      subSkils: [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    getValues,
  } = form;

  const subSkils = watch("subSkils") || [];
  const screenshot = watch("image");

  const addSubSkill = () => {
    if (subSkillInput.trim() && !subSkils.includes(subSkillInput.trim())) {
      setValue("subSkils", [...subSkils, subSkillInput.trim()]);
    }
  };

  const removeSubSkill = (tech: string) => {
    setValue(
      "subSkils",
      subSkils.filter((t) => t !== tech)
    );
  };

  const onSubmit: SubmitHandler<SkillAddFormData> = async (data) => {
    try {
      setIsLoading(true);
      await postSkill(data);
      toast.success("Skill adicionada com sucesso!");
      reset();
      setJsonInput("");
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao criar habilidade:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao criar habilidade. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-roxo700 font-secundaria">
      <CardContent className={`space-y-6 ${isLoading && "blur-xs"}`}>
        <div className="space-y-2 mb-4">
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

        {screenshot && z.string().url().safeParse(screenshot).success && (
          <div className="mx-auto flex flex-col items-center justify-center w-full">
            <p className="text-sm mb-4 font-principal">Preview Image:</p>
            <div
              className="relative w-60 h-60 rounded-md overflow-hidden border group cursor-pointer"
              onClick={() => setPreviewModalImage(screenshot)}
            >
              <Image
                src={screenshot}
                height={300}
                width={200}
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
              <Input id="title" {...register("title")} placeholder="Titulo da Stack" />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL da Imagem *</Label>
              <Input id="image" {...register("image")} type="url" placeholder="https://exemplo.com/imagem.jpg" />
              {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stack">Stack *</Label>
            <Select onValueChange={(value) => setValue("stack", value)}>
              <SelectTrigger id="stack" className="w-full">
                <SelectValue placeholder="Select Stack" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(StackType).map(([value, label]) => (
                  <SelectItem key={label} value={label}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.stack && <p className="text-sm text-red-500">{errors.stack.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type *</Label>
            <Select onValueChange={(value) => setValue("type", value)} defaultValue={getValues("type")}>
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SkillTypeValues).map(([value, label]) => (
                  <SelectItem key={value} value={label}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Sub-Skills</Label>
            <div className="flex gap-2">
              <Input
                value={subSkillInput}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  const lastChar = value.slice(-1);
                  if (lastChar === "[") {
                    setSubSkillInput(value);
                  } else if (lastChar === "]") {
                    const subSkils = value
                      .slice(1, -1)
                      .split(",")
                      .map((item) => item.trim().replace(/"/g, ""));
                    setValue("subSkils", [...getValues("subSkils"), ...subSkils]);
                    setSubSkillInput("");
                  } else {
                    setSubSkillInput(value);
                  }
                }}
                placeholder="ex: Tratamento de exceções, Sessões e Cookies"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSubSkill())}
              />
              <Button type="button" onClick={addSubSkill}>
                <Plus className="h-4 w-4" />
              </Button>
              {subSkils.length > 0 && (
                <Button type="button" onClick={() => setValue("subSkils", [])} variant="destructive">
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
            {errors.subSkils && <p className="text-sm text-red-500">{errors.subSkils.message}</p>}
            {subSkils.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-3">Preview das subSkils:</p>
                {subSkils.map((subSkill, index) => (
                  <div className="inline-flex items-center bg-roxo500 p-2 rounded-lg gap-1 mr-2 mb-2" key={index}>
                    <p key={index * subSkill.length}>{subSkill}</p>
                    <X size={15} onClick={() => removeSubSkill(subSkill)} className="cursor-pointer" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              className="cursor-pointer disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Limpar
            </Button>
            <Button type="submit" disabled={isLoading} className="cursor-pointer disabled:cursor-not-allowed">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                "Adicionar Skill"
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
