import { useEffect, useState } from "react";
import { History, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  ageToHistorySlider,
  historySliderToAge,
  nearestHistoryEvent,
} from "@/data/solarHistory";
import { useSim } from "./SimTime";

export const DAYS_PER_MILLION_YEARS = 365.2422 * 1_000_000;

function formatAge(ageMa: number) {
  if (ageMa >= 1000) return `${(ageMa / 1000).toFixed(2)} billion years ago`;
  if (ageMa >= 1) return `${ageMa.toFixed(ageMa < 10 ? 1 : 0)} million years ago`;
  if (ageMa > 0.001) return `${Math.round(ageMa * 1000).toLocaleString()} thousand years ago`;
  return "Present day";
}

export function HistoryControls() {
  const { getDays, setDays, setRunning } = useSim();
  const [ageMa, setAgeMa] = useState(0);
  const event = nearestHistoryEvent(ageMa);

  useEffect(() => {
    const id = window.setInterval(() => {
      setAgeMa(Math.max(0, -getDays() / DAYS_PER_MILLION_YEARS));
    }, 120);
    return () => window.clearInterval(id);
  }, [getDays]);

  const updateAge = (nextAge: number) => {
    setAgeMa(nextAge);
    setRunning(false);
    setDays(-nextAge * DAYS_PER_MILLION_YEARS);
  };

  return (
    <section className="pointer-events-auto w-[min(92vw,32rem)] rounded-lg border border-border bg-card/85 p-4 shadow-2xl backdrop-blur-md" aria-label="Solar System history">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xs uppercase text-muted-foreground">
            <History className="size-3.5" /> Solar System history
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">{formatAge(ageMa)}</p>
        </div>
        <Button
          size="icon"
          variant="secondary"
          aria-label="Return history to present day"
          onClick={() => updateAge(0)}
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>

      <Slider
        className="mt-4"
        aria-label="Age of the Solar System"
        min={0}
        max={100}
        step={0.1}
        value={[ageToHistorySlider(ageMa)]}
        onValueChange={([value]) => updateAge(historySliderToAge(value ?? 100))}
      />
      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
        <span>Formation · 4.568 Ga</span>
        <span>Today</span>
      </div>

      <div className="mt-3 border-l-2 border-primary pl-3">
        <p className="text-[11px] uppercase text-primary">{event.era}</p>
        <p className="mt-0.5 text-sm font-medium text-foreground">{event.title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{event.detail}</p>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
        Ancient orbital positions are a linked educational approximation.
      </p>
    </section>
  );
}