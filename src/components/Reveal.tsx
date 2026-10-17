import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { EASE } from "../lib/ease";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

/**
 * Weighted scroll reveal. Motion here has one job: carry the eye to the next
 * block of text as it enters. It is skipped entirely under reduced motion.
 *
 * If the element is already above the viewport on mount (deep link, jump back
 * to the top), it renders visible instead of staying at opacity 0 forever.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (element.getBoundingClientRect().bottom <= 0) setSkipped(true);
  }, []);

  const Component = motion[as] as typeof motion.div;

  if (reduced || skipped) {
    return (
      <Component ref={ref as never} className={className}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref as never}
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}
