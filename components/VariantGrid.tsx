"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import CountryFlag from "@/components/CountryFlag";
import { useCountries } from "@/components/CountriesProvider";
import type { CountryEntry } from "@/data/types";

type Tile = {
  country: CountryEntry;
  variant: CountryEntry["variants"][number];
};

export default function VariantGrid({
  countries,
  attribution,
  metaLabel,
}: {
  countries: CountryEntry[];
  attribution: string;
  metaLabel: string;
}) {
  const { countryName } = useCountries();
  const [active, setActive] = useState<Tile | null>(null);
  const [showEmpty, setShowEmpty] = useState(false);

  const tiles = useMemo<Tile[]>(
    () => countries.flatMap((country) => country.variants.map((variant) => ({ country, variant }))),
    [countries]
  );

  const emptyCountries = countries.filter((c) => c.variants.length === 0);

  return (
    <div>
      {tiles.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {tiles.map(({ country, variant }) => (
            <button
              key={variant.id}
              onClick={() => setActive({ country, variant })}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 text-left transition hover:border-emerald-500/60 hover:bg-slate-800/80 cursor-pointer"
            >
              <div className="relative aspect-4/3 w-full bg-slate-800">
                <Image
                  src={variant.image}
                  alt={`${variant.label} — ${countryName(country.code)}`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain p-2 transition group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-2 border-t border-slate-800 px-3 py-2">
                <CountryFlag code={country.code} name={countryName(country.code)} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-100">
                    {countryName(country.code)}
                  </p>
                  <p className="truncate text-xs text-slate-400">{variant.label}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">No documented examples for this yet.</p>
      )}

      {emptyCountries.length > 0 && (
        <div className="mt-8 border-t border-slate-800 pt-5">
          <button
            onClick={() => setShowEmpty((v) => !v)}
            className="text-sm text-slate-400 underline decoration-dotted underline-offset-4 hover:text-slate-200 cursor-pointer"
          >
            {showEmpty ? "Hide" : "Show"} {emptyCountries.length} countries with no
            documented {metaLabel.toLowerCase()} example ({emptyCountries
              .map((c) => countryName(c.code))
              .join(", ")})
          </button>
          {showEmpty && (
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {emptyCountries.map((c) => (
                <li
                  key={c.code}
                  className="rounded-xl border border-dashed border-slate-800 bg-slate-900/40 px-3 py-3 text-sm text-slate-400"
                >
                  <div className="flex items-center gap-2">
                    <CountryFlag code={c.code} name={countryName(c.code)} />
                    <span className="font-medium text-slate-300">{countryName(c.code)}</span>
                  </div>
                  <p className="mt-1 text-xs">
                    Not a reliable {metaLabel.toLowerCase()} meta, or no photo found yet.
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <CountryFlag code={active.country.code} name={countryName(active.country.code)} size={28} />
                <div>
                  <p className="font-semibold text-slate-100">
                    {countryName(active.country.code)}
                  </p>
                  <p className="text-sm text-slate-400">{active.variant.label}</p>
                </div>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="rounded-full border border-slate-700 px-2.5 py-1 text-slate-400 hover:text-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative mt-4 aspect-4/3 w-full overflow-hidden rounded-lg bg-slate-800">
              <Image
                src={active.variant.image}
                alt={`${active.variant.label} — ${countryName(active.country.code)}`}
                fill
                unoptimized
                sizes="512px"
                className="object-contain p-3"
              />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {active.variant.description}
            </p>
            {active.country.note && (
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                {active.country.note}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              {active.country.sourceUrl && (
                <a
                  href={active.country.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  See on {attribution} →
                </a>
              )}
              {active.variant.credit && (
                <a
                  href={active.variant.credit.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-slate-500 hover:text-slate-300"
                >
                  Photo: {active.variant.credit.author} ({active.variant.credit.license})
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
