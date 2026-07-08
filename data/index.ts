import type { Meta } from "@/data/types";
import { bollards } from "@/data/bollards";
import { currency } from "@/data/currency";
import { signs } from "@/data/signs";

export const metas: Meta[] = [bollards, signs, currency];

export function getMeta(id: string): Meta | undefined {
  return metas.find((m) => m.id === id);
}
