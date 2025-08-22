import { ReactNode, Suspense } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageLoader } from "@/components/ui/page-loader";
import Footer from "@/components/Visitor/Footer/Footer";
import Header from "@/components/Visitor/Header/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { OwnerProvider } from "@/contexts/OwnerContext";
import { OptimizedAnalyticsProvider } from "@/hooks/useOptimizedAnalytics";
import { StructuredData } from "@/components/Visitor/SEO/StructuredData";
import {
  generateMetadata as generateSEOMetadata,
  generateStructuredData,
  getLanguageSpecificContent,
} from "@/lib/seo-utils";
import { getOwner } from "@/services/ownerApi";

const Silk = dynamic(() => import("@/components/blocks/Backgrounds/Silk/Silk"), {});

interface Props {
  children: ReactNode;
  params: Promise<{ language: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ language: string }> }): Promise<Metadata> {
  const { language } = await params;

  try {
    const owner = await getOwner(language);
    const content = getLanguageSpecificContent(language);
    const baseUrl = process.env.API_URL || "https://wallace-dev.com";
    return generateSEOMetadata(
      {
        title: `${owner.name} - ${content.siteName}`,
        description: owner.about || content.defaultDescription,
        keywords: [
          ...content.keywords,
          owner.name.toLowerCase(),
          ...(owner.occupation?.toLowerCase().split(" ") || []),
        ],
        canonicalUrl: `${baseUrl}/watch/${language}`,
        author: owner.name,
        language,
        ogImage: `${baseUrl}/og-image-home-${language === "pt" ? "pt" : "en"}.png`,
      },
      owner
    );
  } catch {
    const content = getLanguageSpecificContent(language);
    return generateSEOMetadata({
      title: content.siteName,
      description: content.defaultDescription,
      keywords: content.keywords,
      language,
    });
  }
}

export default async function LanguageLayout({ children, params }: Props) {
  const { language } = await params;
  let owner;
  try {
    owner = await getOwner(language);
  } catch (error) {
    console.error("Error fetching owner for SEO:", error);
  }
  const structuredData = generateStructuredData(owner, language);

  return (
    <OptimizedAnalyticsProvider>
      <LanguageProvider>
        <OwnerProvider>
          <PageLoader>
            <StructuredData data={structuredData} />
            <Header language={language} />

            <Suspense
              fallback={<div className="fixed inset-0 z-[-1] bg-gradient-to-br from-roxo300/20 to-roxo300/40" />}
            >
              <div className="fixed inset-0 z-[-1]">
                <Silk speed={6} scale={1} color="#2F0559" noiseIntensity={1.5} rotation={0} />
              </div>
            </Suspense>

            <main className="p-6 container flex-1" role="main" aria-label="Conteúdo principal">
              {children}
            </main>
            <Footer language={language} />
          </PageLoader>
        </OwnerProvider>
      </LanguageProvider>
    </OptimizedAnalyticsProvider>
  );
}
