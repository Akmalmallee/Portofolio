import { useEffect, useState } from "react";

function canCreateContext(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Returns true when a WebGL context is available. Defaults to false on first paint. */
export function useWebGLSupported(): boolean {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(canCreateContext());
  }, []);

  return supported;
}
