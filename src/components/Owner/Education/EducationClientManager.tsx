"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Code } from "lucide-react";
import { SiteHeader } from "@/components/ui/site-header";
import Link from "next/link";
import { Formation } from "@/types/formations";
import { FormationsAllContent } from "./_components/formation-all-content";
import { FormationEditModal } from "./_components/formation-edit-modal";
import { FormationAdd } from "./_components/formation-add";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { BadgesAndCertificationsManager } from "./_components/badges-certifications-manager";
import { Badge, Certification } from "@/types/badges";
import { getAllBadges } from "@/services/badgeApi";
import { getAllCertifications } from "@/services/certificationApi";

interface FormationClientManagerProps {
  formation: Formation[];
  currentState: "edit" | "all" | "create";
  editFormation: Formation | null;
}

export function FormationClientManager({ formation, currentState, editFormation }: FormationClientManagerProps) {
  const router = useRouter();
  const [certifications, setCertification] = useState<Certification[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCertifications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllCertifications();
      setCertification(response);
    } catch (error) {
      toast.error(`Error ao carregar formations: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [update]);
  const getBadges = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllBadges();
      setBadges(response.badges);
    } catch (error) {
      toast.error(`Error ao carregar formations: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [update]);

  useEffect(() => {
    getBadges();
    getCertifications();
    getBadges();
  }, [getCertifications, getBadges]);
  const handleUpdate = () => {
    router.refresh();
  };

  const handleNavigate = (state: "edit" | "all" | "create", id?: string) => {
    const params = new URLSearchParams();
    params.set("state", state);
    if (id) params.set("id", id);

    router.push(`/owner/education?${params.toString()}`);
  };

  const handleCreateSuccess = (redirect: boolean) => {
    if (redirect) {
      handleNavigate("all");
    }
    handleUpdate();
  };

  const handleEditClose = () => {
    handleNavigate("all");
  };

  const handleEditSuccess = () => {
    handleNavigate("all");
    handleUpdate();
  };

  if (currentState === "create") {
    return (
      <div className="container mx-auto py-4 px-6">
        <div className="mb-8">
          <Link href={"/owner/education?state=all"}>
            <SiteHeader title="Criar Nova Formação" icon={<Plus className="h-6 w-6" />} />
          </Link>
          <p className="text-white pl-6 mt-2">Preencha os dados para criar uma nova formação.</p>
        </div>

        <FormationAdd onSuccess={handleCreateSuccess} />
      </div>
    );
  }

  if (currentState === "edit" && editFormation) {
    return (
      <div className="container mx-auto py-8">
        <FormationEditModal
          formation={editFormation}
          isOpen={true}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
        />
        <FormationsAllContent formations={formation} onUpdate={handleUpdate} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <div className="mb-8 flex justify-between items-center">
        <div className="flex flex-col justify-center">
          <Link href={"/owner/education?state=all"}>
            <SiteHeader title="Gerenciar Formações" icon={<Code className="h-6 w-6" />} />
          </Link>
          <p className="text-white font-semibold pl-8 text-sm">Gerencie suas formações: criar, editar, e excluir.</p>
        </div>

        <Button onClick={() => handleNavigate("create")}>
          <Plus className="mr-2 h-4 w-4" />
          Nova formação
        </Button>
      </div>
      <Tabs defaultValue="formation">
        <TabsList className="flex items-center justify-center w-full bg-gray-900 rounded-2xl">
          <TabsTrigger value="formation">Formação</TabsTrigger>
          <TabsTrigger value="certification">Certificação</TabsTrigger>
        </TabsList>
        <TabsContent value="formation">
          <FormationsAllContent formations={formation} onUpdate={handleUpdate} />
        </TabsContent>
        <TabsContent value="certification">
          <BadgesAndCertificationsManager
            loading={loading}
            certifications={certifications}
            badges={badges}
            onUpdate={() => setUpdate(true)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
