"use client";

import { useState } from "react";
import { southAmerica, countryName } from "@/data/countries";
import { getCountryProfile } from "@/data/countryProfile";
import CountryProfile from "@/components/CountryProfile";
import CountryFlag from "@/components/CountryFlag";

function CountrySelect({
  value,
  onChange,
  excludeCode,
}: {
  value: string;
  onChange: (code: string) => void;
  excludeCode: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full cursor-pointer appearance-none rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-lg font-semibold text-slate-100 focus:border-emerald-500/50 focus:outline-none"
    >
      {southAmerica
        .filter((c) => c.code !== excludeCode)
        .map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
    </select>
  );
}

export default function CompareView() {
  const [a, setA] = useState(southAmerica[0].code);
  const [b, setB] = useState(southAmerica[1].code);

  return (
    <div>
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CountrySelect value={a} onChange={setA} excludeCode={b} />
        <CountrySelect value={b} onChange={setB} excludeCode={a} />
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
            <CountryFlag code={a} name={countryName(a)} size={28} />
            <h2 className="text-xl font-bold text-slate-100">{countryName(a)}</h2>
          </div>
          <CountryProfile code={a} sections={getCountryProfile(a)} />
        </div>
        <div>
          <div className="mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
            <CountryFlag code={b} name={countryName(b)} size={28} />
            <h2 className="text-xl font-bold text-slate-100">{countryName(b)}</h2>
          </div>
          <CountryProfile code={b} sections={getCountryProfile(b)} />
        </div>
      </div>
    </div>
  );
}
