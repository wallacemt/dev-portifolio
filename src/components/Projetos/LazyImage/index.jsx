import { useState } from "react";

export const LazyImage = ({ src, alt, className, onLoad, projOne = false }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleLoad = () => {
    setIsImageLoaded(true);
    if (onLoad) onLoad();
  };
  return (
    <div>
      <img
        src={src}
        alt={alt}
        className={`${className} ${!isImageLoaded ? "opacity-0" : "opacity-100"}`}
        onLoad={handleLoad}
      />
      {projOne && (
        <div className="bg-white h-fit rounded-lg p-1 w-fit text-neutral90 border-2 border-primary90 absolute top-2 right-2  flex items-center justify-center font-principal">
          Mais recente
        </div>
      )}
    </div>
  );
};
