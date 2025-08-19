"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Calendar, Loader2, ExternalLink, Clock, Building } from "lucide-react";
import { deleteFormation } from "@/services/formationApi";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";
import { Formation } from "@/types/formations";

interface FormationCrudCardProps {
  formation: Formation;
  onEdit: (formation: Formation) => void;
  onUpdate: () => void;
}

export function FormationCrudCard({ formation, onEdit, onUpdate }: FormationCrudCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteFormation(formation.id);
      toast.success("Formação removida com sucesso!");
      onUpdate();
    } catch (error) {
      console.error("Erro ao remover formação:", error);
      toast.error("Erro ao remover formação.");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Data não informada";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const getFormationTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      technologist: "Tecnólogo",
      technical: "Técnico",
      bootcamp: "Bootcamp",
      course: "Curso",
      certificate: "Certificado",
      posGraduation: "Pós-Graduação",
      other: "Outro",
    };
    return typeLabels[type] || type;
  };

  return (
    <>
      <Card className="w-full max-w-xl mx-auto bg-roxo600">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                <span className="font-principal truncate">{formation.title}</span>
                <Badge variant="default" className="text-xs">
                  {getFormationTypeLabel(formation.type)}
                </Badge>
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{formation.institution}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2 max-h-14 overflow-auto">{formation.description}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <Button variant="outline" size="sm" onClick={() => onEdit(formation)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setShowDeleteConfirm(true)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative">
          {formation.image && (
            <div className="relative">
              <Image
                height={500}
                width={500}
                src={formation.image}
                alt={formation.title}
                className="w-60 mx-auto animate-float h-48 object-cover rounded-md"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Início: {formatDate(formation.initialDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Fim: {formatDate(formation.endDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Carga horária: {formation.workload}h</span>
            </div>
          </div>
          <Button className="w-full">{formation.concluded ? "Finalizado" : "Concluir"}</Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full disabled:cursor-not-allowed"
            asChild
            disabled={!formation.certificationUrl || formation.certificationUrl === null}
          >
            <a href={formation.certificationUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" />
              Ver Certificado
            </a>
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="bg-background p-6 rounded-lg flex flex-col gap-2 max-w-md w-full mx-4">
          <DialogHeader>
            <h3 className="text-lg font-semibold mb-2 font-principal">Confirmar Exclusão</h3>
            <p className="text-sm text-muted-foreground mb-4 font-secundaria">
              Tem certeza que deseja excluir a formação <span className="text-Destaque">{formation.title}</span>? Esta
              ação não pode ser desfeita.
            </p>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
