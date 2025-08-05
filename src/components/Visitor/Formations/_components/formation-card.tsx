"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, ExternalLink, Award, MapPin } from "lucide-react";
import { Formation } from "@/types/formations";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FormationCardProps {
  formation: Formation;
  texts: {certificationText: string};
  index: number;
  isActive?: boolean;
  onHover?: (formationId: string | null) => void;
  language: string;
}

const formationTypeColors = {
  graduation: "from-blue-500 to-blue-600",
  postgraduate: "from-purple-500 to-purple-600",
  course: "from-green-500 to-green-600",
  certification: "from-orange-500 to-orange-600",
  workshop: "from-pink-500 to-pink-600",
  bootcamp: "from-indigo-500 to-indigo-600",
  default: "from-gray-500 to-gray-600",
};

const formationTypeIcons = {
  graduation: <Award className="w-4 h-4" />,
  postgraduate: <Award className="w-4 h-4" />,
  course: <Calendar className="w-4 h-4" />,
  certification: <ExternalLink className="w-4 h-4" />,
  workshop: <Clock className="w-4 h-4" />,
  bootcamp: <MapPin className="w-4 h-4" />,
  default: <Calendar className="w-4 h-4" />,
};

export function FormationCard({ formation, index, texts, isActive = false, onHover, language }: FormationCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "pt" ? "pt-BR" : "en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const calculateDuration = () => {
    const start = new Date(formation.initialDate);
    const end = formation.endDate ? new Date(formation.endDate) : new Date();
    const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));

    if (language === "pt") {
      return months === 1 ? "1 mês" : `${months} meses`;
    }
    return months === 1 ? "1 month" : `${months} months`;
  };

  const typeColor =
    formationTypeColors[formation.type as keyof typeof formationTypeColors] || formationTypeColors.default;
  const typeIcon = formationTypeIcons[formation.type as keyof typeof formationTypeIcons] || formationTypeIcons.default;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        delay: index * 0.2,
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => onHover?.(formation.id)}
      onHoverEnd={() => onHover?.(null)}
      className="relative group"
    >
      <div className="flex items-start gap-6">
        {/* Timeline connector */}
        <div className="flex flex-col items-center flex-shrink-0 relative">
          <motion.div
            className={cn(
              "w-4 h-4 rounded-full border-2 border-white/20 transition-all duration-300 z-10 relative",
              isActive
                ? "bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/50 scale-125"
                : "bg-white/10 group-hover:bg-blue-400 group-hover:border-blue-300"
            )}
            animate={{
              scale: isActive ? 1.25 : 1,
              boxShadow: isActive ? "0 0 20px rgba(59, 130, 246, 0.5)" : "0 0 0px rgba(59, 130, 246, 0)",
            }}
          >
            {/* Pulse effect for active */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-500"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}
          </motion.div>

          {/* Connecting line to next item */}
          <div className="w-0.5 h-24 bg-gradient-to-b from-white/20 via-white/10 to-transparent mt-2" />
        </div>

        {/* Formation card */}
        <Card
          className={cn(
            "flex-1 p-6 bg-white/5 backdrop-blur-sm border transition-all duration-500 group",
            "hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/10",
            isActive
              ? "border-blue-500/50 bg-blue-500/5 shadow-lg shadow-blue-500/10"
              : "border-white/10 hover:border-white/30"
          )}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Institution image/icon */}
            <div className="flex-shrink-0">
              {formation.image ? (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/10">
                  <Image src={formation.image} alt={formation.institution} fill className="object-cover" sizes="64px" />
                </div>
              ) : (
                <div
                  className={cn(
                    "w-16 h-16 rounded-lg bg-gradient-to-br flex items-center justify-center text-white",
                    typeColor
                  )}
                >
                  {typeIcon}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="mb-3">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
                    {formation.title}
                  </h3>
                  <Badge
                    variant="secondary"
                    className={cn("text-xs text-white border-none capitalize", `bg-gradient-to-r ${typeColor}`)}
                  >
                    {formation.type}
                  </Badge>
                </div>
                <p className="text-gray-300 font-medium">{formation.institution}</p>
              </div>

              {/* Description */}
              {formation.description && (
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{formation.description}</p>
              )}

              {/* Meta information */}
              <div className="flex flex-wrap gap-4 items-center text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(formation.initialDate)} -{" "}
                    {formation.endDate ? formatDate(formation.endDate) : language === "pt" ? "Presente" : "Present"}
                  </span>
                </div>

                {formation.workload && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formation.workload}h</span>
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{calculateDuration()}</span>
                </div>
              </div>
            </div>

            {/* Certificate button */}
            {formation.certificationUrl && (
              <div className="flex-shrink-0 flex items-start">
                <motion.a
                  href={formation.certificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  {texts.certificationText}
                </motion.a>
              </div>
            )}
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" />
        </Card>
      </div>
    </motion.div>
  );
}
