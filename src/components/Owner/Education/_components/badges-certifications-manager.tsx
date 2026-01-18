"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, Certification } from "@/types/badges";
import { BadgeFormModal } from "./badge-form-modal";
import { CertificationFormModal } from "./certification-form-modal";
import { deleteBadge } from "@/services/badgeApi";
import { deleteCertification } from "@/services/certificationApi";
import { Plus, Edit, Trash2, Medal, Award, RefreshCcw } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { BadgeCard } from "@/components/Visitor/Formations/_components/badge-card";
import { CertificationCard } from "@/components/Visitor/Formations/_components/certification-card";

interface BadgesAndCertificationsManagerProps {
  certifications: Certification[];
  badges: Badge[];
  onUpdate: () => void;
  loading: boolean;
}

export function BadgesAndCertificationsManager({
  certifications,
  badges,
  onUpdate,
  loading,
}: BadgesAndCertificationsManagerProps) {
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [certificationModalOpen, setCertificationModalOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState<Badge | undefined>();
  const [editingCertification, setEditingCertification] = useState<Certification | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<{ type: "badge" | "certification"; id: string } | null>(null);
  const handleBadgeEdit = (badge: Badge) => {
    setEditingBadge(badge);
    setBadgeModalOpen(true);
  };

  const handleCertificationEdit = (certification: Certification) => {
    setEditingCertification(certification);
    setCertificationModalOpen(true);
  };

  const handleBadgeModalClose = () => {
    setBadgeModalOpen(false);
    setEditingBadge(undefined);
  };

  const handleCertificationModalClose = () => {
    setCertificationModalOpen(false);
    setEditingCertification(undefined);
  };

  const handleDeleteConfirm = (type: "badge" | "certification", id: string) => {
    setDeletingItem({ type, id });
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingItem) return;

    try {
      if (deletingItem.type === "badge") {
        await deleteBadge(deletingItem.id);
        toast.success("Badge deletado", {
          description: "O badge foi removido com sucesso.",
        });
      } else {
        await deleteCertification(deletingItem.id);
        toast.success("Certificação deletada", {
          description: "A certificação foi removida com sucesso.",
        });
      }
      onUpdate();
    } catch (error) {
      toast.error("Erro", {
        description: error instanceof Error ? error.message : "Erro ao deletar",
      });
    } finally {
      setDeleteDialogOpen(false);
      setDeletingItem(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Badges Section */}
      <Card className={`bg-roxo500/80 ${loading && "opacity-50"}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Medal className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Badges</CardTitle>
                <CardDescription>Gerencie os badges desta formação</CardDescription>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                size="sm"
                onClick={() => {
                  setEditingBadge(undefined);
                  setBadgeModalOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Badge
              </Button>
              <Button size="sm" onClick={onUpdate}>
                <RefreshCcw />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex items-center justify-center">
              <Spinner className="size-8" />
            </div>
          )}
          {badges && badges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge) => (
                <div key={badge.id} className="flex relative items-start justify-between gap-4">
                  <BadgeCard badge={badge} />
                  <div className="flex gap-2 absolute right-2">
                    <Button size="icon" variant="ghost" onClick={() => handleBadgeEdit(badge)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDeleteConfirm("badge", badge.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhum badge cadastrado para esta formação
              </p>
            )
          )}
        </CardContent>
      </Card>

      {/* Certifications Section */}
      <Card className={`bg-roxo600/80 ${loading && "opacity-50"}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Certificações</CardTitle>
                <CardDescription>Gerencie as certificações desta formação</CardDescription>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => {
                setEditingCertification(undefined);
                setCertificationModalOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Certificação
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex items-center justify-center">
              <Spinner className="size-8" />
            </div>
          )}

          {certifications && certifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((certification) => (
                <div key={certification.id} className="flex relative items-start justify-between gap-4">
                  <CertificationCard certification={certification} />
                  <div className="flex gap-2 absolute right-0">
                    <Button size="icon" variant="ghost" onClick={() => handleCertificationEdit(certification)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteConfirm("certification", certification.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhuma certificação cadastrada para esta formação
              </p>
            )
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <BadgeFormModal
        isOpen={badgeModalOpen}
        onClose={handleBadgeModalClose}
        onSuccess={() => {
          onUpdate();
          handleBadgeModalClose();
        }}
        badge={editingBadge}
      />

      <CertificationFormModal
        isOpen={certificationModalOpen}
        onClose={handleCertificationModalClose}
        onSuccess={() => {
          onUpdate();
          handleCertificationModalClose();
        }}
        certification={editingCertification}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este {deletingItem?.type === "badge" ? "badge" : "certificação"}? Esta ação
              não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Cancelar</DialogClose>
            <Button variant={"destructive"} onClick={handleDelete}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
