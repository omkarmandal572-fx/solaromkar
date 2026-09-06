/**
 * Flip to true once you have dropped your real texture files into
 * /public/textures (the paths below). While false the app uses its built-in
 * procedural textures and never requests the placeholder files.
 */
export const USE_TEXTURE_FILES = false;

export type PlanetTextures = {
  /** Drop your own files in /public/textures and point these at them. */
  map?: string;
  bumpMap?: string;
  roughnessMap?: string;
};

export type MoonData = {
  id: string;
  name: string;
  /** Visual radius (not to scale) */
  radius: number;
  /** Distance from its planet's centre */
  orbitRadius: number;
  /** Orbit speed multiplier */
  orbitSpeed: number;
  /** Self rotation speed */
  rotationSpeed: number;
  /** Orbital tilt in radians */
  inclination: number;
  palette: [string, string, string];
  textures: PlanetTextures;
};

export type PlanetData = {
  id: string;
  name: string;
  type: string;
  mass: string;
  distanceFromSun: string;
  funFact: string;
  /** Visual radius (not to scale) */
  radius: number;
  /** Visual orbit radius (compressed) */
  orbitRadius: number;
  /** Orbit speed multiplier (sped up) */
  orbitSpeed: number;
  /** Self rotation speed */
  rotationSpeed: number;
  /** Orbital inclination in radians, for a less flat system */
  inclination: number;
  /** Base colors used by the procedural fallback texture */
  palette: [string, string, string];
  ring?: {
    inner: number;
    outer: number;
    color: string;
    /** Ring spin speed (rings are not solid, so they drift) */
    spinSpeed?: number;
    opacity?: number;
    /** Optional real ring texture (with alpha) */
    map?: string;
  };
  moons?: MoonData[];
  textures: PlanetTextures;
};

export const SUN = {
  name: "Sun",
  radius: 5,
  palette: ["#fff3b0", "#ffb703", "#fb5607"] as [string, string, string],
  textures: {
    map: "/textures/sun.jpg",
  } satisfies PlanetTextures,
};

export const PLANETS: PlanetData[] = [
  {
    id: "mercury",
    name: "Mercury",
    type: "Terrestrial planet",
    mass: "3.30 × 10²³ kg (0.055 Earths)",
    distanceFromSun: "57.9 million km (0.39 AU)",
    funFact:
      "A single day on Mercury lasts about 176 Earth days — longer than its own year.",
    radius: 0.6,
    orbitRadius: 9,
    orbitSpeed: 1.6,
    rotationSpeed: 0.05,
    inclination: 0.12,
    palette: ["#9c948c", "#6f665f", "#403b37"],
    textures: {
      map: "/textures/mercury.jpg",
      bumpMap: "/textures/mercury_bump.jpg",
      roughnessMap: "/textures/mercury_rough.jpg",
    },
  },
  {
    id: "venus",
    name: "Venus",
    type: "Terrestrial planet",
    mass: "4.87 × 10²⁴ kg (0.815 Earths)",
    distanceFromSun: "108.2 million km (0.72 AU)",
    funFact:
      "Venus spins backwards, and its thick clouds trap enough heat to melt lead.",
    radius: 0.95,
    orbitRadius: 13,
    orbitSpeed: 1.18,
    rotationSpeed: -0.02,
    inclination: 0.06,
    palette: ["#f6dcae", "#d9a45b", "#8d5524"],
    textures: {
      map: "/textures/venus.jpg",
      bumpMap: "/textures/venus_bump.jpg",
      roughnessMap: "/textures/venus_rough.jpg",
    },
  },
  {
    id: "earth",
    name: "Earth",
    type: "Terrestrial planet",
    mass: "5.97 × 10²⁴ kg",
    distanceFromSun: "149.6 million km (1 AU)",
    funFact:
      "Earth is the only planet where water is stable as liquid, ice and vapour at the same time.",
    radius: 1,
    orbitRadius: 18,
    orbitSpeed: 1,
    rotationSpeed: 0.35,
    inclination: 0.02,
    palette: ["#2b6cb0", "#3f9b6d", "#f2f6ff"],
    textures: {
      map: "/textures/earth.jpg",
      bumpMap: "/textures/earth_bump.jpg",
      roughnessMap: "/textures/earth_rough.jpg",
    },
  },
  {
    id: "mars",
    name: "Mars",
    type: "Terrestrial planet",
    mass: "6.42 × 10²³ kg (0.107 Earths)",
    distanceFromSun: "227.9 million km (1.52 AU)",
    funFact:
      "Olympus Mons on Mars is the tallest volcano in the solar system — nearly three times Everest.",
    radius: 0.75,
    orbitRadius: 23,
    orbitSpeed: 0.8,
    rotationSpeed: 0.33,
    inclination: 0.09,
    palette: ["#e2795a", "#a8452c", "#5e2618"],
    textures: {
      map: "/textures/mars.jpg",
      bumpMap: "/textures/mars_bump.jpg",
      roughnessMap: "/textures/mars_rough.jpg",
    },
  },
  {
    id: "jupiter",
    name: "Jupiter",
    type: "Gas giant",
    mass: "1.90 × 10²⁷ kg (318 Earths)",
    distanceFromSun: "778.5 million km (5.2 AU)",
    funFact:
      "The Great Red Spot is a storm wider than Earth that has raged for centuries.",
    radius: 2.6,
    orbitRadius: 31,
    orbitSpeed: 0.44,
    rotationSpeed: 0.8,
    inclination: 0.03,
    palette: ["#e8cdaa", "#c08552", "#7a4b28"],
    ring: {
      inner: 3.3,
      outer: 4.3,
      color: "#c9a27a",
      opacity: 0.28,
      spinSpeed: 0.22,
      map: "/textures/jupiter_ring.png",
    },
    textures: {
      map: "/textures/jupiter.jpg",
      bumpMap: "/textures/jupiter_bump.jpg",
      roughnessMap: "/textures/jupiter_rough.jpg",
    },
  },
  {
    id: "saturn",
    name: "Saturn",
    type: "Gas giant",
    mass: "5.68 × 10²⁶ kg (95 Earths)",
    distanceFromSun: "1.43 billion km (9.5 AU)",
    funFact:
      "Saturn is so light for its size that it would float in a big enough ocean.",
    radius: 2.2,
    orbitRadius: 40,
    orbitSpeed: 0.32,
    rotationSpeed: 0.7,
    inclination: 0.05,
    palette: ["#f5e3ba", "#d8b46a", "#9b7c42"],
    ring: {
      inner: 3,
      outer: 5.2,
      color: "#e6d3a3",
      opacity: 0.7,
      spinSpeed: 0.12,
      map: "/textures/saturn_ring.png",
    },
    textures: {
      map: "/textures/saturn.jpg",
      bumpMap: "/textures/saturn_bump.jpg",
      roughnessMap: "/textures/saturn_rough.jpg",
    },
  },
  {
    id: "uranus",
    name: "Uranus",
    type: "Ice giant",
    mass: "8.68 × 10²⁵ kg (14.5 Earths)",
    distanceFromSun: "2.87 billion km (19.2 AU)",
    funFact:
      "Uranus rolls along its orbit on its side, tipped over by about 98 degrees.",
    radius: 1.6,
    orbitRadius: 48,
    orbitSpeed: 0.23,
    rotationSpeed: -0.5,
    inclination: 0.08,
    palette: ["#cfeff2", "#8fd0dd", "#4f8fa6"],
    textures: {
      map: "/textures/uranus.jpg",
      bumpMap: "/textures/uranus_bump.jpg",
      roughnessMap: "/textures/uranus_rough.jpg",
    },
  },
  {
    id: "neptune",
    name: "Neptune",
    type: "Ice giant",
    mass: "1.02 × 10²⁶ kg (17 Earths)",
    distanceFromSun: "4.50 billion km (30.1 AU)",
    funFact:
      "Neptune has the fastest winds in the solar system, reaching about 2,100 km/h.",
    radius: 1.55,
    orbitRadius: 56,
    orbitSpeed: 0.18,
    rotationSpeed: 0.48,
    inclination: 0.04,
    palette: ["#9dc4ff", "#3f6fd8", "#1b2f6b"],
    textures: {
      map: "/textures/neptune.jpg",
      bumpMap: "/textures/neptune_bump.jpg",
      roughnessMap: "/textures/neptune_rough.jpg",
    },
  },
];

