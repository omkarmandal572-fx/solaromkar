/**
 * Real texture files (diffuse / bump / roughness) hosted on the CDN.
 * Generated pointers live in src/assets/textures.
 */
import earth_jpg from "@/assets/textures/earth.jpg.asset.json";
import earth_bump_jpg from "@/assets/textures/earth_bump.jpg.asset.json";
import earth_rough_jpg from "@/assets/textures/earth_rough.jpg.asset.json";
import jupiter_jpg from "@/assets/textures/jupiter.jpg.asset.json";
import jupiter_ring_png from "@/assets/textures/jupiter_ring.png.asset.json";
import jupiter_rough_jpg from "@/assets/textures/jupiter_rough.jpg.asset.json";
import mars_jpg from "@/assets/textures/mars.jpg.asset.json";
import mars_bump_jpg from "@/assets/textures/mars_bump.jpg.asset.json";
import mars_rough_jpg from "@/assets/textures/mars_rough.jpg.asset.json";
import mercury_jpg from "@/assets/textures/mercury.jpg.asset.json";
import mercury_bump_jpg from "@/assets/textures/mercury_bump.jpg.asset.json";
import mercury_rough_jpg from "@/assets/textures/mercury_rough.jpg.asset.json";
import moon_jpg from "@/assets/textures/moon.jpg.asset.json";
import moon_bump_jpg from "@/assets/textures/moon_bump.jpg.asset.json";
import moon_rough_jpg from "@/assets/textures/moon_rough.jpg.asset.json";
import neptune_jpg from "@/assets/textures/neptune.jpg.asset.json";
import neptune_rough_jpg from "@/assets/textures/neptune_rough.jpg.asset.json";
import saturn_jpg from "@/assets/textures/saturn.jpg.asset.json";
import saturn_ring_png from "@/assets/textures/saturn_ring.png.asset.json";
import saturn_rough_jpg from "@/assets/textures/saturn_rough.jpg.asset.json";
import sun_jpg from "@/assets/textures/sun.jpg.asset.json";
import sun_rough_jpg from "@/assets/textures/sun_rough.jpg.asset.json";
import uranus_jpg from "@/assets/textures/uranus.jpg.asset.json";
import uranus_rough_jpg from "@/assets/textures/uranus_rough.jpg.asset.json";
import venus_jpg from "@/assets/textures/venus.jpg.asset.json";
import venus_bump_jpg from "@/assets/textures/venus_bump.jpg.asset.json";
import venus_rough_jpg from "@/assets/textures/venus_rough.jpg.asset.json";

export const TEX: Record<string, string> = {
  "earth.jpg": earth_jpg.url,
  "earth_bump.jpg": earth_bump_jpg.url,
  "earth_rough.jpg": earth_rough_jpg.url,
  "jupiter.jpg": jupiter_jpg.url,
  "jupiter_ring.png": jupiter_ring_png.url,
  "jupiter_rough.jpg": jupiter_rough_jpg.url,
  "mars.jpg": mars_jpg.url,
  "mars_bump.jpg": mars_bump_jpg.url,
  "mars_rough.jpg": mars_rough_jpg.url,
  "mercury.jpg": mercury_jpg.url,
  "mercury_bump.jpg": mercury_bump_jpg.url,
  "mercury_rough.jpg": mercury_rough_jpg.url,
  "moon.jpg": moon_jpg.url,
  "moon_bump.jpg": moon_bump_jpg.url,
  "moon_rough.jpg": moon_rough_jpg.url,
  "neptune.jpg": neptune_jpg.url,
  "neptune_rough.jpg": neptune_rough_jpg.url,
  "saturn.jpg": saturn_jpg.url,
  "saturn_ring.png": saturn_ring_png.url,
  "saturn_rough.jpg": saturn_rough_jpg.url,
  "sun.jpg": sun_jpg.url,
  "sun_rough.jpg": sun_rough_jpg.url,
  "uranus.jpg": uranus_jpg.url,
  "uranus_rough.jpg": uranus_rough_jpg.url,
  "venus.jpg": venus_jpg.url,
  "venus_bump.jpg": venus_bump_jpg.url,
  "venus_rough.jpg": venus_rough_jpg.url,
};

export const tex = (name: string) => TEX[name];
