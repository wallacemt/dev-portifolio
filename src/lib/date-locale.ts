import { ptBR, enUS, es, fr, ja, ko, zhCN, it } from "date-fns/locale";
import { isSupportedLanguage } from "./geo-language";

const locales = { pt: ptBR, en: enUS, es, fr, ja, ko, zh: zhCN, it };
export function dateLocale(language: string) {
  return locales[isSupportedLanguage(language) ? language : "en"];
}
