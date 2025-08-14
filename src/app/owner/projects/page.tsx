import { ProjectsPageCRUD } from "@/components/Owner/Projects/Projects";
import { Suspense } from "react";
import { ProjectsSkeleton } from "@/components/Owner/Projects/_components/project-skeleton";

interface OwnerProjectCRUDProps {
  searchParams: Promise<{
    state?: "edit" | "all" | "create";
    id?: string;
  }>;
}

export default async function OwnerProjectsPage({ searchParams }: OwnerProjectCRUDProps) {
  const params = await searchParams;
  const state = params.state || "all";
  const id = params.id;

  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectsPageCRUD state={Promise.resolve({ state, id })} />
    </Suspense>
  );
}
