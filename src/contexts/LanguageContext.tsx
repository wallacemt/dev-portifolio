"use client";
import { useRouter, usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
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
  const segments = useMemo(() => pathName.split("/").filter(Boolean), [pathName]);
  const [language, setLanguage] = useState(segments[1] || "pt");

  const [isLoading, setIsLoading] = useState(false);
  const setLenguage = useCallback(
    (lang: string) => {
      setIsLoading(true);
      try {
        Cookies.set("preferredLanguage", lang, { expires: 30 });
        Cookies.set("languageManuallySet", "1", { expires: 30 });
        const restOfPath = segments.slice(2).join("/") || "";

        if (segments[1] !== lang) {
          router.push(`/watch/${lang}/${restOfPath}`);
          setLanguage(lang);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [router, segments]
  );

  useEffect(() => {
    // An explicit /watch/:language URL is authoritative; cookies only choose
    // the initial language in middleware when the visitor opens the root URL.
    setLanguage(segments[1] || "pt");
  }, [router, segments]);

  const value = useMemo(() => ({ language, setLenguage, isLoading }), [language, setLenguage, isLoading]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
