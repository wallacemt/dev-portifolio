"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Language } from "@/types/utilis";



interface LanguageSelectorProps {
  translations: {
    [key: string]: Language;
  };
  defaultLang?: string;
  onChange?: (lang: string) => void;
}

export const LanguageSelector = ({ translations, defaultLang = "pt", onChange }: LanguageSelectorProps) => {
  const [selectedLang, setSelectedLang] = useState(defaultLang);

  const handleChange = (value: string) => {
    setSelectedLang(value);
    onChange?.(value);
  };

  return (
    <Select value={selectedLang} onValueChange={handleChange}>
      <SelectTrigger className="w-[65px] capitalize bg-white dark:bg-roxo500  top-1 right-0 border rounded-md px-3 py-2 text-sm">
        <SelectValue placeholder="EN" />
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
