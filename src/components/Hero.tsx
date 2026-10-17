import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "../data/content";
import { EASE } from "../lib/ease";

const PORTRAIT_FADE = "linear-gradient(to bottom, #000 82%, transparent 100%)";

export function Hero() {
  const reduced = useReducedMotion();
  const [photoFailed, setPhotoFailed] = useState(false);
  const photoSrc = `${import.meta.env.BASE_URL}akmal.webp`;

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: EASE },
        };

  return (
    <section id="hero" className="section-shell relative z-10 flex min-h-[100svh] items-center pt-[var(--header-h)]">
      <div className="grid w-full gap-10 py-16 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-6">
          <motion.p {...rise(0.05)} className="eyebrow">
            {profile.location}
          </motion.p>

          <motion.h1
            {...rise(0.12)}
            className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-bone-100"
          >
            Akmal
            <br />
            <span className="italic text-accent">Syarief R.</span>
          </motion.h1>

          <motion.p {...rise(0.24)} className="mt-8 measure text-lg text-bone-300">
            {profile.headline}
          </motion.p>

          <motion.div {...rise(0.32)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#work"
              className="group inline-flex min-h-11 items-center gap-3 border border-accent/60 px-6 text-sm tracking-[0.02em] text-bone-100 transition-colors hover:border-accent hover:text-accent"
            >
              See the work
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                &#8594;
              </span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="min-h-11 text-sm text-bone-400 underline decoration-accent/40 underline-offset-4 transition-colors hover:text-bone-100"
            >
              {profile.email}
            </a>
          </motion.div>

          <motion.div {...rise(0.4)} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2 text-xs text-bone-400">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {profile.availability}
            </span>
            <span className="text-xs text-bone-500">{profile.disciplines.join(" / ")}</span>
          </motion.div>
        </div>

        <motion.figure
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 40 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 1.1, delay: 0.3, ease: EASE },
              })}
          className="order-first sm:order-none lg:col-span-6 lg:justify-self-end"
        >
          {photoFailed ? (
            <div className="flex h-[min(72svh,600px)] w-[min(80vw,340px)] flex-col items-center justify-center gap-3 border border-accent/15 bg-ink-900 lg:h-[min(86svh,780px)]">
              <span className="grid h-24 w-24 place-items-center border border-accent/40 font-display text-3xl text-accent">
                {profile.initials}
              </span>
              <span className="text-xs text-bone-500">Photo coming soon</span>
            </div>
          ) : (
            <img
              src={photoSrc}
              alt={`Portrait of ${profile.name}`}
              width={339}
              height={736}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onError={() => setPhotoFailed(true)}
              className="h-[min(72svh,600px)] w-auto max-w-full grayscale lg:h-[min(87svh,820px)]"
              style={{ WebkitMaskImage: PORTRAIT_FADE, maskImage: PORTRAIT_FADE }}
            />
          )}
          <figcaption className="mt-4 max-w-[22rem] text-xs leading-relaxed text-bone-500">
            {profile.role} based in {profile.location}.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
