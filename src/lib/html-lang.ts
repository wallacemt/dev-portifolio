import { isSupportedLanguage, type SupportedLanguage } from "@/lib/geo-language";

export const LANGUAGE_TAGS: Record<SupportedLanguage, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  it: "it-IT",
  ja: "ja-JP",
  ko: "ko-KR",
  zh: "zh-CN",
};

export function htmlLang(language: string): string {
  return isSupportedLanguage(language) ? LANGUAGE_TAGS[language] : LANGUAGE_TAGS.en;
}
