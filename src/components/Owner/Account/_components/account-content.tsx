"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Calendar, Mail, Briefcase, FileText, ExternalLink } from "lucide-react";
import Image from "next/image";
import { OwnerResponse } from "@/types/owner";
import { AccountEditModal } from "./account-edit-modal";

interface AccountContentProps {
  owner: OwnerResponse;
  onUpdate: () => void;
}

export function AccountContent({ owner, onUpdate }: AccountContentProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateSuccess = () => {
    onUpdate();
    setIsEditModalOpen(false);
  };

  const formatDate = (dateString: string | Date) => {
    if (!dateString) return "Data não informada";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const calculateAge = (birthDate: string | Date) => {
    if (!birthDate) return "N/A";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto bg-roxo600">
        <CardHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="flex mx-auto justify-center items-center gap-6">
              {owner.avatar && (
                <div className="relative">
                  <Image
                    src={owner.avatar}
                    alt={owner.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover border-4 border-roxo300"
                  />
                </div>
              )}
              <div className="flex-1">
                <CardTitle className="flex items-center gap-3">
                  <span className="font-principal text-2xl">{owner.name}</span>
                  <Badge variant="default" className="text-sm">
                    Owner
                  </Badge>
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-lg text-muted-foreground">{owner.occupation}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{owner.email}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Informações Pessoais</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Nascimento: {formatDate(owner.birthDate)} ({calculateAge(owner.birthDate)} anos)
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Currículos</h3>
                <div className="flex flex-col gap-2">
                  {owner.cvLinkPT && (
                    <Button variant="outline" size="sm" asChild className="justify-start">
                      <a href={owner.cvLinkPT} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-2" />
                        Currículo - Português
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                  )}
                  {owner.cvLinkEN && (
                    <Button variant="outline" size="sm" asChild className="justify-start">
                      <a href={owner.cvLinkEN} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-2" />
                        Currículo - English
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Sobre</h3>
                <p className="text-sm text-muted-foreground leading-relaxed bg-roxo700/50 p-4 rounded-md">
                  {owner.about}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Mensagem de Boas-vindas</h3>
                <p className="text-sm text-muted-foreground leading-relaxed bg-roxo700/50 p-4 rounded-md">
                  {owner.welcomeMessage}
                </p>
              </div>
            </div>
          </div>

          {owner.buttons && (
            <div className="mt-6 pt-4 border-t border-roxo400">
              <h3 className="font-semibold text-lg mb-3">Configurações de Botões</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-roxo700/50 p-3 rounded-md">
                  <span className="text-sm font-medium">Botão Projetos:</span>
                  <p className="text-sm text-muted-foreground mt-1">{owner.buttons.project}</p>
                </div>
                <div className="bg-roxo700/50 p-3 rounded-md">
                  <span className="text-sm font-medium">Botão Currículo:</span>
                  <p className="text-sm text-muted-foreground mt-1">{owner.buttons.curriculo}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AccountEditModal
        owner={owner}
        isOpen={isEditModalOpen}
        onClose={handleCloseEdit}
        onSuccess={handleUpdateSuccess}
      />
    </>
  );
}
