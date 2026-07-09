# Meta Lineup

A free, no-login GeoGuessr/WorldGuessr helper. Instead of clicking into one
country's guide at a time, browse every documented variant of a meta side by
side and match it to what you're seeing in-game.

Covers **72 countries** across South America, Latin America (Central
America/Caribbean), North America, and Europe.

## Features

- **Lineup** (`/`) — seven metas, each browsable as a visual grid: Bollards,
  Poles, License plates, Road lines (with a Chevrons sub-tab), Signs
  (Stop/Yield/Pedestrian crossing/Bus stop sub-tabs), Currency and Phone
  numbers (plain facts). Countries with no documented meta are shown
  honestly rather than skipped or faked.
- **Quiz** (`/quiz`) — guess-the-country practice mode pulling a question
  from every meta in the lineup (380+ questions), with instant feedback and
  a streak counter persisted in `localStorage`. Multiple-choice distractors
  are drawn from the same region as the correct answer.
- **Country profile** (`/country/[code]`) — every meta for a single country
  on one page, instead of switching meta tabs and scanning for that country
  each time.
- **Compare** (`/compare`) — two countries side by side across every meta at
  once, for exactly the 50-50 moments this app is meant to solve. Search-to-
  select country pickers, forced 2-column layout even on mobile.
- **Search** — jump straight to a country profile from the nav bar.

See `data/` for the meta registry (`data/index.ts`), the country registry
with regions (`data/countries.ts`), and per-meta data files.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS
- Static data in [`data/`](data) — no database needed yet. If this grows to
  accept user submissions or needs editing outside a code change, a Postgres
  backend (e.g. Supabase) would be the natural next step.
- Images are hotlinked directly from their source (not re-hosted).
- Country flags are hotlinked from Worldometer by ISO code (`data/countries.ts`).
  A handful of sub-national territories without their own Worldometer flag
  (Azores, Madeira, Faroe Islands, Gibraltar, Isle of Man, Jersey, Svalbard,
  Puerto Rico, Alaska, Hawaii) fall back to their parent country's flag via
  `flagCode`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content & attribution

- Bollard, pole, license plate, road line/chevron and (for most of Europe,
  Latin America, and North America) sign clue images and descriptions come
  from the [Plonk It Guide to GeoGuessr](https://www.plonkit.net/guide),
  licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
  For the United States and Canada — whose Plonk It guides cover dozens of
  state/province-specific variants each — only a representative sample of
  the clearest, most distinctive clues is included per meta, not an
  exhaustive state-by-state breakdown.
- South American sign photos come from individual
  [Wikimedia Commons](https://commons.wikimedia.org/) contributors, each
  freely licensed (CC-BY/CC-BY-SA/CC0/PD) — per-photo author and license are
  shown in each detail view and linked to the source file page. Every
  Commons photo used here was manually opened and visually checked against
  its claimed meta before inclusion (two mismatches were caught and removed
  this way).
- Currency and phone-code facts come from
  [GeoHints](https://geohints.com/meta/currencies) (plain factual data —
  name/symbol/code — not copyrightable). A handful of currency/calling-code
  facts not listed on GeoHints (Belarus, Liechtenstein, Panama) are
  well-established public knowledge, not sourced from any GeoGuessr meta
  site.
- Flags come from [Worldometer](https://www.worldometers.info/geography/flags-of-the-world/).

Note: GeoHints has not published a reuse license for its own photos/images,
so none of its images are used in this app — only the plain factual
data, which isn't copyrightable.

Coverage is intentionally incomplete where no reliable meta or no suitable
free photo exists — gaps are shown rather than filled with the wrong thing.
Most of Europe uses the standard international "STOP" text, so Stop signs
specifically are only listed for countries with a documented deviation.

This project is an unofficial, non-commercial fan tool and isn't affiliated
with Plonk It, GeoHints, Wikimedia, Worldometer, GeoGuessr, or WorldGuessr.

## Deploy

Deployed on [Vercel](https://vercel.com).
