"use client";

import { motion } from "framer-motion";
import { Code2, Server, Database, Smartphone, Cloud, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface CentralHubProps {
  hoveredService: string | null;
  isActive: boolean;
}

const hubIcons = [
  { icon: Code2, rotation: 0, color: "text-blue-400" },
  { icon: Server, rotation: 60, color: "text-green-400" },
  { icon: Database, rotation: 120, color: "text-purple-400" },
  { icon: Smartphone, rotation: 180, color: "text-pink-400" },
  { icon: Cloud, rotation: 240, color: "text-orange-400" },
  { icon: Zap, rotation: 300, color: "text-yellow-400" },
];

export function CentralHub({ hoveredService, isActive }: CentralHubProps) {
  return (
    <div className="md:absolute hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <motion.div
        className={cn(
          "relative w-32 h-32 rounded-full border-2 transition-all duration-500",
          "bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md",
          isActive || hoveredService
            ? "border-blue-500/60 shadow-2xl shadow-blue-500/20 scale-110"
            : "border-white/20 shadow-lg shadow-black/20"
        )}
        animate={{
          rotate: isActive ? 360 : 0,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
     

        {/* Orbiting icons */}
        {hubIcons.map(({ icon: Icon, rotation, color }, index) => (
          <motion.div
            key={index}
            className="absolute w-8 h-8 flex items-center justify-center"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "0 0",
            }}
            animate={{
              rotate: rotation + (isActive ? 360 : 0),
              x: -16,
              y: -16,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className={cn(
                "w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center",
                hoveredService && "scale-125 bg-white/20"
              )}
              animate={{
                rotate: isActive ? -360 : 0,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Icon className={cn("w-3 h-3", color)} />
            </motion.div>
          </motion.div>
        ))}

        {/* Pulse rings */}
        {isActive && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border border-blue-500/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-purple-500/30"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </>
        )}
      </motion.div>

    
    </div>
  );
}
