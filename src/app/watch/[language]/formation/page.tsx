import { FormationsSkeleton } from "@/components/Visitor/Formations/_components/formations-skeleton";
import { Formations } from "@/components/Visitor/Formations/Formations";
import { Suspense } from "react";
export const revalidate = 60;
interface OwnerFormationsProps {
  params: Promise<{ language: string }>;
}
export default async function OwnerFormations({ params }: OwnerFormationsProps) {
  const { language } = await params;

  return (
    <Suspense fallback={<FormationsSkeleton />}>
      <Formations language={language} />
    </Suspense>
  );
}
