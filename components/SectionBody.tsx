import type { ProfileSection } from "@/data/countryProfile";
import type { Variant } from "@/data/types";
import ExpandableImage from "@/components/ExpandableImage";

export function VariantCard({ variant }: { variant: Variant }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <ExpandableImage
        src={variant.image}
        alt={variant.label}
        className="aspect-4/3 bg-slate-800"
      />
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

export default function SectionBody({
  section,
  columns = 2,
}: {
  section: ProfileSection;
  columns?: 1 | 2;
}) {
  const gridCols = columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1";

  if (section.kind === "gallery") {
    if (section.variants.length === 0) {
      return (
        <p className="text-sm text-slate-600">
          No documented {section.metaName.toLowerCase()} meta for this country yet.
        </p>
      );
    }
    return (
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
    );
  }

  if (section.kind === "grouped-gallery") {
    return (
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
    );
  }

  // facts
  if (section.facts.length === 0) {
    return <p className="text-sm text-slate-600">No data.</p>;
  }
  return (
    <div className="max-w-xs space-y-1.5 rounded-xl border border-slate-800 bg-slate-900 p-4">
      {section.image && (
        <ExpandableImage
          src={section.image}
          alt={section.metaName}
          className="mb-3 aspect-4/3 overflow-hidden rounded-lg bg-slate-800"
          imageClassName="object-contain p-1"
          sizes="300px"
        />
      )}
      {section.facts.map((fact) => (
        <div key={fact.label} className="flex items-baseline justify-between gap-3">
          <span className="text-xs text-slate-500">{fact.label}</span>
          <span className="text-right text-sm font-medium text-slate-200">{fact.value}</span>
        </div>
      ))}
    </div>
  );
}
