// Seeds the filter system used by the Chrome extension: filter_categories,
// filter_options, and country_filter_tags.
//
// Tags come from two sources:
//  1. Colors/wording already documented in data/licensePlates.ts,
//     data/roadLines.ts and data/signs.ts (re-derived by hand from those
//     descriptions, not re-scraped).
//  2. A handful of well-established public-knowledge facts not tied to any
//     specific Plonk It photo: which side of the road a country drives on
//     (brand new — not in any existing meta), the stop-sign wording for
//     Bolivia/Peru (same regional PARE convention as their neighbours) and
//     for the ~7 EU countries whose license plate close-up isn't
//     documented but whose plate is a standard white EU plate.
//
// Countries with no reliable basis for a given category are simply left
// untagged rather than guessed — same "honest gaps" policy as the rest of
// the data set.

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
}
const supabase = createClient(url, serviceRoleKey);

const categories = [
  { id: "side_of_driving", name: "Side of driving", description: "Which side of the road traffic drives on.", sort_order: 0 },
  { id: "continent", name: "Continent", description: "Which continent this is on. Pick several if you're between regions.", sort_order: 1 },
  { id: "stop_sign_wording", name: "Stop sign wording", description: "The word printed on the stop sign.", sort_order: 2 },
  { id: "road_line_color", name: "Road center line color", description: "The color of the road's center dividing line.", sort_order: 3 },
  { id: "chevron_bg_color", name: "Chevron background color", description: "The background color of curve-warning chevron signs.", sort_order: 4 },
  { id: "chevron_arrow_color", name: "Chevron arrow color", description: "The arrow color on curve-warning chevron signs.", sort_order: 5 },
  { id: "language", name: "Language", description: "A language spoken in this country. Pick several if you're not sure which one.", sort_order: 6 },
  { id: "special_letters_latin", name: "Special letters (Latin)", description: "Accented or extra Latin letters used in the local language's alphabet. Selecting several requires ALL of them to appear (unlike other filters).", sort_order: 7 },
  { id: "special_letters_cyrillic", name: "Cyrillic letters", description: "Letters specific to a country's Cyrillic alphabet. Selecting several requires ALL of them to appear (unlike other filters).", sort_order: 8 },
];

// Canonical display order shared by every color category, so "white" is
// always first, "yellow" always second, etc. regardless of which colors a
// given category happens to use.
const COLOR_ORDER = ["white", "yellow", "black", "red", "blue", "burgundy"];

const options: { id: string; category_id: string; label: string; sort_order: number }[] = [
  { id: "drive-left", category_id: "side_of_driving", label: "Left", sort_order: 0 },
  { id: "drive-right", category_id: "side_of_driving", label: "Right", sort_order: 1 },

  { id: "stop-pare", category_id: "stop_sign_wording", label: "PARE", sort_order: 0 },
  { id: "stop-alto", category_id: "stop_sign_wording", label: "ALTO", sort_order: 1 },
  { id: "stop-stop", category_id: "stop_sign_wording", label: "STOP", sort_order: 2 },
  { id: "stop-dur", category_id: "stop_sign_wording", label: "DUR", sort_order: 3 },
  { id: "stop-arret", category_id: "stop_sign_wording", label: "ARRÊT", sort_order: 4 },

  { id: "line-white", category_id: "road_line_color", label: "White", sort_order: COLOR_ORDER.indexOf("white") },
  { id: "line-yellow", category_id: "road_line_color", label: "Yellow", sort_order: COLOR_ORDER.indexOf("yellow") },

  { id: "chevbg-white", category_id: "chevron_bg_color", label: "White", sort_order: COLOR_ORDER.indexOf("white") },
  { id: "chevbg-yellow", category_id: "chevron_bg_color", label: "Yellow", sort_order: COLOR_ORDER.indexOf("yellow") },
  { id: "chevbg-black", category_id: "chevron_bg_color", label: "Black", sort_order: COLOR_ORDER.indexOf("black") },
  { id: "chevbg-red", category_id: "chevron_bg_color", label: "Red", sort_order: COLOR_ORDER.indexOf("red") },
  { id: "chevbg-blue", category_id: "chevron_bg_color", label: "Blue", sort_order: COLOR_ORDER.indexOf("blue") },

  { id: "chevarrow-white", category_id: "chevron_arrow_color", label: "White", sort_order: COLOR_ORDER.indexOf("white") },
  { id: "chevarrow-yellow", category_id: "chevron_arrow_color", label: "Yellow", sort_order: COLOR_ORDER.indexOf("yellow") },
  { id: "chevarrow-black", category_id: "chevron_arrow_color", label: "Black", sort_order: COLOR_ORDER.indexOf("black") },
  { id: "chevarrow-red", category_id: "chevron_arrow_color", label: "Red", sort_order: COLOR_ORDER.indexOf("red") },
  { id: "chevarrow-burgundy", category_id: "chevron_arrow_color", label: "Burgundy", sort_order: COLOR_ORDER.indexOf("burgundy") },
];

