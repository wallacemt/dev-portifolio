import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Portfolio Profissional",
    short_name: "Portfolio",
    description: "Portfolio profissional com projetos, habilidades e experiências",
    start_url: "/watch/pt",
    display: "standalone",
    background_color: "#2F0559",
    theme_color: "#2F0559",
    orientation: "portrait-primary",
    categories: ["portfolio", "business", "productivity"],
    lang: "pt-BR",
    dir: "ltr",
    icons: [
      {
        src: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1755800847/icon-192_he5jz2.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1755800847/icon-512_wnbbem.png", 
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1755800847/apple-touch-icon_z7bs1v.png", 
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1755801358/og-image-home-pt_qj8l6h.png", 
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1755808103/screenshot-narrow_zphpcx.png", 
        sizes: "720x1280",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
