import type { Metadata, Viewport } from "next";
import { Aclonica, Lato, Roboto, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import TopLoadingBar from "@/components/ui/top-loading-bar";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2F0559" },
    { media: "(prefers-color-scheme: dark)", color: "#2F0559" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.API_URL || "https://wallace-dev.com"),
  title: {
    default: "Portfolio Profissional | Desenvolvedor FullStack",
    template: "%s | Portfolio Profissional",
  },
  description:
    "Portfolio profissional de desenvolvedor FullStack especializado em Next.js, React, Node.js e tecnologias modernas.",
  keywords: [
    "portfolio",
    "desenvolvedor",
    "fullstack",
    "frontend",
    "backend",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "web developer",
  ],
  authors: [{ name: "Portfolio Owner" }],
  creator: "Portfolio Owner",
  publisher: "Portfolio Owner",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: new URL(process.env.API_URL || "https://wallace-dev.com"),
    title: "Portfolio Profissional | Desenvolvedor FullStack",
    description:
      "Portfolio profissional de desenvolvedor FullStack especializado em Next.js, React, Node.js e tecnologias modernas.",
    siteName: "Portfolio Profissional",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Portfolio Profissional - Desenvolvedor FullStack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Profissional | Desenvolvedor FullStack",
    description:
      "Portfolio profissional de desenvolvedor FullStack especializado em Next.js, React, Node.js e tecnologias modernas.",
    images: ["/og-image.png"], 
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
  icons: {
    icon: [
      { url: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1755800847/favicon-16x16_tkhuxm.png", sizes: "16x16", type: "image/png" },
      { url: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1755800847/favicon-32x32_oumosx.png", sizes: "32x32", type: "image/png" }, 
    ],
    apple: [
      { url: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1755800847/apple-touch-icon_z7bs1v.png", sizes: "180x180", type: "image/png" }, 
    ],
    shortcut: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1755800847/favicon_ih9jni.ico", 
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: process.env.API_URL || "https://wallace-dev.com",
    languages: {
      "pt-BR": "/watch/pt",
      "en-US": "/watch/en",
    },
  },
  verification: {
    google: "google-site-verification-code", 
  },
  category: "technology",
  classification: "Portfolio Website",
  referrer: "origin-when-cross-origin",
};

const aclonica = Aclonica({
  subsets: ["latin"],
  variable: "--font-title",
  weight: "400",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-textBody",
  weight: "400",
  display: "swap",
});

const monoT = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-monoT",
  weight: "400",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-buttons",
  weight: "400",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-lt-installed="true"
      className={`${aclonica.variable} ${lato.variable} ${roboto.variable} ${monoT.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <TopLoadingBar />
        {children}
      </body>
    </html>
  );
}
