import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useSim } from "./SimTime";

const EPOCH = new Date(Date.UTC(2026, 0, 1));

export function TimeControls() {
  const { rate, setRate, running, setRunning, getDays } = useSim();
  const [days, setDays] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setDays(getDays()), 120);
    return () => window.clearInterval(id);
  }, [getDays]);

  const date = new Date(EPOCH.getTime() + days * 86_400_000);

  return (
    <div className="pointer-events-auto w-[min(92vw,26rem)] rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Mission clock
          </p>
          <p className="text-sm font-medium text-foreground">
            Day {Math.floor(days).toLocaleString()} ·{" "}
            {date.toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            })}
          </p>
        </div>
        <Button
          size="icon"
          variant="secondary"
          aria-label={running ? "Pause time" : "Resume time"}
          onClick={() => setRunning(!running)}
        >
          {running ? <Pause className="size-4" /> : <Play className="size-4" />}
        </Button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Speed</span>
          <span className="tabular-nums text-foreground">
            {rate.toFixed(rate < 1 ? 2 : 1)} days / second
          </span>
        </div>
        <Slider
          className="mt-2"
          aria-label="Days per second"
          min={0.25}
          max={60}
          step={0.25}
          value={[rate]}
          onValueChange={([v]) => setRate(v ?? 1)}
        />
      </div>
    </div>
  );
}
