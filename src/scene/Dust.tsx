import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motionState } from "./motionState";

const COUNT = 700;

/** Soft round white sprite so each point reads as drifting dust, not a hard pixel. */
function makeDustSprite() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d")!;

  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.5)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

type DustProps = {
  animate: boolean;
};

export function Dust({ animate }: DustProps) {
  const points = useRef<THREE.Points>(null);
  const sprite = useMemo(() => makeDustSprite(), []);

  const positions = useMemo(() => {
    const array = new Float32Array(COUNT * 3);
    for (let index = 0; index < COUNT; index += 1) {
      array[index * 3] = (Math.random() - 0.5) * 22;
      array[index * 3 + 1] = (Math.random() - 0.5) * 16;
      array[index * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    return array;
  }, []);

  useFrame((state, delta) => {
    if (!points.current) return;
    if (!animate) return;

    const time = state.clock.elapsedTime;
    points.current.rotation.y += delta * 0.02;
    points.current.rotation.x = Math.sin(time * 0.06) * 0.04;

    points.current.position.y = motionState.scroll * 3.2;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}
