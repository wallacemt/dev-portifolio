import { getNavbarItems } from "@/services/utilisApi";
import { FooterContent } from "./_components/content";

interface FooterProps {
  language: string;
}

export default async function Footer({ language }: FooterProps) {
  const menuItens = await getNavbarItems(language);

  return (
    <footer className="bg-background/60 border-t border-border mt-12 backdrop-blur-sm w-full self-end">
      <FooterContent menuItens={menuItens} />
    </footer>
  );
}
