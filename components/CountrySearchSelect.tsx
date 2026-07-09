"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { countries, countryName } from "@/data/countries";
import CountryFlag from "@/components/CountryFlag";

export default function CountrySearchSelect({
  value,
  onChange,
  excludeCodes = [],
  onRemove,
}: {
  value: string;
  onChange: (code: string) => void;
  excludeCodes?: string[];
  onRemove?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [menuRect, setMenuRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayValue = open ? query : countryName(value);

  const options = countries
    .filter(
      (c) => !excludeCodes.includes(c.code) && c.name.toLowerCase().includes(query.trim().toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  function select(code: string) {
    onChange(code);
    setQuery("");
    setOpen(false);
  }

  function openMenu() {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setMenuRect({ top: rect.bottom, left: rect.left, width: rect.width });
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    function updateRect() {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) setMenuRect({ top: rect.bottom, left: rect.left, width: rect.width });
    }
    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
        <CountryFlag code={value} name={countryName(value)} size={22} />
      </div>
      <input
        value={displayValue}
        onChange={(e) => {
          setQuery(e.target.value);
          openMenu();
        }}
        onFocus={openMenu}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && options[0]) select(options[0].code);
        }}
        placeholder="Search country…"
        className={`w-full cursor-text rounded-xl border border-slate-800 bg-slate-900 py-3 text-lg font-semibold text-slate-100 placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none ${
          onRemove ? "pl-11 pr-9" : "pl-11 pr-4"
        }`}
      />
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label={`Remove ${countryName(value)}`}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full px-1.5 py-1 text-slate-500 hover:text-red-400"
        >
          ✕
        </button>
      )}
      {open &&
        menuRect &&
        createPortal(
          <ul
            style={{ position: "fixed", top: menuRect.top, left: menuRect.left, width: menuRect.width }}
            className="z-50 mt-1 max-h-64 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900 shadow-lg"
          >
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
          </ul>,
          document.body
        )}
    </div>
  );
}
