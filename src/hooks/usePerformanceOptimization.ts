"use client";

import { useState, useEffect } from "react";

interface PerformanceMetrics {
  isLowEndDevice: boolean;
  isMobile: boolean;
  isSlowConnection: boolean;
  shouldReduceAnimations: boolean;
  preferredImageQuality: number;
  recommendedFPS: number;
}
interface Connection {
  effectiveType: "slow-2g" | "2g" | "3g" | "4g";
  saveData: boolean;
  addEventListener: (type: string, listener: () => void) => void;
  removeEventListener: (type: string, listener: () => void) => void;
}
export function usePerformanceOptimization(): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    isLowEndDevice: false,
    isMobile: false,
    isSlowConnection: false,
    shouldReduceAnimations: false,
    preferredImageQuality: 85,
    recommendedFPS: 60,
  });

  useEffect(() => {
    const detectPerformance = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLowEndDevice =
        navigator.hardwareConcurrency <= 4 ||
        (navigator as Navigator & { deviceMemory: number }).deviceMemory <= 4 ||
        isMobile;

      const connection = (navigator as Navigator & { connection: Connection }).connection;
      const isSlowConnection =
        connection &&
        (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g" || connection.saveData);

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const shouldReduceAnimations = isLowEndDevice || isSlowConnection || prefersReducedMotion;

      let preferredImageQuality = 85;
      if (isSlowConnection) preferredImageQuality = 60;
      if (isLowEndDevice) preferredImageQuality = 70;

      let recommendedFPS = 60;
      if (isMobile || isLowEndDevice) recommendedFPS = 30;
      if (isSlowConnection) recommendedFPS = 20;

      setMetrics({
        isLowEndDevice,
        isMobile,
        isSlowConnection,
        shouldReduceAnimations,
        preferredImageQuality,
        recommendedFPS,
      });
    };

    detectPerformance();

    const connection = (navigator as Navigator & { connection: Connection }).connection;
    if (connection) {
      connection.addEventListener("change", detectPerformance);
      return () => connection.removeEventListener("change", detectPerformance);
    }
  }, []);

  return metrics;
}

export function useLazyLoading(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<Element | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref);
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold]);

  return { isVisible, setRef };
}

export function useFPSControl(targetFPS = 60) {
  const [shouldRender, setShouldRender] = useState(true);
  const lastFrameTime = useState(0);

  const checkFrame = () => {
    const now = performance.now();
    const frameInterval = 1000 / targetFPS;

    if (now - lastFrameTime[0] >= frameInterval) {
      setShouldRender(true);
      lastFrameTime[0] = now;
    } else {
      setShouldRender(false);
    }
  };

  useEffect(() => {
    const animationFrame = requestAnimationFrame(checkFrame);
    return () => cancelAnimationFrame(animationFrame);
  });

  return shouldRender;
}
