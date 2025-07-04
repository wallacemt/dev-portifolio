"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Language } from "@/types/utilis";
import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSelectorProps {
  translations: {
    [key: string]: Language;
  };
}

export const LanguageSelector = ({ translations }: LanguageSelectorProps) => {
  const { language, setLenguage } = useLanguage();


  return (
    <Select value={language} onValueChange={setLenguage} defaultValue={language}>
      <SelectTrigger className="w-[70px] capitalize bg-white dark:bg-roxo500  top-1 right-0 border rounded-md px-3 py-2 text-sm">
        <SelectValue placeholder="PT" defaultValue={(language in translations) ? language : "pt"} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(translations).map(([code, lang]) => (
          <SelectItem key={lang.nativeName} value={code} className="capitalize">
            {code.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
