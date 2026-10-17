import { education, focus, profile, skills } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function About() {
  return (
    <section id="about" className="section-shell relative z-10 py-28 md:py-40">
      <Reveal>
        <SectionLabel index="02">About</SectionLabel>
      </Reveal>

      <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-bone-100">
              I would rather understand a problem than ship a quick guess at it.
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col gap-6">
            {profile.summary.map((paragraph, index) => (
              <Reveal delay={0.1 + index * 0.06} key={paragraph}>
                <p className="measure text-bone-300">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24}>
            <div className="surface mt-12 p-6">
              <p className="eyebrow">Education</p>
              <p className="mt-4 font-display text-xl text-bone-100">{education.institution}</p>
              <p className="mt-2 text-sm text-bone-400">
                {education.degree}, {education.period}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:pl-[8%]">
          <Reveal delay={0.1}>
            <p className="eyebrow">Working in</p>
            <div className="mt-6 flex flex-col">
              {skills.map((group) => (
                <div key={group.group} className="rule py-6">
                  <p className="font-display text-lg text-bone-100">{group.group}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-bone-400">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="eyebrow mt-12">Current focus</p>
            <ul className="mt-6 flex flex-col gap-4">
              {focus.map((item) => (
                <li key={item} className="flex gap-4 text-sm text-bone-300">
                  <span className="mt-3 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
