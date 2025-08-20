"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Formation, FormationTypeValues } from "@/types/formations";
import { FormationUpdateFormData, formationSchemaOptional } from "@/lib/validations/formations";
import { putFormation } from "@/services/formationApi";
import { Calendar22 } from "@/components/ui/calendar-22";

interface FormationEditModalProps {
  formation: Formation | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function FormationEditModal({ formation, isOpen, onClose, onSuccess }: FormationEditModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormationUpdateFormData>({
    resolver: zodResolver(formationSchemaOptional),
  });

  useEffect(() => {
    if (formation && isOpen) {
      const formData = {
        title: formation.title || "",
        institution: formation.institution || "",
        image: formation.image || "",
        workload: formation.workload || 0,
        initialDate: formation.initialDate ? new Date(formation.initialDate) : new Date(),
        endDate: formation.endDate ? new Date(formation.endDate) : new Date(),
        description: formation.description || "",
        type: formation.type || "",
        certificationUrl: formation.certificationUrl || "",
      };
      reset(formData);
    }
    if (!isOpen) {
      reset({
        title: "",
        institution: "",
        image: "",
        workload: 0,
        initialDate: new Date(),
        endDate: new Date(),
        description: "",
        type: "",
        certificationUrl: "",
      });
    }
  }, [formation, isOpen, reset]);

  const onSubmit = async (data: FormationUpdateFormData) => {
    if (!formation) return;

    try {
      setIsLoading(true);

      await putFormation(formation.id, data);
      toast.success("Formação atualizada com sucesso!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error((error as { message: string }).message || "Erro ao atualizar formação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="min-w-4xl w-full h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Editar Formação: {formation?.title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <form onSubmit={handleSubmitForm} className="space-y-6 p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" {...register("title")} placeholder="Nome da formação" />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution">Instituição</Label>
                <Input id="institution" {...register("institution")} placeholder="Nome da instituição" />
                {errors.institution && <p className="text-sm text-red-500">{errors.institution.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="image">URL da Imagem</Label>
                <Input id="image" {...register("image")} placeholder="https://exemplo.com/imagem.jpg" />
                {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="workload">Carga Horária</Label>
                <Input
                  id="workload"
                  type="number"
                  {...register("workload", { valueAsNumber: true })}
                  placeholder="40"
                />
                {errors.workload && <p className="text-sm text-red-500">{errors.workload.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Calendar22
                  title="Data Inicial"
                  initialDate={formation?.initialDate ? new Date(formation.initialDate) : new Date()}
                  onChange={(date) => setValue("initialDate", date || new Date(), { shouldValidate: true })}
                />
                {errors.initialDate && <p className="text-sm text-red-500">{errors.initialDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Calendar22
                  title="Data Final"
                  initialDate={formation?.endDate ? new Date(formation.endDate) : new Date()}
                  onChange={(date) => setValue("endDate", date || new Date(), { shouldValidate: true })}
                />
                {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Formação</Label>
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
              <Label htmlFor="description">Descrição</Label>
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
      </DialogContent>
    </Dialog>
  );
}
