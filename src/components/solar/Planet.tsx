import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { PlanetData } from "@/data/planets";
import { usePlanetTextures } from "./usePlanetMaterial";

type Props = {
  planet: PlanetData;
  paused: boolean;
  selected: boolean;
  dimmed: boolean;
  onSelect: (id: string) => void;
  /** called every frame with the planet's world position */
  registerPosition: (id: string, pos: THREE.Vector3) => void;
};

export function Planet({
  planet,
  paused,
  selected,
  dimmed,
  onSelect,
  registerPosition,
}: Props) {
  const orbitRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = useRef(Math.random() * Math.PI * 2);
  const [hovered, setHovered] = useState(false);

  const { map, bumpMap, roughnessMap } = usePlanetTextures(
    planet.palette,
    planet.textures,
    { bands: planet.type !== "Terrestrial planet" },
  );

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!paused) {
      angle.current += delta * planet.orbitSpeed * 0.25;
      if (meshRef.current)
        meshRef.current.rotation.y += delta * planet.rotationSpeed;
    }
    if (orbitRef.current) {
      orbitRef.current.position.set(
        Math.cos(angle.current) * planet.orbitRadius,
        Math.sin(angle.current) * planet.orbitRadius * Math.sin(planet.inclination),
        Math.sin(angle.current) * planet.orbitRadius,
      );
      registerPosition(planet.id, orbitRef.current.position);
    }
  });

  const emphasis = selected || hovered;

  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onPointerDown={(e) => {
          e.stopPropagation();
          onSelect(planet.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[planet.radius, 64, 64]} />
        <meshStandardMaterial
          map={map}
          bumpMap={bumpMap ?? null}
          bumpScale={bumpMap ? 0.35 : 0}
          roughnessMap={roughnessMap ?? null}
          roughness={roughnessMap ? 1 : 0.85}
          metalness={0.05}
          opacity={dimmed ? 0.55 : 1}
          transparent={dimmed}
        />
      </mesh>

      {/* hover / selection halo */}
      <mesh scale={planet.radius * (emphasis ? 1.12 : 1.06)}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color={planet.palette[0]}
          transparent
          opacity={emphasis ? 0.22 : 0.0}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {planet.ring && (
        <mesh rotation={[-Math.PI / 2.1, 0.15, 0]}>
          <ringGeometry args={[planet.ring.inner, planet.ring.outer, 128]} />
          <meshBasicMaterial
            color={planet.ring.color}
            transparent
            opacity={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

export function OrbitPath({ radius }: { radius: number }) {
  const line = useMemo(() => {
    const points = Array.from({ length: 129 }, (_, i) => {
      const a = (i / 128) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius);
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: "#7d8bb5",
      transparent: true,
      opacity: 0.22,
    });
    return new THREE.Line(geometry, material);
  }, [radius]);

  return <primitive object={line} />;
}
