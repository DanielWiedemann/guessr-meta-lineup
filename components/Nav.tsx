"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { southAmerica } from "@/data/countries";
import CountryFlag from "@/components/CountryFlag";

const links = [
  { href: "/", label: "Lineup" },
  { href: "/quiz", label: "Quiz" },
  { href: "/compare", label: "Compare" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return southAmerica.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  function goToCountry(code: string) {
    setQuery("");
    setOpen(false);
    router.push(`/country/${code}`);
  }

  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="mr-2 text-sm font-bold tracking-tight text-slate-100">
          Meta Lineup
        </Link>
        <div className="flex gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                pathname === link.href
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="relative ml-auto w-full max-w-[220px]">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && matches[0]) goToCountry(matches[0].code);
            }}
            placeholder="Jump to a country…"
            className="w-full rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
          />
          {open && matches.length > 0 && (
            <ul className="absolute right-0 z-20 mt-1 w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-lg">
              {matches.map((c) => (
                <li key={c.code}>
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => goToCountry(c.code)}
                    className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
                  >
                    <CountryFlag code={c.code} name={c.name} size={18} />
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
