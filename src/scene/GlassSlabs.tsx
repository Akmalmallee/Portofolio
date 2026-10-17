import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { motionState } from "./motionState";

type Slab = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  phase: number;
};

/** One slab per project, staggered in depth so the field has a front and a back. */
const SLABS: Slab[] = [
  { position: [-2.55, 0.5, -1.1], rotation: [0.08, 0.42, 0.06], scale: 1, phase: 0 },
  { position: [2.4, -0.25, -2.4], rotation: [-0.05, -0.5, -0.04], scale: 0.86, phase: 2.1 },
  { position: [-0.35, -1.9, -4.2], rotation: [0.12, 0.2, 0.1], scale: 0.7, phase: 4.2 },
];

type GlassSlabsProps = {
  animate: boolean;
  samples: number;
};

export function GlassSlabs({ animate, samples }: GlassSlabsProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    const time = state.clock.elapsedTime;
    group.current.children.forEach((child, index) => {
      const slab = SLABS[index];
      if (!slab) return;

      const idle = animate ? Math.sin(time * 0.4 + slab.phase) * 0.09 : 0;
      child.position.y = slab.position[1] + idle + motionState.scroll * 4.6;

      const targetTiltY = slab.rotation[1] + motionState.pointerX * 0.22;
      const targetTiltX = slab.rotation[0] - motionState.pointerY * 0.14;

      child.rotation.y = THREE.MathUtils.damp(child.rotation.y, targetTiltY, 3.2, delta);
      child.rotation.x = THREE.MathUtils.damp(child.rotation.x, targetTiltX, 3.2, delta);
    });
  });

  return (
    <group ref={group}>
      {SLABS.map((slab) => (
        <group key={slab.phase} position={slab.position} rotation={slab.rotation} scale={slab.scale}>
          <RoundedBox args={[1.9, 2.5, 0.07]} radius={0.035} smoothness={4}>
            <MeshTransmissionMaterial
              samples={samples}
              resolution={256}
              thickness={0.42}
              roughness={0.06}
              anisotropy={0.2}
              chromaticAberration={0.16}
              distortion={0.22}
              distortionScale={0.3}
              temporalDistortion={0.05}
              ior={1.32}
              color="#14181d"
              attenuationColor="#c08a3e"
              attenuationDistance={2.4}
            />
            <Edges linewidth={1.1} threshold={12} color="#c08a3e" />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}
