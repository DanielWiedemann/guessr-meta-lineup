# Meta Lineup

A free, no-login GeoGuessr/WorldGuessr helper. Instead of clicking into one
country's guide at a time, browse every documented variant of a meta side by
side and match it to what you're seeing in-game.

Currently covers **bollards in South America** (Chile, Ecuador, Peru,
Uruguay have documented variants; Argentina, Bolivia, Brazil and Colombia
are shown as having no distinctive bollard meta). More metas (poles, license
plates, lamp posts, road lines) and regions are planned — see `data/metas.ts`.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS
- Static data in [`data/metas.ts`](data/metas.ts) — no database needed yet.
  If this grows to cover many metas/countries or accepts user submissions,
  a Postgres backend (e.g. Supabase) would be the natural next step.
- Images are hotlinked directly from Plonk It (not re-hosted).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content & attribution

Clue descriptions and images come from the
[Plonk It Guide to GeoGuessr](https://www.plonkit.net/guide), licensed under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). This
project is an unofficial, non-commercial fan tool and isn't affiliated with
Plonk It or GeoGuessr.

## Deploy

Deployed on [Vercel](https://vercel.com).
