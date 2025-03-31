import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaCode, FaServer, FaDatabase, FaPlug, FaBook } from "react-icons/fa";
import Aos from "aos";

const servicesData = [
  {
    name: "Desenvolvimento de Aplicações Web",
    description: "Criação de aplicações web modernas e responsivas.",
    details: "Uso de tecnologias como React, Next.js e Tailwind CSS.",
    icon: <FaCode className="text-blue-500 text-4xl" />,
  },
  {
    name: "Desenvolvimento de APIs REST",
    description: "Criação de APIs escaláveis e seguras.",
    details: "Uso de Node.js, Express, Spring Boot e autenticação JWT.",
    icon: <FaServer className="text-green-500 text-4xl" />,
  },
  {
    name: "Desenvolvimento Frontend",
    description: "Implementação de interfaces dinâmicas e interativas.",
    details: "Especialista em React, Tailwind e animações com Framer Motion.",
    icon: <FaCode className="text-purple-500 text-4xl" />,
  },
  {
    name: "Desenvolvimento Backend",
    description: "Criação de servidores robustos e performáticos.",
    details: "Trabalho com bancos SQL e NoSQL, além de microsserviços.",
    icon: <FaDatabase className="text-yellow-500 text-4xl" />,
  },
  {
    name: "Integração com APIs de Terceiros",
    description: "Conexão com serviços como TMDb e Stripe.",
    details: "Uso de Axios, GraphQL e otimização de requisições.",
    icon: <FaPlug className="text-red-500 text-4xl" />,
  },
  {
    name: "Documentação de Projetos",
    description: "Criação de documentação técnica detalhada.",
    details: "Utilização de Swagger, Postman e Notion para documentação.",
    icon: <FaBook className="text-neutral10 text-4xl" />,
  },
];

export const ServicesPage = () => {
  const [flipped, setFlipped] = useState(Array(servicesData.length).fill(false));

  const toggleFlip = (index) => {
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mb-12 relative" id="servicos">
      <div className=" absolute top-[-2rem] left-1/2 transform -translate-x-1/2 text-center ">
        <h2 className="font-principal text-3xl md:text-4xl font-bold text-neutral-950 dark:text-neutral10">Serviços</h2>
        <div className="mt-2 w-20 h-1 bg-primary80 mx-auto rounded-full"></div>
      </div>

      {servicesData.map((service, index) => (
        <div key={index} className="relative w-full  mt-24 h-64 select-none" onClick={() => toggleFlip(index)} data-aos="fade-right">
          {/* Frente */}
          <motion.div
            className="absolute w-full h-full rounded-2xl shadow-lg cursor-pointer transform bg-neutral90 dark:bg-neutral10 transition-colors duration-500"
            animate={{ rotateY: flipped[index] ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ backfaceVisibility: "hidden" }}
            
          >
            <div className="flex flex-col items-center justify-center h-full text-center p-6" >
              {service.icon}
              <h3 className="text-xl font-bold mt-4 text-primary80 font-principal">{service.name}</h3>
              <p className="text-neutral10 dark:text-neutral90 mt-2">{service.description}</p>
            </div>
          </motion.div>

          {/* Verso */}
          <motion.div
            className="absolute w-full h-full rounded-2xl shadow-lg cursor-pointer transform bg-neutral90 dark:bg-neutral10 flex items-center justify-center transition-colors duration-500"
            animate={{ rotateY: flipped[index] ? 0 : 180 }}
            transition={{ duration: 0.6 }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="text-lg text-center p-4 font-semibold text-white dark:text-gray-800">{service.details}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
