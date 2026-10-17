import { footer, profile, socials } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Contact() {
  return (
    <>
      <section id="contact" className="section-shell relative z-10 py-28 md:py-40">
        <Reveal>
          <SectionLabel index="03">Contact</SectionLabel>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.98] text-bone-100">
                If something here fits what you are building,
                <span className="italic text-brass-300"> say hello.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <a
                href={`mailto:${profile.email}`}
                className="mt-10 inline-block font-display text-[clamp(1.25rem,3vw,2rem)] break-all text-bone-100 underline decoration-brass-500/50 underline-offset-[10px] transition-colors hover:text-brass-300"
              >
                {profile.email}
              </a>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 flex items-center gap-2 text-sm text-bone-400">
                <span className="h-1.5 w-1.5 rounded-full bg-brass-400" aria-hidden="true" />
                {profile.availability}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="lg:col-span-5">
            <div className="rule pt-8 lg:pl-[12%]">
              <p className="eyebrow">Elsewhere</p>
              <ul className="mt-6 flex flex-col">
                {socials.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-h-14 items-center justify-between border-b border-bone-400/12 text-bone-100 transition-colors hover:text-brass-300"
                    >
                      <span className="text-sm">{social.label}</span>
                      <span className="text-sm text-bone-400">@{social.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="section-shell relative z-10 pb-12">
        <div className="rule flex flex-col gap-4 pt-8 text-xs text-bone-500 md:flex-row md:items-center md:justify-between">
          <p>{footer.tagline}</p>
          <div className="flex flex-wrap items-center gap-6">
            <p>&copy; {new Date().getFullYear()} {footer.copyright}</p>
            <a href="#hero" className="text-bone-400 transition-colors hover:text-bone-100">
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
