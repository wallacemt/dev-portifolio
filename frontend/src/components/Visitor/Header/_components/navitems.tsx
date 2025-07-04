import Link from "next/link";
import { MobileNav } from "./mobileNav";
import { Separator } from "@/components/ui/separator";
import { LanguageSelector } from "./languageSelector";
import { Language } from "@/types/utilis";

interface NavItemsProps {
  menuItens: {
    name: string;
    path: string;
  }[];
  languages: {
    [key: string]: Language;
  };
}
export const NavItems = ({ menuItens, languages }: NavItemsProps) => {
  return (
    <div className="min-w-screen max-h-screen z-20 relative">
      <nav className="nav-glass mt-4 w-full max-w-full lg:max-w-fit mx-auto rounded-full px-6 py-3 flex items-center lg:justify-between gap-4 justify-center backdrop-blur-xs shadow-lg border border-border pointer-events-auto h-12 relative z-30 ">
        <Link href="/" role="img" aria-label="Logo">
          <h1 className="font-principal xl:text-4xl md:text-2xl text-[1.8rem]">
            Wallace<span className="text-Destaque">.Dev</span>
          </h1>
        </Link>
        <Separator orientation="vertical" className="border-1 border-roxo100/50" />
        <ul className="hidden lg:flex gap-8 items-center justify-center">
          {menuItens.map((item, index) => (
            <Link key={index} href={item.path}>
              <li className=" hover:text-roxo100 lg:text-lg transition-colors text-neutral10 hover:font-bold hover:border-b-2 font-secundaria">
                {item.name}
              </li>
            </Link>
          ))}
          {languages && (
            <li className="flex items-center">
              <LanguageSelector translations={languages} />
            </li>
          )}
        </ul>
      </nav>
      <MobileNav menuItens={menuItens} languages={languages} />
    </div>
  );
};
