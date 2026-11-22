
import { Suspense } from "react";
import { ProjectsSkeleton } from "@/components/Owner/Projects/_components/project-skeleton";
import { SkillsCrud } from "@/components/Owner/Skills/SkillsCrud";

interface OwnerSkillsCRUDProps {
  searchParams: Promise<{
    state?: "edit" | "all" | "create";
    id?: string;
  }>;
}

export default async function OwnerSkillsCRUD({ searchParams }: OwnerSkillsCRUDProps) {
  const params = await searchParams;
  const state = params.state || "all";
  const id = params.id;

  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <SkillsCrud state={Promise.resolve({ state, id })} />
    </Suspense>
  );
}
