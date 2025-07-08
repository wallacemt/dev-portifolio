"use client";
import { useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
interface LangContext {
  language: string;
  setLenguage: (lang: string) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LangContext>({
  language: "pt",
  setLenguage: () => {},
  isLoading: false,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const segments = pathName.split("/").filter(Boolean);
  const [language, setLanguage] = useState(segments[1] ? segments[1] : segments[0] || "pt");
  const [isLoading, setIsLoading] = useState(false);
  const setLenguage = (lang: string) => {
    setIsLoading(true);
    try {
      Cookies.set("preferredLanguage", lang, { expires: 30 });
      const rest = segments.slice(2).join("/") || "";
      router.push(`/watch/${lang}${rest ? "/" + rest : ""}`);
      setLanguage(lang);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedLang = Cookies.get("preferredLanguage");
    const currentLang = segments[1] || segments[0];
    if (savedLang && savedLang !== currentLang) {
      setLanguage(savedLang);
      router.replace(`/watch/${savedLang}`, undefined);
    } else {
      setLanguage(currentLang || "pt");
    }
  }, [router, segments]);

  return <LanguageContext.Provider value={{ language, setLenguage, isLoading }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
