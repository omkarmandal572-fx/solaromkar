export type SolarHistoryEvent = {
  ageMa: number;
  title: string;
  detail: string;
};

export const SOLAR_SYSTEM_AGE_MA = 4568;

export const SOLAR_HISTORY: SolarHistoryEvent[] = [
  {
    ageMa: 4568,
    title: "Solar nebula collapses",
    detail: "The Sun and its protoplanetary disk begin forming.",
  },
  {
    ageMa: 4540,
    title: "Earth forms",
    detail: "Rocky material accretes into the young Earth.",
  },
  {
    ageMa: 4510,
    title: "Moon forms",
    detail: "A giant impact ejects material that becomes the Moon.",
  },
  {
    ageMa: 3900,
    title: "Heavy bombardment",
    detail: "Impacts reshape the surfaces of the inner worlds.",
  },
  {
    ageMa: 3700,
    title: "Early life",
    detail: "The oldest widely accepted evidence of life appears on Earth.",
  },
  {
    ageMa: 2400,
    title: "Great Oxidation",
    detail: "Atmospheric oxygen rises dramatically on Earth.",
  },
  {
    ageMa: 541,
    title: "Cambrian explosion",
    detail: "Animal life diversifies rapidly in Earth's oceans.",
  },
  {
    ageMa: 66,
    title: "Chicxulub impact",
    detail: "A mass extinction ends the age of non-avian dinosaurs.",
  },
  {
    ageMa: 0.3,
    title: "Homo sapiens",
    detail: "Modern humans appear in Africa.",
  },
  {
    ageMa: 0,
    title: "Present day",
    detail: "The Solar System is about 4.568 billion years old.",
  },
];

export function historySliderToAge(value: number) {
  if (value >= 100) return 0;
  const fraction = 1 - value / 100;
  return SOLAR_SYSTEM_AGE_MA * Math.pow(fraction, 3.25);
}

export function ageToHistorySlider(ageMa: number) {
  if (ageMa <= 0) return 100;
  return 100 * (1 - Math.pow(ageMa / SOLAR_SYSTEM_AGE_MA, 1 / 3.25));
}

export function nearestHistoryEvent(ageMa: number) {
  return SOLAR_HISTORY.reduce((nearest, event) =>
    Math.abs(event.ageMa - ageMa) < Math.abs(nearest.ageMa - ageMa)
      ? event
      : nearest,
  );
}