import { getSkills } from "@/services/skillsApi";
import { SkillsContent } from "./_components/skills-content";
interface SkillsContentProps {
  language: string;
}

export const revalidate = 30;


export async function Skills({ language }: SkillsContentProps) {
  const res = await getSkills(language).catch((error) => {
    console.error("Error fetching skills:", error);
    return {
      skills: [],
      texts: {
        title: language === "pt" ? "Error ao carregar Habilidades" : "Error fetch skills",
        description: language === "pt" ? "Recarregue a pagina e tente novamente" : "Try-again",
        chooseText: "",
      },
    };
  });
  if (!res.skills || res.skills.length === 0) {
    return (
      <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 p-2">
        <h2 className="text-2xl font-bold text-white">No Skills Found</h2>
        <p className="text-gray-400">It seems like there are no skills available at the moment.</p>
      </section>
    );
  }
  return (
    <section className="w-full  md:min-w-screen mx-auto px-4 md:px-12 p-2">
      <SkillsContent res={res} />
    </section>
  );
}
