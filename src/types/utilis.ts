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

interface ServicesItem {
  id: string;
  name: string;
  description: string;
  details: string;
  items: string[];
}
export interface ServicesResponse {
  services: ServicesItem[];
}

export type CrudState = Promise<{
  state: "edit" | "all" | "create";
  id?: string;
}>;
