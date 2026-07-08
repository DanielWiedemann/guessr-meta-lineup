# Meta Lineup

A free, no-login GeoGuessr/WorldGuessr helper. Instead of clicking into one
country's guide at a time, browse every documented variant of a meta side by
side and match it to what you're seeing in-game.

Currently covers South America across three metas — see `data/`:

- **Bollards** (`data/bollards.ts`) — Chile, Ecuador, Peru and Uruguay have
  documented variants; Argentina, Bolivia, Brazil and Colombia have no
  distinctive bollard meta per Plonk It.
- **Signs** (`data/signs.ts`) — Stop, Yield, Pedestrian crossing and Bus stop,
  each with real photos per country where a usable one exists on Wikimedia
  Commons. Coverage is intentionally incomplete where no suitable free photo
  exists (e.g. Bolivia/Peru have almost no photographed road signs on
  Commons) — gaps are shown rather than filled with the wrong sign.
- **Currency** (`data/currency.ts`) — plain factual reference (name, symbol,
  code) for all 8 countries.

More metas (poles, license plates, lamp posts, road lines) and regions are
planned — see `data/index.ts` for the meta registry.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS
- Static data in [`data/`](data) — no database needed yet. If this grows to
  cover many metas/countries or accepts user submissions, a Postgres backend
  (e.g. Supabase) would be the natural next step.
- Images are hotlinked directly from their source (not re-hosted).
- Country flags are hotlinked from Worldometer by ISO code (`data/countries.ts`).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content & attribution

- Bollard clue images and descriptions come from the
  [Plonk It Guide to GeoGuessr](https://www.plonkit.net/guide), licensed
  under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
- Currency facts come from [GeoHints](https://geohints.com/meta/currencies)
  (plain factual data — name/symbol/code — not copyrightable).
- Sign photos come from individual [Wikimedia Commons](https://commons.wikimedia.org/)
  contributors, each freely licensed (CC-BY/CC-BY-SA/CC0/PD) — per-photo
  author and license are shown in each detail view and linked to the source
  file page.
- Flags come from [Worldometer](https://www.worldometers.info/geography/flags-of-the-world/).

Note: GeoHints has not published a reuse license for its own photos/images,
so none of its images are used in this app — only the plain factual
currency data, which isn't copyrightable.

This project is an unofficial, non-commercial fan tool and isn't affiliated
with Plonk It, GeoHints, Wikimedia, Worldometer, GeoGuessr, or WorldGuessr.

## Deploy

Deployed on [Vercel](https://vercel.com).
