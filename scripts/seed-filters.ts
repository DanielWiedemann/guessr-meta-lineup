// Seeds every filterable fact directly onto the `countries` table — one
// row per country, with text[] array columns for anything genuinely
// multi-valued (languages, continents, letters, colors that vary within a
// country) — replacing the old filter_categories / filter_options /
// country_filter_tags three-table system. See
// supabase/migrations/20260709210000_wide_country_columns.sql.
//
// An EMPTY array (or null driving_side) means "not yet researched," NOT
// "this country has none" — the extension's matching logic treats missing
// data as "still possible," never as a mismatch. This also means the old
// fillIfMissing/fillChevron regional-guess fills are gone: they only
// existed because a gap used to wrongly exclude a country. Everything
// below is either (a) re-derived by hand from this project's own
// Plonk It-sourced prose in data/roadLines.ts / data/signs.ts, (b) a
// documented standards fact (a territory legally using its parent
// country's signage system, SADC/GOST/MUTCD conventions), or (c) merged
// web research with per-country sources. Where the prose documents "X is
// less common but exists," X is INCLUDED — under OR-matching, being
// inclusive only slightly dilutes a filter, while being exclusive can
// wrongly eliminate the correct country (which once cost the user an
// 86-country streak).
//
// NOTE: several road-line entries here intentionally differ from the old
// seed's tags. Cross-checking each tag against its own documented prose
// found that Guatemala, Mexico, Panama, Italy and the US had "white"
// tagged as their CENTER line color when the prose actually documents
// white as the OUTER/edge line color (and Panama/Italy explicitly note
// "no middle line" as the distinctive pattern).
//
// Run with: npx tsx --env-file=.env.local scripts/seed-filters.ts
// (after scripts/migrate-to-supabase.ts, which rebuilds the country rows).

import { createClient } from "@supabase/supabase-js";
import { currency } from "../data/currency";
import { phoneNumbers } from "../data/phoneNumbers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
}
const supabase = createClient(url, serviceRoleKey);

type Facts = {
  driving_side: "left" | "right" | null;
  continents: string[];
  languages: string[];
  special_letters_latin: string[];
  special_letters_cyrillic: string[];
  stop_sign_wording: string[];
  road_line_color_inner: string[];
  road_line_color_outer: string[];
  chevron_bg_color: string[];
  chevron_arrow_color: string[];
  scripts: string[];
  road_name_words: string[];
  currency_symbols: string[];
  phone_codes: string[];
};

// ---------------------------------------------------------------------------
// Side of driving — well-established public knowledge, complete for all
// entities except Antarctica (no traffic law; left null).
// ---------------------------------------------------------------------------

const DRIVES_LEFT = new Set([
  // Americas
  "bm", "vi", "fk",
  // Europe
  "cy", "ie", "im", "je", "mt", "gb",
  // Africa
  "bw", "sz", "ke", "ls", "na", "za", "tz", "ug",
  // Antarctica region
  "gs",
  // Asia
  "bd", "bt", "io", "hk", "in", "id", "jp", "mo", "my", "np", "pk", "sg", "lk", "th",
  // Oceania
  "au", "cx", "cc", "nz", "pn",
]);

// (Antarctica itself was removed from the app entirely — it doesn't appear
// in GeoGuessr play — so every remaining entity has a driving side.)

// ---------------------------------------------------------------------------
// Continent — true geography, not the app's "region" navigation grouping.
// Russia/Turkey/Cyprus are transcontinental and tagged with both.
// ---------------------------------------------------------------------------

const countryContinents: Record<string, string[]> = {
  // South America
  ar: ["South America"], bo: ["South America"], br: ["South America"], cl: ["South America"],
  co: ["South America"], ec: ["South America"], fk: ["South America"], pe: ["South America"],
  uy: ["South America"],
  // Central America / Caribbean / North America — all geographically North America
  cr: ["North America"], do: ["North America"], gt: ["North America"], mx: ["North America"],
  pa: ["North America"], pr: ["North America"], us: ["North America"], "us-ak": ["North America"],
  "us-hi": ["North America"], ca: ["North America"], bm: ["North America"], gl: ["North America"],
  mq: ["North America"], pm: ["North America"], um: ["North America"], vi: ["North America"],
  cw: ["North America"],
  // Europe
  al: ["Europe"], ad: ["Europe"], at: ["Europe"], "pt-az": ["Europe"], by: ["Europe"],
  be: ["Europe"], bg: ["Europe"], hr: ["Europe"], cy: ["Europe", "Asia"], cz: ["Europe"],
  dk: ["Europe"], ee: ["Europe"], fo: ["Europe"], fi: ["Europe"], fr: ["Europe"],
  de: ["Europe"], gi: ["Europe"], gr: ["Europe"], hu: ["Europe"], is: ["Europe"],
  ie: ["Europe"], im: ["Europe"], it: ["Europe"], je: ["Europe"], lv: ["Europe"],
  li: ["Europe"], lt: ["Europe"], lu: ["Europe"], "pt-ma": ["Europe"], mt: ["Europe"],
  mc: ["Europe"], me: ["Europe"], nl: ["Europe"], mk: ["Europe"], no: ["Europe"],
  pl: ["Europe"], pt: ["Europe"], ro: ["Europe"], ru: ["Europe", "Asia"], sm: ["Europe"],
  rs: ["Europe"], sk: ["Europe"], si: ["Europe"], es: ["Europe"], sj: ["Europe"],
  se: ["Europe"], ch: ["Europe"], tr: ["Europe", "Asia"], ua: ["Europe"], gb: ["Europe"],
  // Africa
  bw: ["Africa"], eg: ["Africa"], sz: ["Africa"], gh: ["Africa"], ke: ["Africa"],
  ls: ["Africa"], mg: ["Africa"], ml: ["Africa"], na: ["Africa"], ng: ["Africa"],
  re: ["Africa"], rw: ["Africa"], sn: ["Africa"], za: ["Africa"], st: ["Africa"],
  tz: ["Africa"], tn: ["Africa"], ug: ["Africa"],
  // Antarctica region
  gs: ["Antarctica"],
  // Asia
  bd: ["Asia"], bt: ["Asia"], io: ["Asia"], kh: ["Asia"], cn: ["Asia"], hk: ["Asia"],
  in: ["Asia"], id: ["Asia"], iq: ["Asia"], il: ["Asia"], ps: ["Asia"], jp: ["Asia"],
  jo: ["Asia"], kz: ["Asia"], kg: ["Asia"], la: ["Asia"], lb: ["Asia"], mo: ["Asia"],
  my: ["Asia"], mn: ["Asia"], np: ["Asia"], om: ["Asia"], pk: ["Asia"], ph: ["Asia"],
  qa: ["Asia"], sg: ["Asia"], kr: ["Asia"], lk: ["Asia"], tw: ["Asia"], th: ["Asia"],
  ae: ["Asia"], vn: ["Asia"],
  // Oceania
  as: ["Oceania"], au: ["Oceania"], cx: ["Oceania"], cc: ["Oceania"], gu: ["Oceania"],
  nz: ["Oceania"], mp: ["Oceania"], pn: ["Oceania"], vu: ["Oceania"],
};

