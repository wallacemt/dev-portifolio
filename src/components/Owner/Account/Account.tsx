"use client";

import { useRouter } from "next/navigation";
import { useOwner } from "@/contexts/OwnerContext";
import { AccountContent } from "./_components/account-content";
import { SiteHeader } from "@/components/ui/site-header";
import { User } from "lucide-react";
import Link from "next/link";

export function AccountOwner() {
  const { owner, handleOwner } = useOwner();
  const router = useRouter();

  const handleUpdate = async () => {
    try {
      await handleOwner();
      router.refresh();
    } catch (error) {
      console.error("Erro ao atualizar dados do owner:", error);
    }
  };

  if (!owner) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-muted-foreground">Carregando perfil...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <div className="mb-8">
        <Link href="/owner/account?state=view">
          <SiteHeader title="Meu Perfil" icon={<User className="h-6 w-6" />} />
        </Link>
        <p className="text-white font-semibold pl-8 text-sm">Visualize e edite suas informações pessoais.</p>
      </div>

      <AccountContent owner={owner} onUpdate={handleUpdate} />
    </div>
  );
}
