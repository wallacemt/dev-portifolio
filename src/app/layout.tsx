import type { Metadata } from "next";
import { Aclonica, Lato, Roboto } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wallace Santana | FullStack Developer",
  description: "Portfolio of Wallace Santana, a FullStack Developer specializing in Next.js, React, Node.js, and more.",
  openGraph: {
    title: "Wallace Santana | FullStack Developer",
    description:
      "Portfolio of Wallace Santana, a FullStack Developer specializing in Next.js, React, Node.js, and more.",
    url: "https://wallacesantana.dev",
    siteName: "Wallace Santana",
    images: [
      {
        url: "https://wallacesantana.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wallace Santana | FullStack Developer",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wallace Santana | FullStack Developer",
    description:
      "Portfolio of Wallace Santana, a FullStack Developer specializing in Next.js, React, Node.js, and more.",
    images: ["https://wallacesantana.dev/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

const aclonica = Aclonica({
  subsets: ["latin"],
  variable: "--font-title",
  weight: "400",
});
const lato = Lato({
  subsets: ["latin"],
  variable: "--font-textBody",
  weight: "400",
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-buttons",
  weight: "400",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" data-lt-installed="true" className={`${aclonica.variable} ${lato.variable} ${roboto.variable}`}>
      <body className={`antialiased`}>
       {children}
      </body>
    </html>
  );
}
