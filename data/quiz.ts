import { getMetas } from "@/data/db";
import type { Meta } from "@/data/types";

export type QuizQuestion = {
  id: string;
  metaName: string;
  prompt: string;
  image?: string;
  factText?: string;
  answerCode: string;
  sourceUrl?: string;
};

function fromMeta(meta: Meta): QuizQuestion[] {
  if (meta.kind === "gallery") {
    return meta.countries.flatMap((country) =>
      country.variants.map((variant) => ({
        id: `${meta.id}:${variant.id}`,
        metaName: meta.name,
        prompt: "Which country is this from?",
        image: variant.image,
        answerCode: country.code,
        sourceUrl: country.sourceUrl,
      }))
    );
  }

  if (meta.kind === "grouped-gallery") {
    return meta.groups.flatMap((group) =>
      group.countries.flatMap((country) =>
        country.variants.map((variant) => ({
          id: `${meta.id}:${group.id}:${variant.id}`,
          metaName: `${meta.name} — ${group.label}`,
          prompt: "Which country is this from?",
          image: variant.image,
          answerCode: country.code,
          sourceUrl: country.sourceUrl,
        }))
      )
    );
  }

  // facts meta (currency): quiz on the currency name or symbol
  return meta.countries.flatMap((country) => {
    const currencyName = country.facts.find((f) => f.label === "Currency")?.value;
    const symbol = country.facts.find((f) => f.label === "Symbol")?.value;
    if (!currencyName) return [];
    return [
      {
        id: `${meta.id}:${country.code}`,
        metaName: meta.name,
        prompt: `Which country uses the ${currencyName}${symbol ? ` (${symbol})` : ""}?`,
        factText: currencyName,
        answerCode: country.code,
        sourceUrl: country.sourceUrl,
      },
    ];
  });
}

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  const metas = await getMetas();
  return metas.flatMap(fromMeta);
}
