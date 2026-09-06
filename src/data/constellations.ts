/**
 * Named constellations placed on the celestial sphere.
 * Star positions are right ascension (hours) / declination (degrees),
 * approximated from the bright stars of each figure. Lines join the stars
 * in the traditional stick-figure pattern.
 */
export type ConstellationStar = {
  name?: string;
  /** Right ascension in hours (0-24) */
  ra: number;
  /** Declination in degrees (-90..90) */
  dec: number;
  /** Apparent magnitude — smaller is brighter */
  mag: number;
};

export type Constellation = {
  id: string;
  name: string;
  stars: ConstellationStar[];
  /** Index pairs into `stars` describing the figure's lines */
  lines: [number, number][];
};

export const CONSTELLATIONS: Constellation[] = [
  {
    id: "orion",
    name: "Orion",
    stars: [
      { name: "Betelgeuse", ra: 5.92, dec: 7.4, mag: 0.5 },
      { name: "Bellatrix", ra: 5.42, dec: 6.35, mag: 1.6 },
      { name: "Alnitak", ra: 5.68, dec: -1.94, mag: 1.7 },
      { name: "Alnilam", ra: 5.6, dec: -1.2, mag: 1.7 },
      { name: "Mintaka", ra: 5.53, dec: -0.3, mag: 2.2 },
      { name: "Saiph", ra: 5.8, dec: -9.67, mag: 2.1 },
      { name: "Rigel", ra: 5.24, dec: -8.2, mag: 0.1 },
    ],
    lines: [
      [0, 1],
      [1, 4],
      [4, 3],
      [3, 2],
      [2, 0],
      [2, 5],
      [4, 6],
      [5, 6],
    ],
  },
  {
    id: "ursa-major",
    name: "Ursa Major",
    stars: [
      { name: "Dubhe", ra: 11.06, dec: 61.75, mag: 1.8 },
      { name: "Merak", ra: 11.03, dec: 56.38, mag: 2.4 },
      { name: "Phecda", ra: 11.9, dec: 53.7, mag: 2.4 },
      { name: "Megrez", ra: 12.26, dec: 57.03, mag: 3.3 },
      { name: "Alioth", ra: 12.9, dec: 55.96, mag: 1.8 },
      { name: "Mizar", ra: 13.4, dec: 54.93, mag: 2.2 },
      { name: "Alkaid", ra: 13.79, dec: 49.31, mag: 1.9 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [3, 4],
      [4, 5],
      [5, 6],
    ],
  },
  {
    id: "cassiopeia",
    name: "Cassiopeia",
    stars: [
      { name: "Caph", ra: 0.15, dec: 59.15, mag: 2.3 },
      { name: "Schedar", ra: 0.68, dec: 56.54, mag: 2.2 },
      { name: "Gamma Cas", ra: 0.95, dec: 60.72, mag: 2.5 },
      { name: "Ruchbah", ra: 1.43, dec: 60.24, mag: 2.7 },
      { name: "Segin", ra: 1.9, dec: 63.67, mag: 3.4 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  {
    id: "cygnus",
    name: "Cygnus",
    stars: [
      { name: "Deneb", ra: 20.69, dec: 45.28, mag: 1.3 },
      { name: "Sadr", ra: 20.37, dec: 40.26, mag: 2.2 },
      { name: "Gienah", ra: 20.77, dec: 33.97, mag: 2.5 },
      { name: "Delta Cyg", ra: 19.75, dec: 45.13, mag: 2.9 },
      { name: "Albireo", ra: 19.51, dec: 27.96, mag: 3.1 },
    ],
    lines: [
      [0, 1],
      [1, 4],
      [1, 2],
      [1, 3],
    ],
  },
  {
    id: "leo",
    name: "Leo",
    stars: [
      { name: "Regulus", ra: 10.14, dec: 11.97, mag: 1.4 },
      { name: "Denebola", ra: 11.82, dec: 14.57, mag: 2.1 },
      { name: "Algieba", ra: 10.33, dec: 19.84, mag: 2.1 },
      { name: "Zosma", ra: 11.24, dec: 20.52, mag: 2.6 },
      { name: "Chort", ra: 11.24, dec: 15.43, mag: 3.3 },
      { name: "Adhafera", ra: 10.28, dec: 23.42, mag: 3.4 },
    ],
    lines: [
      [0, 2],
      [2, 5],
      [5, 3],
      [3, 1],
      [1, 4],
      [4, 0],
    ],
  },
  {
    id: "scorpius",
    name: "Scorpius",
    stars: [
      { name: "Antares", ra: 16.49, dec: -26.43, mag: 1.1 },
      { name: "Graffias", ra: 16.09, dec: -19.8, mag: 2.6 },
      { name: "Dschubba", ra: 16.0, dec: -22.62, mag: 2.3 },
      { name: "Sigma Sco", ra: 16.35, dec: -25.59, mag: 2.9 },
      { name: "Sargas", ra: 17.62, dec: -43.0, mag: 1.9 },
      { name: "Shaula", ra: 17.56, dec: -37.1, mag: 1.6 },
    ],
    lines: [
      [1, 2],
      [2, 3],
      [3, 0],
      [0, 4],
      [4, 5],
    ],
  },
  {
    id: "lyra",
    name: "Lyra",
    stars: [
      { name: "Vega", ra: 18.62, dec: 38.78, mag: 0.0 },
      { name: "Epsilon Lyr", ra: 18.74, dec: 39.6, mag: 4.3 },
      { name: "Sheliak", ra: 18.83, dec: 33.36, mag: 3.5 },
      { name: "Sulafat", ra: 18.98, dec: 32.69, mag: 3.2 },
      { name: "Delta Lyr", ra: 18.9, dec: 36.9, mag: 4.2 },
    ],
    lines: [
      [0, 1],
      [0, 4],
      [4, 3],
      [3, 2],
      [2, 0],
    ],
  },
  {
    id: "taurus",
    name: "Taurus",
    stars: [
      { name: "Aldebaran", ra: 4.6, dec: 16.51, mag: 0.9 },
      { name: "Elnath", ra: 5.44, dec: 28.61, mag: 1.7 },
      { name: "Alcyone", ra: 3.79, dec: 24.11, mag: 2.9 },
      { name: "Theta Tau", ra: 4.48, dec: 15.87, mag: 3.4 },
      { name: "Zeta Tau", ra: 5.63, dec: 21.14, mag: 3.0 },
    ],
    lines: [
      [2, 3],
      [3, 0],
      [0, 1],
      [0, 4],
    ],
  },
  {
    id: "crux",
    name: "Crux",
    stars: [
      { name: "Acrux", ra: 12.44, dec: -63.1, mag: 0.8 },
      { name: "Mimosa", ra: 12.79, dec: -59.69, mag: 1.3 },
      { name: "Gacrux", ra: 12.52, dec: -57.11, mag: 1.6 },
      { name: "Imai", ra: 12.25, dec: -58.75, mag: 2.8 },
    ],
    lines: [
      [0, 2],
      [1, 3],
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    stars: [
      { name: "Pollux", ra: 7.76, dec: 28.03, mag: 1.1 },
      { name: "Castor", ra: 7.58, dec: 31.89, mag: 1.6 },
      { name: "Alhena", ra: 6.63, dec: 16.4, mag: 1.9 },
      { name: "Wasat", ra: 7.34, dec: 21.98, mag: 3.5 },
      { name: "Mebsuta", ra: 6.73, dec: 25.13, mag: 3.0 },
    ],
    lines: [
      [1, 0],
      [0, 3],
      [3, 2],
      [1, 4],
      [4, 2],
    ],
  },
];

/** Convert RA (hours) / Dec (degrees) to a point on a sphere of `radius`. */
export function raDecToVector(ra: number, dec: number, radius: number) {
  const raRad = (ra / 24) * Math.PI * 2;
  const decRad = (dec * Math.PI) / 180;
  return [
    radius * Math.cos(decRad) * Math.cos(raRad),
    radius * Math.sin(decRad),
    radius * Math.cos(decRad) * Math.sin(raRad),
  ] as [number, number, number];
}
