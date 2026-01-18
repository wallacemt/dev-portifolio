import { getFormations } from "@/services/formationApi";
import { getAllBadges } from "@/services/badgeApi";
import { getAllCertifications } from "@/services/certificationApi";
import { FormationsContent } from "./_components/formations-content";
import { BadgesSection } from "./_components/badges-section";
import { CertificationsSection } from "./_components/certifications-section";
import { simulateDelay } from "@/utilis/simulate-dalay";

export const revalidate = 60;

interface FormationsProps {
  language: string;
}
export async function Formations({ language }: FormationsProps) {
  await simulateDelay(3000);

  const formations = await getFormations(language).catch((error) => {
    console.error("Error fetching formations:", error);
    return {
      formations: [],
      texts: {
        title: language === "pt" ? "Erro ao carregar formações" : "Error fetch formations",
        description: language === "pt" ? "Recarregue a pagina e tente novamente" : "Try-again",
        formationStatsText: {
          inProgress: "",
          certificationText: "",
          conclude: "",
        },
        stats: {
          formations: language === "pt" ? "Formações" : "Formations",
          studyHours: language === "pt" ? "Horas de Estudo" : "Study Hours",
          institution: language === "pt" ? "Instituição" : "Institution",
          certificaos: language === "pt" ? "Certificados" : "Certificates",
        },
      },
    };
  });

  const badges = await getAllBadges(language).catch((error) => {
    console.error("Error fetching badges:", error);
    return {badges:[], texts: {title:language === "pt" ? "Badges & Conquistas" : "Badges & Achievements",description: language === "pt"
      ? "Reconhecimentos e conquistas obtidas ao longo da minha jornada profissional"
      : "Recognition and achievements obtained throughout my professional journey"}};
  });

  const certifications = await getAllCertifications(language).catch((error) => {
    console.error("Error fetching certifications:", error);
    return [];
  });

  return (
    <>
      <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 py-8  relative overflow-hidden" id="formations">
        <FormationsContent formations={formations} language={language} />
        {badges.badges.length > 0 && <BadgesSection texts={badges.texts} badges={badges.badges} language={language} />}

        {certifications.length > 0 && <CertificationsSection certifications={certifications} language={language} />}
      </section>
    </>
  );
}