// ---------------------------------------------------------------------------
// Languages — every language a player could realistically hear/see in a
// country (not just the single primary one), excluding obscure minority
// languages nobody could identify in-game. Stored as display names.
// ---------------------------------------------------------------------------

const countryLanguages: Record<string, string[]> = {
  // South America
  ar: ["Spanish"], bo: ["Spanish", "Quechua"], br: ["Portuguese"], cl: ["Spanish"],
  co: ["Spanish"], cw: ["Dutch", "Papiamentu"], ec: ["Spanish", "Quechua"], fk: ["English"],
  pe: ["Spanish", "Quechua"], uy: ["Spanish"],
  // Latin America
  cr: ["Spanish"], do: ["Spanish"], gt: ["Spanish"], mx: ["Spanish"], pa: ["Spanish"],
  pr: ["Spanish", "English"],
  // North America
  us: ["English"], "us-ak": ["English"], "us-hi": ["English"], ca: ["English", "French"],
  bm: ["English"], gl: ["Greenlandic", "Danish"], mq: ["French"], pm: ["French"],
  um: ["English"], vi: ["English"],
  // Europe
  al: ["Albanian"], ad: ["Catalan"], at: ["German"], "pt-az": ["Portuguese"],
  by: ["Belarusian", "Russian"], be: ["Dutch", "French", "German"], bg: ["Bulgarian"],
  hr: ["Croatian"], cy: ["Greek", "Turkish"], cz: ["Czech"], dk: ["Danish"],
  ee: ["Estonian", "Russian"], fo: ["Faroese", "Danish"], fi: ["Finnish", "Swedish"], fr: ["French"],
  de: ["German"], gi: ["English"], gr: ["Greek"], hu: ["Hungarian"], is: ["Icelandic"],
  ie: ["English", "Irish"], im: ["English"], it: ["Italian"], je: ["English"],
  lv: ["Latvian", "Russian"], li: ["German"], lt: ["Lithuanian"], lu: ["Luxembourgish", "French", "German"],
  "pt-ma": ["Portuguese"], mt: ["Maltese", "English"], mc: ["French"], me: ["Montenegrin"],
  nl: ["Dutch"], mk: ["Macedonian"], no: ["Norwegian"], pl: ["Polish"], pt: ["Portuguese"],
  ro: ["Romanian"], ru: ["Russian"], sm: ["Italian"], rs: ["Serbian"], sk: ["Slovak"],
  si: ["Slovenian"], es: ["Spanish"], sj: ["Norwegian"], se: ["Swedish"],
  ch: ["German", "French", "Italian", "Romansh"], tr: ["Turkish"], ua: ["Ukrainian", "Russian"],
  gb: ["English", "Welsh", "Scottish Gaelic"], // Welsh/Gaelic appear on bilingual UK signage
  // Africa
  bw: ["English"], eg: ["Arabic"], sz: ["English"], gh: ["English"], ke: ["Swahili", "English"],
  ls: ["English"], mg: ["Malagasy", "French"], ml: ["French"], na: ["English"], ng: ["English"],
  re: ["French"], rw: ["Kinyarwanda", "French", "English"], sn: ["French"],
  za: ["English", "Zulu", "Afrikaans"], st: ["Portuguese"], tz: ["Swahili", "English"],
  tn: ["Arabic", "French"], ug: ["English", "Swahili"],
  // Antarctica region
  gs: ["English"],
  // Asia
  bd: ["Bengali"], bt: ["Dzongkha"], io: ["English"], kh: ["Khmer"], cn: ["Mandarin Chinese"],
  hk: ["Cantonese", "English"], in: ["Hindi", "English"], id: ["Indonesian"],
  iq: ["Arabic", "Kurdish"], il: ["Hebrew", "Arabic"], ps: ["Arabic"], jp: ["Japanese"],
  jo: ["Arabic"], kz: ["Kazakh", "Russian"], kg: ["Kyrgyz", "Russian"], la: ["Lao"],
  lb: ["Arabic", "French"], mo: ["Cantonese", "Portuguese"], my: ["Malay"], mn: ["Mongolian"],
  np: ["Nepali"], om: ["Arabic"], pk: ["Urdu", "English"], ph: ["Filipino", "English"],
  qa: ["Arabic"], sg: ["English", "Mandarin Chinese", "Malay", "Tamil"], kr: ["Korean"],
  lk: ["Sinhala", "Tamil"], tw: ["Mandarin Chinese"], th: ["Thai"], ae: ["Arabic"],
  vn: ["Vietnamese"],
  // Oceania
  as: ["Samoan", "English"], au: ["English"], cx: ["English"], cc: ["English"],
  gu: ["English", "Chamorro"], nz: ["English", "Maori"], mp: ["English", "Chamorro"],
  pn: ["English"], vu: ["Bislama", "English", "French"],
};

// ---------------------------------------------------------------------------
// Special letters — each language's FULL standard diacritic/extra-letter
// set, not just the "iconic" ones. Under AND-matching a missing-but-real
// letter causes a false negative (the correct country silently
// disappears), which is exactly the bug that once killed an 86-country
// streak via Czech's missing á/é/í/ó/ú.
// ---------------------------------------------------------------------------

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
  st: ["ã", "õ", "ç", "á", "â", "é", "ê", "í", "ó", "ô", "ú"],
  // French (incl. French-speaking territories/regions)
  ca: ["é", "è", "ç", "à"], mq: ["é", "è", "ç", "à"], pm: ["é", "è", "ç", "à"],
  fr: ["é", "è", "ç", "à", "ê", "â", "ù", "î", "ô", "û", "ï", "ë"], mc: ["é", "è", "ç", "à"],
  re: ["é", "è", "ç", "à"], sn: ["é", "è", "ç", "à"], ml: ["é", "è", "ç", "à"],
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
  // Other Europe
  ad: ["ç", "ï", "à", "è", "é", "í", "ò", "ó", "ú", "ü"],
  ie: ["á", "é", "í", "ó", "ú"],
  it: ["à", "è", "é", "ì", "ò", "ù"],
  sm: ["à", "è", "é", "ì", "ò", "ù"],
  lu: ["é", "è", "ç", "ä", "ö", "ü", "ß"],
  mt: ["ġ", "ħ", "ż", "ċ"],
  be: ["é", "è", "ç"],
  ch: ["ä", "ö", "ü", "é", "è", "à"],
  tr: ["ç", "ğ", "ı", "ö", "ş", "ü"],
  // Asia (Latin-script languages)
  vn: ["ă", "â", "đ", "ê", "ô", "ơ", "ư"], // Vietnamese base letters (tone marks stack on top)
  // Africa
  za: ["ê", "ô"], // Afrikaans circumflexes appear on signage
};

