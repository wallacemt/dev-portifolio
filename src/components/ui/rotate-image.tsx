import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef } from "react";

interface RotateImageProps {
  imageUrl: string;
  title: string;
  height?: number;
  width?: number;
  className?: string;
}

export function RotateImage({ height = 300, imageUrl, title, width = 300, className }: RotateImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (imageRef.current) {
      imageRef.current.classList.add("image-rotate-container");
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.classList.remove("image-rotate-container");
    }
  };
  return (
    <div
      ref={imageRef}
      className={cn(className, "relative h-full w-40 rounded-lg overflow-hidden flex-shrink-0")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={imageUrl}
        alt={title}
        className="object-cover hover:scale-105 transition-all ease-in"
        title={title}
        width={width}
        height={height}
      />
      <style>{
      `/* Apply a 3D perspective to the container */
        .image-rotate-container {
            perspective: 600px; /* Adjust as needed to control the depth of the 3D space */
        }

        /* Apply the animation to the image or another inner container */
        .image-rotate-container img {
            /* The animation property combines name, duration, timing, and iteration count */
            animation: rotate3dImage 6s linear infinite; 
            transform-style: preserve-3d; /* Ensures child elements (if any) are rendered in 3D space */
            display: block; /* Ensures transforms work correctly */
            width: 100%;
        }

        /* Define the keyframe animation */
        @keyframes rotate3dImage {
            from {
                /* Start the rotation at 0 degrees around the Y-axis (or X/Z as desired) */
                transform: rotateY(0deg); 
            }
            to {
                /* End the rotation at 360 degrees, creating a full spin */
                transform: rotateY(360deg);
            }
    }`
}</style>
    </div>
  );
}
