import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { projects } from "../data/content";
import { motionState } from "./motionState";

type Slab = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  phase: number;
};

/** One panel per project, staggered in depth so the field has a front and a back. */
const SLABS: Slab[] = [
  { position: [-1.5, 0.7, -1.0], rotation: [0.05, 0.34, 0.03], scale: 0.92, phase: 0 },
  { position: [2.6, -0.5, -2.6], rotation: [-0.05, -0.42, -0.03], scale: 0.9, phase: 2.1 },
  { position: [-0.5, -2.4, -4.4], rotation: [0.1, 0.16, 0.06], scale: 0.8, phase: 4.2 },
];

const PANEL_HEIGHT = 1.85;

type GlassSlabsProps = {
  animate: boolean;
};

/**
 * The three project screenshots mounted as framed panels floating in depth.
 * Each panel keeps the source image aspect so nothing is cropped or stretched.
 */
export function GlassSlabs({ animate }: GlassSlabsProps) {
  const group = useRef<THREE.Group>(null);
  const textures = useTexture(projects.map((project) => project.image.src));

  const panels = useMemo(() => {
    const list = Array.isArray(textures) ? textures : [textures];
    list.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
    });
    return projects.map((project, index) => {
      const ratio = project.image.width / project.image.height;
      return {
        key: project.id,
        texture: list[index],
        width: PANEL_HEIGHT * ratio,
        height: PANEL_HEIGHT,
        slab: SLABS[index],
      };
    });
  }, [textures]);

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
      {panels.map((panel) => (
        <group
          key={panel.key}
          position={panel.slab.position}
          rotation={panel.slab.rotation}
          scale={panel.slab.scale}
        >
          <RoundedBox args={[panel.width, panel.height, 0.06]} radius={0.03} smoothness={4}>
            <meshStandardMaterial color="#111111" roughness={0.55} metalness={0.2} />
            <Edges color="#ffffff" transparent opacity={0.55} threshold={15} />
          </RoundedBox>
          <mesh position={[0, 0, 0.032]}>
            <planeGeometry args={[panel.width * 0.94, panel.height * 0.92]} />
            <meshBasicMaterial map={panel.texture} toneMapped />
          </mesh>
        </group>
      ))}
    </group>
  );
}
