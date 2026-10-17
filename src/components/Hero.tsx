import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "../data/content";
import { EASE } from "../lib/ease";

export function Hero() {
  const reduced = useReducedMotion();
  const [photoFailed, setPhotoFailed] = useState(false);
  const photoSrc = `${import.meta.env.BASE_URL}akmal.jpg`;

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
      <div className="grid w-full gap-12 py-16 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-7">
          <motion.p {...rise(0.05)} className="eyebrow">
            {profile.location}
          </motion.p>

          <motion.h1
            {...rise(0.12)}
            className="mt-6 font-display text-[clamp(3.25rem,11vw,7.5rem)] leading-[0.92] text-bone-100"
          >
            Akmal
            <br />
            <span className="italic text-brass-300">Syarief R.</span>
          </motion.h1>

          <motion.p {...rise(0.24)} className="mt-8 measure text-lg text-bone-300">
            {profile.headline}
          </motion.p>

          <motion.div {...rise(0.32)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#work"
              className="group inline-flex min-h-11 items-center gap-3 border border-brass-500/60 px-6 text-sm tracking-[0.02em] text-bone-100 transition-colors hover:border-brass-300 hover:text-brass-300"
            >
              See the work
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                &#8594;
              </span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="min-h-11 text-sm text-bone-400 underline decoration-brass-500/40 underline-offset-4 transition-colors hover:text-bone-100"
            >
              {profile.email}
            </a>
          </motion.div>

          <motion.div {...rise(0.4)} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2 text-xs text-bone-400">
              <span className="h-1.5 w-1.5 rounded-full bg-brass-400" aria-hidden="true" />
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
          className="lg:col-span-5 lg:justify-self-end"
        >
          <div className="relative w-full max-w-[22rem] overflow-hidden border border-bone-400/15 bg-ink-900">
            <div className="aspect-[4/5] w-full">
              {photoFailed ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                  <span className="grid h-20 w-20 place-items-center border border-brass-500/40 font-display text-2xl text-brass-300">
                    {profile.initials}
                  </span>
                  <span className="text-xs text-bone-500">Photo coming soon</span>
                </div>
              ) : (
                <img
                  src={photoSrc}
                  alt={`Portrait of ${profile.name}`}
                  loading="eager"
                  decoding="async"
                  onError={() => setPhotoFailed(true)}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
          <figcaption className="mt-4 max-w-[22rem] text-xs leading-relaxed text-bone-500">
            {profile.role} based in {profile.location}.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
