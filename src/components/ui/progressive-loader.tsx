"use client";

import { useEffect, useState } from "react";

interface ProgressiveLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
}

export function ProgressiveLoader({ children, fallback, delay = 100 }: ProgressiveLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isLoaded && fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Skeleton component otimizado
export function OptimizedSkeleton({
  className = "",
  width = "100%",
  height = "20px",
  rounded = "4px",
}: {
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-roxo300/20 via-roxo300/40 to-roxo300/20 ${className}`}
      style={{
        width,
        height,
        borderRadius: rounded,
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite linear",
      }}
    />
  );
}

// Component para lazy loading de imagens pesadas
export function LazyImageContainer({ children, threshold = 0.1 }: { children: React.ReactNode; threshold?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(containerRef);
        }
      },
      { threshold }
    );

    observer.observe(containerRef);

    return () => {
      if (containerRef) {
        observer.unobserve(containerRef);
      }
    };
  }, [containerRef, threshold]);

  return (
    <div ref={setContainerRef}>
      {isVisible ? children : <OptimizedSkeleton className="w-full h-48" width="100%" height="192px" />}
    </div>
  );
}
