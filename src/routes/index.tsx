import { createFileRoute } from "@tanstack/react-router";
import { SolarSystem } from "@/components/solar/SolarSystem";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Interactive 3D Solar System — Explore the Planets" },
      {
        name: "description",
        content:
          "Explore a dated 3D solar system with real sidereal periods, Kolkata's night sky, planetary history, and lunar phases.",
      },
      { property: "og:title", content: "Interactive 3D Solar System" },
      {
        property: "og:description",
        content:
          "Watch real sidereal motion, Kolkata's rotating night sky, Solar System history, and lunar phases in interactive 3D.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SolarSystem,
});
