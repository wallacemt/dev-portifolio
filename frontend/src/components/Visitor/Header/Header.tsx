import { getAvailableLanguages, getNavbarItems } from "@/services/utilisApi";
import { NavItems } from "./_components/navitems";
import { LenguagesResponse } from "@/types/utilis";

export const revalidate = 60;
interface HeaderProps {
  language?: string;
}
export const Header = async ({ language = "pt" }: HeaderProps) => {
  let menuItens = [];
  let languages: LenguagesResponse;
  try {
    menuItens = await getNavbarItems(language);
    languages = await getAvailableLanguages();

    return <NavItems menuItens={menuItens} languages={languages.translation[0]} />;
  } catch (e) {
    console.error("Error ao carregar dados do header", e);
    return (
      <div className="text-red-500">
        <p>Erro ao carregar o menu</p>
      </div>
    );
  }
};
