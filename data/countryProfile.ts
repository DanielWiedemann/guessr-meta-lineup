import { getMetas } from "@/data/db";
import type { Meta, Variant, Fact } from "@/data/types";

export type ProfileSection =
  | {
      kind: "gallery";
      metaId: string;
      metaName: string;
      attribution: string;
      variants: Variant[];
      note?: string;
      sourceUrl?: string;
    }
  | {
      kind: "grouped-gallery";
      metaId: string;
      metaName: string;
      attribution: string;
      groups: { label: string; variants: Variant[]; note?: string }[];
    }
  | {
      kind: "facts";
      metaId: string;
      metaName: string;
      attribution: string;
      facts: Fact[];
      image?: string;
      sourceUrl?: string;
    };

function buildProfile(metas: Meta[], code: string): ProfileSection[] {
  return metas.map((meta): ProfileSection => {
    if (meta.kind === "gallery") {
      const country = meta.countries.find((c) => c.code === code);
      return {
        kind: "gallery",
        metaId: meta.id,
        metaName: meta.name,
        attribution: meta.attribution,
        variants: country?.variants ?? [],
        note: country?.note,
        sourceUrl: country?.sourceUrl,
      };
    }
    if (meta.kind === "grouped-gallery") {
      return {
        kind: "grouped-gallery",
        metaId: meta.id,
        metaName: meta.name,
        attribution: meta.attribution,
        groups: meta.groups.map((group) => {
          const country = group.countries.find((c) => c.code === code);
          return {
            label: group.label,
            variants: country?.variants ?? [],
            note: country?.note,
          };
        }),
      };
    }
    const country = meta.countries.find((c) => c.code === code);
    return {
      kind: "facts",
      metaId: meta.id,
      metaName: meta.name,
      attribution: meta.attribution,
      facts: country?.facts ?? [],
      image: country?.image,
      sourceUrl: country?.sourceUrl,
    };
  });
}

export async function getCountryProfile(code: string): Promise<ProfileSection[]> {
  const metas = await getMetas();
  return buildProfile(metas, code);
}

export async function getAllCountryProfiles(codes: string[]): Promise<Record<string, ProfileSection[]>> {
  const metas = await getMetas();
  return Object.fromEntries(codes.map((code) => [code, buildProfile(metas, code)]));
}
