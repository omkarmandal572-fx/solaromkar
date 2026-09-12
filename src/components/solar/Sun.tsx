import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { SUN } from "@/data/planets";
import { usePlanetTextures } from "./usePlanetMaterial";
import { useSim } from "./SimTime";

export function Sun() {
  const ref = useRef<THREE.Mesh>(null);
  const { days } = useSim();
  const { map } = usePlanetTextures(SUN.palette, SUN.textures, {
    bands: false,
    turbulence: 40,
  });

  useFrame(() => {
    // The Sun turns roughly once every 27 days.
    if (ref.current) ref.current.rotation.y = (days.current / 27) * Math.PI * 2;
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[SUN.radius, 64, 64]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
      {/* soft corona */}
      <mesh scale={1.22}>
        <sphereGeometry args={[SUN.radius, 32, 32]} />
        <meshBasicMaterial
          color="#ffb347"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.6}>
        <sphereGeometry args={[SUN.radius, 32, 32]} />
        <meshBasicMaterial
          color="#ff7b28"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      <pointLight intensity={2600} distance={0} decay={2} color="#fff3d6" />
    </group>
  );
}