// Distinctive Cyrillic letters per country — every non-core letter that
// language's alphabet actually contains, so a letter matches ALL countries
// that use it (not just the "most famous" one). Verified against each
// alphabet's Wikipedia article. Key correctness points that were wrong
// before: Belarusian/Kazakh/Kyrgyz/Mongolian all include the Russian
// ё/ы/э (Kazakh/Kyrgyz/Mongolian also ъ), so those letters must match
// them too, not Russia alone; Macedonian shares љ/њ/џ/ј with Serbian on
// top of its unique ѓ/ќ/ѕ. Ukrainian genuinely does NOT use ё/ы/э/ъ (it
// uses є/и/е and an apostrophe), so it correctly never matches those.
const cyrillicLetters: Record<string, string[]> = {
  // Russian: hard sign + the three letters Ukrainian/Serbian/Macedonian lack
  ru: ["ъ", "ы", "э", "ё"],
  // Belarusian: unique ў + dotted і, and it keeps ё/ы/э (no ъ — uses an apostrophe)
  by: ["ў", "і", "ё", "ы", "э"],
  // Ukrainian: its four distinctive letters (є/і/ї/ґ). Russian is also
  // widely spoken and written across Ukraine, and Russian-language signage,
  // shopfronts and ads carry ъ/ы/э/ё - so those match Ukraine too, not just
  // Russia. (The four Ukrainian-only letters still pin Ukraine uniquely.)
  ua: ["є", "і", "ї", "ґ", "ъ", "ы", "э", "ё"],
  // Bulgarian: ъ is a full vowel here; the rest of its alphabet is the shared core
  bg: ["ъ"],
  // Serbian: the six Serbian-specific letters
  rs: ["ђ", "ј", "љ", "њ", "ћ", "џ"],
  // Macedonian: unique ѓ/ќ/ѕ plus љ/њ/џ/ј shared with Serbian (uses ѓ/ќ where Serbian has ђ/ћ)
  mk: ["ѓ", "ќ", "ѕ", "џ", "љ", "њ", "ј"],
  // Kazakh: 9 Kazakh-specific letters + the full Russian set (incl. ё/ы/э/ъ)
  kz: ["ә", "ғ", "қ", "ң", "ө", "ұ", "ү", "һ", "і", "ъ", "ы", "э", "ё"],
  // Kyrgyz: ң/ө/ү + the full Russian set
  kg: ["ң", "ө", "ү", "ъ", "ы", "э", "ё"],
  // Mongolian: ө/ү + the full Russian set
  mn: ["ө", "ү", "ъ", "ы", "э", "ё"],
};

// ---------------------------------------------------------------------------
// Stop sign wording — from data/signs.ts prose plus well-established
// conventions (all of Europe uses "STOP" except Turkey's "DUR"; Canada
// uses both STOP and ARRÊT). Non-Latin wordings (止まれ, 정지, قف, ...)
// arrive via merged research below.
// ---------------------------------------------------------------------------

const stopWording: Record<string, string[]> = {
  // Americas
  ar: ["PARE"], bo: ["PARE"], br: ["PARE"], cl: ["PARE"], co: ["PARE"], ec: ["PARE"],
  pe: ["PARE"], uy: ["PARE"], do: ["PARE"], pr: ["PARE"],
  cr: ["ALTO"], gt: ["ALTO"], mx: ["ALTO"], pa: ["ALTO"],
  us: ["STOP"], "us-ak": ["STOP"], "us-hi": ["STOP"], ca: ["STOP", "ARRÊT"], bm: ["STOP"],
  gl: ["STOP"], mq: ["STOP"], pm: ["STOP"], um: ["STOP"], vi: ["STOP"],
  // Europe — standard international STOP everywhere except Turkey
  al: ["STOP"], ad: ["STOP"], at: ["STOP"], "pt-az": ["STOP"], by: ["STOP"], be: ["STOP"],
  bg: ["STOP"], hr: ["STOP"], cy: ["STOP"], cz: ["STOP"], dk: ["STOP"], ee: ["STOP"],
  fo: ["STOP"], fi: ["STOP"], fr: ["STOP"], de: ["STOP"], gi: ["STOP"], gr: ["STOP"],
  hu: ["STOP"], is: ["STOP"], ie: ["STOP"], im: ["STOP"], it: ["STOP"], je: ["STOP"],
  lv: ["STOP"], li: ["STOP"], lt: ["STOP"], lu: ["STOP"], "pt-ma": ["STOP"], mt: ["STOP"],
  mc: ["STOP"], me: ["STOP"], nl: ["STOP"], mk: ["STOP"], no: ["STOP"], pl: ["STOP"],
  pt: ["STOP"], ro: ["STOP"], ru: ["STOP"], sm: ["STOP"], rs: ["STOP"], sk: ["STOP"],
  si: ["STOP"], es: ["STOP"], sj: ["STOP"], se: ["STOP"], ch: ["STOP"],
  tr: ["DUR"], ua: ["STOP"], gb: ["STOP"],
  // Africa / Middle East — the SADC bloc and most anglophone Africa use
  // "STOP"; francophone Africa keeps the French "STOP" too (France itself
  // uses STOP). Arabic-script countries pair Latin "STOP" with قف.
  bw: ["STOP"], sz: ["STOP"], gh: ["STOP"], ke: ["STOP"], ls: ["STOP"], na: ["STOP"],
  ng: ["STOP"], za: ["STOP"], tz: ["STOP"], ug: ["STOP"], rw: ["STOP"], mg: ["STOP"],
  ml: ["STOP"], sn: ["STOP"], re: ["STOP"], st: ["STOP"], gs: ["STOP"],
  eg: ["STOP", "قف"], tn: ["STOP", "قف"],
  // Asia — distinctive native-script stop signs are strong GeoGuessr metas.
  jp: ["止まれ"], // red inverted triangle, not an octagon — iconic
  kr: ["정지", "STOP"], cn: ["停", "STOP"], tw: ["停"], th: ["หยุด", "STOP"],
  id: ["STOP", "BERHENTI"], my: ["BERHENTI", "STOP"], ph: ["STOP"],
  in: ["STOP"], np: ["STOP"], lk: ["STOP"], bd: ["STOP"], pk: ["STOP", "قف"],
  hk: ["STOP", "停"], mo: ["STOP", "停"], sg: ["STOP"],
  kg: ["STOP"], la: ["STOP"], kh: ["STOP"],
  il: ["STOP"], // red octagon with a white hand symbol; "STOP" also appears
  ae: ["STOP", "قف"], qa: ["STOP", "قف"], om: ["STOP", "قف"], jo: ["STOP", "قف"],
  lb: ["STOP", "قف"], iq: ["STOP", "قف"], ps: ["STOP", "قف"], bt: ["STOP"],
  io: ["STOP"],
  // Oceania — all STOP
  au: ["STOP"], nz: ["STOP"], as: ["STOP"], gu: ["STOP"], mp: ["STOP"],
  cx: ["STOP"], cc: ["STOP"], pn: ["STOP"], vu: ["STOP"],
  // Remaining stragglers — all use the Latin "STOP" octagon (some bilingual).
  cw: ["STOP"], fk: ["STOP"], kz: ["STOP"], mn: ["STOP"], vn: ["STOP"],
};

