"use client";

import { useState } from "react";
import MetaGallery from "@/components/MetaGallery";
import SignsGallery from "@/components/SignsGallery";
import CurrencyFacts from "@/components/CurrencyFacts";
import type { Meta } from "@/data/types";

const upcomingMetas = ["Lamp posts", "Google cars"];

export default function MetaSwitcher({ metas }: { metas: Meta[] }) {
  const [activeId, setActiveId] = useState(metas[0]?.id);
  const active = metas.find((m) => m.id === activeId) ?? metas[0];

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {metas.map((meta) => (
          <button
            key={meta.id}
            onClick={() => setActiveId(meta.id)}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition ${
              meta.id === active.id
                ? "bg-emerald-500/15 text-emerald-400 ring-emerald-500/40"
                : "bg-slate-900 text-slate-300 ring-slate-800 hover:text-slate-100"
            }`}
          >
            {meta.name}
          </button>
        ))}
        {upcomingMetas.map((name) => (
          <span
            key={name}
            className="rounded-full bg-slate-900/60 px-4 py-1.5 text-sm text-slate-600 ring-1 ring-slate-800"
          >
            {name} · soon
          </span>
        ))}
      </div>

      <p className="mb-6 max-w-2xl text-sm text-slate-400">{active.description}</p>

      {active.kind === "gallery" && <MetaGallery meta={active} />}
      {active.kind === "grouped-gallery" && <SignsGallery meta={active} />}
      {active.kind === "facts" && <CurrencyFacts meta={active} />}

      <p className="mt-6 text-xs text-slate-600">
        Source:{" "}
        <a
          href={active.attributionUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="underline hover:text-slate-400"
        >
          {active.attribution}
        </a>
      </p>
    </div>
  );
}
