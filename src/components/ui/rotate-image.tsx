"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";
import { Award } from "lucide-react";

interface RotateImageProps {
  imageUrl: string;
  title: string;
  height?: number;
  width?: number;
  className?: string;
}

export function RotateImage({ height = 300, imageUrl, title, width = 300, className }: RotateImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseEnter = () => {
    if (imageRef.current && !hasError) {
      imageRef.current.classList.add("image-rotate-container");
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.classList.remove("image-rotate-container");
    }
  };

  const isExternal = imageUrl?.startsWith("http");

  if (hasError || !imageUrl) {
    return (
      <div
        className={cn(
          className,
          "relative h-40 w-40 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-muted/40 border border-border/40",
        )}
        title={title}
      >
        <Award className="h-12 w-12 text-muted-foreground/50" />
      </div>
    );
  }

  return (
    <div
      ref={imageRef}
      className={cn(className, "relative h-40 w-40 rounded-lg overflow-hidden flex-shrink-0")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/40 animate-pulse rounded-lg">
          <Award className="h-10 w-10 text-muted-foreground/40" />
        </div>
      )}
      <Image
        src={imageUrl}
        alt={title}
        className={cn("object-contain transition-all ease-in", isLoaded ? "opacity-100" : "opacity-0")}
        title={title}
        width={width}
        height={height}
        unoptimized={isExternal}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
      <style>{`
        .image-rotate-container {
          perspective: 600px;
        }
        .image-rotate-container img {
          animation: rotate3dImage 6s linear infinite;
          transform-style: preserve-3d;
          display: block;
          width: 100%;
        }
        @keyframes rotate3dImage {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