const rock = (i: number): [string, string, string] =>
  (
    [
      ["#c9c4bd", "#8d867e", "#514b46"],
      ["#b9c2cc", "#7c848d", "#464d55"],
      ["#d8cbb4", "#a08f74", "#5e5340"],
      ["#bfae9d", "#8a7767", "#4d4238"],
    ] as [string, string, string][]
  )[i % 4]!;

const moon = (
  planetId: string,
  name: string,
  radius: number,
  orbitRadius: number,
  orbitSpeed: number,
  inclination: number,
  i: number,
): MoonData => ({
  id: `${planetId}-${name.toLowerCase().replace(/\s+/g, "-")}`,
  name,
  radius,
  orbitRadius,
  orbitSpeed,
  rotationSpeed: 0.12 + i * 0.03,
  inclination,
  palette: rock(i),
  textures: { map: `/textures/moons/${name.toLowerCase()}.jpg` },
});

const MOONS: Record<string, MoonData[]> = {
  earth: [moon("earth", "Moon", 0.27, 2.1, 1.5, 0.09, 0)],
  mars: [
    moon("mars", "Phobos", 0.11, 1.4, 3.1, 0.05, 1),
    moon("mars", "Deimos", 0.08, 2.0, 2.1, 0.18, 2),
  ],
  jupiter: [
    moon("jupiter", "Io", 0.26, 5.0, 2.4, 0.04, 0),
    moon("jupiter", "Europa", 0.23, 6.0, 1.8, 0.1, 1),
    moon("jupiter", "Ganymede", 0.36, 7.1, 1.3, 0.06, 2),
    moon("jupiter", "Callisto", 0.33, 8.3, 0.95, 0.14, 3),
  ],
  saturn: [
    moon("saturn", "Titan", 0.34, 6.4, 1.2, 0.07, 2),
    moon("saturn", "Rhea", 0.17, 7.6, 0.9, 0.16, 0),
    moon("saturn", "Enceladus", 0.12, 5.8, 1.9, 0.05, 1),
  ],
  uranus: [
    moon("uranus", "Titania", 0.2, 4.2, 1.4, 0.6, 1),
    moon("uranus", "Oberon", 0.18, 5.1, 1.05, 0.66, 3),
  ],
  neptune: [
    moon("neptune", "Triton", 0.24, 4.0, -1.5, 0.35, 1),
    moon("neptune", "Nereid", 0.1, 5.4, 0.8, 0.2, 2),
  ],
};

for (const planet of PLANETS) {
  planet.moons = MOONS[planet.id] ?? [];
}
