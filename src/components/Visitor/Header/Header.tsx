import { NavItems } from "./_components/navitems";
import { getAvailableLanguages, getNavbarItems } from "@/services/utilisApi";

interface NavItemsProps {
  language: string;
}
export default async function Header({ language }: NavItemsProps) {
  const lang = await getAvailableLanguages();
  const menuItens = await getNavbarItems(language);
  return (
    <header className="min-w-screen max-h-screen z-20 relative">
      <NavItems menuItens={menuItens.itens} languages={lang} language={language} />
    </header>
  );
}
