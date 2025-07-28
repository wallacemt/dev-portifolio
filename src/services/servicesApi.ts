import { API } from "@/lib/axios";
import { ServicesApiResponse } from "@/types/services";

export async function getServices(language: string = "pt"): Promise<ServicesApiResponse> {
  try {
    const response = await API.get<ServicesApiResponse>(`/services`, {
      params: {
        language,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return {
      services: [
        {
          id: "frontend-dev",
          title: language === "pt" ? "Desenvolvimento Frontend" : "Frontend Development",
          description:
            language === "pt"
              ? "Criação de interfaces modernas e responsivas com React, Next.js e tecnologias atuais."
              : "Building modern and responsive interfaces with React, Next.js and current technologies.",
          icon: "🎨",
          technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
          category: "frontend",
          complexity: "intermediate",
          deliveryTime: language === "pt" ? "2-4 semanas" : "2-4 weeks",
          price: {
            min: 800,
            max: 2500,
            currency: language === "pt" ? "R$" : "$",
          },
        },
        {
          id: "backend-dev",
          title: language === "pt" ? "Desenvolvimento Backend" : "Backend Development",
          description:
            language === "pt"
              ? "APIs robustas e escaláveis com Node.js, Express, e bancos de dados modernos."
              : "Robust and scalable APIs with Node.js, Express, and modern databases.",
          icon: "⚙️",
          technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
          category: "backend",
          complexity: "advanced",
          deliveryTime: language === "pt" ? "3-6 semanas" : "3-6 weeks",
          price: {
            min: 1200,
            max: 3500,
            currency: language === "pt" ? "R$" : "$",
          },
        },
        {
          id: "fullstack-app",
          title: language === "pt" ? "Aplicação Full Stack" : "Full Stack Application",
          description:
            language === "pt"
              ? "Desenvolvimento completo de aplicações web com frontend e backend integrados."
              : "Complete development of web applications with integrated frontend and backend.",
          icon: "🚀",
          technologies: ["React", "Node.js", "MongoDB", "Docker"],
          category: "fullstack",
          complexity: "advanced",
          deliveryTime: language === "pt" ? "6-12 semanas" : "6-12 weeks",
          price: {
            min: 2500,
            max: 8000,
            currency: language === "pt" ? "R$" : "$",
          },
        },
        {
          id: "mobile-app",
          title: language === "pt" ? "Aplicativo Mobile" : "Mobile Application",
          description:
            language === "pt"
              ? "Desenvolvimento de aplicativos mobile nativos e híbridos para iOS e Android."
              : "Development of native and hybrid mobile applications for iOS and Android.",
          icon: "📱",
          technologies: ["React Native", "Expo", "Firebase", "TypeScript"],
          category: "mobile",
          complexity: "advanced",
          deliveryTime: language === "pt" ? "8-16 semanas" : "8-16 weeks",
          price: {
            min: 3000,
            max: 10000,
            currency: language === "pt" ? "R$" : "$",
          },
        },
        {
          id: "devops-setup",
          title: language === "pt" ? "Configuração DevOps" : "DevOps Setup",
          description:
            language === "pt"
              ? "Configuração de pipelines CI/CD, containerização e deployment automatizado."
              : "Setting up CI/CD pipelines, containerization and automated deployment.",
          icon: "🔧",
          technologies: ["Docker", "AWS", "GitHub Actions", "Nginx"],
          category: "devops",
          complexity: "intermediate",
          deliveryTime: language === "pt" ? "1-3 semanas" : "1-3 weeks",
          price: {
            min: 600,
            max: 2000,
            currency: language === "pt" ? "R$" : "$",
          },
        },
        {
          id: "api-integration",
          title: language === "pt" ? "Integração de APIs" : "API Integration",
          description:
            language === "pt"
              ? "Integração com APIs externas, pagamentos, autenticação e serviços terceirizados."
              : "Integration with external APIs, payments, authentication and third-party services.",
          icon: "🔗",
          technologies: ["REST API", "GraphQL", "OAuth", "Stripe"],
          category: "backend",
          complexity: "intermediate",
          deliveryTime: language === "pt" ? "1-2 semanas" : "1-2 weeks",
          price: {
            min: 400,
            max: 1500,
            currency: language === "pt" ? "R$" : "$",
          },
        },
      ],
      connections: [
        { from: "frontend-dev", to: "fullstack-app", type: "integration" },
        { from: "backend-dev", to: "fullstack-app", type: "integration" },
        { from: "fullstack-app", to: "mobile-app", type: "data-flow" },
        { from: "backend-dev", to: "api-integration", type: "dependency" },
        { from: "fullstack-app", to: "devops-setup", type: "dependency" },
        { from: "mobile-app", to: "api-integration", type: "data-flow" },
      ],
    };
  }
}
