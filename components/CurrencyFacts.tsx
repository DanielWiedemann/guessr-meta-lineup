import CountryFlag from "@/components/CountryFlag";
import { countryName } from "@/data/countries";
import type { FactsMeta } from "@/data/types";

export default function CurrencyFacts({ meta }: { meta: FactsMeta }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {meta.countries.map((country) => (
        <div
          key={country.code}
          className="rounded-xl border border-slate-800 bg-slate-900 p-4"
        >
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <CountryFlag code={country.code} name={countryName(country.code)} size={24} />
            <p className="font-medium text-slate-100">{countryName(country.code)}</p>
          </div>
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
  );
}
