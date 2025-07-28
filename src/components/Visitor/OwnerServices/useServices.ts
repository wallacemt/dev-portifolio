"use client";

import { useState, useEffect, useRef } from "react";
import { Service, ServiceConnection } from "@/types/services";
import { getServices } from "@/services/servicesApi";
import { useLanguage } from "@/contexts/LanguageContext";

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [connections, setConnections] = useState<ServiceConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [servicePositions, setServicePositions] = useState<Record<string, { x: number; y: number }>>({});

  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch services data
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getServices(language);
        setServices(data.services);
        setConnections(data.connections);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [language]);

  // Calculate service positions for connections
  useEffect(() => {
    if (!containerRef.current || services.length === 0) return;

    const updatePositions = () => {
      const container = containerRef.current;
      if (!container) return;

      const positions: Record<string, { x: number; y: number }> = {};
      const cards = container.querySelectorAll("[data-service-id]");

      cards.forEach((card) => {
        const serviceId = card.getAttribute("data-service-id");
        if (serviceId) {
          const rect = card.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          positions[serviceId] = {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
          };
        }
      });

      setServicePositions(positions);
    };

    // Initial calculation
    setTimeout(updatePositions, 100);

    // Update on resize
    const resizeObserver = new ResizeObserver(updatePositions);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [services]);

  const handleServiceHover = (serviceId: string | null) => {
    setHoveredService(serviceId);
  };

  const getConnectedServices = (serviceId: string): string[] => {
    return connections
      .filter((conn) => conn.from === serviceId || conn.to === serviceId)
      .map((conn) => (conn.from === serviceId ? conn.to : conn.from));
  };

  const isServiceConnected = (serviceId: string): boolean => {
    if (!hoveredService) return false;
    return hoveredService === serviceId || getConnectedServices(hoveredService).includes(serviceId);
  };

  return {
    services,
    connections,
    loading,
    error,
    hoveredService,
    servicePositions,
    containerRef,
    handleServiceHover,
    isServiceConnected,
    getConnectedServices,
  };
}
