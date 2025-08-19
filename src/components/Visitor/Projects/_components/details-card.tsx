"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const DetailsCard = ({ max = 12 }) => {
  const detailsIcons: { image: string; title: string }[] = [
    {
      image: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1753285533/cars_skyline_2_usltyc.svg",
      title: "cars",
    },
    {
      image: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1753224597/ght_ippe91.svg",
      title: "detail",
    },
    {
      image: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1753285533/anat_skull_3_gxu1qw.svg",
      title: "skull",
    },

    {
      image: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1753285533/deamons_6_lmn243.svg",
      title: "dea",
    },
    {
      image: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1753285533/deamons_3_battle_p9n5dt.svg",
      title: "battle",
    },
    { image: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1753285533/comic_alicr9.svg", title: "comic" },
    { image: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1753285534/head_5_t88nfo.svg", title: "head" },
    { image: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1753285535/deamons_4_zwaszm.svg", title: "dea2" },
  ];

  function getRandomItems(max: number) {
    const shuffledArray = [...detailsIcons].sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, max);
  }

  const filteredIcons = max > detailsIcons.length ? detailsIcons : getRandomItems(max);
  const positions = [
    "top-10 left-10 animate-float",
    "top-20 right-20 animate-float",
    "bottom-10 left-32 animate-floating",
    "bottom-60 right-40 animate-float",
    "top-1/2 left-1/4 animate-floating",
    "bottom-1/4 right-1/3 animate-float",
    "bottom-1/2 left-0 animate-float",
    "bottom-12 left-1/2 animate-float",
  ];

  return (
    <div className="pointer-events-none hidden md:block md:absolute   inset-0 z-[-1] overflow-hidden">
      {filteredIcons.map((icon, index) => (
        <Image
          key={index}
          src={icon.image}
          alt={icon.title}
          width={150}
          height={150}
          className={cn("absolute opacity-100 blur-xs", positions[index % positions.length])}
        />
      ))}
    </div>
  );
};

