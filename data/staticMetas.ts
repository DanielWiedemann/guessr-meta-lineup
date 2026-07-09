// Authoring source for the `metas`/`country_meta_entries`/`variants`/`facts`
// tables — edit bollards.ts/poles.ts/etc. directly, then re-run
// `scripts/migrate-to-supabase.ts` to sync to Supabase. The live app reads
// from Supabase (see data/db.ts), not from this file.

import type { Meta } from "@/data/types";
import { bollards } from "@/data/bollards";
import { poles } from "@/data/poles";
import { licensePlates } from "@/data/licensePlates";
import { roadLines } from "@/data/roadLines";
import { signs } from "@/data/signs";
import { currency } from "@/data/currency";
import { phoneNumbers } from "@/data/phoneNumbers";

export const staticMetas: Meta[] = [
  bollards,
  poles,
  licensePlates,
  roadLines,
  signs,
  currency,
  phoneNumbers,
];
