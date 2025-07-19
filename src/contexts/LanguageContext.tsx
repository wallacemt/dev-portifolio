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
  const [language, setLanguage] = useState(segments[1] || "pt");

  const [isLoading, setIsLoading] = useState(false);
  const setLenguage = (lang: string) => {
    setIsLoading(true);
    try {
      Cookies.set("preferredLanguage", lang, { expires: 30 });
      const restOfPath = segments.slice(2).join("/") || "";

      if (segments[1] !== lang) {
        router.push(`/watch/${lang}/${restOfPath}`);
        setLanguage(lang);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedLang = Cookies.get("preferredLanguage");
    const currentLang = segments[1] || "pt";
    if (savedLang && savedLang !== currentLang) {
      setLanguage(savedLang);
      router.replace(`/watch/${savedLang}/${segments.slice(2).join("/")}`);
    } else {
      setLanguage(currentLang);
    }
  }, [router, segments]);

  return <LanguageContext.Provider value={{ language, setLenguage, isLoading }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
