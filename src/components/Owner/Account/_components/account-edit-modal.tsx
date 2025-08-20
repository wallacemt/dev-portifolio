"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Save, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { OwnerResponse } from "@/types/owner";
import { OwnerUpdateFormData, ownerUpdateSchema } from "@/lib/validations/owner";
import { updateOwner } from "@/services/ownerApi";
import { Calendar22 } from "@/components/ui/calendar-22";
import Image from "next/image";
import z from "zod";

interface AccountEditModalProps {
  owner: OwnerResponse;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AccountEditModal({ owner, isOpen, onClose, onSuccess }: AccountEditModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<OwnerUpdateFormData>({
    resolver: zodResolver(ownerUpdateSchema),
  });

  const avatarUrl = watch("avatar");

  useEffect(() => {
    if (owner && isOpen) {
      const formData = {
        name: owner.name || "",
        email: owner.email || "",
        avatar: owner.avatar || "",
        about: owner.about || "",
        occupation: owner.occupation || "",
        birthDate: owner.birthDate ? new Date(owner.birthDate) : new Date(),
        cvLinkPT: owner.cvLinkPT || "",
        cvLinkEN: owner.cvLinkEN || "",
        password: "", // Sempre vazio para segurança
      };
      reset(formData);
    }
    if (!isOpen) {
      reset({
        name: "",
        email: "",
        avatar: "",
        about: "",
        occupation: "",
        birthDate: new Date(),
        cvLinkPT: "",
        cvLinkEN: "",
        password: "",
      });
    }
  }, [owner, isOpen, reset]);

  const onSubmit = async (data: OwnerUpdateFormData) => {
    try {
      setIsLoading(true);

      // Remove password se estiver vazio
      const updateData = { ...data };
      if (!updateData.password || updateData.password.trim() === "") {
        delete updateData.password;
      }

      // Remove campos vazios opcionais
      if (!updateData.avatar?.trim()) delete updateData.avatar;
      if (!updateData.cvLinkPT?.trim()) delete updateData.cvLinkPT;
      if (!updateData.cvLinkEN?.trim()) delete updateData.cvLinkEN;

      await updateOwner(updateData);
      toast.success("Perfil atualizado com sucesso!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error((error as { message: string }).message || "Erro ao atualizar perfil. Tente novamente.");
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
          <DialogTitle>Editar Perfil: {owner?.name}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <form onSubmit={handleSubmitForm} className="space-y-6 p-1">
            {/* Preview do Avatar */}
            {avatarUrl && z.string().url().safeParse(avatarUrl).success && (
              <div className="flex justify-center">
                <div className="relative">
                  <Image
                    src={avatarUrl}
                    alt="Preview do avatar"
                    width={200}
                    height={200}
                    className="rounded-full object-cover border-4 border-roxo300"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" {...register("name")} placeholder="Seu nome completo" />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} placeholder="seu@email.com" />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="occupation">Ocupação</Label>
                <Input id="occupation" {...register("occupation")} placeholder="Desenvolvedor Full Stack" />
                {errors.occupation && <p className="text-sm text-red-500">{errors.occupation.message}</p>}
              </div>

              <div className="space-y-2">
                <Calendar22
                  title="Data de Nascimento"
                  initialDate={owner?.birthDate ? new Date(owner.birthDate) : new Date()}
                  onChange={(date) => setValue("birthDate", date || new Date(), { shouldValidate: true })}
                />
                {errors.birthDate && <p className="text-sm text-red-500">{errors.birthDate.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">URL do Avatar</Label>
              <Input id="avatar" {...register("avatar")} placeholder="https://exemplo.com/avatar.jpg" />
              {errors.avatar && <p className="text-sm text-red-500">{errors.avatar.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">Sobre</Label>
              <Textarea id="about" {...register("about")} placeholder="Conte um pouco sobre você..." rows={4} />
              {errors.about && <p className="text-sm text-red-500">{errors.about.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cvLinkPT">Link do CV - Português</Label>
                <Input id="cvLinkPT" {...register("cvLinkPT")} placeholder="https://exemplo.com/cv-pt.pdf" />
                {errors.cvLinkPT && <p className="text-sm text-red-500">{errors.cvLinkPT.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvLinkEN">Link do CV - English</Label>
                <Input id="cvLinkEN" {...register("cvLinkEN")} placeholder="https://exemplo.com/cv-en.pdf" />
                {errors.cvLinkEN && <p className="text-sm text-red-500">{errors.cvLinkEN.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Nova Senha (deixe vazio para manter a atual)</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Digite uma nova senha (opcional)"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
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
