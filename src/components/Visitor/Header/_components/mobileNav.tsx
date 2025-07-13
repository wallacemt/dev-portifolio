"use client";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { X, PanelRightClose } from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { LanguageSelector } from "./languageSelector";
import { Language } from "@/types/utilis";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileNavProps {
  menuItens: { name: string; path: string }[];
  languages: {
    [key: string]: Language;
  };
}
export const MobileNav = ({ menuItens, languages }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const pathName = usePathname();
  const isHome = pathName === `/watch/${language}`;
  const handleStateChange = (state: { isOpen: boolean }) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <div className=" lg:hidden block z-50">
      <button onClick={() => setIsOpen(true)} className="absolute cursor-pointer top-5 right-6 p-2 z-50 text-neutral10">
        <PanelRightClose size={24} />
      </button>

      <Menu
        right
        isOpen={isOpen}
        onStateChange={handleStateChange}
        customBurgerIcon={false}
        customCrossIcon={<X size={24} color="white" />}
        className="mobile-menu"
        overlayClassName="custom-overlay"
        styles={{
          bmMenuWrap: {
            height: "100%",
            width: "100%",
            top: "0",
          },
          bmMenu: {
            background: "var(--color-roxo700)",
            padding: "3rem 2rem",
            fontFamily: "var(--font-title)",

            fontSize: "1.25rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          },
          bmItemList: {
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            gap: "2.5rem",
          },
          bmOverlay: {
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(6px)",
          },
        }}
      >
        <>
          {languages && (
            <div className=" absolute top-4 left-4">
              <LanguageSelector translations={languages} />
            </div>
          )}
          {menuItens.map((item, index) => (
            <Link
              href={`${item.path === "/" ? "/" : `/watch/${language}${item.path}`}`}
              key={index}
              onClick={closeMenu}
              className={`hover:text-roxo300 hover:scale-105 cursor-pointer w-full hover:border-Destaque nav-glass border-b-2 rounded-2xl  ${
                pathName.endsWith(item.path) ? "border-b-2 border-Destaque" : ""
              } ${
                isHome && item.path === "/" ? "border-b-2 border-Destaque" : ""
              } transition-colors text-xl text-center`}
            >
              {item.name}
            </Link>
          ))}
        </>
      </Menu>
    </div>
  );
};
