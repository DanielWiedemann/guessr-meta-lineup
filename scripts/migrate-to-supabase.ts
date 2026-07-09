// One-off / re-runnable sync: static data/*.ts files -> Supabase.
// Truncates and reinserts everything each run, so the DB always exactly
// mirrors the current state of the source files. Requires
// SUPABASE_SERVICE_ROLE_KEY (server-only, bypasses RLS) in .env.local.

import { createClient } from "@supabase/supabase-js";
import { staticCountries as countries } from "../data/staticCountries";
import { staticMetas as metas } from "../data/staticMetas";
import type { CountryEntry, FactCountry } from "../data/types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
}

const supabase = createClient(url, serviceRoleKey);

async function run() {
  console.log("Clearing existing rows...");
  // Child tables first (FK order).
  await supabase.from("variants").delete().gte("sort_order", -1);
  await supabase.from("facts").delete().gte("sort_order", -1);
  await supabase.from("country_meta_entries").delete().not("id", "is", null);
  await supabase.from("metas").delete().not("id", "is", null);
  await supabase.from("countries").delete().not("code", "is", null);

  console.log(`Inserting ${countries.length} countries...`);
  const { error: countriesError } = await supabase.from("countries").insert(
    countries.map((c) => ({ code: c.code, name: c.name, region: c.region, flag_code: c.flagCode ?? null }))
  );
  if (countriesError) throw countriesError;

  console.log(`Inserting ${metas.length} metas...`);
  const { error: metasError } = await supabase.from("metas").insert(
    metas.map((m, i) => ({
      id: m.id,
      kind: m.kind,
      name: m.name,
      description: m.description,
      attribution: m.attribution,
      attribution_url: m.attributionUrl,
      sort_order: i,
    }))
  );
  if (metasError) throw metasError;

  async function insertEntry(
    metaId: string,
    groupKey: string | null,
    groupLabel: string | null,
    entry: CountryEntry | FactCountry
  ) {
    const image = "image" in entry ? entry.image ?? null : null;
    const { data, error } = await supabase
      .from("country_meta_entries")
      .insert({
        meta_id: metaId,
        group_key: groupKey,
        group_label: groupLabel,
        country_code: entry.code,
        source_url: entry.sourceUrl ?? null,
        note: "note" in entry ? entry.note ?? null : null,
        image_url: image,
      })
      .select("id")
      .single();
    if (error) throw new Error(`entry ${metaId}/${groupKey}/${entry.code}: ${error.message}`);
    const entryId = data.id as string;

    if ("variants" in entry && entry.variants.length > 0) {
      const { error: vErr } = await supabase.from("variants").insert(
        entry.variants.map((v, i) => ({
          entry_id: entryId,
          slug: v.id,
          label: v.label,
          description: v.description,
          image_url: v.image,
          credit_author: v.credit?.author ?? null,
          credit_license: v.credit?.license ?? null,
          credit_source_url: v.credit?.sourceUrl ?? null,
          sort_order: i,
        }))
      );
      if (vErr) throw new Error(`variants ${metaId}/${entry.code}: ${vErr.message}`);
    }

    if ("facts" in entry && entry.facts.length > 0) {
      const { error: fErr } = await supabase.from("facts").insert(
        entry.facts.map((f, i) => ({
          entry_id: entryId,
          label: f.label,
          value: f.value,
          sort_order: i,
        }))
      );
      if (fErr) throw new Error(`facts ${metaId}/${entry.code}: ${fErr.message}`);
    }
  }

  for (const meta of metas) {
    console.log(`Inserting entries for meta "${meta.id}" (${meta.kind})...`);
    if (meta.kind === "gallery" || meta.kind === "facts") {
      for (const entry of meta.countries) {
        await insertEntry(meta.id, null, null, entry);
      }
    } else {
      for (const group of meta.groups) {
        for (const entry of group.countries) {
          await insertEntry(meta.id, group.id, group.label, entry);
        }
      }
    }
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