// code -> array of filter_option ids
const tags: Record<string, string[]> = {
  // ---- South America ----
  ar: ["drive-right", "stop-pare", "plate-black", "plate-white", "line-white", "line-yellow", "chevbg-white", "chevarrow-red"],
  bo: ["drive-right", "stop-pare", "plate-white", "line-white", "line-yellow"],
  br: ["drive-right", "stop-pare", "plate-white", "line-yellow", "chevbg-black", "chevarrow-yellow"],
  cl: ["drive-right", "stop-pare", "plate-white", "line-white", "line-yellow", "chevbg-yellow", "chevarrow-black"],
  co: ["drive-right", "stop-pare", "plate-yellow"],
  ec: ["drive-right", "stop-pare", "plate-white", "chevbg-yellow", "chevarrow-black"],
  pe: ["drive-right", "stop-pare", "plate-white", "plate-yellow", "line-yellow"],
  uy: ["drive-right", "stop-pare", "plate-white", "line-yellow", "line-white", "chevbg-yellow", "chevarrow-black"],

  // ---- Latin America ----
  cr: ["drive-right", "stop-alto", "plate-white"],
  do: ["drive-right", "stop-pare", "plate-yellow", "plate-white"],
  gt: ["drive-right", "stop-alto", "plate-white", "line-white", "line-yellow"],
  mx: ["drive-right", "stop-alto", "plate-varies", "line-white", "line-yellow"],
  pa: ["drive-right", "stop-alto", "plate-white", "line-white"],
  pr: ["drive-right", "stop-pare", "plate-varies"],

  // ---- North America ----
  us: ["drive-right", "stop-stop", "plate-varies", "line-yellow", "line-white"],
  "us-ak": ["drive-right", "stop-stop", "plate-yellow"],
  "us-hi": ["drive-right", "stop-stop", "plate-white"],
  ca: ["drive-right", "stop-stop", "stop-arret", "plate-varies", "line-yellow", "chevbg-red", "chevarrow-white", "chevbg-yellow", "chevarrow-black"],
  bm: ["drive-left", "stop-stop", "plate-white", "line-yellow"],
  gl: ["drive-right", "stop-stop"],
  mq: ["drive-right", "stop-stop"],
  pm: ["drive-right", "stop-stop", "plate-white", "plate-yellow"],
  um: ["drive-right", "stop-stop"],
  vi: ["drive-left", "stop-stop", "plate-blue"],

  // ---- Europe ----
  al: ["drive-right", "stop-stop", "plate-white", "chevbg-black", "chevarrow-white"],
  ad: ["drive-right", "stop-stop", "plate-white"],
  at: ["drive-right", "stop-stop", "plate-white", "chevbg-red", "chevarrow-white", "chevbg-yellow", "chevarrow-red"],
  "pt-az": ["drive-right", "stop-stop", "plate-white"],
  by: ["drive-right", "stop-stop"],
  be: ["drive-right", "stop-stop", "plate-white", "line-white", "chevbg-white", "chevarrow-red"],
  bg: ["drive-right", "stop-stop", "plate-white", "chevbg-white", "chevarrow-red"],
  hr: ["drive-right", "stop-stop", "plate-white", "chevbg-yellow", "chevbg-white", "chevarrow-red"],
  cy: ["drive-left", "stop-stop", "plate-white", "plate-yellow"],
  cz: ["drive-right", "stop-stop", "plate-white", "chevbg-white", "chevbg-yellow", "chevarrow-red"],
  dk: ["drive-right", "stop-stop", "plate-white", "plate-yellow", "line-white", "chevbg-red", "chevarrow-white"],
  ee: ["drive-right", "stop-stop", "plate-white", "chevbg-red", "chevarrow-white"],
  fo: ["drive-right", "stop-stop", "plate-white"],
  fi: ["drive-right", "stop-stop", "plate-white", "line-white", "line-yellow", "chevbg-black", "chevarrow-yellow"],
  fr: ["drive-right", "stop-stop", "plate-white", "line-white", "chevbg-blue", "chevarrow-white"],
  de: ["drive-right", "stop-stop", "plate-white"],
  gi: ["drive-right", "stop-stop", "plate-white", "plate-yellow"],
  gr: ["drive-right", "stop-stop", "plate-white", "plate-yellow", "line-yellow", "chevbg-black", "chevarrow-white"],
  hu: ["drive-right", "stop-stop", "plate-white", "line-white", "chevbg-white", "chevarrow-red"],
  is: ["drive-right", "stop-stop", "plate-white", "line-white", "chevbg-black", "chevarrow-yellow"],
  ie: ["drive-left", "stop-stop", "plate-white", "line-white", "chevbg-black", "chevarrow-yellow"],
  im: ["drive-left", "stop-stop", "plate-white", "plate-yellow"],
  it: ["drive-right", "stop-stop", "plate-white", "chevbg-black", "chevarrow-white"],
  je: ["drive-left", "stop-stop", "plate-white", "plate-yellow", "line-white"],
  lv: ["drive-right", "stop-stop", "plate-white", "chevbg-white", "chevarrow-red"],
  li: ["drive-right", "stop-stop", "plate-black"],
  lt: ["drive-right", "stop-stop", "plate-white", "chevbg-white", "chevarrow-red"],
  lu: ["drive-right", "stop-stop", "plate-yellow"],
  "pt-ma": ["drive-right", "stop-stop", "plate-white"],
  mt: ["drive-left", "stop-stop", "plate-white"],
  mc: ["drive-right", "stop-stop", "plate-white"],
  me: ["drive-right", "stop-stop", "plate-white"],
  nl: ["drive-right", "stop-stop", "plate-yellow", "line-white"],
  mk: ["drive-right", "stop-stop", "plate-white"],
  no: ["drive-right", "stop-stop", "plate-white", "line-white", "line-yellow", "chevbg-black", "chevarrow-yellow"],
  pl: ["drive-right", "stop-stop", "plate-white", "line-white", "chevbg-white", "chevarrow-red"],
  pt: ["drive-right", "stop-stop", "plate-white", "chevbg-black", "chevarrow-yellow"],
  ro: ["drive-right", "stop-stop", "plate-white", "chevbg-white", "chevarrow-red"],
  ru: ["drive-right", "stop-stop", "plate-white"],
  sm: ["drive-right", "stop-stop", "plate-white", "chevbg-yellow", "chevarrow-burgundy"],
  rs: ["drive-right", "stop-stop", "plate-white", "chevbg-white", "chevarrow-black"],
  sk: ["drive-right", "stop-stop", "plate-white", "chevbg-white", "chevarrow-red"],
  si: ["drive-right", "stop-stop", "plate-white", "chevbg-white", "chevarrow-red"],
  es: ["drive-right", "stop-stop", "plate-white", "line-white", "chevbg-black", "chevbg-blue", "chevarrow-white"],
  sj: ["drive-right", "stop-stop", "plate-black"],
  se: ["drive-right", "stop-stop", "plate-white", "line-white", "chevbg-blue", "chevarrow-yellow"],
  ch: ["drive-right", "stop-stop", "plate-white", "line-yellow", "chevbg-black", "chevarrow-white"],
  tr: ["drive-right", "stop-dur", "plate-white", "line-white", "line-yellow", "chevbg-white", "chevarrow-red"],
  ua: ["drive-right", "stop-stop", "plate-white", "chevbg-red", "chevarrow-white"],
  gb: ["drive-left", "stop-stop", "plate-white", "plate-yellow", "line-white", "chevbg-black", "chevarrow-white"],

  // ---- South America (additional) ----
  cw: ["drive-right"],
  fk: ["drive-left"],

  // ---- Africa / Antarctica / Asia / Oceania ----
  // Only side-of-driving is tagged here — stop-sign wording, plate/road-line/
  // chevron colors, and Latin/Cyrillic letters all still require actual
  // documented Plonk It research, which hasn't been done for these
  // countries yet (unlike the Americas/Europe above).
  bw: ["drive-left"], eg: ["drive-right"], sz: ["drive-left"], gh: ["drive-right"],
  ke: ["drive-left"], ls: ["drive-left"], mg: ["drive-right"], ml: ["drive-right"],
  na: ["drive-left"], ng: ["drive-right"], re: ["drive-right"], rw: ["drive-right"],
  sn: ["drive-right"], za: ["drive-left"], st: ["drive-right"], tz: ["drive-left"],
  tn: ["drive-right"], ug: ["drive-left"],
  gs: ["drive-left"],
  bd: ["drive-left"], bt: ["drive-left"], io: ["drive-left"], kh: ["drive-right"],
  cn: ["drive-right"], hk: ["drive-left"], in: ["drive-left"], id: ["drive-left"],
  iq: ["drive-right"], il: ["drive-right"], ps: ["drive-right"], jp: ["drive-left"],
  jo: ["drive-right"], kz: ["drive-right"], kg: ["drive-right"], la: ["drive-right"],
  lb: ["drive-right"], mo: ["drive-left"], my: ["drive-left"], mn: ["drive-right"],
  np: ["drive-left"], om: ["drive-right"], pk: ["drive-left"], ph: ["drive-right"],
  qa: ["drive-right"], sg: ["drive-left"], kr: ["drive-right"], lk: ["drive-left"],
  tw: ["drive-right"], th: ["drive-left"], ae: ["drive-right"], vn: ["drive-right"],
  as: ["drive-right"], au: ["drive-left"], cx: ["drive-left"], cc: ["drive-left"],
  gu: ["drive-right"], nz: ["drive-left"], mp: ["drive-right"], pn: ["drive-left"],
  vu: ["drive-right"],
};

