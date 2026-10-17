import { useEffect, useState } from "react";
import { profile } from "../data/content";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-500 ${
        scrolled ? "bg-ink-950/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-40 focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-bone-100"
      >
        Skip to content
      </a>

      <nav className="section-shell flex h-[var(--header-h)] items-center justify-between" aria-label="Primary">
        <a href="#hero" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center border border-brass-500/50 font-display text-sm tracking-[0.08em] text-brass-300">
            {profile.initials}
          </span>
          <span className="hidden font-display text-sm tracking-[0.02em] text-bone-100 sm:block">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-bone-400 transition-colors hover:text-bone-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid h-11 w-11 place-items-center border border-bone-400/20 text-bone-100 md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="flex flex-col gap-[5px]">
            <span className="block h-px w-5 bg-bone-100" />
            <span className="block h-px w-5 bg-bone-100" />
          </span>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-bone-400/15 bg-ink-950/95 backdrop-blur-md md:hidden">
          <ul className="section-shell flex flex-col py-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center font-display text-xl text-bone-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
