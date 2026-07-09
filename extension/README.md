# Meta Lineup Filter (Chrome extension)

A sidebar extension for narrowing down GeoGuessr countries by the visual
clues you're currently seeing — side of driving, stop sign wording, license
plate color, road center line color, chevron colors, and special alphabet
letters (accented Latin letters and Cyrillic-specific letters, rendered as
clickable tiles — Greek, Thai, Korean, Arabic and other non-Latin/Cyrillic
scripts are a future addition). Pick as many options as apply within a
category (useful when two clues look similar or you're unsure), and the
matching country list updates live.

No build step — plain HTML/CSS/JS, reading directly from the same Supabase
project as [the website](https://guessr-meta-lineup.vercel.app) via its
public anon key (all filter data is public read-only reference data).

## Load it (unpacked, personal use)

1. Open `chrome://extensions` in Chrome.
2. Turn on **Developer mode** (top-right toggle).
3. Click **Load unpacked** and select this `extension/` folder.
4. Click the extension's icon in the toolbar to open the side panel (or
   pick it from the side-panel picker next to the address bar).

## Updating filter data

Filter categories/options/tags are seeded from `scripts/seed-filters.ts` at
the project root — edit there and re-run
`npx tsx --env-file=.env.local scripts/seed-filters.ts` to update Supabase.
The extension picks up changes on its next load automatically, no
extension update needed.
