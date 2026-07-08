"use client";

import { useState } from "react";
import VariantGrid from "@/components/VariantGrid";
import type { GroupedGalleryMeta } from "@/data/types";

export default function SignsGallery({ meta }: { meta: GroupedGalleryMeta }) {
  const [activeGroupId, setActiveGroupId] = useState(meta.groups[0]?.id);
  const activeGroup = meta.groups.find((g) => g.id === activeGroupId) ?? meta.groups[0];

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {meta.groups.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveGroupId(group.id)}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition ${
              group.id === activeGroup.id
                ? "bg-emerald-500/15 text-emerald-400 ring-emerald-500/40"
                : "bg-slate-900 text-slate-400 ring-slate-800 hover:text-slate-200"
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      {activeGroup && (
        <VariantGrid
          key={activeGroup.id}
          countries={activeGroup.countries}
          attribution={meta.attribution}
          metaLabel={activeGroup.label}
        />
      )}
    </div>
  );
}
