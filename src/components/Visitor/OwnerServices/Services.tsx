import { getService } from "@/services/servicesApi";
import { ServicesContent } from "./_components/services-content";
interface ServicesProps {
  language: string;
}

export const revalidate = 60;
export async function Services({ language }: ServicesProps) {
  const response = await getService(language).catch((err) => {
    console.error(err);
    return {
      services: [],
      connections: [],
      texts: {
        title: language === "pt" ? "Error ao carregar serviços" : "Error fetch services",
        description: language === "pt" ? "Recarregue a pagina e tente novamente" : "Try-again",
        cta: "",
        ctaBtn: "",
      },  
    };
  });

  return (
    <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 py-8 relative overflow-hidden" id="services">
      <ServicesContent services={response.services} connections={response.connections} texts={response.texts} lan={language} />
    </section>
  );
}
