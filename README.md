# Akmal Syarief R. | Portfolio

Personal portfolio for Akmal Syarief R., a web developer working across web,
mobile, and interactive 3D. The page is built around a live 3D field: floating
glass slabs, drifting gold dust, and a brushed brass orb, over a near-black
editorial layout.

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

## Assets to add

Drop these into `public/` when you have them:

- `akmal.jpg` - a portrait, 4:5 crop works best. Until it exists the hero shows
  an initials placeholder labelled "Photo coming soon".
- `og-image.png` - only needed if you add Open Graph image tags back to
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
