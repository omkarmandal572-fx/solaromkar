import { useEffect, useState } from "react";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PlanetData } from "@/data/planets";
import { earthCycleAt, formatSolarTime, moonPhaseAt } from "@/data/earthCycles";
import { useSim } from "./SimTime";

const rows = (p: PlanetData) => [
  { label: "Type", value: p.type },
  { label: "Mass", value: p.mass },
  { label: "Distance from Sun", value: p.distanceFromSun },
  { label: "Orbital period", value: `${p.orbitalPeriodDays.toLocaleString()} Earth days` },
  { label: "Sidereal rotation", value: `${Math.abs(p.rotationPeriodDays).toLocaleString()} days${p.rotationPeriodDays < 0 ? " · retrograde" : ""}` },
];

export function PlanetCard({
  planet,
  onBack,
}: {
  planet: PlanetData;
  onBack: () => void;
}) {
  const { getDays } = useSim();
  const [days, setDays] = useState(() => getDays());
  const earthCycle = earthCycleAt(days);
  const moonPhase = moonPhaseAt(days);

  useEffect(() => {
    const id = window.setInterval(() => setDays(getDays()), 120);
    return () => window.clearInterval(id);
  }, [getDays]);

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

        {planet.id === "earth" && (
          <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60">
            <div className="bg-card/90 p-3">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Sun className="size-3.5" /> Kolkata
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {earthCycle.dayState}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {formatSolarTime(earthCycle.solarTimeHours)} solar time · {earthCycle.solarElevationDegrees.toFixed(1)}°
              </p>
            </div>
            <div className="bg-card/90 p-3">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Moon className="size-3.5" /> Moon phase
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {moonPhase.name}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {Math.round(moonPhase.illumination * 100)}% lit · day {moonPhase.ageDays.toFixed(1)}
              </p>
            </div>
          </div>
        )}

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
