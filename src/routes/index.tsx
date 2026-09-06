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
          "Fly through a real-time 3D solar system. Orbit the Sun, tap any planet and read its mass, distance and a fun fact.",
      },
      { property: "og:title", content: "Interactive 3D Solar System" },
      {
        property: "og:description",
        content:
          "Orbit the Sun and tap any planet to zoom in and explore its facts in real-time 3D.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SolarSystem,
});
