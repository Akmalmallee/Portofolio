import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motionState } from "./motionState";

type AnchorOrbProps = {
  animate: boolean;
};

/** A single brushed brass sphere, low and off to the right, as the visual anchor. */
export function AnchorOrb({ animate }: AnchorOrbProps) {
  const orb = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!orb.current) return;
    if (!animate) return;

    orb.current.rotation.y += delta * 0.06;
    orb.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
    orb.current.position.y = -2.3 + motionState.scroll * 3.4 + motionState.pointerY * -0.12;
  });

  return (
    <mesh ref={orb} position={[3.5, -2.3, -1.6]}>
      <sphereGeometry args={[0.92, 64, 64]} />
      <meshStandardMaterial color="#c08a3e" metalness={0.95} roughness={0.28} envMapIntensity={1.15} />
    </mesh>
  );
}
