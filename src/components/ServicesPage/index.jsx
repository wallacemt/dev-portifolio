import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaCode, FaServer, FaDatabase, FaPlug, FaBook } from "react-icons/fa";

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mb-12">
      {servicesData.map((service, index) => (
        <div key={index} className="relative w-full h-64 select-none" onClick={() => toggleFlip(index)}>
          {/* Frente */}
          <motion.div
            className="absolute w-full h-full rounded-2xl shadow-lg cursor-pointer transform bg-neutral10 dark:bg-neutral90 transition-colors duration-500"
            animate={{ rotateY: flipped[index] ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              {service.icon}
              <h3 className="text-xl font-bold mt-4 text-primary80 font-principal">{service.name}</h3>
              <p className="text-neutral80 dark:text-neutral10 mt-2">{service.description}</p>
            </div>
          </motion.div>

          {/* Verso */}
          <motion.div
            className="absolute w-full h-full rounded-2xl shadow-lg cursor-pointer transform bg-neutral10 dark:bg-neutral90 flex items-center justify-center transition-colors duration-500"
            animate={{ rotateY: flipped[index] ? 0 : 180 }}
            transition={{ duration: 0.6 }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="text-lg text-center p-4 font-semibold text-gray-800 dark:text-white">{service.details}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
