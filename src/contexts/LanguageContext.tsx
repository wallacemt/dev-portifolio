"use client";

import { useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface LangContext {
  language: string;
  setLenguage: (lang: string) => void;
}

const LanguageContext = createContext<LangContext>({
  language: "pt",
  setLenguage: () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const segments = pathName.split("/").filter(Boolean);
  const [language, setLanguage] = useState(
    segments[1] ? segments[1] : segments[0] || "pt"
  );

  const setLenguage = (lang: string) => {
    const rest = segments.slice(2).join("/") || "";
    router.push(`/watch/${lang}${rest ? "/" + rest : ""}`);
    setLanguage(lang);
  };

  useEffect(() => {
    setLanguage(segments[1] ? segments[1] : segments[0] || "pt");
  }, [pathName]);
  return <LanguageContext.Provider value={{ language, setLenguage }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
