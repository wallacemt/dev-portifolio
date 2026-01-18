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
import { createCertification, updateCertification } from "@/services/certificationApi";
import { Certification } from "@/types/badges";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const certificationSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  issuer: z.string().min(2, "Emissor deve ter no mínimo 2 caracteres"),
  issueDate: z.string().min(1, "Data de emissão é obrigatória"),
  expirationDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url("URL da credencial inválida"),
  certificateFile: z.string().url("URL do certificado inválida").optional().or(z.literal("")),
});

type CertificationFormData = z.infer<typeof certificationSchema>;

interface CertificationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  certification?: Certification;
}

export function CertificationFormModal({ isOpen, onClose, onSuccess, certification }: CertificationFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!certification;

  const form = useForm<CertificationFormData>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      title: certification?.title || "",
      description: certification?.description || "",
      issuer: certification?.issuer || "",
      issueDate: certification?.issueDate ? new Date(certification.issueDate).toISOString().split("T")[0] : "",
      expirationDate: certification?.expirationDate
        ? new Date(certification.expirationDate).toISOString().split("T")[0]
        : "",
      credentialId: certification?.credentialId || "",
      credentialUrl: certification?.credentialUrl || "",
      certificateFile: certification?.certificateFile || "",
    },
  });

  const onSubmit = async (data: CertificationFormData) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateCertification(certification.id, data);
        toast("Certificação atualizada", {
          description: "A certificação foi atualizada com sucesso.",
        });
      } else {
        await createCertification(data);
        toast("Certificação criada", {
          description: "A certificação foi criada com sucesso.",
        });
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Erro", {
        description: error instanceof Error ? error.message : "Erro ao salvar certificação",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadComplete = (results: { url: string }[]) => {
    if (results[0]?.url) {
      form.setValue("certificateFile", results[0].url);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl w-full h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Certificação" : "Nova Certificação"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize as informações da certificação"
              : "Preencha os dados para criar uma nova certificação"}
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
                    <Input placeholder="AWS Certified Solutions Architect" {...field} />
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
                    <Textarea placeholder="Descrição da certificação" className="min-h-[100px]" {...field} />
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

            <div className="grid grid-cols-2 gap-4">
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
                name="expirationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Expiração</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>Opcional</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="credentialId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID da Credencial</FormLabel>
                  <FormControl>
                    <Input placeholder="AWS-12345-6789" {...field} />
                  </FormControl>
                  <FormDescription>Opcional</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="credentialUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Credencial *</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.credly.com/badges/..." {...field} />
                  </FormControl>
                  <FormDescription>Link para verificação da certificação</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="certificateFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arquivo do Certificado (Opcional)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input placeholder="https://exemplo.com/certificate.pdf" {...field} />
                      <FileUpload
                        accept="application/pdf,image/*"
                        uploadOptions={{
                          folder: "portifolio/certifications",
                          resourceType: "auto",
                        }}
                        onUploadComplete={handleUploadComplete}
                        label="Ou faça upload do certificado"
                        description="PDF ou imagem do certificado"
                      />
                    </div>
                  </FormControl>
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