// ---------------------------------------------------------------------------
// Road line colors — inner (center/dividing) and outer (edge) as separate
// facts. Each value is the UNION of two sources: (1) this project's own
// Plonk It-sourced prose in data/roadLines.ts, hand-verified, and (2) the
// per-country road-line diagrams on geomastr.com (labelled "White Outside -
// Yellow Inside" etc.). Union, not override: a country that either source
// says uses a colour gets it. Under OR-matching that's the deliberate
// "inclusive beats exclusive" policy — a false positive only slightly
// dilutes a filter, while dropping a real colour can hide the correct
// answer (the failure mode that once cost an 86-country streak). Territory
// rows with no source of their own inherit their governing country's
// national road-marking standard (French DOMs, US territories, Portuguese
// islands, UK crown dependencies). "none" is a real value ("no centre line
// at all" is a documented Panama/Italy clue); an empty/absent entry means
// "not researched" and never excludes. Genuine no-source gaps (much of the
// Middle East, Central Asia, and a few tiny territories) are left out
// honestly rather than guessed.
// ---------------------------------------------------------------------------

const roadLinesInner: Record<string, string[]> = {
  ad: ["white"], ae: ["white", "yellow"], al: ["white", "yellow"], ar: ["white", "yellow"],
  as: ["yellow"], at: ["white"], au: ["white", "yellow"], bd: ["white"], be: ["white"],
  bg: ["white"], bm: ["white", "yellow"], bo: ["white", "yellow"], br: ["white", "yellow"],
  bt: ["white"], bw: ["white"], by: ["white"], ca: ["yellow"], cc: ["white", "yellow"],
  ch: ["white", "yellow"], cl: ["white", "yellow"], cn: ["white", "yellow"], co: ["white", "yellow"],
  cw: ["white"], cx: ["white"], cy: ["white"], cz: ["white"], de: ["white", "yellow"],
  dk: ["white"], do: ["yellow"], ec: ["yellow"], ee: ["white"], es: ["white"],
  fi: ["white", "yellow"], fo: ["white"], fr: ["white"], gb: ["white"], gh: ["white"],
  gi: ["white"], gl: ["white"], gr: ["white", "yellow"], gt: ["yellow"], gu: ["yellow"],
  hk: ["white"], // Plonk It: "white centre lines and white or yellow outer lines"
  hr: ["white"], hu: ["white"], id: ["white", "yellow"], ie: ["white"], il: ["white"],
  im: ["white"], in: ["white", "yellow"], is: ["white"], it: ["white", "none"], je: ["white"],
  jo: ["white"], jp: ["white", "yellow"], ke: ["yellow"], kg: ["white"], kh: ["yellow"],
  kr: ["white", "yellow"],
  kz: ["white"], // Plonk It: "all white road lines", "single white middle road line"
  la: ["white"], li: ["white"], lk: ["white"], ls: ["white"],
  lt: ["white"], lu: ["white"], lv: ["white"], mc: ["white"], me: ["white"], mg: ["white"],
  mk: ["white", "yellow"], mn: ["white"], mp: ["yellow"], mq: ["white"], mt: ["white"],
  mx: ["white", "yellow"], my: ["white"],
  na: ["white"], // Plonk It: "single yellow outer lines and white centre lines"
  ng: ["white"], nl: ["white"], no: ["white", "yellow"],
  nz: ["white", "yellow"],
  om: ["white"], // Plonk It: "yellow outer and white middle lines"
  pa: ["white", "yellow", "none"], pe: ["white", "yellow", "none"],
  ph: ["white", "yellow"], pl: ["white"], pm: ["white"], pr: ["yellow"], pt: ["white"],
  "pt-az": ["white"], "pt-ma": ["white"], qa: ["yellow"], re: ["white"], ro: ["white", "yellow"],
  rs: ["white"], ru: ["white", "yellow"], rw: ["yellow"], se: ["white"], sg: ["white"],
  si: ["white"], sj: ["white"], sk: ["white"], sm: ["white"], sn: ["white"],
  sz: ["white", "yellow"], th: ["yellow"], tn: ["white"], tr: ["white", "yellow"], tw: ["yellow"],
  ua: ["white"], ug: ["white", "yellow"], us: ["white", "yellow"], "us-ak": ["white", "yellow"],
  "us-hi": ["white", "yellow"], uy: ["white", "yellow"], vi: ["yellow"],
  vn: ["yellow", "white"], // Plonk It: "short yellow middle dashes particularly common"; lines "both white and yellow"
  za: ["white"],
};

