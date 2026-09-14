import { useMemo } from "react";
import * as THREE from "three";
import { BRIGHT_STARS } from "@/data/brightStars";
import { raDecToVector } from "@/data/constellations";

const SKY_RADIUS = 310;

function StarLayer({ min, max, size }: { min: number; max: number; size: number }) {
  const points = useMemo(() => {
    const positions = BRIGHT_STARS.filter(
      ([, , magnitude]) => magnitude >= min && magnitude < max,
    ).map(([ra, dec]) => new THREE.Vector3(...raDecToVector(ra, dec, SKY_RADIUS)));
    const geometry = new THREE.BufferGeometry().setFromPoints(positions);
    const material = new THREE.PointsMaterial({
      color: new THREE.Color("#eef5ff"),
      size,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    return new THREE.Points(geometry, material);
  }, [max, min, size]);

  return <primitive object={points} />;
}

/** Magnitude-limited HYG v4.1 sky, with J2000 positions and proper-motion data. */
export function BrightStarField() {
  return (
    <group>
      <StarLayer min={-2} max={1.5} size={3.2} />
      <StarLayer min={1.5} max={3.5} size={2.1} />
      <StarLayer min={3.5} max={5.6} size={1.15} />
    </group>
  );
}