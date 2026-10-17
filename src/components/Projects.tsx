import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-stretch justify-end bg-ink-950/70 p-0 backdrop-blur-sm md:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        onClick={(event) => event.stopPropagation()}
        className="surface relative flex h-full w-full max-w-2xl flex-col overflow-y-auto p-6 md:p-10"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h3 id="project-detail-title" className="mt-3 font-display text-4xl text-bone-100">
              {project.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center border border-bone-400/20 text-bone-100 transition-colors hover:border-brass-400 hover:text-brass-300"
          >
            <span className="sr-only">Close detail</span>
            <span aria-hidden="true" className="text-lg leading-none">
              &#10005;
            </span>
          </button>
        </div>

        <p className="mt-6 text-bone-300">{project.summary}</p>

        <dl className="mt-8 grid gap-6">
          <div>
            <dt className="eyebrow">Problem</dt>
            <dd className="mt-2 text-bone-300">{project.problem}</dd>
          </div>
          <div>
            <dt className="eyebrow">Goal</dt>
            <dd className="mt-2 text-bone-300">{project.goal}</dd>
          </div>
        </dl>

        <div className="mt-8">
          <p className="eyebrow">What it does</p>
          <ul className="mt-3 flex flex-col gap-2">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-bone-300">
                <span className="mt-2 h-px w-3 shrink-0 bg-brass-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <p className="eyebrow">Stack</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <li key={item} className="border border-bone-400/20 px-3 py-1 text-xs text-bone-300">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6 pt-6 rule">
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="min-h-11 text-sm text-brass-300 underline decoration-brass-500/40 underline-offset-4 hover:text-brass-400"
            >
              View repository
            </a>
          ) : (
            <span className="text-sm text-bone-500">No public repository yet</span>
          )}
          <span className="text-xs text-bone-500">
            {project.year} / {project.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="section-shell relative z-10 py-28 md:py-40">
      <Reveal>
        <SectionLabel index="01">Selected work</SectionLabel>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-10 max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] text-bone-100">
          Three builds, each one answering a question I actually had.
        </h2>
      </Reveal>

      <ul className="mt-16 flex flex-col">
        {projects.map((project, index) => (
          <Reveal as="li" key={project.id} delay={index * 0.08}>
            <div
              className={`rule flex flex-col gap-6 py-10 md:flex-row md:items-baseline md:justify-between md:gap-12 ${
                index % 2 === 1 ? "md:pl-[12%]" : "md:pr-[12%]"
              }`}
            >
              <div className="flex items-baseline gap-5 md:gap-8">
                <span className="font-display text-sm text-brass-400 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-bone-100">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm text-bone-400">{project.summary}</p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-6">
                <span className="text-xs text-bone-500">
                  {project.category} / {project.year}
                </span>
                <button
                  type="button"
                  onClick={() => setActive(project)}
                  className="min-h-11 whitespace-nowrap text-sm text-bone-100 underline decoration-brass-500/50 underline-offset-4 transition-colors hover:text-brass-300"
                >
                  Read case
                </button>
              </div>
            </div>
          </Reveal>
        ))}
        <li className="rule" aria-hidden="true" />
      </ul>

      {active && <ProjectDetail project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
