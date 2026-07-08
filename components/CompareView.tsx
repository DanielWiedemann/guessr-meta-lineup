"use client";

import { useState } from "react";
import { southAmerica, countryName } from "@/data/countries";
import { getCountryProfile } from "@/data/countryProfile";
import CountryProfile from "@/components/CountryProfile";
import CountryFlag from "@/components/CountryFlag";
import CountrySearchSelect from "@/components/CountrySearchSelect";

export default function CompareView() {
  const [a, setA] = useState(southAmerica[0].code);
  const [b, setB] = useState(southAmerica[1].code);

  return (
    <div>
      <div className="mb-10 grid grid-cols-2 gap-3 sm:gap-6">
        <CountrySearchSelect value={a} onChange={setA} excludeCode={b} />
        <CountrySearchSelect value={b} onChange={setB} excludeCode={a} />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-10">
        <div>
          <div className="mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
            <CountryFlag code={a} name={countryName(a)} size={28} />
            <h2 className="text-xl font-bold text-slate-100">{countryName(a)}</h2>
          </div>
          <CountryProfile sections={getCountryProfile(a)} columns={1} />
        </div>
        <div>
          <div className="mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
            <CountryFlag code={b} name={countryName(b)} size={28} />
            <h2 className="text-xl font-bold text-slate-100">{countryName(b)}</h2>
          </div>
          <CountryProfile sections={getCountryProfile(b)} columns={1} />
        </div>
      </div>
    </div>
  );
}
