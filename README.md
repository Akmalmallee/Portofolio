# Akmal Syarief R. | Portfolio

Personal portfolio for Akmal Syarief R., a web developer working across web,
mobile, and interactive 3D. The page is built around a live 3D field: framed panels
of the three project screenshots floating in depth with drifting white dust, over a
black-and-white editorial layout.

## Stack

- React 19 + TypeScript (strict)
- Vite
- Tailwind CSS v4 (CSS first theme in `src/index.css`, no JS config)
- React Three Fiber + drei + three (the 3D field, lazy loaded)
- postprocessing (bloom rim)
- Motion for React (scroll reveals)
- Fraunces + Instrument Sans, self hosted via fontsource

## Getting started

```
npm install
npm run dev        # dev server
npm run build      # typecheck then production build into dist/
npm run preview    # serve the production build
```

## Editing content

Every word on the site lives in `src/data/content.ts`. Projects, skills,
education, focus areas, contact details and socials are all read from there.

## Assets

- `public/images/projects/` - the three project screenshots (`rex-store.webp`,
  `ticket-booking-app.webp`, `capybara-experience.webp`), optimized to WebP at
  1600px wide. They are used both as the 3D panel textures and in the case-study
  modal. Update the matching `image` entry in `src/data/content.ts` if you swap one.
- `public/akmal.webp` - the hero portrait, a square-free cutout (transparent
  background) shown grayscale at 339x736. Replace it with a higher-resolution
  export of the same crop if you have one, and keep the `width`/`height` on the
  `<img>` in `src/components/Hero.tsx` in sync. Until a file exists the hero shows
  an initials placeholder labelled "Photo coming soon".

Drop `og-image.png` into `public/` only if you add Open Graph image tags back to
`index.html`.

## Deployment

Hosted on Vercel, connected to this repository. Every push to `main` triggers a
build. Framework preset: Vite, build command `npm run build`, output `dist`.

## Accessibility and motion

- Full keyboard navigation with a visible focus ring and a skip link.
- The project overlay is a labelled modal, closed with Escape, and restores focus.
- `prefers-reduced-motion` freezes the 3D field and removes all reveals.
- If WebGL is unavailable the 3D field is skipped and the gradient backdrop holds.

## Design notes

The visual direction, palette, typography choices and the reasons behind them are
documented in `DESIGN.md`. The previous site's content is kept for reference in
`docs/legacy-content.ts`.
