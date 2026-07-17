import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "fd.info — L'actualité par Fernand Dédeh",
    short_name: "fd.info",
    description:
      "Le portail de référence de l'actualité ivoirienne : le Daily, les articles et les podcasts de Fernand Dédeh.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FCFBFA",
    theme_color: "#FCFBFA",
    icons: [
      { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
