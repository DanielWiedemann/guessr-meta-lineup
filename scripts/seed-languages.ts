// Seeds languages + country_languages. Primary = official/national
// language; secondary = another widely-spoken or co-official language
// (kept to clearly major cases, not an exhaustive list of every minority
// or regional language, to keep this a tractable "basic info" pass).

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
}
const supabase = createClient(url, serviceRoleKey);

const languages: Record<string, string> = {
  ar: "Arabic", be: "Belarusian", bg: "Bulgarian", bi: "Bislama", bn: "Bengali",
  ca: "Catalan", ch: "Chamorro", cnr: "Montenegrin", cs: "Czech", da: "Danish",
  de: "German", dz: "Dzongkha", el: "Greek", en: "English", es: "Spanish",
  et: "Estonian", fi: "Finnish", fo: "Faroese", fr: "French", ga: "Irish",
  he: "Hebrew", hi: "Hindi", hr: "Croatian", hu: "Hungarian", id: "Indonesian",
  is: "Icelandic", it: "Italian", ja: "Japanese", kk: "Kazakh", kl: "Greenlandic",
  km: "Khmer", ko: "Korean", ku: "Kurdish", ky: "Kyrgyz", lb: "Luxembourgish",
  lo: "Lao", lt: "Lithuanian", lv: "Latvian", mg: "Malagasy", mi: "Maori",
  mk: "Macedonian", mn: "Mongolian", ms: "Malay", mt: "Maltese", ne: "Nepali",
  nl: "Dutch", no: "Norwegian", pap: "Papiamentu", pl: "Polish", pt: "Portuguese",
  rm: "Romansh", ro: "Romanian", ru: "Russian", rw: "Kinyarwanda", si: "Sinhala",
  sk: "Slovak", sl: "Slovenian", sm: "Samoan", sq: "Albanian", sr: "Serbian",
  sv: "Swedish", sw: "Swahili", ta: "Tamil", th: "Thai", tl: "Filipino",
  tr: "Turkish", uk: "Ukrainian", ur: "Urdu", vi: "Vietnamese", yue: "Cantonese",
  zh: "Mandarin Chinese", zu: "Zulu",
};

