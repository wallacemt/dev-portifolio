import { ReactNode } from "react";
import Silk from "@/blocks/Backgrounds/Silk/Silk";
import { PageLoader } from "@/components/ui/page-loader";
import Footer from "@/components/Visitor/Footer/Footer";
import Header from "@/components/Visitor/Header/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { OwnerProvider } from "@/contexts/OwnerContext";

interface Props {
  children: ReactNode;
  params: Promise<{ language: string }>;
}

export default async function LanguageLayout({ children, params }: Props) {
  const { language } = await params;
  return (
    <LanguageProvider>
      <PageLoader>
        <OwnerProvider>
          <Header language={language} />
          <div className="fixed inset-0 z-[-1]">
            <Silk speed={6} scale={1} color="#2F0559" noiseIntensity={1.5} rotation={0} />
          </div>
      
          <main className="p-6 container flex-1">{children}</main>
          <Footer language={language} />
        </OwnerProvider>
      </PageLoader>
    </LanguageProvider>
  );
}
