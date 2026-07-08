import Image from "next/image";
import type { ProfileSection } from "@/data/countryProfile";
import type { Variant } from "@/data/types";

function VariantCard({ variant }: { variant: Variant }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <div className="relative aspect-4/3 w-full bg-slate-800">
        <Image
          src={variant.image}
          alt={variant.label}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, 480px"
          className="object-contain p-2"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-slate-100">{variant.label}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">{variant.description}</p>
        {variant.credit && (
          <a
            href={variant.credit.sourceUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-2 inline-block text-xs text-slate-600 hover:text-slate-400"
          >
            Photo: {variant.credit.author} ({variant.credit.license})
          </a>
        )}
      </div>
    </div>
  );
}

export default function CountryProfile({
  sections,
  columns = 2,
}: {
  sections: ProfileSection[];
  columns?: 1 | 2;
}) {
  const gridCols = columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1";
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
              <>
                <div className={`grid gap-4 ${gridCols}`}>
                  {section.variants.map((variant) => (
                    <VariantCard key={variant.id} variant={variant} />
                  ))}
                </div>
                {section.note && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{section.note}</p>
                )}
                {section.sourceUrl && (
                  <a
                    href={section.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="mt-2 inline-block text-xs text-emerald-400 hover:text-emerald-300"
                  >
                    See on {section.attribution} →
                  </a>
                )}
              </>
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
                    <div className={`grid gap-4 ${gridCols}`}>
                      {group.variants.map((variant) => (
                        <VariantCard key={variant.id} variant={variant} />
                      ))}
                    </div>
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
                {section.image && (
                  <div className="relative mb-3 aspect-4/3 w-full overflow-hidden rounded-lg bg-slate-800">
                    <Image
                      src={section.image}
                      alt={section.metaName}
                      fill
                      unoptimized
                      sizes="300px"
                      className="object-contain p-1"
                    />
                  </div>
                )}
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
