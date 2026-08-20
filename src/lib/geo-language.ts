export const SUPPORTED_LANGUAGES = ["pt", "en", "es", "fr", "ja", "ko", "zh", "it"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";

// ISO 3166-1 alpha-2 country code -> supported UI language. Countries not
// listed here fall back to DEFAULT_LANGUAGE (en) — this only needs to cover
// countries where the site language should differ from that default.
const COUNTRY_LANGUAGE_MAP: Record<string, SupportedLanguage> = {
  // Portuguese
  BR: "pt",
  PT: "pt",
  AO: "pt",
  MZ: "pt",
  CV: "pt",
  GW: "pt",
  ST: "pt",
  TL: "pt",
  // Spanish
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  PE: "es",
  VE: "es",
  CL: "es",
  EC: "es",
  GT: "es",
  CU: "es",
  BO: "es",
  DO: "es",
  HN: "es",
  PY: "es",
  SV: "es",
  NI: "es",
  CR: "es",
  PA: "es",
  UY: "es",
  PR: "es",
  GQ: "es",
  // French
  FR: "fr",
  BE: "fr",
  CH: "fr",
  LU: "fr",
  MC: "fr",
  CI: "fr",
  SN: "fr",
  ML: "fr",
  BF: "fr",
  NE: "fr",
  TG: "fr",
  BJ: "fr",
  GA: "fr",
  CG: "fr",
  CD: "fr",
  MG: "fr",
  HT: "fr",
  // Italian
  IT: "it",
  SM: "it",
  VA: "it",
  // Japanese
  JP: "ja",
  // Korean
  KR: "ko",
  KP: "ko",
  // Chinese
  CN: "zh",
  TW: "zh",
  HK: "zh",
  MO: "zh",
};

export function isSupportedLanguage(value: string | undefined | null): value is SupportedLanguage {
  return !!value && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

export function resolveLanguageFromCountryCode(countryCode: string | undefined | null): SupportedLanguage {
  if (!countryCode) return DEFAULT_LANGUAGE;
  return COUNTRY_LANGUAGE_MAP[countryCode.toUpperCase()] ?? DEFAULT_LANGUAGE;
}
