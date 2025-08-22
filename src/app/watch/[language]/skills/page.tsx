import { Metadata } from "next";
import { Skills as SK } from "@/components/Visitor/Skills/Skills";
import { SkillsContentSkeleton } from "@/components/Visitor/Skills/_components/skills-tabs-content-skeleton";
import { Suspense } from "react";
import {
  generateMetadata as generateSEOMetadata,
  getLanguageSpecificContent,
  generateBreadcrumbStructuredData,
} from "@/lib/seo-utils";
import { getOwner } from "@/services/ownerApi";
import { StructuredData } from "@/components/Visitor/SEO/StructuredData";

interface SkillProps {
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
        title: `${content.skillsTitle} | ${owner.name} - ${owner.occupation}`,
        description: `Conheça as habilidades técnicas de ${owner.name}. Tecnologias, linguagens de programação, frameworks e ferramentas de desenvolvimento.`,
        keywords: [
          ...content.keywords,
          "habilidades",
          "skills",
          "tecnologias",
          "linguagens programação",
          "frameworks",
          "ferramentas desenvolvimento",
          "competências técnicas",
          owner.name.toLowerCase(),
        ],
        canonicalUrl: `${baseUrl}/watch/${language}/skills`,
        author: owner.name,
        language,
        ogImage: `${baseUrl}/og-image-skills-${language === "pt" ? "pt" : "en"}.png`,
      },
      owner
    );
  } catch{
    const content = getLanguageSpecificContent(language);
    return generateSEOMetadata({
      title: `${content.skillsTitle} | ${content.siteName}`,
      description: `Habilidades técnicas em desenvolvimento web, tecnologias e ferramentas de programação.`,
      keywords: [...content.keywords, "habilidades", "skills", "tecnologias"],
      language,
    });
  }
}

export default async function Skills({ params }: SkillProps) {
  const { language } = await params;
  const baseUrl = process.env.API_URL || "https://wallace-dev.com";
  const content = getLanguageSpecificContent(language);
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: content.homeTitle, url: `${baseUrl}/watch/${language}` },
    { name: content.skillsTitle, url: `${baseUrl}/watch/${language}/skills` },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <Suspense fallback={<SkillsContentSkeleton />}>
        <SK language={language} />
      </Suspense>
    </>
  );
}