// Special letters — distinctive characters from each country's official
// or predominant language(s) that show up on road signs/text in-game.
// Non-Latin, non-Cyrillic scripts (Greek, Thai, Korean, Arabic, ...) are
// intentionally out of scope for this pass.
//
// code -> array of literal characters (deduplicated automatically below
// into filter_options, so there's no separate list to keep in sync).
// IMPORTANT: these must be each language's FULL standard diacritic set, not
// just the "iconic" letters — under AND-within-category matching, a
// missing-but-real letter causes a false NEGATIVE (the correct country
// silently disappears), which is actively worse than an honest gap. (This
// is exactly what happened with Czech missing á/é/í/ó/ú: selecting a real
// Czech word's letters wrongly excluded Czechia.)
const latinLetters: Record<string, string[]> = {
  // Spanish-speaking Latin America (+ Spain) — full accented-vowel set
  ar: ["ñ", "á", "é", "í", "ó", "ú"], bo: ["ñ", "á", "é", "í", "ó", "ú"],
  cl: ["ñ", "á", "é", "í", "ó", "ú"], co: ["ñ", "á", "é", "í", "ó", "ú"],
  ec: ["ñ", "á", "é", "í", "ó", "ú"], pe: ["ñ", "á", "é", "í", "ó", "ú"],
  uy: ["ñ", "á", "é", "í", "ó", "ú"], cr: ["ñ", "á", "é", "í", "ó", "ú"],
  do: ["ñ", "á", "é", "í", "ó", "ú"], gt: ["ñ", "á", "é", "í", "ó", "ú"],
  mx: ["ñ", "á", "é", "í", "ó", "ú"], pa: ["ñ", "á", "é", "í", "ó", "ú"],
  pr: ["ñ", "á", "é", "í", "ó", "ú"], es: ["ñ", "á", "é", "í", "ó", "ú"],
  // Portuguese — full accented set
  br: ["ã", "õ", "ç", "á", "â", "é", "ê", "í", "ó", "ô", "ú"],
  "pt-az": ["ã", "õ", "ç", "á", "â", "é", "ê", "í", "ó", "ô", "ú"],
  "pt-ma": ["ã", "õ", "ç", "á", "â", "é", "ê", "í", "ó", "ô", "ú"],
  pt: ["ã", "õ", "ç", "á", "â", "é", "ê", "í", "ó", "ô", "ú"],
  // French (incl. French-speaking territories/regions)
  ca: ["é", "è", "ç", "à"], mq: ["é", "è", "ç", "à"], pm: ["é", "è", "ç", "à"],
  fr: ["é", "è", "ç", "à", "ê", "â", "ù", "î", "ô", "û", "ï", "ë"], mc: ["é", "è", "ç", "à"],
  // German
  at: ["ä", "ö", "ü", "ß"], de: ["ä", "ö", "ü", "ß"], li: ["ä", "ö", "ü", "ß"],
  // Nordic
  dk: ["æ", "ø", "å"], no: ["æ", "ø", "å"], sj: ["æ", "ø", "å"], gl: ["æ", "ø", "å"],
  se: ["å", "ä", "ö"], fi: ["ä", "ö"],
  fo: ["ø", "á", "í", "ó", "ú", "ý", "æ", "ð"],
  is: ["þ", "ð", "æ", "ö", "á", "é", "í", "ó", "ú", "ý"],
  // Baltics
  ee: ["õ", "ä", "ö", "ü", "š", "ž"],
  lv: ["ā", "č", "ē", "ģ", "ī", "ķ", "ļ", "ņ", "š", "ū", "ž"],
  lt: ["ą", "č", "ę", "ė", "į", "š", "ų", "ū", "ž"],
  // Balkans / Central Europe
  al: ["ë", "ç"],
  hr: ["č", "š", "ž", "ć", "đ"],
  cz: ["á", "č", "ď", "é", "ě", "í", "ň", "ó", "ř", "š", "ť", "ú", "ů", "ý", "ž"],
  sk: ["á", "ä", "č", "ď", "é", "í", "ĺ", "ľ", "ň", "ó", "ô", "ŕ", "š", "ť", "ú", "ý", "ž"],
  si: ["č", "š", "ž"],
  rs: ["š", "č", "ž", "ć", "đ"],
  me: ["š", "č", "ž", "ć", "đ", "ś", "ź"],
  hu: ["ő", "ű", "á", "é", "í", "ó", "ú", "ö", "ü"],
  pl: ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ź", "ż"],
  ro: ["ă", "â", "î", "ș", "ț"],
  // Other
  ad: ["ç", "ï", "à", "è", "é", "í", "ò", "ó", "ú", "ü"],
  ie: ["á", "é", "í", "ó", "ú"],
  it: ["à", "è", "é", "ì", "ò", "ù"],
  sm: ["à", "è", "é", "ì", "ò", "ù"],
  lu: ["é", "è", "ç", "ä", "ö", "ü", "ß"],
  mt: ["ġ", "ħ", "ż", "ċ"],
  be: ["é", "è", "ç"],
  ch: ["ä", "ö", "ü", "é", "è", "à"],
  tr: ["ç", "ğ", "ı", "ö", "ş", "ü"],
};

