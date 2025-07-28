import { Services } from "@/components/Visitor/OwnerServices";
interface OwnerServicesProps {
  params: Promise<{ language: string }>;
}
export default async function OwnerServices({ params }: OwnerServicesProps) {
  const { language } = await params;

  return <Services language={language} />;
}
