"use client";

import { motion } from "framer-motion";
import { ServiceConnection } from "@/types/services";


interface ServiceConnectionsProps {
  connections: ServiceConnection[];
  hoveredService: string | null;
  servicePositions: Record<string, { x: number; y: number }>;
}

const connectionColors = {
  "data-flow": "stroke-blue-400",
  dependency: "stroke-green-400",
  integration: "stroke-purple-400",
};

export function ServiceConnections({ connections, hoveredService, servicePositions }: ServiceConnectionsProps) {
  const visibleConnections = hoveredService
    ? connections.filter((conn) => conn.from === hoveredService || conn.to === hoveredService)
    : [];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: "visible" }}>
      <defs>
        {/* Gradient definitions for connection lines */}
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

        {/* Arrow marker */}
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" opacity="0.8" />
        </marker>
      </defs>

      {visibleConnections.map((connection, index) => {
        const fromPos = servicePositions[connection.from];
        const toPos = servicePositions[connection.to];

        if (!fromPos || !toPos) return null;

        // Calculate control points for curved line
        const midX = (fromPos.x + toPos.x) / 2;
        const midY = (fromPos.y + toPos.y) / 2;
        const dx = toPos.x - fromPos.x;
        const dy = toPos.y - fromPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Create curve based on distance
        const curvature = Math.min(distance * 0.3, 100);
        const controlX = midX + (dy / distance) * curvature;
        const controlY = midY - (dx / distance) * curvature;

        const pathData = `M ${fromPos.x} ${fromPos.y} Q ${controlX} ${controlY} ${toPos.x} ${toPos.y}`;

        return (
          <motion.g
            key={`${connection.from}-${connection.to}`}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            exit={{ opacity: 0, pathLength: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
          >
            {/* Glow effect */}
            <motion.path
              d={pathData}
              fill="none"
              stroke={`url(#${connection.type}Gradient)`}
              strokeWidth="6"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />

            {/* Main line */}
            <motion.path
              d={pathData}
              fill="none"
              stroke={`url(#${connection.type}Gradient)`}
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              className={connectionColors[connection.type]}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />

            {/* Animated dots flowing along the path */}
            <motion.circle r="3" fill="currentColor" className={connectionColors[connection.type]} opacity="0.8">
              <animateMotion dur="3s" repeatCount="indefinite" path={pathData} />
            </motion.circle>
          </motion.g>
        );
      })}
    </svg>
  );
}
