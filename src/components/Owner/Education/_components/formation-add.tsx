"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Eye, Loader2 } from "lucide-react";
import { formationSchema, type FormationAddFormData } from "@/lib/validations/formations";
import { postFormation } from "@/services/formationApi";
import { toast } from "sonner";
import { ownerId } from "@/lib/axios";
import Image from "next/image";
import z from "zod";
import { FormationTypeValues } from "@/types/formations";

interface FormationAddProps {
  onSuccess?: (redirect: boolean) => void;
}

export function FormationAdd({ onSuccess }: FormationAddProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinishRedirect, setIsFinishRedirect] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const fillFormFromJson = () => {
    setJsonError("");
    try {
      const obj: {
        nome: string;
        tipo: string;
        instituicao: string;
        imagePreview: string;
        cargahoraria: number;
        dataInicio: string;
        dataTermino: string;
        descricao: string;
      } = JSON.parse(jsonInput);
      if (obj.nome) setValue("title", obj.nome);
      if (obj.tipo) setValue("type", obj.tipo);
      if (obj.instituicao) setValue("institution", obj.instituicao);
      if (obj.imagePreview) setValue("image", obj.imagePreview.toLowerCase());
      if (obj.cargahoraria) setValue("workload", obj.cargahoraria);
      if (obj.dataInicio) setValue("initialDate", new Date(obj.dataInicio));
      if (obj.dataTermino) setValue("endDate", new Date(obj.dataTermino));
      if (obj.descricao) setValue("description", obj.descricao);

      toast.success("Campos preenchidos pelo JSON!");
      setJsonInput("");
    } catch (err) {
      console.error(err);
      setJsonError("JSON inválido. Verifique o formato.");
    }
  };

  const form = useForm<FormationAddFormData>({
    resolver: zodResolver(formationSchema),
    defaultValues: {
      title: "",
      institution: "",
      image: "",
      workload: 0,
      initialDate: new Date(),
      endDate: new Date(),
      description: "",
      type: "",
      certificationUrl: undefined,
      concluded: false,
      ownerId: ownerId,
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
  const screenshot = watch("image");
  const onSubmit: SubmitHandler<FormationAddFormData> = async (data) => {
    try {
      setIsLoading(true);
      await postFormation(data);
      toast.success("Formação criada com sucesso!");
      reset();
      onSuccess?.(isFinishRedirect);
    } catch (error) {
      console.error("Erro ao criar formação:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao criar formação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

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
        {screenshot && z.string().url().safeParse(screenshot).success && (
          <div className="mx-auto flex flex-col items-center justify-center w-full">
            <p className="text-sm mb-4 font-principal">Preview Image:</p>
            <div className="relative w-60 h-60 rounded-md overflow-hidden border group cursor-pointer">
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
              <Input id="title" {...register("title")} placeholder="Nome da formação" />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution">Instituição *</Label>
              <Input id="institution" {...register("institution")} placeholder="Nome da instituição" />
              {errors.institution && <p className="text-sm text-red-500">{errors.institution.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="image">URL da Imagem *</Label>
              <Input id="image" {...register("image")} placeholder="https://exemplo.com/imagem.jpg" />
              {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="workload">Carga Horária *</Label>
              <Input id="workload" type="number" {...register("workload", { valueAsNumber: true })} placeholder="40" />
              {errors.workload && <p className="text-sm text-red-500">{errors.workload.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="initialDate">Data Inicial *</Label>
              <Input id="initialDate" type="date" {...register("initialDate", { valueAsDate: true })} />
              {errors.initialDate && <p className="text-sm text-red-500">{errors.initialDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Data Final *</Label>
              <Input id="endDate" type="date" {...register("endDate", { valueAsDate: true })} />
              {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Formação *</Label>
            <Select
              value={watch("type") || ""}
              onValueChange={(value) => setValue("type", value, { shouldValidate: true })}
            >
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(FormationTypeValues).map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea id="description" {...register("description")} placeholder="Descrição da formação..." rows={4} />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificationUrl">URL da Certificação (Opcional)</Label>
            <Input
              id="certificationUrl"
              {...register("certificationUrl")}
              placeholder="https://exemplo.com/certificado.pdf"
            />
            {errors.certificationUrl && <p className="text-sm text-red-500">{errors.certificationUrl.message}</p>}
          </div>
          <div className="space-y-4">
            <div className="flex self-end items-center space-x-2">
              <Label htmlFor="redirect">Formação concluida?</Label>
              <Switch id="redirect" checked={watch("concluded")} onCheckedChange={(e) => setValue("concluded", e)} />
            </div>
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
                "Criar Formação"
              )}
            </Button>
          </div>
        </form>
      </CardContent>

      {isLoading && (
        <div className="flex flex-col items-center justify-center absolute inset-0">
          <span className="w-18 h-18 rounded-full animate-spin border-t-6 border-t-roxo100"></span>
          <p className="font-principal text-2xl">Carregando</p>
        </div>
      )}
    </Card>
  );
}
