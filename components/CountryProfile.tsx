import SectionBody from "@/components/SectionBody";
import type { ProfileSection } from "@/data/countryProfile";

export default function CountryProfile({
  sections,
  columns = 2,
}: {
  sections: ProfileSection[];
  columns?: 1 | 2;
}) {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.metaId}>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-slate-100">{section.metaName}</h2>
            <span className="text-xs text-slate-600">{section.attribution}</span>
          </div>
          <SectionBody section={section} columns={columns} />
        </section>
      ))}
    </div>
  );
}
