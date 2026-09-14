import { Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CONSTELLATIONS, raDecToVector } from "@/data/constellations";
import { useSim } from "./SimTime";

const SPHERE = 300;
const KOLKATA_LATITUDE = THREE.MathUtils.degToRad(22.5726);
const KOLKATA_LONGITUDE = 88.3639;
const EPOCH_JULIAN_DATE = 2461041.5;

function localSiderealRadians(simulatedDays: number) {
  const jd = EPOCH_JULIAN_DATE + simulatedDays;
  const centuries = (jd - 2451545.0) / 36525;
  const gmst =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * centuries * centuries -
    (centuries * centuries * centuries) / 38710000;
  const degrees = ((gmst + KOLKATA_LONGITUDE) % 360 + 360) % 360;
  return THREE.MathUtils.degToRad(degrees);
}

function Figure({
  constellation,
  showLabels,
}: {
  constellation: (typeof CONSTELLATIONS)[number];
  showLabels: boolean;
}) {
  const { lines, points, centre } = useMemo(() => {
    const positions = constellation.stars.map((s) =>
      new THREE.Vector3(...raDecToVector(s.ra, s.dec, SPHERE)),
    );

    const segments: THREE.Vector3[] = [];
    for (const [a, b] of constellation.lines) {
      const pa = positions[a];
      const pb = positions[b];
      if (pa && pb) segments.push(pa, pb);
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints(segments);
    const lineObj = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({
        color: "#8fb2ff",
        transparent: true,
        opacity: 0.4,
      }),
    );

    const starGeo = new THREE.BufferGeometry().setFromPoints(positions);
    starGeo.setAttribute(
      "size",
      new THREE.Float32BufferAttribute(
        constellation.stars.map((s) => Math.max(1.6, 6 - s.mag)),
        1,
      ),
    );
    const starObj = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        color: "#eaf1ff",
        size: 3.4,
        sizeAttenuation: false,
        transparent: true,
        opacity: 0.95,
      }),
    );

    const mid = positions
      .reduce((acc, p) => acc.add(p), new THREE.Vector3())
      .divideScalar(Math.max(1, positions.length));

    return { lines: lineObj, points: starObj, centre: mid };
  }, [constellation]);

  return (
    <group>
      <primitive object={lines} />
      <primitive object={points} />
      {showLabels && (
        <Html
          position={centre}
          center
          zIndexRange={[5, 0]}
          style={{ pointerEvents: "none" }}
        >
          <span className="whitespace-nowrap rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[11px] uppercase tracking-[0.18em] text-sky-200/80 backdrop-blur-sm">
            {constellation.name}
          </span>
        </Html>
      )}
    </group>
  );
}

export function Constellations({
  visible,
  showLabels,
}: {
  visible: boolean;
  showLabels: boolean;
}) {
  const skyRef = useRef<THREE.Group>(null);
  const { days } = useSim();

  useFrame(() => {
    if (!skyRef.current) return;
    skyRef.current.rotation.set(
      KOLKATA_LATITUDE - Math.PI / 2,
      -localSiderealRadians(days.current),
      0,
    );
  });

  if (!visible) return null;
  return (
    <group ref={skyRef}>
      {CONSTELLATIONS.map((c) => (
        <Figure key={c.id} constellation={c} showLabels={showLabels} />
      ))}
    </group>
  );
}
