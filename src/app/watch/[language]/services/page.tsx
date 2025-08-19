import { ServicesSkeleton } from "@/components/Visitor/OwnerServices/_components/services-skeleton";
import { Services } from "@/components/Visitor/OwnerServices/Services";
import { Suspense } from "react";
export const revalidate = 60;
interface OwnerServicesProps {
  params: Promise<{ language: string }>;
}
export default async function OwnerServices({ params }: OwnerServicesProps) {
  const { language } = await params;

  return (
    <Suspense fallback={<ServicesSkeleton/>}>
      <Services language={language} />
    </Suspense>
  );
}