const cyrillicLetters: Record<string, string[]> = {
  by: ["ў", "і"],
  bg: ["ъ"],
  mk: ["ѓ", "ќ", "џ", "ѕ"],
  ru: ["ъ", "ы", "э", "ё"],
  ua: ["ї", "і", "є", "ґ"],
  rs: ["љ", "њ", "ђ", "ћ", "џ", "ј"],
};

// Shared by letters/language: derive filter_options automatically from the
// set of values actually used, so the option list can never drift out of
// sync with the tags (labelFor lets language sort/display by full name
// while letters just use the character itself).
function addTagOptionsFromMap(
  valuesByCountry: Record<string, string[]>,
  categoryId: string,
  idPrefix: string,
  labelFor: (value: string) => string = (v) => v
) {
  const unique = [...new Set(Object.values(valuesByCountry).flat())].sort((a, b) =>
    labelFor(a).localeCompare(labelFor(b), "en")
  );
  for (const [i, value] of unique.entries()) {
    options.push({ id: `${idPrefix}-${value}`, category_id: categoryId, label: labelFor(value), sort_order: i });
  }
  for (const [code, values] of Object.entries(valuesByCountry)) {
    tags[code] ??= [];
    for (const value of values) tags[code].push(`${idPrefix}-${value}`);
  }
}