const roadLinesOuter: Record<string, string[]> = {
  ad: ["white"], ae: ["yellow"], al: ["white"], ar: ["white"], as: ["white"], at: ["white"],
  au: ["white", "yellow"], bd: ["white"], be: ["white"], bg: ["white"], bm: ["white", "none"],
  bo: ["white"], br: ["white"], bt: ["white"], bw: ["yellow"], ca: ["white"], cc: ["white", "yellow"],
  ch: ["white"], cl: ["white", "yellow"], co: ["white", "yellow"], cw: ["white"], cx: ["white"],
  cy: ["yellow"], cz: ["white"], de: ["white", "yellow"], dk: ["white"], do: ["white"],
  ec: ["white"], ee: ["white"], es: ["white", "yellow"], fi: ["white"], fo: ["white"],
  fr: ["white"], gb: ["white", "yellow"], gh: ["white"], gi: ["white", "yellow"], gl: ["white"],
  gr: ["white"], gt: ["white"], gu: ["white"],
  hk: ["white", "yellow"], // Plonk It: "white or yellow outer lines"; yellow = no-stopping on small roads
  hr: ["white"], hu: ["white"], id: ["white"],
  ie: ["yellow"], il: ["yellow"], im: ["white", "yellow"], in: ["white", "yellow"], is: ["white"],
  it: ["white"], je: ["yellow"], jo: ["yellow"], jp: ["white"], ke: ["white"], kg: ["white"],
  kh: ["white"], kr: ["white"],
  kz: ["white", "yellow"], // Plonk It: "all white road lines"; M36 highway "yellow outer lines"
  la: ["white"], lk: ["white", "yellow"], ls: ["yellow"],
  lt: ["white", "yellow"], lu: ["white"], lv: ["white"], mc: ["white"], me: ["white", "yellow"],
  mg: ["white"], mk: ["white", "yellow"], mn: ["white"], mp: ["white"], mq: ["white"], mt: ["white"],
  mx: ["white", "yellow"], my: ["white"],
  na: ["yellow", "white"], // Plonk It: "single yellow outer lines" (some B1 sections white-only)
  ng: ["yellow"], nl: ["white"], no: ["white"],
  np: ["yellow"], // Plonk It: "commonly uses outer yellow road lines"
  nz: ["white", "yellow"],
  om: ["yellow"], // Plonk It: "yellow outer and white middle lines"
  pa: ["white"], pe: ["white"], ph: ["white"], pl: ["white"], pm: ["white"],
  pr: ["white"], pt: ["white", "yellow"], "pt-az": ["white", "yellow"], "pt-ma": ["white", "yellow"],
  qa: ["white"], re: ["white"], ro: ["white", "yellow"], rs: ["white"], ru: ["white", "yellow"],
  rw: ["white"], se: ["white"], sg: ["white", "yellow"], si: ["white"], sk: ["white"], sm: ["white"],
  sn: ["white"], sz: ["yellow"], th: ["white"], tn: ["white"], tr: ["white", "yellow"], tw: ["white"],
  ua: ["white"], ug: ["white"], us: ["white"], "us-ak": ["white"], "us-hi": ["white"], vi: ["white"],
  vn: ["white", "yellow"], // Plonk It: "multiple different types of road lines, both white and yellow"
  za: ["yellow"],
};

// ---------------------------------------------------------------------------
// Chevron (curve warning) colors — from data/roadLines.ts prose, including
// colors the prose calls "less common" (inclusive beats exclusive under
// OR-matching), plus territories legally using their parent's signage
// system. The US and its territories are a RESEARCHED gap: Plonk It found
// no single national pattern, so tagging one would fabricate a signal.
// ---------------------------------------------------------------------------

const chevrons: Record<string, { bg: string[]; arrow: string[] }> = {
  // Americas
  ar: { bg: ["white"], arrow: ["red"] },
  br: { bg: ["black"], arrow: ["yellow"] },
  cl: { bg: ["yellow"], arrow: ["black"] },
  ec: { bg: ["yellow"], arrow: ["black"] },
  uy: { bg: ["yellow"], arrow: ["black"] },
  // "standard yellow/black colouring" per this data set's own Ecuador/
  // Uruguay notes — the documented Latin America regional standard
  bo: { bg: ["yellow"], arrow: ["black"] },
  co: { bg: ["yellow"], arrow: ["black"] },
  pe: { bg: ["yellow"], arrow: ["black"] },
  cr: { bg: ["yellow"], arrow: ["black"] },
  do: { bg: ["yellow"], arrow: ["black"] },
  gt: { bg: ["yellow"], arrow: ["black"] },
  mx: { bg: ["yellow"], arrow: ["black"] },
  pa: { bg: ["yellow"], arrow: ["black"] },
  pr: { bg: ["yellow"], arrow: ["black"] },
  ca: { bg: ["red", "yellow"], arrow: ["white", "black"] }, // Quebec red/white; rest yellow/black
  // Europe
  al: { bg: ["black"], arrow: ["white"] },
  at: { bg: ["red", "yellow"], arrow: ["white", "red"] },
  be: { bg: ["white"], arrow: ["red"] },
  bg: { bg: ["white"], arrow: ["red"] },
  hr: { bg: ["yellow", "white"], arrow: ["red"] },
  cz: { bg: ["white", "yellow"], arrow: ["red"] }, // "less common red-on-yellow also exists"
  dk: { bg: ["red"], arrow: ["white"] },
  ee: { bg: ["red"], arrow: ["white"] },
  fi: { bg: ["black"], arrow: ["yellow"] },
  fr: { bg: ["blue"], arrow: ["white"] },
  gr: { bg: ["black"], arrow: ["white"] },
  hu: { bg: ["white"], arrow: ["red"] },
  is: { bg: ["black"], arrow: ["yellow"] },
  ie: { bg: ["black"], arrow: ["yellow"] },
  it: { bg: ["black"], arrow: ["white"] },
  lv: { bg: ["white"], arrow: ["red"] },
  lt: { bg: ["white"], arrow: ["red"] },
  pl: { bg: ["white"], arrow: ["red"] },
  pt: { bg: ["black"], arrow: ["yellow"] },
  ro: { bg: ["white"], arrow: ["red"] },
  rs: { bg: ["white"], arrow: ["black"] },
  sk: { bg: ["white", "yellow"], arrow: ["red"] }, // "less common red-on-yellow also exists"
  si: { bg: ["white"], arrow: ["red", "black"] }, // "less common black-arrow version also exists"
  sm: { bg: ["yellow"], arrow: ["burgundy"] },
  es: { bg: ["black", "blue"], arrow: ["white"] },
  se: { bg: ["blue"], arrow: ["yellow"] },
  ch: { bg: ["black", "white"], arrow: ["white", "black"] }, // "rarely white with a black arrow"
  tr: { bg: ["white"], arrow: ["red"] },
  ua: { bg: ["red"], arrow: ["white"] },
  gb: { bg: ["black"], arrow: ["white"] },
  // Prose-documented neighbours/standards
  de: { bg: ["white"], arrow: ["red"] }, // Austria's own note: "Germany mostly uses red on white"
  ru: { bg: ["red"], arrow: ["white"] }, // Estonia's note: "Russia and Ukraine share the same scheme"
  by: { bg: ["red"], arrow: ["white"] }, // Belarus uses the same GOST-derived signage as Russia
  mk: { bg: ["white"], arrow: ["red", "black"] }, // bg's note (red-on-white) + rs's note (black-on-white) both name NMK
  me: { bg: ["white"], arrow: ["black"] }, // rs's note: "shared with Slovenia, Montenegro and North Macedonia"
  nl: { bg: ["white"], arrow: ["red"] }, // be's note: "also used in the Netherlands"
  // Territories legally using the parent country's signage system
  "pt-az": { bg: ["black"], arrow: ["yellow"] }, // Portugal
  "pt-ma": { bg: ["black"], arrow: ["yellow"] }, // Portugal
  gl: { bg: ["red"], arrow: ["white"] }, // Denmark
  fo: { bg: ["red"], arrow: ["white"] }, // Denmark
  sj: { bg: ["black"], arrow: ["yellow"] }, // Norway
  li: { bg: ["black"], arrow: ["white"] }, // Liechtenstein adopted the Swiss signage system
  mq: { bg: ["blue"], arrow: ["white"] }, // France
  pm: { bg: ["blue"], arrow: ["white"] }, // France
  mc: { bg: ["blue"], arrow: ["white"] }, // France
  // UK crown dependencies / territories with UK-style signage
  im: { bg: ["black"], arrow: ["white"] },
  je: { bg: ["black"], arrow: ["white"] },
  gi: { bg: ["black"], arrow: ["white"] },
  mt: { bg: ["black"], arrow: ["white"] }, // British-convention signage
  cy: { bg: ["black"], arrow: ["white"] }, // British-convention signage
  ad: { bg: ["blue", "black"], arrow: ["white"] }, // Andorra mixes French/Spanish styles
  // Plonk It country-guide prose (fetched directly from the guides)
  kz: { bg: ["yellow", "red"], arrow: ["black", "white"] }, // "primarily yellow and black chevrons, except on T intersections ... red and white"
  om: { bg: ["yellow"], arrow: ["black"] }, // "black-and-yellow chevrons that have an unusually large number of arrows"
  vn: { bg: ["yellow", "red"], arrow: ["black", "white"] }, // "either black on yellow or white on red"
};

