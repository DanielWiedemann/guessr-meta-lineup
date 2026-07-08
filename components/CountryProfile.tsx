import VariantGrid from "@/components/VariantGrid";
import type { ProfileSection } from "@/data/countryProfile";

export default function CountryProfile({
  code,
  sections,
}: {
  code: string;
  sections: ProfileSection[];
}) {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.metaId}>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-slate-100">{section.metaName}</h2>
            <span className="text-xs text-slate-600">{section.attribution}</span>
          </div>

          {section.kind === "gallery" &&
            (section.variants.length > 0 ? (
              <VariantGrid
                countries={[
                  {
                    code,
                    variants: section.variants,
                    note: section.note,
                    sourceUrl: section.sourceUrl,
                  },
                ]}
                attribution={section.attribution}
                metaLabel={section.metaName}
              />
            ) : (
              <p className="text-sm text-slate-600">
                No documented {section.metaName.toLowerCase()} meta for this country yet.
              </p>
            ))}

          {section.kind === "grouped-gallery" && (
            <div className="space-y-6">
              {section.groups.map((group) => (
                <div key={group.label}>
                  <h3 className="mb-2 text-sm font-medium text-slate-400">{group.label}</h3>
                  {group.variants.length > 0 ? (
                    <VariantGrid
                      countries={[{ code, variants: group.variants, note: group.note }]}
                      attribution={section.attribution}
                      metaLabel={group.label}
                    />
                  ) : (
                    <p className="text-sm text-slate-600">No documented example yet.</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {section.kind === "facts" &&
            (section.facts.length > 0 ? (
              <div className="max-w-xs space-y-1.5 rounded-xl border border-slate-800 bg-slate-900 p-4">
                {section.facts.map((fact) => (
                  <div key={fact.label} className="flex items-baseline justify-between gap-3">
                    <span className="text-xs text-slate-500">{fact.label}</span>
                    <span className="text-right text-sm font-medium text-slate-200">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-600">No data.</p>
            ))}
        </section>
      ))}
    </div>
  );
}
