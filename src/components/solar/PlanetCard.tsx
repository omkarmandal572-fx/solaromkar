import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PlanetData } from "@/data/planets";

const rows = (p: PlanetData) => [
  { label: "Type", value: p.type },
  { label: "Mass", value: p.mass },
  { label: "Distance from Sun", value: p.distanceFromSun },
];

export function PlanetCard({
  planet,
  onBack,
}: {
  planet: PlanetData;
  onBack: () => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center p-4 sm:items-center sm:justify-start sm:p-10">
      <div className="pointer-events-auto w-full max-w-md rounded-2xl border border-border/60 bg-card/70 p-6 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-3">
          <span
            className="size-3 rounded-full"
            style={{
              backgroundColor: planet.palette[0],
              boxShadow: `0 0 16px ${planet.palette[1]}`,
            }}
          />
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {planet.type}
          </span>
        </div>

        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
          {planet.name}
        </h2>

        <dl className="mt-6 space-y-3">
          {rows(planet).map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-0.5 border-b border-border/40 pb-3 last:border-0"
            >
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                {row.label}
              </dt>
              <dd className="text-sm text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 rounded-xl bg-muted/50 p-4 text-sm leading-relaxed text-foreground">
          <span className="font-medium">Fun fact — </span>
          {planet.funFact}
        </p>

        <Button onClick={onBack} className="mt-6 w-full gap-2" size="lg">
          <ArrowLeft className="size-4" />
          Back to Solar System
        </Button>
      </div>
    </div>
  );
}
