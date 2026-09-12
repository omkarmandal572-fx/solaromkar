import { Html } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { CONSTELLATIONS, raDecToVector } from "@/data/constellations";

const SPHERE = 300;

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
  if (!visible) return null;
  return (
    <group>
      {CONSTELLATIONS.map((c) => (
        <Figure key={c.id} constellation={c} showLabels={showLabels} />
      ))}
    </group>
  );
}
