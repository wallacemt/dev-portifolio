"use client";
import { motion } from "framer-motion";
import { ServiceCard } from "./service-card";
import { ServiceConnections } from "./service-connections";
import { useServices } from "../useServices";
import { Connection, Services } from "@/types/services";

interface ServicesProps {
  services: Services[];
  connections: Connection[];
  texts: { title: string; description: string; cta: string; ctaBtn: string };
  lan: string;
}
export function ServicesContent({ services, connections, texts, lan }: ServicesProps) {
  const { hoveredService, servicePositions, containerRef, handleServiceHover, isServiceConnected } = useServices();

  return (
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
          {texts.title}
        </motion.h2>
        <motion.p
          className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-secundaria"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {texts.description}
        </motion.p>
      </motion.div>

      <div ref={containerRef} className="relative w-full">
        <ServiceConnections
          connections={connections}
          hoveredService={hoveredService}
          servicePositions={servicePositions}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20 p-4">
          {services.map((service, index) => (
            <div key={service.id} data-service-id={service.id} className="flex">
              <ServiceCard
                service={service}
                index={index}
                isConnected={isServiceConnected(service.id, connections)}
                onHover={handleServiceHover}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none z-0">
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
      {texts.cta && (
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-gray-300 mb-6">{texts.cta}</p>
          <motion.a
            href={
              lan === "pt"
                ? "https://docs.google.com/forms/d/e/1FAIpQLSczC9kJC83PaHzbZ6Wm9qQW8AhqBqu-i2ZDo_UDXvUlNWMCCQ/viewform?usp=dialog"
                : "https://docs.google.com/forms/d/e/1FAIpQLSe0Rowb2t9yfThken7OnlsaXo9dPO44beQzszW7hdina56VIA/viewform?usp=dialog"
            }
            target="_blank"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {texts.ctaBtn}
            <motion.span className="ml-2" animate={{ x: hoveredService ? 5 : 0 }} transition={{ duration: 0.3 }}>
              →
            </motion.span>
          </motion.a>
        </motion.div>
      )}
    </div>
  );
}
