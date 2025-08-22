"use client";
import Link from "next/link";
import { MobileNav } from "./mobileNav";
import { Separator } from "@/components/ui/separator";
import { LanguageSelector } from "./languageSelector";
import { LenguagesResponse } from "@/types/utilis";
import { usePathname } from "next/navigation";

interface NavItemsProps {
  menuItens: {
    name: string;
    path: string;
  }[];
  languages: LenguagesResponse;
  language: string;
}
export const NavItems = ({ menuItens, languages, language }: NavItemsProps) => {
  const pathName = usePathname();
  const isHome = pathName === `/watch/${language}`;
  return (
    <>
      <nav
        className="nav-glass mt-4 w-full max-w-full lg:max-w-fit mx-auto rounded-full px-6 py-3 flex items-center lg:justify-between gap-4 justify-center backdrop-blur-xs shadow-lg border border-border pointer-events-auto h-12 relative z-30"
        style={{ userSelect: "none" }}
      >
        <Link href="/" role="img" title="Home">
          <h1 className="font-principal xl:text-4xl md:text-2xl text-[1.8rem]">
            Wallace<span className="text-Destaque">.Dev</span>
          </h1>
        </Link>
        <Separator orientation="vertical" className="border-1 border-roxo100/50" />
        <ul className="hidden lg:flex gap-8 items-center justify-center">
          {menuItens.map((item, index) => (
            <li
              key={index}
              className={`hover:text-roxo100 ${pathName.endsWith(item.path) ? "border-b-2 border-roxo100" : ""} ${
                isHome && item.path === "/" ? "border-b-2 border-roxo100" : ""
              } lg:text-lg transition-colors text-neutral10 hover:font-bold hover:border-b-2 font-secundaria`}
            >
              <Link href={`${item.path === "/" ? "/" : `/watch/${language}${item.path}`}`}>{item.name}</Link>
            </li>
          ))}
          {languages && (
            <li className="flex items-center">
              <LanguageSelector translations={languages.translation[0]} />
            </li>
          )}
        </ul>
      </nav>
      <MobileNav menuItens={menuItens} languages={languages} />
    </>
  );
};
