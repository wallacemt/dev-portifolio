import { Metadata } from "next";
import { ServicesSkeleton } from "@/components/Visitor/OwnerServices/_components/services-skeleton";
import { Services } from "@/components/Visitor/OwnerServices/Services";
import { Suspense } from "react";
import {
  generateMetadata as generateSEOMetadata,
  getLanguageSpecificContent,
  generateBreadcrumbStructuredData,
} from "@/lib/seo-utils";
import { getOwner } from "@/services/ownerApi";
import { StructuredData } from "@/components/Visitor/SEO/StructuredData";

export const revalidate = 60;

interface OwnerServicesProps {
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
        title: `${content.servicesTitle} | ${owner.name} - ${owner.occupation}`,
        description: `Serviços oferecidos por ${owner.name}. Desenvolvimento web, consultoria em tecnologia, criação de aplicações frontend e backend.`,
        keywords: [
          ...content.keywords,
          "serviços",
          "desenvolvimento web",
          "consultoria",
          "freelancer",
          "criação websites",
          "aplicações web",
          "soluções digitais",
          owner.name.toLowerCase(),
        ],
        canonicalUrl: `${baseUrl}/watch/${language}/services`,
        author: owner.name,
        language,
        ogImage: `${baseUrl}/og-image-services-${language === "pt" ? "pt" : "en"}.png`,
      },
      owner
    );
  } catch {
    const content = getLanguageSpecificContent(language);
    return generateSEOMetadata({
      title: `${content.servicesTitle} | ${content.siteName}`,
      description: `Serviços de desenvolvimento web, consultoria em tecnologia e soluções digitais.`,
      keywords: [...content.keywords, "serviços", "desenvolvimento web", "consultoria"],
      language,
    });
  }
}

export default async function OwnerServices({ params }: OwnerServicesProps) {
  const { language } = await params;
  const baseUrl = process.env.API_URL || "https://wallace-dev.com";
  const content = getLanguageSpecificContent(language);
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: content.homeTitle, url: `${baseUrl}/watch/${language}` },
    { name: content.servicesTitle, url: `${baseUrl}/watch/${language}/services` },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <Suspense fallback={<ServicesSkeleton />}>
        <Services language={language} />
      </Suspense>
    </>
  );
}