// ---------------------------------------------------------------------------
// Writing scripts — the writing systems a player will see on local signage,
// so an unfamiliar alphabet's *shape* identifies the country even when it
// can't be read. Stored as display names; the extension pairs each with
// sample glyphs. Latin and Cyrillic aren't listed here — they have their
// own letter-tile categories. Notes on lookalikes:
//  * Thai vs Lao: same family; Lao is rounder with fewer serif "combs".
//  * Devanagari (Hindi/Nepali) has the connecting top bar; Bengali's top
//    bar has more angular hooks below it.
//  * Telugu/Kannada are round with check-mark headstrokes (south India);
//    Tamil is boxier with more right angles.
//  * Chinese characters include Japanese kanji — Japan is also tagged with
//    kana, which is the giveaway that it's Japan and not China/Taiwan.
// ---------------------------------------------------------------------------

const countryScripts: Record<string, string[]> = {
  // Southeast Asia
  th: ["Thai"], la: ["Lao"], kh: ["Khmer"],
  // East Asia
  cn: ["Chinese characters"], tw: ["Chinese characters"], hk: ["Chinese characters"],
  mo: ["Chinese characters"], sg: ["Chinese characters", "Tamil"],
  jp: ["Japanese kana", "Chinese characters"],
  kr: ["Korean Hangul"],
  // South Asia
  in: ["Devanagari", "Bengali", "Tamil", "Telugu", "Kannada", "Gujarati"],
  np: ["Devanagari"], bd: ["Bengali"], lk: ["Sinhala", "Tamil"],
  bt: ["Tibetan (Dzongkha)"],
  // Middle East / North Africa (Urdu uses the Perso-Arabic script)
  eg: ["Arabic"], tn: ["Arabic"], iq: ["Arabic"], jo: ["Arabic"], lb: ["Arabic"],
  om: ["Arabic"], qa: ["Arabic"], ae: ["Arabic"], ps: ["Arabic"],
  il: ["Hebrew", "Arabic"], pk: ["Arabic"],
  // Europe
  gr: ["Greek"], cy: ["Greek"],
};

// Unlike the other categories, script coverage is COMPLETE knowledge — we
// know France's signage is Latin, so an empty array would be a fake
// "unknown" that stops the filter from excluding anything. Every country
// gets Latin unless its signage is predominantly Cyrillic-only, plus
// Cyrillic where that's what's on the signs. (Serbia/Montenegro/North
// Macedonia/Kazakhstan genuinely use both scripts on signage; Greece,
// the Middle East and most of Asia romanize major road signs, so they
// keep Latin alongside their native script.)
const CYRILLIC_SIGNAGE = new Set(["ru", "ua", "by", "bg", "kg", "mn", "kz", "rs", "me", "mk"]);
const CYRILLIC_ONLY_SIGNAGE = new Set(["ru", "ua", "by", "bg", "kg", "mn"]);

function scriptsFor(code: string): string[] {
  const scripts = [...(countryScripts[code] ?? [])];
  if (CYRILLIC_SIGNAGE.has(code)) scripts.push("Cyrillic");
  if (!CYRILLIC_ONLY_SIGNAGE.has(code)) scripts.push("Latin");
  return scripts;
}

// ---------------------------------------------------------------------------
// Road-name designator words — the street-word prefixes/suffixes seen on
// name plates and signs ("Jalan Sudirman", "ul. Nowa", "Kirkevej",
// "Hauptstraße", "Rue de la Paix"). A country gets every designator a
// player will commonly see there. OR-matched in the extension.
// ---------------------------------------------------------------------------

const roadNameWords: Record<string, string[]> = {};
function roadWord(word: string, codes: string[]) {
  for (const code of codes) {
    const arr = (roadNameWords[code] ??= []);
    if (!arr.includes(word)) arr.push(word);
  }
}

roadWord("Jalan / Jl.", ["id", "my", "sg"]);

// --- Europe: German-speaking (Straße vs Strasse is a classic tell) -------
roadWord("-straße / Str.", ["de", "at", "lu"]); // ß spelling: Germany, Austria, Luxembourg
roadWord("-strasse", ["ch", "li"]); // Swiss / Liechtenstein spelling drops the ß
roadWord("-gasse", ["de", "at", "ch", "li"]);
roadWord("-weg", ["de", "at", "ch", "li", "nl", "be", "za"]); // German Weg + Dutch weg
roadWord("Allee / -allé", ["de", "at", "dk", "se", "no"]);
roadWord("Platz", ["de", "at", "ch", "li"]);
roadWord("Ring", ["de", "at"]);
roadWord("Strooss / Wee", ["lu"]); // Luxembourgish

// --- Europe: Dutch / Flemish --------------------------------------------
roadWord("-straat", ["nl", "be", "za", "cw"]); // Dutch + Afrikaans
roadWord("-steenweg", ["be"]); // very distinctive Belgian
roadWord("-laan", ["nl", "be"]);
roadWord("-gracht", ["nl"]); // canal-side, Amsterdam
roadWord("-singel", ["nl"]);
roadWord("-dreef", ["nl", "be"]);
roadWord("plein", ["nl", "be"]);
roadWord("Chaussée", ["be", "fr"]); // distinctive in Belgian French

// --- Europe: Nordic -----------------------------------------------------
roadWord("-vej / -gade", ["dk", "gl"]); // Danish (also Greenland)
roadWord("-vei / -veien", ["no", "sj"]); // Norwegian Bokmål (+ Svalbard)
roadWord("-veg / -vegen", ["no"]); // Norwegian Nynorsk
roadWord("-vägen", ["se"]); // Swedish
roadWord("-gatan", ["se"]); // Swedish definite - very distinctive
roadWord("-gränd", ["se"]);
roadWord("gata / gate", ["se", "no", "is", "fi"]);
roadWord("-vegur", ["fo", "is"]); // Faroese / Icelandic
roadWord("-stígur / -braut", ["is"]);
roadWord("-tie / -katu", ["fi"]); // Finnish
roadWord("-kuja / -polku", ["fi"]);

