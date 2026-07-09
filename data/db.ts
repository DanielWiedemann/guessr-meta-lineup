import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { Meta, CountryEntry, FactCountry, Variant } from "@/data/types";

type VariantRow = {
  slug: string;
  label: string;
  description: string;
  image_url: string;
  credit_author: string | null;
  credit_license: string | null;
  credit_source_url: string | null;
  sort_order: number;
};

type FactRow = {
  label: string;
  value: string;
  sort_order: number;
};

type EntryRow = {
  group_key: string | null;
  group_label: string | null;
  country_code: string;
  source_url: string | null;
  note: string | null;
  image_url: string | null;
  variants: VariantRow[];
  facts: FactRow[];
};

type MetaRow = {
  id: string;
  kind: "gallery" | "grouped-gallery" | "facts";
  name: string;
  description: string;
  attribution: string;
  attribution_url: string;
  country_meta_entries: EntryRow[];
};

// Canonical sub-group order (grouped-gallery metas) — not guaranteed by row
// insertion order once read back from Postgres, so it's pinned here.
const GROUP_ORDER: Record<string, string[]> = {
  roadLines: ["lines", "chevrons"],
  signs: ["stop", "yield", "pedestrian", "busStop"],
};

function toVariant(v: VariantRow): Variant {
  return {
    id: v.slug,
    label: v.label,
    description: v.description,
    image: v.image_url,
    credit: v.credit_author
      ? { author: v.credit_author, license: v.credit_license ?? "", sourceUrl: v.credit_source_url ?? "" }
      : undefined,
  };
}

function toCountryEntry(e: EntryRow): CountryEntry {
  return {
    code: e.country_code,
    variants: [...e.variants].sort((a, b) => a.sort_order - b.sort_order).map(toVariant),
    note: e.note ?? undefined,
    sourceUrl: e.source_url ?? undefined,
  };
}

function toFactCountry(e: EntryRow): FactCountry {
  return {
    code: e.country_code,
    facts: [...e.facts]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((f) => ({ label: f.label, value: f.value })),
    image: e.image_url ?? undefined,
    sourceUrl: e.source_url ?? undefined,
  };
}

const byCode = (a: { code: string }, b: { code: string }) => a.code.localeCompare(b.code);

export const getMetas = cache(async (): Promise<Meta[]> => {
  const { data, error } = await supabase
    .from("metas")
    .select(
      `id, kind, name, description, attribution, attribution_url,
       country_meta_entries (
         group_key, group_label, country_code, source_url, note, image_url,
         variants ( slug, label, description, image_url, credit_author, credit_license, credit_source_url, sort_order ),
         facts ( label, value, sort_order )
       )`
    )
    .order("sort_order")
    .returns<MetaRow[]>();
  if (error) throw error;

  return data.map((m): Meta => {
    const entries = m.country_meta_entries ?? [];
    const base = {
      id: m.id,
      name: m.name,
      description: m.description,
      attribution: m.attribution,
      attributionUrl: m.attribution_url,
    };

    if (m.kind === "gallery") {
      return { ...base, kind: "gallery", countries: entries.map(toCountryEntry).sort(byCode) };
    }

    if (m.kind === "grouped-gallery") {
      const byGroup = new Map<string, EntryRow[]>();
      for (const e of entries) {
        const key = e.group_key ?? "";
        if (!byGroup.has(key)) byGroup.set(key, []);
        byGroup.get(key)!.push(e);
      }
      const order = GROUP_ORDER[m.id] ?? [...byGroup.keys()].sort();
      return {
        ...base,
        kind: "grouped-gallery",
        groups: order
          .filter((key) => byGroup.has(key))
          .map((key) => {
            const groupEntries = byGroup.get(key)!;
            return {
              id: key,
              label: groupEntries[0].group_label ?? key,
              countries: groupEntries.map(toCountryEntry).sort(byCode),
            };
          }),
      };
    }

    return { ...base, kind: "facts", countries: entries.map(toFactCountry).sort(byCode) };
  });
});
