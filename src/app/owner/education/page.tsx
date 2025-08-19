
import { Suspense } from "react";
import { ProjectsSkeleton } from "@/components/Owner/Projects/_components/project-skeleton";
import { EducationPageCRUD } from "@/components/Owner/Education/Education";

interface EducationCRUDProps {
  searchParams: Promise<{
    state?: "edit" | "all" | "create";
    id?: string;
  }>;
}

export default async function OwnerEducationPage({ searchParams }: EducationCRUDProps) {
  const params = await searchParams;
  const state = params.state || "all";
  const id = params.id;

  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <EducationPageCRUD state={Promise.resolve({ state, id })} />
    </Suspense>
  );
}
