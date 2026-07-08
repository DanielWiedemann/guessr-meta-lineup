import type { Meta } from "@/data/types";
import { bollards } from "@/data/bollards";
import { poles } from "@/data/poles";
import { licensePlates } from "@/data/licensePlates";
import { roadLines } from "@/data/roadLines";
import { signs } from "@/data/signs";
import { currency } from "@/data/currency";
import { phoneNumbers } from "@/data/phoneNumbers";

export const metas: Meta[] = [
  bollards,
  poles,
  licensePlates,
  roadLines,
  signs,
  currency,
  phoneNumbers,
];

export function getMeta(id: string): Meta | undefined {
  return metas.find((m) => m.id === id);
}
