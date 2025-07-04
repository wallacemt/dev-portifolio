
export interface Language {
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}
export interface LenguagesResponse {
  translation: {
    [key: string]: Language;
  }[];
}
