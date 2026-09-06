import { useFrame } from "@react-three/fiber";
import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type SimState = {
  /** Elapsed simulated days (mutable ref so the 3D scene reads it per frame) */
  days: React.MutableRefObject<number>;
  /** Simulated days advanced per real second */
  rate: number;
  setRate: (v: number) => void;
  running: boolean;
  setRunning: (v: boolean) => void;
  /** Subscribe-free read for UI that polls on a timer */
  getDays: () => number;
};

const SimContext = createContext<SimState | null>(null);

export function useSim() {
  const ctx = useContext(SimContext);
  if (!ctx) throw new Error("useSim must be used inside <SimProvider>");
  return ctx;
}

export function SimProvider({ children }: { children: ReactNode }) {
  const days = useRef(0);
  const [rate, setRate] = useState(5);
  const [running, setRunning] = useState(true);

  const value = useMemo<SimState>(
    () => ({
      days,
      rate,
      setRate,
      running,
      setRunning,
      getDays: () => days.current,
    }),
    [rate, running],
  );

  return <SimContext.Provider value={value}>{children}</SimContext.Provider>;
}

/** Lives inside the Canvas: advances the shared clock at a constant rate. */
export function SimClock({ frozen }: { frozen: boolean }) {
  const { days, rate, running } = useSim();
  useFrame((_, rawDelta) => {
    if (frozen || !running) return;
    days.current += Math.min(rawDelta, 0.05) * rate;
  });
  return null;
}

/** Orbital revolutions per simulated day, derived from the relative speeds. */
export const ORBIT_REVS_PER_DAY = 1 / 365;
export const SPIN_REVS_PER_DAY = 3;
export const MOON_REVS_PER_DAY = 1 / 20;
