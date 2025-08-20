import type { Metadata } from "next";
import { Aclonica, Lato, Roboto, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import TopLoadingBar from "@/components/ui/top-loading-bar";

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
  icons: {
    shortcut:
      "https://res.cloudinary.com/dg9hqvlas/image/upload/v1751925493/Black_Creative_W_Letter_Logo-removebg-preview_yka3ae.png",
    icon: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1751925484/Black_Creative_W_Letter_Logo__1_-removebg-preview_cuiljg.png",
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
const monoT = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-monoT",
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
    <html
      lang="pt-br"
      data-lt-installed="true"
      className={`${aclonica.variable} ${lato.variable} ${roboto.variable} ${monoT.variable}`}
    >
      <body className={`antialiased`}>
        <TopLoadingBar />
        {children}
      </body>
    </html>
  );
}
