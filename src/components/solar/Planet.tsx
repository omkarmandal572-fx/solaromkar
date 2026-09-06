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

      {planet.ring && <PlanetRing ring={planet.ring} paused={paused} />}

      {planet.moons?.map((m, i) => (
        <Moon key={m.id} moon={m} paused={paused} index={i} />
      ))}
    </group>
  );
}

function PlanetRing({
  ring,
  paused,
}: {
  ring: NonNullable<PlanetData["ring"]>;
  paused: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const map = useRingTexture(ring.color, ring.map);

  useFrame((_, rawDelta) => {
    if (paused || !ref.current) return;
    ref.current.rotation.z += Math.min(rawDelta, 0.05) * (ring.spinSpeed ?? 0.1);
  });

  return (
    <group rotation={[-Math.PI / 2.1, 0, 0]}>
      <mesh ref={ref} rotation={[0, 0, 0.15]}>
        <ringGeometry args={[ring.inner, ring.outer, 160, 1]} />
        <meshBasicMaterial
          map={map}
          color={ring.color}
          transparent
          opacity={ring.opacity ?? 0.55}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Moon({
  moon,
  paused,
  index,
}: {
  moon: MoonData;
  paused: boolean;
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = useRef(((index + 1) / 3) * Math.PI * 2 + Math.random());
  const { map, bumpMap } = usePlanetTextures(moon.palette, moon.textures, {
    bands: false,
    turbulence: 34,
  });

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!paused) {
      angle.current += delta * moon.orbitSpeed;
      if (meshRef.current)
        meshRef.current.rotation.y += delta * moon.rotationSpeed;
    }
    if (groupRef.current) {
      groupRef.current.position.set(
        Math.cos(angle.current) * moon.orbitRadius,
        Math.sin(angle.current) * moon.orbitRadius * Math.sin(moon.inclination),
        Math.sin(angle.current) * moon.orbitRadius,
      );
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <sphereGeometry args={[moon.radius, 32, 32]} />
          <meshStandardMaterial
            map={map}
            bumpMap={bumpMap ?? null}
            bumpScale={bumpMap ? 0.25 : 0}
            roughness={0.95}
            metalness={0.02}
          />
        </mesh>
      </group>
      <MoonOrbitPath radius={moon.orbitRadius} inclination={moon.inclination} />
    </>
  );
}

function MoonOrbitPath({
  radius,
  inclination,
}: {
  radius: number;
  inclination: number;
}) {
  const line = useMemo(() => {
    const points = Array.from({ length: 97 }, (_, i) => {
      const a = (i / 96) * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(a) * radius,
        Math.sin(a) * radius * Math.sin(inclination),
        Math.sin(a) * radius,
      );
    });
    return new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({
        color: "#9aa6c8",
        transparent: true,
        opacity: 0.12,
      }),
    );
  }, [radius, inclination]);

  return <primitive object={line} />;
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
