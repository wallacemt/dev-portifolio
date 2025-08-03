"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Connection } from "@/types/services";

interface ServiceConnectionsProps {
  connections: Connection[];
  hoveredService: string | null;
  servicePositions: Record<string, { x: number; y: number }>;
}

const connectionColors = {
  "data-flow": "stroke-blue-400",
  dependency: "stroke-green-400",
  integration: "stroke-purple-400",
};

const connectionGradients = {
  "data-flow": "dataFlowGradient",
  dependency: "dependencyGradient",
  integration: "integrationGradient",
};

export function ServiceConnections({ connections, hoveredService, servicePositions }: ServiceConnectionsProps) {
  const visibleConnections = hoveredService
    ? connections.filter((conn) => conn.fromId === hoveredService || conn.toId === hoveredService)
    : [];

  // Debug log when hoveredService changes
  console.log("ServiceConnections Debug:", {
    hoveredService,
    totalConnections: connections.length,
    visibleConnections: visibleConnections.length,
    servicePositionsCount: Object.keys(servicePositions).length,
    visibleConnectionsDetails: visibleConnections.map((c) => `${c.fromId} -> ${c.toId}`),
  });

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ overflow: "visible" }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="dataFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="dependencyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="integrationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
        </linearGradient>
        <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" opacity="0.8" />
        </marker>
        <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" opacity="0.8" />
        </marker>
        <marker id="arrowhead-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" opacity="0.8" />
        </marker>
      </defs>

      <AnimatePresence mode="wait">
        {visibleConnections.map((connection, index) => {
          const fromPos = servicePositions[connection.fromId];
          const toPos = servicePositions[connection.toId];

          if (!fromPos || !toPos) {
            console.warn(`Missing position for connection: ${connection.fromId} -> ${connection.toId}`, {
              fromPos,
              toPos,
              connection,
              availablePositions: Object.keys(servicePositions),
              hoveredService,
            });
            return null;
          }
          const midX = (fromPos.x + toPos.x) / 2;
          const midY = (fromPos.y + toPos.y) / 2;
          const dx = toPos.x - fromPos.x;
          const dy = toPos.y - fromPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 10) return null;
          const curvature = Math.min(distance * 0.2, 80);
          const controlX = midX + (dy / distance) * curvature;
          const controlY = midY - (dx / distance) * curvature;

          const pathData = `M ${fromPos.x} ${fromPos.y} Q ${controlX} ${controlY} ${toPos.x} ${toPos.y}`;

          const arrowMarkerId =
            connection.type === "data-flow"
              ? "arrowhead-blue"
              : connection.type === "dependency"
              ? "arrowhead-green"
              : "arrowhead-purple";

          return (
            <motion.g
              key={`${connection.fromId}-${connection.toId}-${connection.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
            >
              <motion.path
                d={pathData}
                fill="none"
                stroke={`url(#${connectionGradients[connection.type]})`}
                strokeWidth="8"
                opacity="0.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
              />
              <motion.path
                d={pathData}
                fill="none"
                stroke={`url(#${connectionGradients[connection.type]})`}
                strokeWidth="3"
                markerEnd={`url(#${arrowMarkerId})`}
                className={`${connectionColors[connection.type]} drop-shadow-sm`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
              />
              <motion.circle
                r="4"
                fill={`url(#${connectionGradients[connection.type]})`}
                opacity="0.9"
                filter="drop-shadow(0 0 4px currentColor)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <animateMotion dur="4s" repeatCount="indefinite" path={pathData} begin={`${index * 0.2}s`} />
              </motion.circle>
              <motion.circle
                r="2"
                fill={
                  connection.type === "data-flow" ? "#3b82f6" : connection.type === "dependency" ? "#10b981" : "#8b5cf6"
                }
                opacity="0.6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: index * 0.1 + 1 }}
              >
                <animateMotion dur="3s" repeatCount="indefinite" path={pathData} begin={`${index * 0.3}s`} />
              </motion.circle>
            </motion.g>
          );
        })}
      </AnimatePresence>
    </svg>
  );
}
