import { cache } from "react";
import { supabase } from "@/lib/supabase";

export type Region = "South America" | "Latin America" | "Europe" | "North America";

export type Country = {
  code: string;
  name: string;
  region: Region;
  /** Override when the entity has no standalone flag in the Worldometer flag set (e.g. sub-national territories) */
  flagCode?: string;
};

export const fetchCountries = cache(async (): Promise<Country[]> => {
  const { data, error } = await supabase
    .from("countries")
    .select("code, name, region, flag_code")
    .order("name");
  if (error) throw error;
  return data.map((c) => ({
    code: c.code,
    name: c.name,
    region: c.region as Region,
    flagCode: c.flag_code ?? undefined,
  }));
});

export function flagUrl(code: string, flagCode?: string): string {
  return `https://www.worldometers.info/images/flags/w240/${flagCode ?? code}.webp`;
}
