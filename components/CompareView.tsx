"use client";

import { useState } from "react";
import { countries } from "@/data/countries";
import { getCountryProfile } from "@/data/countryProfile";
import SectionBody from "@/components/SectionBody";
import CountrySearchSelect from "@/components/CountrySearchSelect";

const MIN_COUNTRIES = 2;
const MAX_COUNTRIES = 3;

export default function CompareView() {
  const [codes, setCodes] = useState<string[]>([countries[0].code, countries[1].code]);

  const profiles = codes.map((code) => getCountryProfile(code));
  const sectionCount = profiles[0]?.length ?? 0;
  const gridStyle = { gridTemplateColumns: `repeat(${codes.length}, minmax(0, 1fr))` };

  function setCode(index: number, code: string) {
    setCodes((prev) => prev.map((c, i) => (i === index ? code : c)));
  }

  function addCountry() {
    if (codes.length >= MAX_COUNTRIES) return;
    const next = countries.find((c) => !codes.includes(c.code));
    if (next) setCodes((prev) => [...prev, next.code]);
  }

  function removeCountry(index: number) {
    if (codes.length <= MIN_COUNTRIES) return;
    setCodes((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      {codes.length < MAX_COUNTRIES && (
        <button
          onClick={addCountry}
          className="mb-6 cursor-pointer rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-emerald-400 ring-1 ring-slate-800 hover:ring-emerald-500/40"
        >
          + Add a country
        </button>
      )}

      <div className="grid gap-x-4 gap-y-10 sm:gap-x-8" style={gridStyle}>
        {codes.map((code, i) => (
          <div key={i} className="sticky top-0 z-20 -mx-1 border-b border-slate-800 bg-slate-950 px-1 pb-3 pt-1">
            <CountrySearchSelect
              value={code}
              onChange={(newCode) => setCode(i, newCode)}
              excludeCodes={codes.filter((_, j) => j !== i)}
              onRemove={codes.length > MIN_COUNTRIES ? () => removeCountry(i) : undefined}
            />
          </div>
        ))}

        {Array.from({ length: sectionCount }).flatMap((_, sIdx) => {
          const first = profiles[0][sIdx];
          return [
            <div
              key={`heading-${sIdx}`}
              style={{ gridColumn: "1 / -1" }}
              className={
                sIdx === 0
                  ? "flex items-baseline justify-between"
                  : "flex items-baseline justify-between border-t border-slate-800 pt-6"
              }
            >
              <h3 className="text-lg font-semibold text-slate-100">{first.metaName}</h3>
              <span className="text-xs text-slate-600">{first.attribution}</span>
            </div>,
            ...profiles.map((sections, cIdx) => (
              <div key={`body-${sIdx}-${cIdx}`}>
                <SectionBody section={sections[sIdx]} columns={1} />
              </div>
            )),
          ];
        })}
      </div>
    </div>
  );
}
