"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skill, SkillTypeValues, StackType } from "@/types/skills";
import { SkillUpdateFormData, skillUpdateSchema } from "@/lib/validations/skills";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { putSKill } from "@/services/skillsApi";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Save, Trash, X } from "lucide-react";
interface SkillEditModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function SkillEditModal({ skill, isOpen, onClose, onSuccess }: SkillEditModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [subSkillInput, setSubSkillInput] = useState("");
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    getValues,
    reset,
  } = useForm<SkillUpdateFormData>({
    resolver: zodResolver(skillUpdateSchema),
  });

  useEffect(() => {
    if (skill && isOpen) {
      const formData = {
        title: skill.title || "",
        stack: skill.stack || "",
        type: skill.type || "",
        subSkils: skill.subSkils || [],
        image: skill.image || "",
      };
      reset(formData);
      setSubSkillInput("");
    }
    if (!isOpen) {
      reset({
        title: "",
        stack: "",
        type: "",
        subSkils: [],
        image: "",
      });
      setSubSkillInput("");
    }
  }, [skill, isOpen, reset]);
  const subSkils = watch("subSkils") || [];

  const onSubmit = async (data: SkillUpdateFormData) => {
    if (!skill) return;
    console.log(data);
    try {
      setIsLoading(true);
      await putSKill(skill.id, data);
      toast.success("Skill atualizado com sucesso!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error((error as { message: string }).message || "Erro ao atualizar Skill. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setSubSkillInput("");
    onClose();
  };

  const addSubSkill = () => {
    if (subSkillInput.trim() && !subSkils.includes(subSkillInput.trim())) {
      const newSubSkils = [...subSkils, subSkillInput.trim()];
      setValue("subSkils", newSubSkils);
      setSubSkillInput("");
    }
  };

  const removeSubSkill = (tech: string) => {
    const newSubSkils = subSkils.filter((t) => t !== tech);
    setValue("subSkils", newSubSkils);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(getValues());
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`min-w-4xl w-full h-[90vh]  flex flex-col `}>
        <DialogHeader>
          <DialogTitle>Editar Skill: {skill?.title}</DialogTitle>
        </DialogHeader>

        <div className={`flex-1 overflow-y-auto p-4 ${isLoading && "blur-xs"}`}>
          <form onSubmit={handleSubmitForm} className="space-y-6 p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" {...register("title")} placeholder="Nome do projeto" />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="previewImage">URL da Imagem de Preview</Label>
                <Input id="previewImage" {...register("image")} placeholder="https://exemplo.com/imagem.jpg" />
                {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stack">Stack</Label>
              <Select
                value={watch("stack") || ""}
                onValueChange={(value) => setValue("stack", value, { shouldValidate: true })}
              >
                <SelectTrigger id="stack" className="w-full">
                  <SelectValue placeholder="Select Stack" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(StackType).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.stack && <p className="text-sm text-red-500">{errors.stack.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={watch("type") || ""}
                onValueChange={(value) => setValue("type", value, { shouldValidate: true })}
              >
                <SelectTrigger id="type" className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SkillTypeValues).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {key}
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
                    const value = e.target.value;
                    const lastChar = value.slice(-1);
                    if (lastChar === "[") {
                      setSubSkillInput(value);
                    } else if (lastChar === "]") {
                      const subSkillsText = value.slice(1, -1);
                      const newSubSkils = subSkillsText
                        .split(",")
                        .map((item) => item.trim().replace(/"/g, ""))
                        .filter((item) => item.length > 0);

                      const currentSubSkils = getValues("subSkils") || [];
                      const updatedSubSkils = [
                        ...currentSubSkils,
                        ...newSubSkils.filter((item) => !currentSubSkils.includes(item)),
                      ];
                      setValue("subSkils", updatedSubSkils);
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
