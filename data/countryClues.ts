import { cache } from "react";
import { supabase } from "@/lib/supabase";

// The wide "filter fact" columns on the countries table — the same data the
// Chrome extension filters on (driving side, colours, scripts, currency,
// phone codes, ...). Surfaced on the website's country pages as a visual
// "Clues at a glance" panel.
export type CountryClues = {
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

const CLUE_COLUMNS =
  "code, driving_side, continents, languages, special_letters_latin, " +
  "special_letters_cyrillic, stop_sign_wording, road_line_color_inner, " +
  "road_line_color_outer, chevron_bg_color, chevron_arrow_color, scripts, " +
  "road_name_words, currency_symbols, phone_codes";

// One query for all countries, cached per request/build — the country page's
// generateStaticParams renders 136 pages and each would otherwise hit the DB.
export const fetchAllClues = cache(async (): Promise<Record<string, CountryClues>> => {
  const { data, error } = await supabase
    .from("countries")
    .select(CLUE_COLUMNS)
    .order("code")
    .returns<(CountryClues & { code: string })[]>();
  if (error) throw error;
  return Object.fromEntries((data ?? []).map(({ code, ...clues }) => [code, clues]));
});

export async function getCountryClues(code: string): Promise<CountryClues | undefined> {
  return (await fetchAllClues())[code];
}
