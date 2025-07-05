import { getAvailableLanguages, getNavbarItems } from "@/services/utilisApi";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import Silk from "@/blocks/Backgrounds/Silk/Silk";
import { PageLoader } from "@/components/ui/page-loader";
import Footer from "@/components/Visitor/Footer/Footer";
import { LenguagesResponse, NavbarItens } from "@/types/utilis";
import { Header } from "@/components/Visitor/Header/Header";

interface Props {
  children: ReactNode;
  params: Promise<{ language: string }>;
}

export default async function LanguageLayout({ children, params }: Props) {
  let { language } = await params;
  let available: Record<string, any>;
  let menuItens: NavbarItens = {
    itens: [{ name: "", path: "" }],
    callText: "",
  };
  let lang: LenguagesResponse;
  try {
    lang = await getAvailableLanguages();
    if (!(language in lang.translation[0])) {
      language = "pt";
    }
    available = lang.translation[0];
    menuItens = await getNavbarItems(language);
  } catch (e) {
    throw new Error("API_ERROR");
  }

  if (!available[language]) {
    notFound();
  }

  return (
    <PageLoader>
      <Header menuItens={menuItens.itens} languages={lang.translation[0]} />
      <div className="fixed inset-0 z-[-1]">
        <Silk speed={6} scale={1} color="#2F0559" noiseIntensity={1.5} rotation={0} />
      </div>
      <main className="p-6">{children}</main>
      <Footer items={menuItens} />
    </PageLoader>
  );
}
