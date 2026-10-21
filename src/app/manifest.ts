import type { MetadataRoute } from "next";
import { person } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: person.name,
    short_name: person.name,
    description: person.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#FFF6EA",
    theme_color: "#22306B",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
