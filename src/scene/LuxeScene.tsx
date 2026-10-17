import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { AnchorOrb } from "./AnchorOrb";
import { GlassSlabs } from "./GlassSlabs";
import { GoldDust } from "./GoldDust";
import { attachMotionListeners, motionState } from "./motionState";

function CameraRig({ animate }: { animate: boolean }) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    if (!animate) return;

    const targetX = motionState.pointerX * 0.42;
    const targetY = -motionState.scroll * 2.1 + motionState.pointerY * -0.22;
    const targetZ = 6.2 - motionState.scroll * 0.9;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2, delta);

    lookAt.current.set(motionState.pointerX * 0.15, -motionState.scroll * 1.4, 0);
    camera.lookAt(lookAt.current);
  });

  return null;
}

function SceneContents({ animate, samples }: { animate: boolean; samples: number }) {
  return (
    <>
      <fog attach="fog" args={["#07080a", 7, 16]} />

      <ambientLight intensity={0.22} color="#8fa0b8" />
      <directionalLight position={[-5, 4, 3]} intensity={2.1} color="#ffd9a0" />
      <directionalLight position={[5, -1, 2]} intensity={0.5} color="#6f86a8" />
      <pointLight position={[0, 2, -5]} intensity={14} color="#c08a3e" distance={16} decay={2} />

      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.6} color="#ffd9a0" form="rect" position={[-5, 2, 3]} scale={[10, 6, 1]} rotation-y={Math.PI / 2} />
        <Lightformer intensity={0.9} color="#5f7aa0" form="rect" position={[5, -1, -2]} scale={[8, 6, 1]} rotation-y={-Math.PI / 2} />
        <Lightformer intensity={0.5} color="#c08a3e" form="ring" position={[0, 4, -4]} scale={4} />
      </Environment>

      <GoldDust animate={animate} />
      <GlassSlabs animate={animate} samples={samples} />
      <AnchorOrb animate={animate} />

      <CameraRig animate={animate} />

      <EffectComposer enableNormalPass={false}>
        <Bloom intensity={0.42} luminanceThreshold={0.62} luminanceSmoothing={0.35} mipmapBlur radius={0.6} />
      </EffectComposer>
    </>
  );
}

type LuxeSceneProps = {
  reducedMotion: boolean;
  quality: "high" | "low";
};

/**
 * Full-viewport 3D backdrop. Reads pointer and scroll from motionState, so it
 * never re-renders on input. Reduced motion freezes the scene to a still frame.
 */
export function LuxeScene({ reducedMotion, quality }: LuxeSceneProps) {
  useEffect(() => {
    if (reducedMotion) return;
    return attachMotionListeners();
  }, [reducedMotion]);

  const animate = !reducedMotion;
  const samples = quality === "high" ? 6 : 2;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        className="absolute inset-0"
        dpr={[1, quality === "high" ? 1.8 : 1.25]}
        frameloop={animate ? "always" : "demand"}
        camera={{ position: [0, 0, 6.2], fov: 42, near: 0.1, far: 40 }}
        gl={{ antialias: quality === "high", powerPreference: "high-performance", alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContents animate={animate} samples={samples} />
        </Suspense>
      </Canvas>
    </div>
  );
}
