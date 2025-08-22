import { Metadata } from "next";
import { Abbout } from "@/components/Visitor/Abbout";
import { getOwner } from "@/services/ownerApi";
import { generateMetadata as generateSEOMetadata, getLanguageSpecificContent } from "@/lib/seo-utils";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ language: string }> }): Promise<Metadata> {
  const { language } = await params;

  try {
    const owner = await getOwner(language);
    const content = getLanguageSpecificContent(language);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

    return generateSEOMetadata(
      {
        title: `${owner.name} - ${owner.occupation} | ${content.homeTitle}`,
        description:
          owner.welcomeMessage ||
          owner.about ||
          `${content.defaultDescription} Conheça mais sobre ${owner.name} e seus projetos.`,
        keywords: [
          ...content.keywords,
          owner.name.toLowerCase(),
          ...(owner.occupation?.toLowerCase().split(" ") || []),
          "sobre",
          "biografia",
          "perfil profissional",
        ],
        canonicalUrl: `${baseUrl}/watch/${language}`,
        author: owner.name,
        language,
        ogImage: owner.avatar || `${baseUrl}/og-image-home-${language === "pt" ? "pt" : "en"}.png`,
      },
      owner
    );
  } catch  {
    const content = getLanguageSpecificContent(language);
    return generateSEOMetadata({
      title: `${content.homeTitle} | ${content.siteName}`,
      description: content.defaultDescription,
      keywords: [...content.keywords, "início", "home"],
      language,
    });
  }
}

export default async function HomePage({ params }: { params: Promise<{ language: string }> }) {
  try {
    const { language } = await params;
    const ownerRes = await getOwner(language);
    return <Abbout owner={ownerRes} language={language} />;
  } catch (e) {
    console.error(e);
    throw new Error("API_ERROR");
  }
}
