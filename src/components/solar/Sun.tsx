import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { SUN } from "@/data/planets";
import { usePlanetTextures } from "./usePlanetMaterial";

export function Sun({ paused }: { paused: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const { map } = usePlanetTextures(SUN.palette, SUN.textures, {
    bands: false,
    turbulence: 40,
  });

  useFrame((_, delta) => {
    if (!paused && ref.current) ref.current.rotation.y += delta * 0.05;
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
      <pointLight intensity={900} distance={0} decay={2} color="#fff3d6" />
    </group>
  );
}
