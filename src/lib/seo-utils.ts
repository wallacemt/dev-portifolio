import { Metadata } from "next";
import { OwnerResponse } from "@/types/owner";

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  author?: string;
  language?: string;
}

export function generateMetadata(config: SEOConfig, owner?: OwnerResponse): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";
  const defaultImage = `${baseUrl}/og-image.png`; // Será adicionado posteriormente
  const siteName = owner?.name ? `${owner.name} - Portfolio` : "Portfolio Profissional";

  const title = config.title || `${owner?.name || "Portfolio"} - ${owner?.occupation || "Desenvolvedor"}`;
  const description =
    config.description ||
    owner?.about ||
    `Portfolio profissional de ${owner?.name || "Desenvolvedor"}. Conheça meus projetos, habilidades e experiência.`;

  return {
    title,
    description,
    keywords:
      config.keywords ||
      [
        "portfolio",
        "desenvolvedor",
        "programador",
        "web developer",
        "frontend",
        "backend",
        "fullstack",
        owner?.name?.toLowerCase() || "",
        ...(owner?.occupation?.toLowerCase().split(" ") || []),
      ].filter(Boolean),
    authors: [{ name: config.author || owner?.name || "Portfolio Owner" }],
    creator: config.author || owner?.name,
    publisher: config.author || owner?.name,
    alternates: {
      canonical: config.canonicalUrl || baseUrl,
      languages: {
        "pt-BR": `${baseUrl}/watch/pt`,
        "en-US": `${baseUrl}/watch/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: config.language === "en" ? "en_US" : "pt_BR",
      url: config.canonicalUrl || baseUrl,
      title,
      description,
      siteName,
      images: [
        {
          url: config.ogImage || defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [config.ogImage || defaultImage],
      creator: `@${owner?.name?.toLowerCase().replace(/\s+/g, "") || "portfolio"}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "google-site-verification-code", // Será adicionado posteriormente
    },
  };
}

export function generateStructuredData(owner?: OwnerResponse, language: string = "pt") {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: owner?.name || "Portfolio Owner",
    jobTitle: owner?.occupation || "Desenvolvedor",
    description: owner?.about || "Desenvolvedor profissional",
    url: `${baseUrl}/watch/${language}`,
    image: owner?.avatar || `${baseUrl}/avatar.png`,
    email: owner?.email,
    birthDate: owner?.birthDate,
    knowsAbout: ["Desenvolvimento Web", "Frontend", "Backend", "JavaScript", "TypeScript", "React", "Next.js"],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Formação Acadêmica", // Será preenchido dinamicamente
    },
    sameAs: [
      // Links para redes sociais serão adicionados posteriormente
    ],
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${owner?.name || "Portfolio"} - Portfolio Profissional`,
    description: owner?.about || "Portfolio profissional com projetos e experiências",
    url: baseUrl,
    author: {
      "@type": "Person",
      name: owner?.name || "Portfolio Owner",
    },
    inLanguage: language === "en" ? "en-US" : "pt-BR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return [personData, websiteData];
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getLanguageSpecificContent(language: string) {
  const content = {
    pt: {
      siteName: "Portfolio Profissional",
      homeTitle: "Início",
      projectsTitle: "Projetos",
      skillsTitle: "Habilidades",
      formationTitle: "Formação",
      servicesTitle: "Serviços",
      aboutTitle: "Sobre",
      contactTitle: "Contato",
      defaultDescription: "Portfolio profissional com projetos, habilidades e experiências em desenvolvimento web.",
      keywords: [
        "portfolio",
        "desenvolvedor",
        "programador",
        "web developer",
        "frontend",
        "backend",
        "fullstack",
        "projetos",
        "habilidades",
        "experiência",
      ],
    },
    en: {
      siteName: "Professional Portfolio",
      homeTitle: "Home",
      projectsTitle: "Projects",
      skillsTitle: "Skills",
      formationTitle: "Education",
      servicesTitle: "Services",
      aboutTitle: "About",
      contactTitle: "Contact",
      defaultDescription: "Professional portfolio showcasing projects, skills and experience in web development.",
      keywords: [
        "portfolio",
        "developer",
        "programmer",
        "web developer",
        "frontend",
        "backend",
        "fullstack",
        "projects",
        "skills",
        "experience",
      ],
    },
  };

  return content[language as keyof typeof content] || content.pt;
}
