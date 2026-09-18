import { DAY_MS, SIM_EPOCH_MS } from "@/components/solar/SimTime";

export const SYNODIC_MONTH_DAYS = 29.530588;
const KOLKATA_LATITUDE = 22.5726;
const KOLKATA_LONGITUDE = 88.3639;
const NEW_MOON_EPOCH_MS = Date.UTC(2026, 0, 18, 19, 52);

function positiveModulo(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

export type MoonPhase = {
  name: string;
  ageDays: number;
  illumination: number;
  angle: number;
};

export function moonPhaseAt(days: number): MoonPhase {
  const timestamp = SIM_EPOCH_MS + days * DAY_MS;
  const ageDays = positiveModulo(
    (timestamp - NEW_MOON_EPOCH_MS) / DAY_MS,
    SYNODIC_MONTH_DAYS,
  );
  const angle = (ageDays / SYNODIC_MONTH_DAYS) * Math.PI * 2;
  const illumination = (1 - Math.cos(angle)) / 2;
  const eighth = Math.round((ageDays / SYNODIC_MONTH_DAYS) * 8) % 8;
  const names = [
    "New Moon",
    "Waxing crescent",
    "First quarter",
    "Waxing gibbous",
    "Full Moon",
    "Waning gibbous",
    "Last quarter",
    "Waning crescent",
  ];

  return { name: names[eighth] ?? "New Moon", ageDays, illumination, angle };
}

export type EarthCycle = {
  solarTimeHours: number;
  solarElevationDegrees: number;
  dayState: "Daylight" | "Twilight" | "Night";
};

/** NOAA-style solar position approximation, sufficient to about one minute. */
export function earthCycleAt(days: number): EarthCycle {
  const date = new Date(SIM_EPOCH_MS + days * DAY_MS);
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const dayOfYear = (date.getTime() - start) / DAY_MS;
  const utcHours =
    date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  const gamma =
    (2 * Math.PI / 365) * (dayOfYear - 1 + (utcHours - 12) / 24);
  const equationOfTime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));
  const declination =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);
  const solarMinutes = positiveModulo(
    utcHours * 60 + equationOfTime + 4 * KOLKATA_LONGITUDE,
    1440,
  );
  const hourAngle = ((solarMinutes / 4 - 180) * Math.PI) / 180;
  const latitude = (KOLKATA_LATITUDE * Math.PI) / 180;
  const elevation = Math.asin(
    Math.sin(latitude) * Math.sin(declination) +
      Math.cos(latitude) * Math.cos(declination) * Math.cos(hourAngle),
  );
  const solarElevationDegrees = (elevation * 180) / Math.PI;

  return {
    solarTimeHours: solarMinutes / 60,
    solarElevationDegrees,
    dayState:
      solarElevationDegrees >= 0
        ? "Daylight"
        : solarElevationDegrees >= -18
          ? "Twilight"
          : "Night",
  };
}

export function formatSolarTime(hours: number) {
  const wholeHours = Math.floor(hours);
  const minutes = Math.floor((hours - wholeHours) * 60);
  return `${wholeHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}