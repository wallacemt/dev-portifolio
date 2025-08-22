import { Metadata } from "next";
import { FormationsSkeleton } from "@/components/Visitor/Formations/_components/formations-skeleton";
import { Formations } from "@/components/Visitor/Formations/Formations";
import { Suspense } from "react";
import {
  generateMetadata as generateSEOMetadata,
  getLanguageSpecificContent,
  generateBreadcrumbStructuredData,
} from "@/lib/seo-utils";
import { getOwner } from "@/services/ownerApi";
import { StructuredData } from "@/components/Visitor/SEO/StructuredData";

export const revalidate = 60;

interface OwnerFormationsProps {
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
        title: `${content.formationTitle} | ${owner.name} - ${owner.occupation}`,
        description: `Formação acadêmica e profissional de ${owner.name}. Cursos, certificações e educação em desenvolvimento e tecnologia.`,
        keywords: [
          ...content.keywords,
          "formação",
          "educação",
          "cursos",
          "certificações",
          "formação acadêmica",
          "educação profissional",
          "aprendizado",
          owner.name.toLowerCase(),
        ],
        canonicalUrl: `${baseUrl}/watch/${language}/formation`,
        author: owner.name,
        language,
        ogImage: `${baseUrl}/og-image-formation-${language === "pt" ? "pt" : "en"}.png`,
      },
      owner
    );
  } catch {
    const content = getLanguageSpecificContent(language);
    return generateSEOMetadata({
      title: `${content.formationTitle} | ${content.siteName}`,
      description: `Formação acadêmica e profissional em desenvolvimento web e tecnologia.`,
      keywords: [...content.keywords, "formação", "educação", "cursos"],
      language,
    });
  }
}

export default async function OwnerFormations({ params }: OwnerFormationsProps) {
  const { language } = await params;
  const baseUrl = process.env.API_URL || "https://wallace-dev.com";
  const content = getLanguageSpecificContent(language);
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: content.homeTitle, url: `${baseUrl}/watch/${language}` },
    { name: content.formationTitle, url: `${baseUrl}/watch/${language}/formation` },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <Suspense fallback={<FormationsSkeleton />}>
        <Formations language={language} />
      </Suspense>
    </>
  );
}
