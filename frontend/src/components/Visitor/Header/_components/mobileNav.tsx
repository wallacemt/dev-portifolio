"use client";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { X, PanelRightClose } from "lucide-react";
import "./mobileNav.css";
import Link from "next/link";

import { usePathname } from "next/navigation";
export const MobileNav = ({ menuItens }: { menuItens: { name: string; path: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const handleStateChange = (state: { isOpen: boolean }) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <div className=" sm:hidden block z-50">
      <button onClick={() => setIsOpen(true)} className="absolute cursor-pointer top-1 right-6 p-2 z-50 text-neutral10">
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
          <p className="text-neutral12 text-sm p-0 absolute top-4 left-4">PT</p>
          {menuItens.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              onClick={closeMenu}
              className={`hover:text-roxo300 hover:scale-105 cursor-pointer w-full hover:border-Destaque nav-glass border-b-2 rounded-2xl ${
                pathname.endsWith(item.path) ? "border-Destaque text-roxo100" : "border-white/10 text-white"
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
