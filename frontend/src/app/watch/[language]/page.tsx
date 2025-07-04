import Silk from "@/blocks/Backgrounds/Silk/Silk";
import { PageLoader } from "@/components/ui/page-loader";
import { Header } from "@/components/Visitor/Header/Header";
import { getAvailableLanguages } from "@/services/utilisApi";
import { notFound } from "next/navigation";
import { Suspense } from "react";
interface Params {
  params: Promise<{ language: string }>;
}

export default async function HomePage({ params }: Params) {
  const { language } = await params;
  let available: Record<string, any>;
  try {
    const langs = await getAvailableLanguages();
    available = langs.translation[0];
  } catch (e) {
    throw new Error("API_ERROR"); 
  }
  if (!available[language]) {
    notFound(); 
  }
  return (
    <main >
        <PageLoader>
        <div className="fixed inset-0 z-[-1]">
          <Silk speed={6} scale={1} color="#2F0559" noiseIntensity={1.5} rotation={0} />
        </div>
        <Header language={language} />
        <p className="text-2xl text-Destaque">AA + {language}</p>
    </PageLoader>
      </main>
  );
}
