import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Suspense, useCallback, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Sparkles, Tags } from "lucide-react";
import { PLANETS } from "@/data/planets";
import { Button } from "@/components/ui/button";
import { Sun } from "./Sun";
import { Planet, OrbitPath } from "./Planet";
import { PlanetCard } from "./PlanetCard";
import { Constellations } from "./Constellations";
import { TimeControls } from "./TimeControls";
import { PlanetMenu } from "./PlanetMenu";
import { SimClock, SimProvider } from "./SimTime";

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
        // Frame the planet from its sunlit side, slightly above and to the side.
        const toSun = pos.clone().normalize().negate();
        const up = new THREE.Vector3(0, 1, 0);
        const tangent = new THREE.Vector3().crossVectors(up, toSun).normalize();
        const offsetDir = toSun
          .multiplyScalar(0.85)
          .add(tangent.multiplyScalar(0.9))
          .add(up.multiplyScalar(0.45))
          .normalize()
          .multiplyScalar(planet.radius * 6.5 + 4);
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
  const [showConstellations, setShowConstellations] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
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
    <SimProvider>
      <div className="fixed inset-0 bg-background">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 42, 78], fov: 55, near: 0.1, far: 2000 }}
          onPointerMissed={() => setSelectedId(null)}
        >
          <color attach="background" args={["#04060f"]} />
          <ambientLight intensity={0.22} color="#9fb4ff" />
          <hemisphereLight args={["#2b3a6b", "#05060c", 0.18]} />

          <Stars
            radius={320}
            depth={90}
            count={7000}
            factor={5}
            saturation={0}
            fade
            speed={0.4}
          />
          <Constellations
            visible={showConstellations}
            showLabels={showConstellations && showLabels}
          />

          <SimClock frozen={false} />

          <Suspense fallback={null}>
            <Sun />
            {PLANETS.map((planet) => (
              <group key={planet.id}>
                <OrbitPath radius={planet.orbitRadius} />
                <Planet
                  planet={planet}
                  selected={selectedId === planet.id}
                  dimmed={!!selectedId && selectedId !== planet.id}
                  onSelect={setSelectedId}
                  registerPosition={registerPosition}
                />
              </group>
            ))}
          </Suspense>

          <CameraRig
            selectedId={selectedId}
            positions={positions}
            controls={controls}
          />
          <OrbitControls
            ref={controls}
            enablePan
            enableZoom
            enableRotate
            minDistance={4}
            maxDistance={260}
            dampingFactor={0.08}
          />
        </Canvas>

        {!selected && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-6 sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              The Solar System
            </h1>
            <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
              Drag to orbit, scroll or pinch to zoom, pick a planet from the menu
              or tap it, and set the clock to watch days pass.
            </p>
          </div>
        )}

        {/* top-right controls */}
        <div className="pointer-events-none absolute right-4 top-4 z-20 flex flex-col items-end gap-2 sm:right-6 sm:top-6">
          <PlanetMenu selectedId={selectedId} onSelect={setSelectedId} />
          <div className="pointer-events-auto flex gap-2">
            <Button
              size="sm"
              variant={showConstellations ? "default" : "secondary"}
              className="gap-2 border border-white/10 backdrop-blur-md"
              onClick={() => setShowConstellations((v) => !v)}
            >
              <Sparkles className="size-4" />
              Constellations
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="gap-2 border border-white/10 bg-black/45 backdrop-blur-md"
              disabled={!showConstellations}
              onClick={() => setShowLabels((v) => !v)}
            >
              <Tags className="size-4" />
              {showLabels ? "Hide names" : "Show names"}
            </Button>
          </div>
        </div>

        {/* bottom-left clock */}
        <div className="pointer-events-none absolute bottom-4 left-4 z-20 sm:bottom-6 sm:left-6">
          <TimeControls />
        </div>

        {selected && (
          <PlanetCard planet={selected} onBack={() => setSelectedId(null)} />
        )}
      </div>
    </SimProvider>
  );
}
