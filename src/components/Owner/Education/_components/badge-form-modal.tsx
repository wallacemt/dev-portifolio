"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { FileUpload } from "@/components/ui/file-upload";
import { createBadge, updateBadge } from "@/services/badgeApi";
import { Badge } from "@/types/badges";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const badgeSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  imageUrl: z.string().url("URL da imagem inválida"),
  issuer: z.string().min(2, "Emissor deve ter no mínimo 2 caracteres"),
  issueDate: z.string().min(1, "Data de emissão é obrigatória"),
  badgeUrl: z.string().url("URL do badge inválida").optional().or(z.literal("")),
});

type BadgeFormData = z.infer<typeof badgeSchema>;

interface BadgeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  badge?: Badge;
}

export function BadgeFormModal({ isOpen, onClose, onSuccess, badge }: BadgeFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!badge;

  const form = useForm<BadgeFormData>({
    resolver: zodResolver(badgeSchema),
    defaultValues: {
      title: badge?.title || "",
      description: badge?.description || "",
      imageUrl: badge?.imageUrl || "",
      issuer: badge?.issuer || "",
      issueDate: badge?.issueDate ? new Date(badge.issueDate).toISOString().split("T")[0] : "",
      badgeUrl: badge?.badgeUrl || "",
    },
  });

  const onSubmit = async (data: BadgeFormData) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateBadge(badge.id, data);
        toast("Badge atualizado", {
          description: "O badge foi atualizado com sucesso.",
        });
      } else {
        await createBadge(data);
        toast("Badge criado", {
          description: "O badge foi criado com sucesso.",
        });
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Erro", {
        description: error instanceof Error ? error.message : "Erro ao salvar badge",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadComplete = (results: { url: string }[]) => {
    if (results[0]?.url) {
      form.setValue("imageUrl", results[0].url);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl w-full h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Badge" : "Novo Badge"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Atualize as informações do badge" : "Preencha os dados para criar um novo badge"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título *</FormLabel>
                  <FormControl>
                    <Input placeholder="AWS Cloud Quest: Cloud Practitioner" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descrição do badge obtido" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issuer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emissor *</FormLabel>
                  <FormControl>
                    <Input placeholder="Amazon Web Services" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Emissão *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem do Badge *</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input placeholder="https://exemplo.com/badge.png" {...field} />
                      <FileUpload
                        accept="image/*"
                        uploadOptions={{
                          folder: "portifolio/badges",
                          resourceType: "image",
                        }}
                        onUploadComplete={handleUploadComplete}
                        label="Ou faça upload da imagem"
                        description="Clique ou arraste a imagem do badge"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Cole a URL da imagem ou faça upload</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="badgeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Badge (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.credly.com/badges/..." {...field} />
                  </FormControl>
                  <FormDescription>Link para verificação do badge (ex: Credly)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "Atualizar" : "Criar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