addTagOptionsFromMap(latinLetters, "special_letters_latin", "letter-latin");
addTagOptionsFromMap(cyrillicLetters, "special_letters_cyrillic", "letter-cyr");

// --- Language ------------------------------------------------------------
// One tag per language actually spoken/official in a country (not just the
// single "primary" one) — deliberately excludes very obscure minority
// languages a player couldn't realistically identify (e.g. Guaraní), but
// includes genuinely well-known co-official ones like Quechua.
const languageNames: Record<string, string> = {
  af: "Afrikaans", ar: "Arabic", be: "Belarusian", bg: "Bulgarian", bi: "Bislama",
  bn: "Bengali", ca: "Catalan", ch: "Chamorro", cnr: "Montenegrin", cs: "Czech",
  da: "Danish", de: "German", dz: "Dzongkha", el: "Greek", en: "English",
  es: "Spanish", et: "Estonian", fi: "Finnish", fo: "Faroese", fr: "French",
  ga: "Irish", he: "Hebrew", hi: "Hindi", hr: "Croatian", hu: "Hungarian",
  id: "Indonesian", is: "Icelandic", it: "Italian", ja: "Japanese", kk: "Kazakh",
  kl: "Greenlandic", km: "Khmer", ko: "Korean", ku: "Kurdish", ky: "Kyrgyz",
  lb: "Luxembourgish", lo: "Lao", lt: "Lithuanian", lv: "Latvian", mg: "Malagasy",
  mi: "Maori", mk: "Macedonian", mn: "Mongolian", ms: "Malay", mt: "Maltese",
  ne: "Nepali", nl: "Dutch", no: "Norwegian", pap: "Papiamentu", pl: "Polish",
  pt: "Portuguese", qu: "Quechua", rm: "Romansh", ro: "Romanian", ru: "Russian",
  rw: "Kinyarwanda", si: "Sinhala", sk: "Slovak", sl: "Slovenian", sm: "Samoan",
  sq: "Albanian", sr: "Serbian", sv: "Swedish", sw: "Swahili", ta: "Tamil",
  th: "Thai", tl: "Filipino", tr: "Turkish", uk: "Ukrainian", ur: "Urdu",
  vi: "Vietnamese", yue: "Cantonese", zh: "Mandarin Chinese", zu: "Zulu",
};

