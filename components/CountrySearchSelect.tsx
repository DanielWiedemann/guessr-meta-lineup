"use client";

import { useState } from "react";
import { countries, countryName } from "@/data/countries";
import CountryFlag from "@/components/CountryFlag";

export default function CountrySearchSelect({
  value,
  onChange,
  excludeCodes = [],
}: {
  value: string;
  onChange: (code: string) => void;
  excludeCodes?: string[];
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const displayValue = open ? query : countryName(value);

  const options = countries.filter(
    (c) => !excludeCodes.includes(c.code) && c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  function select(code: string) {
    onChange(code);
    setQuery("");
    setOpen(false);
  }

  return (
    <div className="relative">
      <input
        value={displayValue}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          setQuery("");
          setOpen(true);
        }}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && options[0]) select(options[0].code);
        }}
        placeholder="Search country…"
        className="w-full cursor-text rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-lg font-semibold text-slate-100 placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
      />
      {open && (
        <ul className="absolute left-0 right-0 z-20 mt-1 max-h-64 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900 shadow-lg">
          {options.length > 0 ? (
            options.map((c) => (
              <li key={c.code}>
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => select(c.code)}
                  className="flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm text-slate-200 hover:bg-slate-800"
                >
                  <CountryFlag code={c.code} name={c.name} size={20} />
                  {c.name}
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-2.5 text-sm text-slate-600">No matches</li>
          )}
        </ul>
      )}
    </div>
  );
}