// --- Europe: Baltic -----------------------------------------------------
roadWord("-iela", ["lv"]); // Latvian "street" - unmistakable
roadWord("gatve / prospekts", ["lv"]);
roadWord("-gatvė", ["lt"]); // Lithuanian
roadWord("kelias / prospektas / alėja", ["lt"]);
roadWord("tänav / tee", ["ee"]); // Estonian
roadWord("-maantee / puiestee", ["ee"]); // distinctive Estonian

// --- Europe: Central ----------------------------------------------------
roadWord("ulica / ul.", ["pl", "hr", "si", "rs", "me", "sk"]); // Latin-script "street"
roadWord("ulice / třída", ["cz"]); // Czech
roadWord("aleja / al. / plac / pl.", ["pl"]); // Polish
roadWord("osiedle", ["pl"]);
roadWord("cesta", ["hr", "si", "sk", "cz"]);
roadWord("námestie / náměstí", ["sk", "cz"]);
roadWord("utca / út", ["hu"]);
roadWord("körút / köz", ["hu"]); // distinctive Hungarian
roadWord("Strada / Str.", ["ro"]);
roadWord("calea / bulevardul", ["ro"]);

// --- Europe: Balkan -----------------------------------------------------
roadWord("put / cesta", ["hr", "me", "rs"]);
roadWord("trg", ["hr", "si", "me", "rs"]);
roadWord("Rruga / Rr.", ["al", "mk"]); // Albanian - also in North Macedonia

// --- Europe: Cyrillic ---------------------------------------------------
roadWord("улица / ул. (Ulitsa)", ["ru", "by", "bg", "rs", "mk", "kz", "kg"]);
roadWord("вулиця / вул. (Vulytsia)", ["ua"]); // distinctly Ukrainian
roadWord("проспект (Prospekt)", ["ru", "ua", "by", "bg", "kz", "kg"]);
roadWord("булевар / булевард", ["bg", "rs", "mk"]);
// Catalan "street": Andorra, plus bilingual signage in Spain's Catalan-
// speaking regions (Catalonia, Balearics, Valencia) and in France's
// Roussillon / Perpignan, where official street plaques are French-Catalan.
roadWord("Carrer", ["ad", "es", "fr"]);
roadWord("Rue", [
  "fr", "be", "lu", "ch", "mc", "mq", "pm", "re", "sn", "ml", "tn", "lb",
  "mg", // francophone Madagascar
  "la", // Vientiane keeps French street names (Rue Setthathirath, ...)
  "vu", // Port Vila mixes French and English street names
]);
const SPANISH_SPEAKING = ["es", "ar", "bo", "cl", "co", "ec", "pe", "uy", "cr", "do", "gt", "mx", "pa", "pr"];
roadWord("Calle / Cl.", SPANISH_SPEAKING); // Cl. is the standard Calle abbreviation on address signs
roadWord("Carretera / Ctra.", SPANISH_SPEAKING); // the Spanish word for "highway"
roadWord("Avenida / Av.", SPANISH_SPEAKING);
roadWord("Plaza", SPANISH_SPEAKING);
roadWord("Paseo / Camino / Ronda", ["es"]);
roadWord("Cra. / Carrera", ["co"]); // Colombia's grid: Calle (E-W) × Carrera (N-S), a strong ID
// Spain's co-official languages - each is a strong regional tell
roadWord("Avinguda / Passeig (Catalan)", ["es", "ad"]);
roadWord("Plaça / Camí (Catalan)", ["es", "ad"]);
roadWord("Rúa / Praza / Camiño (Galician)", ["es"]);
roadWord("Kalea (Basque)", ["es"]); // unmistakable Basque Country
roadWord("Bidea / Etorbidea (Basque)", ["es"]);
roadWord("Rua", ["pt", "br", "pt-az", "pt-ma", "st", "mo"]); // Macau keeps Portuguese street names
roadWord("Travessa / Largo (Portuguese)", ["pt", "br", "pt-az", "pt-ma"]);
roadWord("Estrada / Praça (Portuguese)", ["pt", "br", "pt-az", "pt-ma"]);
roadWord("Via", ["it", "sm", "ch"]);
roadWord("Corso / Viale / Vicolo (Italian)", ["it", "sm"]);
roadWord("Piazza", ["it", "sm", "ch"]);
roadWord("Οδός / Λεωφόρος / Πλατεία", ["gr", "cy"]); // Greek street / avenue / square
roadWord("Triq / Pjazza", ["mt"]); // distinctly Maltese
roadWord("Ffordd / Stryd / Heol (Welsh)", ["gb"]); // bilingual Welsh signage
roadWord("Bóthar / Sráid (Irish)", ["ie", "gb"]);
roadWord("Rathad (Scottish Gaelic)", ["gb"]);
roadWord("Street / Road / Rd", [
  "us", "us-ak", "us-hi", "ca", "gb", "ie", "au", "nz", "za", "ke", "ng", "gh", "ug", "tz",
  "in", "pk", "ph", "sg", "hk", "mt", "cy", "gi", "im", "je", "bm", "vi", "fk", "as", "gu",
  "mp", "bw", "na", "ls", "sz",
  // English designators also standard on signage in:
  "rw", // Kigali's KG/KN/KK Ave/Rd/St street-code system
  "um", "io", "cx", "cc", "pn", "gs", // US/UK/AU small territories
  "bd", // Dhaka's numbered "Road 5" system
  "kh", // Phnom Penh's numbered "Street 271" system
  "lk", // "Galle Road" etc. alongside Mawatha
  "il", // bilingual Hebrew/English signs
  "eg", "jo", "om", "qa", "ae", // bilingual Arabic/English signs
  "tw", // Taipei's bilingual Rd/St suffixes
  "vu",
]);
roadWord("Caddesi / Cd. / Sokak", ["tr"]);
roadWord("Οδός", ["gr", "cy"]); // Greek "street"
roadWord("ถนน / ຖະໜົນ (Thanon)", ["th", "la"]); // same word in Thai and Lao
roadWord("Đường", ["vn"]);
roadWord("-ro / -gil", ["kr"]); // romanized on virtually every Korean street sign
roadWord("شارع (Sharia)", ["eg", "iq", "jo", "ps", "qa", "ae", "om", "lb"]); // Arabic "street"
roadWord("רחוב (Rehov)", ["il"]); // Hebrew "street"
roadWord("路 / 街 / 道 (Lù/Jiē/Dào)", ["cn", "tw", "hk", "mo"]); // Chinese road/street/avenue
roadWord("通り (-dōri)", ["jp"]); // the named-street word Japan does use
roadWord("гудамж (Gudamj)", ["mn"]); // Mongolian "street"
roadWord("ផ្លូវ (Phlauv)", ["kh"]); // Khmer "street"
roadWord("Marg", ["in", "np"]); // Devanagari-belt "road" (Janpath Marg, Durbar Marg)
roadWord("Mawatha / Mw", ["lk"]); // Sri Lanka's distinctive street word
roadWord("Lam", ["bt"]); // Thimphu street names (Norzin Lam, Chang Lam)
roadWord("Lalana", ["mg"]); // Malagasy "street" alongside French Rue