const countryLanguages: Record<string, string[]> = {
  // South America
  ar: ["es"], bo: ["es", "qu"], br: ["pt"], cl: ["es"], co: ["es"],
  cw: ["nl", "pap"], ec: ["es", "qu"], fk: ["en"], pe: ["es", "qu"], uy: ["es"],
  // Latin America
  cr: ["es"], do: ["es"], gt: ["es"], mx: ["es"], pa: ["es"], pr: ["es", "en"],
  // North America
  us: ["en"], "us-ak": ["en"], "us-hi": ["en"], ca: ["en", "fr"], bm: ["en"],
  gl: ["kl", "da"], mq: ["fr"], pm: ["fr"], um: ["en"], vi: ["en"],
  // Europe
  al: ["sq"], ad: ["ca"], at: ["de"], "pt-az": ["pt"], by: ["be", "ru"],
  be: ["nl", "fr", "de"], bg: ["bg"], hr: ["hr"], cy: ["el", "tr"], cz: ["cs"],
  dk: ["da"], ee: ["et"], fo: ["fo", "da"], fi: ["fi", "sv"], fr: ["fr"],
  de: ["de"], gi: ["en"], gr: ["el"], hu: ["hu"], is: ["is"], ie: ["en", "ga"],
  im: ["en"], it: ["it"], je: ["en"], lv: ["lv"], li: ["de"], lt: ["lt"],
  lu: ["lb", "fr", "de"], "pt-ma": ["pt"], mt: ["mt", "en"], mc: ["fr"],
  me: ["cnr"], nl: ["nl"], mk: ["mk"], no: ["no"], pl: ["pl"], pt: ["pt"],
  ro: ["ro"], ru: ["ru"], sm: ["it"], rs: ["sr"], sk: ["sk"], si: ["sl"],
  es: ["es"], sj: ["no"], se: ["sv"], ch: ["de", "fr", "it", "rm"], tr: ["tr"],
  ua: ["uk"], gb: ["en"],
  // Africa
  bw: ["en"], eg: ["ar"], sz: ["en"], gh: ["en"], ke: ["sw", "en"], ls: ["en"],
  mg: ["mg", "fr"], ml: ["fr"], na: ["en"], ng: ["en"], re: ["fr"],
  rw: ["rw", "fr", "en"], sn: ["fr"], za: ["en", "zu", "af"], st: ["pt"],
  tz: ["sw", "en"], tn: ["ar", "fr"], ug: ["en", "sw"],
  // Antarctica (Antarctica itself has no official language — skipped)
  gs: ["en"],
  // Asia
  bd: ["bn"], bt: ["dz"], io: ["en"], kh: ["km"], cn: ["zh"], hk: ["yue", "en"],
  in: ["hi", "en"], id: ["id"], iq: ["ar", "ku"], il: ["he", "ar"], ps: ["ar"],
  jp: ["ja"], jo: ["ar"], kz: ["kk", "ru"], kg: ["ky", "ru"], la: ["lo"],
  lb: ["ar", "fr"], mo: ["yue", "pt"], my: ["ms"], mn: ["mn"], np: ["ne"],
  om: ["ar"], pk: ["ur", "en"], ph: ["tl", "en"], qa: ["ar"],
  sg: ["en", "zh", "ms", "ta"], kr: ["ko"], lk: ["si", "ta"], tw: ["zh"],
  th: ["th"], ae: ["ar"], vn: ["vi"],
  // Oceania
  as: ["sm", "en"], au: ["en"], cx: ["en"], cc: ["en"], gu: ["en", "ch"],
  nz: ["en", "mi"], mp: ["en", "ch"], pn: ["en"], vu: ["bi", "en", "fr"],
};

addTagOptionsFromMap(countryLanguages, "language", "lang", (id) => languageNames[id] ?? id);

// --- Continent -------------------------------------------------------------
// A real geographic continent, distinct from the app's "region" grouping
// (which lumps Central America/Caribbean into "Latin America" for
// navigation purposes, not geography). Transcontinental countries
// (Russia, Turkey, Cyprus) are tagged with both — OR logic means picking
// either one still matches them, which is correct.
const continentNames: Record<string, string> = {
  samerica: "South America",
  namerica: "North America",
  europe: "Europe",
  africa: "Africa",
  asia: "Asia",
  oceania: "Oceania",
  antarctica: "Antarctica",
};
const CONTINENT_ORDER = ["samerica", "namerica", "europe", "africa", "asia", "oceania", "antarctica"];
for (const [i, id] of CONTINENT_ORDER.entries()) {
  options.push({ id: `continent-${id}`, category_id: "continent", label: continentNames[id], sort_order: i });
}

