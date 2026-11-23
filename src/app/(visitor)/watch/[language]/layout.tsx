import { ReactNode, Suspense } from "react";
import type { Metadata, Viewport } from "next";
import Silk from "@/components/blocks/Backgrounds/Silk/SilkLazy";
import { PageLoader } from "@/components/ui/page-loader";
import Footer from "@/components/Visitor/Footer/Footer";
import Header from "@/components/Visitor/Header/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { OwnerProvider } from "@/contexts/OwnerContext";
import { UmamiScript } from "@/components/analytics/UmamiScript";
import { StructuredData } from "@/components/Visitor/SEO/StructuredData";
import {
  generateMetadata as generateSEOMetadata,
  generateStructuredData,
  getLanguageSpecificContent,
} from "@/lib/seo-utils";
import { getOwner } from "@/services/ownerApi";
import { getSiteURL } from "@/lib/axios";
import { htmlLang } from "@/lib/html-lang";
import { fontClasses, SharedProviders } from "@/components/shared-head";
import "../../../globals.css";

export const viewport: Viewport = { themeColor: "#2F0559", width: "device-width", initialScale: 1, maximumScale: 5, userScalable: true, colorScheme: "dark light" };
const baseMetadata: Metadata = {
  metadataBase: new URL(getSiteURL()),
  keywords: ["portfolio", "desenvolvedor", "fullstack", "frontend", "backend", "Next.js", "React", "Node.js", "TypeScript", "JavaScript", "web developer"],
  authors: [{ name: "Portfolio Owner" }], creator: "Portfolio Owner", publisher: "Portfolio Owner",
  formatDetection: { email: false, address: false, telephone: false },
  icons: { icon: [{ url: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1755800847/favicon-16x16_tkhuxm.png", sizes: "16x16", type: "image/png" }, { url: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1755800847/favicon-32x32_oumosx.png", sizes: "32x32", type: "image/png" }], apple: [{ url: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1755800847/apple-touch-icon_z7bs1v.png", sizes: "180x180", type: "image/png" }], shortcut: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1755800847/favicon_ih9jni.ico" },
  manifest: "/manifest.json", verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  category: "technology", classification: "Portfolio Website", referrer: "origin-when-cross-origin",
};

interface Props {
  children: ReactNode;
  params: Promise<{ language: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ language: string }> }): Promise<Metadata> {
  const { language } = await params;

  try {
    const owner = await getOwner(language);
    const content = getLanguageSpecificContent(language);
    const baseUrl = getSiteURL();
    return {
      ...baseMetadata,
      ...generateSEOMetadata(
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
      ),
      alternates: { ...baseMetadata.alternates, ...generateSEOMetadata({ language }).alternates, languages: { "pt-BR": "/watch/pt", "en-US": "/watch/en", "es-ES": "/watch/es", "fr-FR": "/watch/fr", "it-IT": "/watch/it", "ja-JP": "/watch/ja", "ko-KR": "/watch/ko", "zh-CN": "/watch/zh" } },
    };
  } catch {
    const content = getLanguageSpecificContent(language);
    return {
      ...baseMetadata,
      ...generateSEOMetadata({
      title: content.siteName,
      description: content.defaultDescription,
      keywords: content.keywords,
      language,
      }),
      alternates: { languages: { "pt-BR": "/watch/pt", "en-US": "/watch/en", "es-ES": "/watch/es", "fr-FR": "/watch/fr", "it-IT": "/watch/it", "ja-JP": "/watch/ja", "ko-KR": "/watch/ko", "zh-CN": "/watch/zh" } },
    };
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
    <html lang={htmlLang(language)} className={fontClasses}>
      <body className="antialiased" suppressHydrationWarning>
      <SharedProviders>
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

            <main className="p-6 mx-auto flex-1" role="main" aria-label="Conteúdo principal">
              {children}
            </main>
            <Footer language={language} />
          </PageLoader>
        </OwnerProvider>
      </LanguageProvider>
      <UmamiScript />
      </SharedProviders></body>
    </html>
  );
}
