# Meta Lineup Filter (Chrome extension)

A sidebar extension for narrowing down GeoGuessr countries by the visual
clues you're currently seeing — side of driving, stop sign wording, road
center line color, chevron colors (shown as round color swatches, not
text labels), and special alphabet letters (accented Latin letters and
Cyrillic-specific letters, shown as clickable square tiles — Greek, Thai,
Korean, Arabic and other non-Latin/Cyrillic scripts are a future
addition). Every filter section is collapsible and starts collapsed
except Side of driving. Pick as many options as apply within a category
(useful when two clues look similar or you're unsure) — except the two
letter categories, where picking several requires a country's alphabet
to contain *all* of them (you're describing letters seen together in the
same word/sign, not alternatives). The matching country list updates
live either way. (License plate color was removed pending a rework.)

Side of driving is tagged for all 137 countries and territories Plonk It
documents. Stop-sign wording, road-line color, and chevron colors are
currently tagged only for the Americas and Europe, where the underlying
Plonk It research has actually been done — Africa/Asia/Oceania/Antarctica
don't have these yet. A handful of small US territories (Alaska, Hawaii,
Bermuda, the US Minor Outlying Islands, US Virgin Islands) and the US
itself are also intentionally left untagged for chevron color — Plonk
It's own research found no single distinctive national pattern there, so
guessing one would fabricate a signal that doesn't exist rather than
honestly reflect a gap.

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