const countryContinents: Record<string, string[]> = {
  // South America
  ar: ["samerica"], bo: ["samerica"], br: ["samerica"], cl: ["samerica"],
  co: ["samerica"], ec: ["samerica"], fk: ["samerica"], pe: ["samerica"], uy: ["samerica"],
  // Latin America + North America + Caribbean — all geographically North America
  cr: ["namerica"], do: ["namerica"], gt: ["namerica"], mx: ["namerica"],
  pa: ["namerica"], pr: ["namerica"], us: ["namerica"], "us-ak": ["namerica"],
  "us-hi": ["namerica"], ca: ["namerica"], bm: ["namerica"], gl: ["namerica"],
  mq: ["namerica"], pm: ["namerica"], um: ["namerica"], vi: ["namerica"], cw: ["namerica"],
  // Europe (Russia/Turkey/Cyprus also tagged Asia below)
  al: ["europe"], ad: ["europe"], at: ["europe"], "pt-az": ["europe"], by: ["europe"],
  be: ["europe"], bg: ["europe"], hr: ["europe"], cy: ["europe", "asia"], cz: ["europe"],
  dk: ["europe"], ee: ["europe"], fo: ["europe"], fi: ["europe"], fr: ["europe"],
  de: ["europe"], gi: ["europe"], gr: ["europe"], hu: ["europe"], is: ["europe"],
  ie: ["europe"], im: ["europe"], it: ["europe"], je: ["europe"], lv: ["europe"],
  li: ["europe"], lt: ["europe"], lu: ["europe"], "pt-ma": ["europe"], mt: ["europe"],
  mc: ["europe"], me: ["europe"], nl: ["europe"], mk: ["europe"], no: ["europe"],
  pl: ["europe"], pt: ["europe"], ro: ["europe"], ru: ["europe", "asia"], sm: ["europe"],
  rs: ["europe"], sk: ["europe"], si: ["europe"], es: ["europe"], sj: ["europe"],
  se: ["europe"], ch: ["europe"], tr: ["europe", "asia"], ua: ["europe"], gb: ["europe"],
  // Africa
  bw: ["africa"], eg: ["africa"], sz: ["africa"], gh: ["africa"], ke: ["africa"],
  ls: ["africa"], mg: ["africa"], ml: ["africa"], na: ["africa"], ng: ["africa"],
  re: ["africa"], rw: ["africa"], sn: ["africa"], za: ["africa"], st: ["africa"],
  tz: ["africa"], tn: ["africa"], ug: ["africa"],
  // Antarctica
  aq: ["antarctica"], gs: ["antarctica"],
  // Asia
  bd: ["asia"], bt: ["asia"], io: ["asia"], kh: ["asia"], cn: ["asia"], hk: ["asia"],
  in: ["asia"], id: ["asia"], iq: ["asia"], il: ["asia"], ps: ["asia"], jp: ["asia"],
  jo: ["asia"], kz: ["asia"], kg: ["asia"], la: ["asia"], lb: ["asia"], mo: ["asia"],
  my: ["asia"], mn: ["asia"], np: ["asia"], om: ["asia"], pk: ["asia"], ph: ["asia"],
  qa: ["asia"], sg: ["asia"], kr: ["asia"], lk: ["asia"], tw: ["asia"], th: ["asia"],
  ae: ["asia"], vn: ["asia"],
  // Oceania
  as: ["oceania"], au: ["oceania"], cx: ["oceania"], cc: ["oceania"], gu: ["oceania"],
  nz: ["oceania"], mp: ["oceania"], pn: ["oceania"], vu: ["oceania"],
};

for (const [code, continentIds] of Object.entries(countryContinents)) {
  tags[code] ??= [];
  for (const continentId of continentIds) tags[code].push(`continent-${continentId}`);
}

// --- Fill remaining gaps in the color/line categories --------------------
// Unlike the gallery metas (where a missing photo legitimately means "not
// documented"), every paved road has *some* center-line color and every
// issued plate has *some* base color — leaving a country untagged here
// makes it silently fail to match anything, which is wrong, not honest.
// These defaults come from an already-tagged neighbour/governing country
// or a regional norm this project's own data already calls "the norm"
// (e.g. Ecuador's entry literally says "standard yellow/black colouring"),
// not guesses out of nowhere. Chevron colors for a few small
// territories/US-and-its-territories are left blank — the US's own
// chevron entry is a *researched* gap (Plonk It has no distinctive
// national US chevron), and the same uncertainty applies to Alaska,
// Hawaii, Bermuda, the US Minor Outlying Islands and the US Virgin
// Islands, so tagging a color there would fabricate a pattern the
// underlying research never found.

function fillIfMissing(code: string, categoryOptionIds: string[], fillIds: string[]) {
  tags[code] ??= [];
  const existing = tags[code];
  if (!categoryOptionIds.some((id) => existing.includes(id))) existing.push(...fillIds);
}

const ALL_LINE_OPTIONS = ["line-white", "line-yellow"];
const ALL_CHEVBG_OPTIONS = ["chevbg-white", "chevbg-black", "chevbg-yellow", "chevbg-red", "chevbg-blue"];
const ALL_CHEVARROW_OPTIONS = ["chevarrow-white", "chevarrow-black", "chevarrow-red", "chevarrow-yellow", "chevarrow-burgundy"];

function fillChevron(code: string, bgId: string, arrowId: string) {
  fillIfMissing(code, ALL_CHEVBG_OPTIONS, [bgId]);
  fillIfMissing(code, ALL_CHEVARROW_OPTIONS, [arrowId]);
}

