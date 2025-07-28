"use client";
import { motion } from "framer-motion";
import { ServiceCard } from "./_components/service-card";
import { ServiceConnections } from "./_components/service-connections";
import { ServicesSkeleton } from "./_components/services-skeleton";
import { useServices } from "./useServices";

interface ServicesProps {
  language: string;
}
export function Services({ language }: ServicesProps) {
  const {
    services,
    connections,
    loading,
    error,
    hoveredService,
    servicePositions,
    containerRef,
    handleServiceHover,
    isServiceConnected,
  } = useServices();

  if (loading) {
    return <ServicesSkeleton />;
  }

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === "pt" ? "Erro ao carregar serviços" : "Error loading services"}
          </h2>
          <p className="text-gray-400">
            {language === "pt"
              ? "Não foi possível carregar os serviços. Tente novamente mais tarde."
              : "Unable to load services. Please try again later."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 relative overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-principal text-white mb-6 font-title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {language === "pt" ? "Meus Serviços" : "My Services"}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-secundaria"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {language === "pt"
              ? "Soluções completas em desenvolvimento full stack, desde a concepção até a implementação, conectando todas as partes do seu projeto de forma eficiente."
              : "Complete full stack development solutions, from conception to implementation, efficiently connecting all parts of your project."}
          </motion.p>
        </motion.div>

        <div ref={containerRef} className="relative h-full">
          <ServiceConnections
            connections={connections}
            hoveredService={hoveredService}
            servicePositions={servicePositions}
          />
         
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
            {services.map((service, index) => (
              <div key={service.id} data-service-id={service.id} className="flex">
                <ServiceCard
                  service={service}
                  index={index}
                  isConnected={isServiceConnected(service.id)}
                  onHover={handleServiceHover}
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
              className="absolute w-1 h-1 bg-roxo100/90 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-gray-300 mb-6">
            {language === "pt"
              ? "Interessado em algum serviço? Vamos conversar sobre seu projeto!"
              : "Interested in any service? Let's talk about your project!"}
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === "pt" ? "Entrar em Contato" : "Get in Touch"}
            <motion.span className="ml-2" animate={{ x: hoveredService ? 5 : 0 }} transition={{ duration: 0.3 }}>
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
