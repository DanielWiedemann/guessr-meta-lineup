# Meta Lineup Filter (Chrome extension)

A sidebar extension for narrowing down GeoGuessr countries by what you're
seeing (or hearing):

- **Side of driving** — left / right, shown as a head-on road tile with a car.
- **Continent** — real geography (see below).
- **Stop sign** — the actual wording *or script*, each drawn as a red
  octagon: STOP, PARE, ALTO, DUR, BERHENTI (Indonesia/Malaysia), ARRÊT,
  plus native-script signs like Japan's 止まれ, China/Taiwan's 停, Korea's
  정지, Thailand's หยุด and Arabic قف.
- **Centre line colour** and **Edge line colour** — the two road-line
  colours are now *separate* filters, each drawn as a little asphalt tile
  with the coloured line in the middle or along the edges (or a "no line"
  tile).
- **Chevron background** and **Chevron arrow** — drawn as curve-warning
  chevron signs in the actual colour scheme.
- **Currency symbol** — the symbol on price boards, shopfronts and fuel
  signs, as a tile per symbol (€, £, ₴, ฿, ₩, zł, Kč, R$, лв …), sorted
  with the most widely-shared ones first. Distinctive symbols pin a
  country instantly (₴ → Ukraine, ฿ → Thailand); shared ones like $ or €
  narrow to that currency zone. Sourced from `data/currency.ts`.
- **Language** — a language spoken there. Has an OR/AND toggle in its
  heading: OR (default) matches any picked language, AND requires all of
  them (e.g. English + French → Canada / Rwanda / Vanuatu). Widely-spoken
  second languages count — Russian, for instance, is tagged for Ukraine
  and the Baltics as well as Russia.
- **Writing script** — recognise an alphabet by its *shape* even if you
  can't read it: each tile shows sample glyphs (Thai กสด vs the rounder
  Lao ກສດ, Khmer, Chinese characters, Japanese kana, Korean Hangul,
  Devanagari, Bengali, Tamil, Telugu, Kannada, Gujarati, Sinhala, Tibetan,
  Arabic, Hebrew, Greek, plus plain Latin/Cyrillic). Script coverage is
  complete for all 136 countries, so this filter is fully discriminating —
  one click on Telugu narrows to India, Thai to Thailand, Khmer to
  Cambodia.
- **Road name words** — the street-designator words on name plates and
  signs: Jalan/Jl., ul./ulica, ул./вул., -straße, -straat, -weg, -vej,
  -veien, -vägen, -vegur, -tie/-katu, iela, gatvė, utca, Strada, Rue,
  Calle, Rua, Via, Street/Road, Caddesi/Sokak, Οδός, ถนน, Đường, Korea's
  romanized -ro/-gil, and more.
- **Special letters (Latin)** and **Cyrillic letters** — accented / extra
  alphabet letters as clickable glyph tiles. (Greek, Thai, Korean, Arabic
  and other non-Latin/Cyrillic scripts aren't broken out as letter tiles
  yet — but their countries are already reachable via the stop-sign script
  and language filters.)

Every section is collapsible and starts collapsed except Side of driving.
Pick as many options as apply within a category (useful when two clues
look similar, you're unsure which language it is, or you're between two
continents) — except the two letter categories, where picking several
requires a country's alphabet to contain *all* of them (you're describing
letters seen together in the same word/sign, not alternatives).

**Missing data never excludes a country.** If a country hasn't been
researched for a given clue (e.g. Australia's road-line colour), it stays
in the results no matter what you pick for that clue — it's shown as "still
possible", not silently dropped. Filtering on a category only ever removes
countries we *know* don't match. (An earlier version excluded on missing
data, which once wrongly hid the correct answer and lost an 86-country
streak.)

Continent is a real geographic continent, not the same thing as the app's
"region" grouping (which lumps Central America/the Caribbean into "Latin
America" for navigation purposes) — Russia, Turkey, and Cyprus are tagged
with both Europe and Asia since they're genuinely transcontinental.

Coverage: side of driving, continent, language and stop-sign wording are
tagged for all 136 countries and territories, as are road-name words and
writing scripts — so those filters are fully discriminating. Road-line and
chevron colours are most complete for the Americas and Europe, where the
Plonk It research is done, plus the marquee Asian metas (Japan, Korea,
China); the rest are being filled in and, until then, simply don't
constrain those countries (see the missing-data rule above). The US and
its small territories are deliberately left untagged for chevron colour —
Plonk It's own research found no single national pattern, so inventing one
would fabricate a signal rather than honestly reflect a gap.

### What's different? (tie-breaker)

When you narrow the list to between two and six confirmed candidates, a
**⚖ What's different?** button appears next to the results. It opens a
panel showing only the clue categories where those candidates actually
*differ*, and highlights the values unique to a single country — the exact
thing to look for in-game to break a 50/50 (e.g. among Cyrillic countries,
`ў` means Belarus, `ґ/є/ї` means Ukraine, `гудамж` means Mongolia).
Categories they all share are listed at the bottom so you don't waste time
on them.

No build step — plain HTML/CSS/JS with inline SVG icons, reading directly
from the same Supabase project as
[the website](https://guessr-meta-lineup.vercel.app) via its public anon
key (all data is public read-only reference data).

## Load it (unpacked, personal use)

1. Open `chrome://extensions` in Chrome.
2. Turn on **Developer mode** (top-right toggle).
3. Click **Load unpacked** and select this `extension/` folder.
4. Click the extension's icon in the toolbar to open the side panel (or
   pick it from the side-panel picker next to the address bar).

## Data model & updating

Every filterable fact is a column on the `countries` table itself — one
row per country, with `text[]` array columns for anything multi-valued
(`languages`, `continents`, `road_line_color_inner`,
`road_line_color_outer`, `chevron_bg_color`, `chevron_arrow_color`,
`stop_sign_wording`, `special_letters_latin`, `special_letters_cyrillic`)
and a scalar `driving_side`. An empty array means "not yet researched,"
never "this country has none." This replaced an older
`filter_categories` / `filter_options` / `country_filter_tags` trio — one
robust table instead of three, which is simpler to query and reason about.
The extension derives its filter options client-side from whatever values
are actually present.

Facts are seeded from `scripts/seed-filters.ts` at the project root — edit
there and re-run
`npx tsx --env-file=.env.local scripts/seed-filters.ts` to update Supabase.
The extension picks up changes on its next load automatically, no
extension update needed.