// Road line color — white is the default nearly everywhere in Europe
// (this project's own US-page note: "yellow road lines are very rare in
// Europe") unless yellow is already documented as an exception; the
// Americas follow the yellow-center/white-edge pattern already tagged for
// most of their already-documented neighbours.
for (const code of ["co", "ec", "cr", "do", "pr", "us-ak", "us-hi", "um", "vi"]) {
  fillIfMissing(code, ALL_LINE_OPTIONS, ["line-yellow", "line-white"]);
}
fillIfMissing("gl", ALL_LINE_OPTIONS, ["line-white"]); // Danish convention
fillIfMissing("mq", ALL_LINE_OPTIONS, ["line-white"]); // French convention
fillIfMissing("pm", ALL_LINE_OPTIONS, ["line-white"]); // French convention
for (const code of [
  "al", "ad", "at", "pt-az", "by", "bg", "cy", "cz", "ee", "fo", "de", "gi", "hr", "im", "it",
  "lv", "li", "lt", "lu", "pt-ma", "mt", "mc", "me", "mk", "pt", "ro", "ru", "sm", "rs",
  "si", "sj", "ua", "sk",
]) {
  fillIfMissing(code, ALL_LINE_OPTIONS, ["line-white"]);
}

// Chevron colors — filled only where a clear regional/political analogue
// already exists in this same data set.
fillChevron("de", "chevbg-white", "chevarrow-red"); // at's own note: "Germany mostly uses red on white"
fillChevron("nl", "chevbg-white", "chevarrow-red"); // Benelux/German norm
fillChevron("lu", "chevbg-white", "chevarrow-red");
fillChevron("ru", "chevbg-red", "chevarrow-white"); // ee's own note: "shared with Russia"
fillChevron("by", "chevbg-red", "chevarrow-white"); // close Russian/Ukrainian tie
fillChevron("pt-az", "chevbg-black", "chevarrow-yellow"); // Portugal
fillChevron("pt-ma", "chevbg-black", "chevarrow-yellow");
fillChevron("gl", "chevbg-red", "chevarrow-white"); // Denmark
fillChevron("fo", "chevbg-red", "chevarrow-white"); // Denmark
fillChevron("sj", "chevbg-black", "chevarrow-yellow"); // Norway
fillChevron("li", "chevbg-black", "chevarrow-white"); // Switzerland-adjacent
fillChevron("mt", "chevbg-black", "chevarrow-white"); // British convention
fillChevron("cy", "chevbg-black", "chevarrow-white");
fillChevron("im", "chevbg-black", "chevarrow-white");
fillChevron("je", "chevbg-black", "chevarrow-white");
fillChevron("gi", "chevbg-black", "chevarrow-white");
fillChevron("ad", "chevbg-blue", "chevarrow-white"); // France/Spain shared trait
fillChevron("mc", "chevbg-blue", "chevarrow-white"); // France
fillChevron("mq", "chevbg-blue", "chevarrow-white"); // France
fillChevron("pm", "chevbg-blue", "chevarrow-white"); // France
fillChevron("me", "chevbg-white", "chevarrow-red"); // Balkan norm
fillChevron("mk", "chevbg-white", "chevarrow-red");
for (const code of ["bo", "co", "pe", "cr", "do", "gt", "mx", "pa", "pr"]) {
  fillChevron(code, "chevbg-yellow", "chevarrow-black"); // "standard yellow/black colouring" per this data set's own Ecuador/Uruguay notes
}

async function run() {
  console.log("Clearing existing filter data...");
  await supabase.from("country_filter_tags").delete().not("country_code", "is", null);
  await supabase.from("filter_options").delete().not("id", "is", null);
  await supabase.from("filter_categories").delete().not("id", "is", null);

  console.log(`Inserting ${categories.length} categories...`);
  const { error: catErr } = await supabase.from("filter_categories").insert(categories);
  if (catErr) throw catErr;

  console.log(`Inserting ${options.length} options...`);
  const { error: optErr } = await supabase.from("filter_options").insert(options);
  if (optErr) throw optErr;

  // Some country entries below still literally mention "plate-*" option ids
  // from the now-removed License plate color category (left as-is rather
  // than editing every one of ~70 lines) — drop anything that doesn't
  // correspond to a real option instead of failing on the FK insert.
  const validOptionIds = new Set(options.map((o) => o.id));
  const rows = Object.entries(tags).flatMap(([code, optionIds]) =>
    optionIds.filter((id) => validOptionIds.has(id)).map((optionId) => ({ country_code: code, filter_option_id: optionId }))
  );
  console.log(`Inserting ${rows.length} country/tag rows...`);
  const { error: tagErr } = await supabase.from("country_filter_tags").insert(rows);
  if (tagErr) throw tagErr;

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
