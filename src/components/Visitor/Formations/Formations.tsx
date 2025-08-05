import { getFormations } from "@/services/formationApi";
import { FormationsContent } from "./_components/formations-content";
import { simulateDelay } from "@/utilis/simulate-dalay";

export const revalidate = 60;

interface FormationsProps {
  language: string;
}
export async function Formations({ language }: FormationsProps) {
  await simulateDelay(3000);

  const formations = await getFormations(language).catch((error) => {
    console.log(error);
    return {
      formations: [],
      texts: {
        title: language === "pt" ? "Erro ao carregar formações" : "Error fetch formations",
        description: language === "pt" ? "Recarregue a pagina e tente novamente" : "Try-again",
      },
    };
  });

  return (
    <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 py-8  relative overflow-hidden" id="formations">
      <FormationsContent formations={formations} language={language} />
    </section>
  );
}
