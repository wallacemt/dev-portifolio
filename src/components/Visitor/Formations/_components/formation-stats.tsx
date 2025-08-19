"use client";

import CountUp from "@/components/blocks/TextAnimations/CountUp/CountUp";
import { motion } from "framer-motion";
import { Award, Clock, Building, ExternalLink } from "lucide-react";

interface FormationStatsProps {
  stats: {
    total: number;
    totalWorkload: number;
    typesCount: number;
    institutionsCount: number;
    certificatesCount: number;
  };
  texts: {
    stats: {
      formations: string;
      studyHours: string;
      institution: string;
      certificaos: string;
    };
  };
}

export function FormationStats({ stats, texts }: FormationStatsProps) {
  const statsData = [
    {
      icon: <Award className="w-6 h-6" />,
      value: stats.total,
      label: texts.stats.formations,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: stats.totalWorkload,
      label: texts.stats.studyHours,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      suffix: "h",
    },
    {
      icon: <Building className="w-6 h-6" />,
      value: stats.institutionsCount,
      label: texts.stats.institution,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: <ExternalLink className="w-6 h-6" />,
      value: stats.certificatesCount,
      label: texts.stats.certificaos,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          className={`relative p-4 rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/30 ${stat.bgColor}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 rounded-xl`} />

          <div className="relative z-10 text-center">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} mb-3`}
            >
              <div className="text-white">{stat.icon}</div>
            </div>
            <motion.div
              className="text-2xl font-bold text-white mb-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: index * 0.1 + 0.3,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
            >
              <CountUp from={0} to={stat.value} separator="." direction="up" duration={1} className="count-up-text" />
              {stat.suffix || ""}
            </motion.div>
            <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
          </div>
          <div
            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${stat.color} opacity-0 hover:opacity-10 transition-opacity duration-300`}
          />
        </motion.div>
      ))}
    </div>
  );
}
