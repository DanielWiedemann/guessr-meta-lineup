# Meta Lineup

A free, no-login GeoGuessr/WorldGuessr helper. Instead of clicking into one
country's guide at a time, browse every documented variant of a meta side by
side and match it to what you're seeing in-game.

Covers **136 countries and territories** across every Plonk It region —
South America, Latin America, North America, Europe, Africa, Asia,
Oceania, and Antarctica. The image-based metas (Bollards, Poles, License
plates, Road lines/Chevrons, Signs) are currently researched for the
Americas and Europe only; Africa/Asia/Oceania/Antarctica have basic facts
(driving side, currency, phone code, language) with image-meta research
still to come.

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
- **Chrome extension** ([`extension/`](extension)) — a sidebar you can keep
  open next to GeoGuessr. Check off the clues you're seeing (side of
  driving, stop sign wording, road line color, chevron colors, and
  special alphabet letters) and the country list narrows live — colors
  are OR-within-category ("similar or unsure"), letters are AND (you're
  describing characters seen together). See
  [`extension/README.md`](extension/README.md) for how to load it.

See `data/` for the data-access layer (`data/db.ts`, `data/countries.ts`)
and `data/static*.ts` / per-meta files for the authoring source that feeds
Supabase.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS
- [Supabase](https://supabase.com) (Postgres) is the single source of truth
  for countries, metas, variants, and facts — read by both the website and
  the extension via the public anon key (all tables are public read-only
  reference data, enforced by RLS). The Chrome extension's filter facts
  (driving side, continent, language, stop-sign wording, road-line and
  chevron colours, special letters) are **columns on the `countries` table
  itself** — scalar for single-valued facts, `text[]` for multi-valued
  ones — rather than a separate `filter_categories` / `filter_options` /
  `country_filter_tags` trio (an earlier version had that). One robust
  wide table, one row per country, is simpler to query and reason about
  than three join tables. An empty array means "not yet researched," and
  the extension treats that as "still possible," never as a mismatch — so
  incomplete coverage can never silently exclude the correct answer.
  Content is still authored in version-controlled TypeScript files
  (`data/staticCountries.ts`, `data/staticMetas.ts`, and the per-meta files
  they aggregate) for git history and reviewability — after editing one,
  run `npx tsx --env-file=.env.local scripts/migrate-to-supabase.ts` to
  sync. Filter tags are authored directly in `scripts/seed-filters.ts`.
- Images are hotlinked directly from their source (not re-hosted).
- Country flags are hotlinked from [flagcdn.com](https://flagcdn.com) by ISO
  code (`data/countries.ts`) — chosen specifically because it's a
  dedicated flag-hotlinking service with complete territory coverage
  (including Antarctica's Treaty flag, which Worldometer, the original
  source, doesn't have at all). A few made-up codes that aren't real ISO
  entries (Azores, Madeira, Alaska, Hawaii) still fall back to their parent
  country's flag via `flagCode`.

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
- Flags come from [flagcdn.com](https://flagcdn.com).

Note: GeoHints has not published a reuse license for its own photos/images,
so none of its images are used in this app — only the plain factual
data, which isn't copyrightable.

Coverage is intentionally incomplete where no reliable meta or no suitable
free photo exists — gaps are shown rather than filled with the wrong thing.
Most of Europe uses the standard international "STOP" text, so Stop signs
specifically are only listed for countries with a documented deviation.

This project is an unofficial, non-commercial fan tool and isn't affiliated
with Plonk It, GeoHints, Wikimedia, flagcdn.com, GeoGuessr, or WorldGuessr.

## Deploy

Deployed on [Vercel](https://vercel.com).
