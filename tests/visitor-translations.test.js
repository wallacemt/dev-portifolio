import { test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { dateLocale } from "../src/lib/date-locale";
import { SUPPORTED_LANGUAGES } from "../src/lib/geo-language";
import { formatDistanceToNow } from "date-fns";

test("all supported visitor languages have matching date locales", () => {
  const codes = { pt: "pt-BR", en: "en-US", es: "es", fr: "fr", ja: "ja", ko: "ko", zh: "zh-CN", it: "it" };
  for (const language of SUPPORTED_LANGUAGES) expect(dateLocale(language).code).toBe(codes[language]);
  expect(formatDistanceToNow(new Date(Date.now() - 86400000), { addSuffix: true, locale: dateLocale("fr") })).toContain("il y a");
});

test("visitor sections consume translated text instead of a Portuguese/English switch", () => {
  for (const file of ["Landing/LandingExtras.tsx", "Landing/_components/featured-projects-section.tsx", "Landing/_components/skills-highlights-section.tsx", "Landing/_components/latest-video-section.tsx", "Videos/Videos.tsx", "Videos/_components/videos-header.tsx"]) {
    expect(readFileSync(`src/components/Visitor/${file}`, "utf8")).not.toContain('language === "pt"');
  }
});
