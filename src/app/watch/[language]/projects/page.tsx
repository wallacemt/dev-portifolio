import { Metadata } from "next";
import { ProjectTimelineSkeleton } from "@/components/Visitor/Projects/_components/project-card-skeleton";
import ProjectTimeline from "@/components/Visitor/Projects/Projects";
import { Suspense } from "react";
import {
  generateMetadata as generateSEOMetadata,
  getLanguageSpecificContent,
  generateBreadcrumbStructuredData,
} from "@/lib/seo-utils";
import { getOwner } from "@/services/ownerApi";
import { StructuredData } from "@/components/Visitor/SEO/StructuredData";

export const revalidate = 60;

interface ProjectsProps {
  params: Promise<{ language: string }>;
  searchParams: Promise<{ search?: string; tech?: string; orderBy?: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ language: string }> }): Promise<Metadata> {
  const { language } = await params;

  try {
    const owner = await getOwner(language);
    const content = getLanguageSpecificContent(language);
    const baseUrl = process.env.API_URL || "https://wallace-dev.com";

    return generateSEOMetadata(
      {
        title: `${content.projectsTitle} | ${owner.name} - ${owner.occupation}`,
        description: `Explore os projetos desenvolvidos por ${owner.name}. Portfólio com projetos de desenvolvimento web, aplicações frontend e backend.`,
        keywords: [
          ...content.keywords,
          "projetos",
          "portfolio projetos",
          "desenvolvimento web",
          "aplicações",
          "frontend",
          "backend",
          owner.name.toLowerCase(),
        ],
        canonicalUrl: `${baseUrl}/watch/${language}/projects`,
        author: owner.name,
        language,
        ogImage: `${baseUrl}/og-image-projects-${language === "pt" ? "pt" : "en"}.png`,
      },
      owner
    );
  } catch  {
    const content = getLanguageSpecificContent(language);
    return generateSEOMetadata({
      title: `${content.projectsTitle} | ${content.siteName}`,
      description: `Explore projetos de desenvolvimento web, aplicações frontend e backend.`,
      keywords: [...content.keywords, "projetos", "portfolio projetos"],
      language,
    });
  }
}

export default async function Projects({ params, searchParams }: ProjectsProps) {
  const { language } = await params;
  const filters = await searchParams;

  const baseUrl = process.env.API_URL || "https://wallace-dev.com";
  const content = getLanguageSpecificContent(language);
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: content.homeTitle, url: `${baseUrl}/watch/${language}` },
    { name: content.projectsTitle, url: `${baseUrl}/watch/${language}/projects` },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <Suspense fallback={<ProjectTimelineSkeleton />}>
        <ProjectTimeline language={language} filters={filters} />
      </Suspense>
    </>
  );
}
