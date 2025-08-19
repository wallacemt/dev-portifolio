"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Atom, Clock, DollarSign, Palette, ServerCrash, Settings } from "lucide-react";
import { Services } from "@/types/services";
import { cn } from "@/lib/utils";
import { DeviceMobileIcon } from "@phosphor-icons/react";

interface ServiceCardProps {
  service: Services;
  index: number;
  isConnected?: boolean;
  onHover?: (serviceId: string | null) => void;
}

export function ServiceCard({ service, index, isConnected = false, onHover }: ServiceCardProps) {
  const categoryColors = {
    frontend: "from-blue-500/80 to-cyan-500/20",
    backend: "from-green-500/80 to-emerald-500/20",
    fullstack: "from-purple-500/80 to-pink-500/20",
    devops: "from-orange-500/80 to-red-500/20",
    mobile: "from-indigo-500/80 to-purple-500/20",
  };

  const categoryIcons = {
    frontend: <Palette />,
    backend: service.sId == "api-integration" ? <ServerCrash /> : <Clock />,
    fullstack: <Atom />,
    devops: <Settings />,
    mobile: <DeviceMobileIcon />,
  };
  const complexityIcons = ["⭐", "⭐⭐", "⭐⭐⭐"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => onHover?.(service.id)}
      onHoverEnd={() => onHover?.(null)}
      className="relative group"
    >
      <Card
        className={cn(
          "relative p-6 h-full bg-white/5 backdrop-blur-sm border transition-all duration-500",
          "hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/20",
          isConnected ? "border-blue-500/50 bg-blue-500/10" : "border-white/10 hover:border-white/30"
        )}
      >
        <div
          className={cn("absolute inset-0 bg-gradient-to-br opacity-5 rounded-lg", categoryColors[service.category])}
        />
        <div className="absolute top-1/2 -left-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-1/2 -right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 mb-4 mx-auto">
            <div
              className={cn(
                "w-full h-full rounded-lg bg-gradient-to-br flex items-center justify-center text-2xl",
                categoryColors[service.category]
              )}
            >
              {categoryIcons[service.category]}
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white text-center mb-3 font-title">{service.title}</h3>
          <p className="text-gray-300 text-sm text-center mb-4 leading-relaxed flex-grow">{service.description}</p>
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {service.technologies.slice(0, 3).map((tech) => (
              <Badge
                key={tech.id}
                variant="secondary"
                className="text-xs bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                {tech.title}
              </Badge>
            ))}
            {service.technologies.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                +{service.technologies.length - 3}
              </Badge>
            )}
          </div>
          <div className="mt-auto space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1 text-gray-300">
                <span>{complexityIcons[service.complexityTier]}</span>
                <span className="capitalize">{service.complexity}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-300">
                <Clock className="w-4 h-4" />
                <span>{service.deliveryTime}</span>
              </div>
            </div>
            {service.price && (
              <div className="flex items-center justify-center gap-1 text-sm">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-white font-medium">
                  {service.price.currency} {service.price.min}
                  {service.price.max !== service.price.min && ` - ${service.price.max}`}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
      </Card>
    </motion.div>
  );
}
