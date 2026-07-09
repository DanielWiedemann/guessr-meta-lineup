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
  { id: "stop_sign_wording", name: "Stop sign wording", description: "The word printed on the stop sign.", sort_order: 1 },
  { id: "plate_base_color", name: "License plate color", description: "The dominant background color of the plate.", sort_order: 2 },
  { id: "road_line_color", name: "Road center line color", description: "The color of the road's center dividing line.", sort_order: 3 },
  { id: "chevron_bg_color", name: "Chevron background color", description: "The background color of curve-warning chevron signs.", sort_order: 4 },
  { id: "chevron_arrow_color", name: "Chevron arrow color", description: "The arrow color on curve-warning chevron signs.", sort_order: 5 },
];

const options: { id: string; category_id: string; label: string; sort_order: number }[] = [
  { id: "drive-left", category_id: "side_of_driving", label: "Left", sort_order: 0 },
  { id: "drive-right", category_id: "side_of_driving", label: "Right", sort_order: 1 },

  { id: "stop-pare", category_id: "stop_sign_wording", label: "PARE", sort_order: 0 },
  { id: "stop-alto", category_id: "stop_sign_wording", label: "ALTO", sort_order: 1 },
  { id: "stop-stop", category_id: "stop_sign_wording", label: "STOP", sort_order: 2 },
  { id: "stop-dur", category_id: "stop_sign_wording", label: "DUR", sort_order: 3 },
  { id: "stop-arret", category_id: "stop_sign_wording", label: "ARRÊT", sort_order: 4 },

  { id: "plate-white", category_id: "plate_base_color", label: "White", sort_order: 0 },
  { id: "plate-yellow", category_id: "plate_base_color", label: "Yellow", sort_order: 1 },
  { id: "plate-black", category_id: "plate_base_color", label: "Black", sort_order: 2 },
  { id: "plate-blue", category_id: "plate_base_color", label: "Blue", sort_order: 3 },
  { id: "plate-varies", category_id: "plate_base_color", label: "Varies (state/province)", sort_order: 4 },

  { id: "line-white", category_id: "road_line_color", label: "White", sort_order: 0 },
  { id: "line-yellow", category_id: "road_line_color", label: "Yellow", sort_order: 1 },

  { id: "chevbg-white", category_id: "chevron_bg_color", label: "White", sort_order: 0 },
  { id: "chevbg-black", category_id: "chevron_bg_color", label: "Black", sort_order: 1 },
  { id: "chevbg-yellow", category_id: "chevron_bg_color", label: "Yellow", sort_order: 2 },
  { id: "chevbg-red", category_id: "chevron_bg_color", label: "Red", sort_order: 3 },
  { id: "chevbg-blue", category_id: "chevron_bg_color", label: "Blue", sort_order: 4 },

  { id: "chevarrow-white", category_id: "chevron_arrow_color", label: "White", sort_order: 0 },
  { id: "chevarrow-black", category_id: "chevron_arrow_color", label: "Black", sort_order: 1 },
  { id: "chevarrow-red", category_id: "chevron_arrow_color", label: "Red", sort_order: 2 },
  { id: "chevarrow-yellow", category_id: "chevron_arrow_color", label: "Yellow", sort_order: 3 },
  { id: "chevarrow-burgundy", category_id: "chevron_arrow_color", label: "Burgundy", sort_order: 4 },
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
};

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

  const rows = Object.entries(tags).flatMap(([code, optionIds]) =>
    optionIds.map((optionId) => ({ country_code: code, filter_option_id: optionId }))
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
