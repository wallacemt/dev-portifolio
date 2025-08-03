"use client";
import { Connection } from "@/types/services";
import { useState, useEffect, useRef } from "react";
export function useServices() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [servicePositions, setServicePositions] = useState<Record<string, { x: number; y: number }>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;

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

      console.log("Updated service positions:", positions);
      console.log("Total cards found:", cards.length);
      console.log(
        "Cards with service-id:",
        Array.from(cards).map((card) => card.getAttribute("data-service-id"))
      );
      setServicePositions(positions);
    };
    const timeouts = [100, 300, 500, 1000];
    timeouts.forEach((delay) => {
      setTimeout(updatePositions, delay);
    });
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updatePositions, 50);
    });

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(updatePositions, 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      intersectionObserver.observe(containerRef.current);
    }
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updatePositions, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  const handleServiceHover = (serviceId: string | null) => {
    setHoveredService(serviceId);
  };
  const getConnectedServices = (serviceId: string, connections: Connection[]): string[] => {
    return connections
      .filter((conn) => conn.fromId === serviceId || conn.toId === serviceId)
      .map((conn) => (conn.fromId === serviceId ? conn.toId : conn.fromId));
  };
  const isServiceConnected = (serviceId: string, connections: Connection[]): boolean => {
    if (!hoveredService) return false;
    return hoveredService === serviceId || getConnectedServices(hoveredService, connections).includes(serviceId);
  };
  return {
    hoveredService,
    servicePositions,
    containerRef,
    handleServiceHover,
    isServiceConnected,
    getConnectedServices,
  };
}
