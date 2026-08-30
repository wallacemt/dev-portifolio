import { Metadata } from "next";
import { Suspense } from "react";
import VideosContent from "@/components/Visitor/Videos/Videos";
import {
  generateMetadata as generateSEOMetadata,
  getLanguageSpecificContent,
  generateBreadcrumbStructuredData,
} from "@/lib/seo-utils";
import { getOwner } from "@/services/ownerApi";
import { StructuredData } from "@/components/Visitor/SEO/StructuredData";
import { getSiteURL } from "@/lib/axios";

export const revalidate = 60;

interface VideosPageProps {
  params: Promise<{ language: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ language: string }> }): Promise<Metadata> {
  const { language } = await params;
  const title = language === "pt" ? "Vídeos" : "Videos";
  const description =
    language === "pt"
      ? "Vídeos recentes do canal no YouTube, acompanhando o desenvolvimento dos projetos."
      : "Recent videos from the YouTube channel, following the projects as they're built.";

  try {
    const owner = await getOwner(language);
    const content = getLanguageSpecificContent(language);
    const baseUrl = getSiteURL();

    return generateSEOMetadata(
      {
        title: `${title} | ${owner.name} - ${owner.occupation}`,
        description,
        keywords: [...content.keywords, "youtube", "vídeos", "desenvolvimento", owner.name.toLowerCase()],
        canonicalUrl: `${baseUrl}/watch/${language}/videos`,
        author: owner.name,
        language,
      },
      owner,
    );
  } catch {
    const content = getLanguageSpecificContent(language);
    return generateSEOMetadata({
      title: `${title} | ${content.siteName}`,
      description,
      keywords: [...content.keywords, "youtube", "vídeos"],
      language,
    });
  }
}

export default async function VideosPage({ params }: VideosPageProps) {
  const { language } = await params;

  const baseUrl = getSiteURL();
  const content = getLanguageSpecificContent(language);
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: content.homeTitle, url: `${baseUrl}/watch/${language}` },
    { name: language === "pt" ? "Vídeos" : "Videos", url: `${baseUrl}/watch/${language}/videos` },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <Suspense fallback={<div className="w-full max-w-6xl mx-auto px-4 md:px-12 py-16 animate-pulse h-96" />}>
        <VideosContent language={language} />
      </Suspense>
    </>
  );
}
