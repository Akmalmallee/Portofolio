import { Suspense, lazy, useEffect, useState } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { useWebGLSupported } from "./hooks/useWebGLSupported";

// The 3D field is the heaviest chunk on the page, so it loads after the text.
const LuxeScene = lazy(() =>
  import("./scene/LuxeScene").then((module) => ({ default: module.LuxeScene })),
);

function useQuality(): "high" | "low" {
  const [quality, setQuality] = useState<"high" | "low">("high");

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 8;
    setQuality(cores >= 8 && memory >= 8 && !narrow ? "high" : "low");
  }, []);

  return quality;
}

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const webglSupported = useWebGLSupported();
  const quality = useQuality();

  return (
    <div id="app-shell" className="relative min-h-[100svh] overflow-x-hidden">
      {/*
        The atmospheric backdrop renders whether or not WebGL exists, so the page
        never collapses to a flat void and there is no pop-in while the 3D chunk loads.
      */}
      <div
        data-backdrop
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 90% at 12% 8%, rgba(192,138,62,0.14) 0%, rgba(7,8,10,0) 52%), radial-gradient(90% 80% at 88% 96%, rgba(111,134,168,0.12) 0%, rgba(7,8,10,0) 55%)",
        }}
      />

      {webglSupported && (
        <Suspense fallback={null}>
          <LuxeScene reducedMotion={reducedMotion} quality={quality} />
        </Suspense>
      )}

      <div
        className="grain-overlay pointer-events-none fixed inset-0 z-20 opacity-[0.18] mix-blend-soft-light motion-reduce:animate-none animate-grain"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
      </div>
    </div>
  );
}