// country code -> [languageId, isPrimary][]
const countryLanguages: Record<string, [string, boolean][]> = {
  // South America
  ar: [["es", true]], bo: [["es", true]], br: [["pt", true]], cl: [["es", true]],
  co: [["es", true]], cw: [["nl", true], ["pap", false]], ec: [["es", true]],
  fk: [["en", true]], pe: [["es", true]], uy: [["es", true]],
  // Latin America
  cr: [["es", true]], do: [["es", true]], gt: [["es", true]], mx: [["es", true]],
  pa: [["es", true]], pr: [["es", true], ["en", false]],
  // North America
  us: [["en", true]], "us-ak": [["en", true]], "us-hi": [["en", true]],
  ca: [["en", true], ["fr", true]], bm: [["en", true]],
  gl: [["kl", true], ["da", false]], mq: [["fr", true]], pm: [["fr", true]],
  um: [["en", true]], vi: [["en", true]],
  // Europe
  al: [["sq", true]], ad: [["ca", true]], at: [["de", true]], "pt-az": [["pt", true]],
  by: [["be", true], ["ru", true]], be: [["nl", true], ["fr", true], ["de", true]],
  bg: [["bg", true]], hr: [["hr", true]], cy: [["el", true], ["tr", true]],
  cz: [["cs", true]], dk: [["da", true]], ee: [["et", true]],
  fo: [["fo", true], ["da", false]], fi: [["fi", true], ["sv", false]],
  fr: [["fr", true]], de: [["de", true]], gi: [["en", true]], gr: [["el", true]],
  hu: [["hu", true]], is: [["is", true]], ie: [["en", true], ["ga", true]],
  im: [["en", true]], it: [["it", true]], je: [["en", true]], lv: [["lv", true]],
  li: [["de", true]], lt: [["lt", true]], lu: [["lb", true], ["fr", true], ["de", true]],
  "pt-ma": [["pt", true]], mt: [["mt", true], ["en", true]], mc: [["fr", true]],
  me: [["cnr", true]], nl: [["nl", true]], mk: [["mk", true]], no: [["no", true]],
  pl: [["pl", true]], pt: [["pt", true]], ro: [["ro", true]], ru: [["ru", true]],
  sm: [["it", true]], rs: [["sr", true]], sk: [["sk", true]], si: [["sl", true]],
  es: [["es", true]], sj: [["no", true]], se: [["sv", true]],
  ch: [["de", true], ["fr", true], ["it", true], ["rm", false]], tr: [["tr", true]],
  ua: [["uk", true]], gb: [["en", true]],
  // Africa
  bw: [["en", true]], eg: [["ar", true]], sz: [["en", true]], gh: [["en", true]],
  ke: [["sw", true], ["en", true]], ls: [["en", true]], mg: [["mg", true], ["fr", false]],
  ml: [["fr", true]], na: [["en", true]], ng: [["en", true]], re: [["fr", true]],
  rw: [["rw", true], ["fr", false], ["en", false]], sn: [["fr", true]],
  za: [["en", true], ["zu", false]], st: [["pt", true]],
  tz: [["sw", true], ["en", false]], tn: [["ar", true], ["fr", false]],
  ug: [["en", true], ["sw", false]],
  // Antarctica (Antarctica itself has no official language — skipped)
  gs: [["en", true]],
  // Asia
  bd: [["bn", true]], bt: [["dz", true]], io: [["en", true]], kh: [["km", true]],
  cn: [["zh", true]], hk: [["yue", true], ["en", false]], in: [["hi", true], ["en", true]],
  id: [["id", true]], iq: [["ar", true], ["ku", false]], il: [["he", true], ["ar", false]],
  ps: [["ar", true]], jp: [["ja", true]], jo: [["ar", true]], kz: [["kk", true], ["ru", false]],
  kg: [["ky", true], ["ru", false]], la: [["lo", true]], lb: [["ar", true], ["fr", false]],
  mo: [["yue", true], ["pt", false]], my: [["ms", true]], mn: [["mn", true]],
  np: [["ne", true]], om: [["ar", true]], pk: [["ur", true], ["en", false]],
  ph: [["tl", true], ["en", true]], qa: [["ar", true]],
  sg: [["en", true], ["zh", false], ["ms", false], ["ta", false]], kr: [["ko", true]],
  lk: [["si", true], ["ta", false]], tw: [["zh", true]], th: [["th", true]],
  ae: [["ar", true]], vn: [["vi", true]],
  // Oceania
  as: [["sm", true], ["en", true]], au: [["en", true]], cx: [["en", true]],
  cc: [["en", true]], gu: [["en", true], ["ch", false]],
  nz: [["en", true], ["mi", false]], mp: [["en", true], ["ch", false]],
  pn: [["en", true]], vu: [["bi", true], ["en", false], ["fr", false]],
};

async function run() {
  console.log("Clearing existing language data...");
  await supabase.from("country_languages").delete().not("country_code", "is", null);
  await supabase.from("languages").delete().not("id", "is", null);

  const languageRows = Object.entries(languages).map(([id, name]) => ({ id, name }));
  console.log(`Inserting ${languageRows.length} languages...`);
  const { error: langErr } = await supabase.from("languages").insert(languageRows);
  if (langErr) throw langErr;

  const rows = Object.entries(countryLanguages).flatMap(([code, langs]) =>
    langs.map(([languageId, isPrimary]) => ({ country_code: code, language_id: languageId, is_primary: isPrimary }))
  );
  console.log(`Inserting ${rows.length} country/language rows...`);
  const { error: clErr } = await supabase.from("country_languages").insert(rows);
  if (clErr) throw clErr;

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
