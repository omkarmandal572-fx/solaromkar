export type SolarHistoryEvent = {
  ageMa: number;
  title: string;
  detail: string;
  era: string;
};

export const SOLAR_SYSTEM_AGE_MA = 4568;

export const SOLAR_HISTORY: SolarHistoryEvent[] = [
  {
    ageMa: 4568,
    title: "Solar nebula collapses",
    detail: "A cloud of gas and dust collapses; calcium-aluminium inclusions record the Solar System's oldest dated solids.",
    era: "4.568 Ga",
  },
  {
    ageMa: 4567,
    title: "The Sun ignites",
    detail: "Fusion begins in the young Sun while worlds assemble in the surrounding protoplanetary disk.",
    era: "about 4.567 Ga",
  },
  {
    ageMa: 4543,
    title: "Earth accretes",
    detail: "Rocky planetesimals collide and combine into the early Earth; radiometric ages place formation near 4.54 billion years ago.",
    era: "about 4.54 Ga",
  },
  {
    ageMa: 4510,
    title: "Moon forms",
    detail: "A giant impact with the proto-planet Theia ejects material that gathers into the Moon.",
    era: "about 4.51 Ga",
  },
  {
    ageMa: 4400,
    title: "Crust and oceans",
    detail: "Ancient zircons indicate cool crust and liquid water existed on Earth by roughly 4.4 billion years ago.",
    era: "by 4.40 Ga",
  },
  {
    ageMa: 3900,
    title: "Heavy bombardment",
    detail: "Impacts reshape the surfaces of the inner worlds.",
    era: "about 4.1–3.8 Ga",
  },
  {
    ageMa: 3500,
    title: "Early microbial life",
    detail: "Stromatolites and chemical signatures preserve widely accepted evidence of life on early Earth.",
    era: "at least 3.5 Ga",
  },
  {
    ageMa: 2430,
    title: "Great Oxidation",
    detail: "Photosynthetic microbes drive a lasting rise of oxygen in Earth's atmosphere and oceans.",
    era: "about 2.43–2.22 Ga",
  },
  {
    ageMa: 635,
    title: "Complex animal life",
    detail: "Ediacaran ecosystems contain large, complex multicellular organisms before the Cambrian radiation.",
    era: "635–539 Ma",
  },
  {
    ageMa: 538.8,
    title: "Cambrian explosion",
    detail: "Animal life diversifies rapidly in Earth's oceans.",
    era: "538.8 Ma",
  },
  {
    ageMa: 66,
    title: "Chicxulub impact",
    detail: "A mass extinction ends the age of non-avian dinosaurs.",
    era: "66 Ma",
  },
  {
    ageMa: 0.3,
    title: "Homo sapiens",
    detail: "Modern humans appear in Africa.",
    era: "about 300 ka",
  },
  {
    ageMa: 0,
    title: "Present day",
    detail: "The Solar System is about 4.568 billion years old.",
    era: "Today",
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
  const descending = SOLAR_HISTORY;
  for (let index = 0; index < descending.length - 1; index += 1) {
    const older = descending[index];
    const younger = descending[index + 1];
    if (!older || !younger) continue;
    const midpoint = (older.ageMa + younger.ageMa) / 2;
    if (ageMa >= midpoint) return older;
  }
  return descending[descending.length - 1] ?? SOLAR_HISTORY[0];
}