// ---------------------------------------------------------------------------
// Currency symbols — derived straight from data/currency.ts (the same
// GeoHints-sourced facts the website shows) so there's a single source of
// truth. The "Symbol" field lists variants separated by " / " (e.g.
// "$ / US$ / U$", "₽ / руб"); we split those and strip a trailing dot on
// plain tokens (kr. -> kr, but keep Panama's B/.). Variants are kept
// as-is, NOT collapsed: an earlier version folded every letter+$ form
// into "$", which erased Brazil's R$ - its one true symbol (bare $ is
// never used there) - along with Uruguay's $U and the DR's RD$. Distinct
// prefixed forms are exactly the giveaways a player sees on price tags.
function cleanCurrencySymbols(field: string): string[] {
  const out: string[] = [];
  for (let tok of field.split(/\s+\/\s+/).map((s) => s.trim()).filter(Boolean)) {
    if (!tok.includes("/")) tok = tok.replace(/\.$/, ""); // kr. -> kr, but keep B/.
    if (tok && !out.includes(tok)) out.push(tok);
  }
  return out;
}

const countryCurrency: Record<string, string[]> = {};
for (const entry of currency.countries) {
  const symbol = entry.facts.find((f) => f.label === "Symbol")?.value ?? "";
  countryCurrency[entry.code] = cleanCurrencySymbols(symbol);
}

// ---------------------------------------------------------------------------
// Phone country codes — straight from data/phoneNumbers.ts (GeoHints-
// sourced). Shared codes are the point: +1 narrows to the NANP countries,
// +44 to the UK and its crown dependencies, +7 to Russia/Kazakhstan.
// ---------------------------------------------------------------------------

// Values like "+44 (1624)" or "+1 (809, 829 or 849)" become the base code
// PLUS one value per area code: ["+44", "+44 1624"] - so seeing just "+44"
// matches the whole UK group, while the full "+44 1624" pins the Isle of
// Man (players genuinely memorise the +1-XXX Caribbean/Pacific codes).
const countryPhone: Record<string, string[]> = {};
for (const entry of phoneNumbers.countries) {
  const raw = entry.facts.find((f) => f.label === "Calling code")?.value?.trim();
  const base = raw?.match(/^\+\d+/)?.[0];
  if (!base) continue;
  const vals = [base];
  const paren = raw!.match(/\(([^)]+)\)/)?.[1];
  if (paren) {
    for (const area of paren.split(/,|\bor\b/).map((s) => s.trim()).filter((s) => /^\d+$/.test(s))) {
      vals.push(`${base} ${area}`);
    }
  }
  countryPhone[entry.code] = vals;
}

// ---------------------------------------------------------------------------
// Merged web research is edited directly into the maps above once verified
// — keeping a single source of truth per fact instead of a base + override
// layering.
// ---------------------------------------------------------------------------

async function run() {
  const { data: rows, error: fetchErr } = await supabase.from("countries").select("code");
  if (fetchErr) throw fetchErr;
  const dbCodes = new Set((rows ?? []).map((r) => r.code));

  // Catch typos: every map key must be a real country row.
  const allMaps: Record<string, Record<string, unknown>> = {
    countryContinents, countryLanguages, latinLetters, cyrillicLetters,
    stopWording, roadLinesInner, roadLinesOuter, chevrons, countryScripts,
    roadNameWords, countryCurrency, countryPhone,
  };
  for (const [mapName, map] of Object.entries(allMaps)) {
    for (const code of Object.keys(map)) {
      if (!dbCodes.has(code)) throw new Error(`${mapName} has unknown country code "${code}"`);
    }
  }

  const updates: { code: string; facts: Facts }[] = [];
  for (const code of dbCodes) {
    updates.push({
      code,
      facts: {
        driving_side: DRIVES_LEFT.has(code) ? "left" : "right",
        continents: countryContinents[code] ?? [],
        languages: countryLanguages[code] ?? [],
        special_letters_latin: latinLetters[code] ?? [],
        special_letters_cyrillic: cyrillicLetters[code] ?? [],
        stop_sign_wording: stopWording[code] ?? [],
        road_line_color_inner: roadLinesInner[code] ?? [],
        road_line_color_outer: roadLinesOuter[code] ?? [],
        chevron_bg_color: chevrons[code]?.bg ?? [],
        chevron_arrow_color: chevrons[code]?.arrow ?? [],
        scripts: scriptsFor(code),
        road_name_words: roadNameWords[code] ?? [],
        currency_symbols: countryCurrency[code] ?? [],
        phone_codes: countryPhone[code] ?? [],
      },
    });
  }

  console.log(`Updating ${updates.length} country rows...`);
  const CHUNK = 20;
  for (let i = 0; i < updates.length; i += CHUNK) {
    await Promise.all(
      updates.slice(i, i + CHUNK).map(async ({ code, facts }) => {
        const { error } = await supabase.from("countries").update(facts).eq("code", code);
        if (error) throw new Error(`Failed updating ${code}: ${error.message}`);
      })
    );
  }

  // Sanity summary
  const counted = (key: keyof Facts) =>
    updates.filter((u) => (key === "driving_side" ? u.facts[key] !== null : (u.facts[key] as string[]).length > 0)).length;
  console.log(`driving_side: ${counted("driving_side")}/${updates.length}`);
  console.log(`continents: ${counted("continents")}/${updates.length}`);
  console.log(`languages: ${counted("languages")}/${updates.length}`);
  console.log(`stop_sign_wording: ${counted("stop_sign_wording")}/${updates.length}`);
  console.log(`road_line_color_inner: ${counted("road_line_color_inner")}/${updates.length}`);
  console.log(`road_line_color_outer: ${counted("road_line_color_outer")}/${updates.length}`);
  console.log(`chevron_bg_color: ${counted("chevron_bg_color")}/${updates.length}`);
  console.log(`scripts: ${counted("scripts")}/${updates.length}`);
  console.log(`road_name_words: ${counted("road_name_words")}/${updates.length}`);
  console.log(`currency_symbols: ${counted("currency_symbols")}/${updates.length}`);
  console.log(`phone_codes: ${counted("phone_codes")}/${updates.length}`);
  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
