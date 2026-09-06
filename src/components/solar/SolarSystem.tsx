import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Suspense, useCallback, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { PLANETS } from "@/data/planets";
import { Sun } from "./Sun";
import { Planet, OrbitPath } from "./Planet";
import { PlanetCard } from "./PlanetCard";

const DEFAULT_CAM = new THREE.Vector3(0, 42, 78);

type PositionMap = Map<string, THREE.Vector3>;

function CameraRig({
  selectedId,
  positions,
  controls,
}: {
  selectedId: string | null;
  positions: React.RefObject<PositionMap>;
  controls: React.RefObject<OrbitControlsImpl | null>;
}) {
  const { camera } = useThree();
  const desiredPos = useRef(new THREE.Vector3().copy(DEFAULT_CAM));
  const desiredTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const planet = PLANETS.find((p) => p.id === selectedId);

    if (planet) {
      const pos = positions.current?.get(planet.id);
      if (pos) {
        const offsetDir = new THREE.Vector3(pos.x, pos.y + planet.radius * 2.2, pos.z)
          .normalize()
          .multiplyScalar(planet.radius * 6 + 3);
        desiredTarget.current.copy(pos);
        desiredPos.current.copy(pos).add(offsetDir);
      }
    } else {
      desiredPos.current.copy(DEFAULT_CAM);
      desiredTarget.current.set(0, 0, 0);
    }

    const k = 1 - Math.exp(-3 * delta);
    camera.position.lerp(desiredPos.current, k);
    if (controls.current) {
      controls.current.target.lerp(desiredTarget.current, k);
      controls.current.update();
    }
  });

  return null;
}

export function SolarSystem() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const positions = useRef<PositionMap>(new Map());
  const controls = useRef<OrbitControlsImpl | null>(null);

  const registerPosition = useCallback((id: string, pos: THREE.Vector3) => {
    const map = positions.current;
    const existing = map.get(id);
    if (existing) existing.copy(pos);
    else map.set(id, pos.clone());
  }, []);

  const selected = PLANETS.find((p) => p.id === selectedId) ?? null;

  return (
    <div className="fixed inset-0 bg-background">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 42, 78], fov: 55, near: 0.1, far: 2000 }}
        onPointerMissed={() => setSelectedId(null)}
      >
        <color attach="background" args={["#04060f"]} />
        <ambientLight intensity={0.14} color="#9fb4ff" />
        <hemisphereLight args={["#2b3a6b", "#05060c", 0.18]} />

        <Stars radius={320} depth={90} count={7000} factor={5} saturation={0} fade speed={0.4} />

        <Suspense fallback={null}>
          <Sun paused={!!selectedId} />
          {PLANETS.map((planet) => (
            <group key={planet.id}>
              <OrbitPath radius={planet.orbitRadius} />
              <Planet
                planet={planet}
                paused={!!selectedId}
                selected={selectedId === planet.id}
                dimmed={!!selectedId && selectedId !== planet.id}
                onSelect={setSelectedId}
                registerPosition={registerPosition}
              />
            </group>
          ))}
        </Suspense>

        <CameraRig selectedId={selectedId} positions={positions} controls={controls} />
        <OrbitControls
          ref={controls}
          enablePan
          enableZoom
          enableRotate
          minDistance={4}
          maxDistance={220}
          dampingFactor={0.08}
        />
      </Canvas>

      {!selected && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-6 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            The Solar System
          </h1>
          <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
            Drag to orbit, scroll or pinch to zoom, and tap any planet to fly in and
            read its story.
          </p>
        </div>
      )}

      {selected && (
        <PlanetCard planet={selected} onBack={() => setSelectedId(null)} />
      )}
    </div>
  );
}
