"use client";

import { useState } from "react";
import Image from "next/image";
import CountryFlag from "@/components/CountryFlag";
import { countryName } from "@/data/countries";
import type { FactsMeta } from "@/data/types";

export default function CurrencyFacts({ meta }: { meta: FactsMeta }) {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = meta.countries.filter((country) => {
    if (!q) return true;
    if (countryName(country.code).toLowerCase().includes(q)) return true;
    return country.facts.some((fact) => fact.value.toLowerCase().includes(q));
  });

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter by country or value…"
        className="mb-4 w-full max-w-xs rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
      />
      {filtered.length === 0 && (
        <p className="text-sm text-slate-600">No countries match &quot;{query}&quot;.</p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((country) => (
          <div
            key={country.code}
            className="rounded-xl border border-slate-800 bg-slate-900 p-4"
          >
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <CountryFlag code={country.code} name={countryName(country.code)} size={24} />
              <p className="font-medium text-slate-100">{countryName(country.code)}</p>
            </div>
            {country.image && (
              <div className="relative mt-3 aspect-4/3 w-full overflow-hidden rounded-lg bg-slate-800">
                <Image
                  src={country.image}
                  alt={`${meta.name} — ${countryName(country.code)}`}
                  fill
                  unoptimized
                  sizes="300px"
                  className="object-contain p-1"
                />
              </div>
            )}
            <dl className="mt-3 space-y-1.5">
              {country.facts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-3">
                  <dt className="text-xs text-slate-500">{fact.label}</dt>
                  <dd className="text-right text-sm font-medium text-slate-200">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            {country.sourceUrl && (
              <a
                href={country.sourceUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-3 inline-block text-xs text-emerald-400 hover:text-emerald-300"
              >
                Source: {meta.attribution} →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
