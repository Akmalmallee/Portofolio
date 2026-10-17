/**
 * Module-scoped pointer and scroll state.
 *
 * The scene reads these inside useFrame, so they stay outside React state on
 * purpose: updating React state at pointer or frame rate would re-render the
 * whole canvas tree for no visible gain.
 */
export const motionState = {
  /** Normalized pointer, -1..1 on both axes. */
  pointerX: 0,
  pointerY: 0,
  /** Page scroll progress, 0..1 across the whole document. */
  scroll: 0,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function attachMotionListeners() {
  const onPointer = (event: PointerEvent) => {
    motionState.pointerX = clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1);
    motionState.pointerY = clamp((event.clientY / window.innerHeight) * 2 - 1, -1, 1);
  };

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    motionState.scroll = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
  };

  const onPointerLeave = () => {
    motionState.pointerX = 0;
    motionState.pointerY = 0;
  };

  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("pointerleave", onPointerLeave);
  onScroll();

  return () => {
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("pointerleave", onPointerLeave);
  };
}
