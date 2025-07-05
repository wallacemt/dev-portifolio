
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

export interface NavbarItem {
  name: string;
  path: string;
}
export interface NavbarItens {
  itens: NavbarItem[];
  callText: string;
}