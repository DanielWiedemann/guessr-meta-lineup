import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { countries, countryName } from "@/data/countries";
import { getCountryProfile } from "@/data/countryProfile";
import CountryProfile from "@/components/CountryProfile";
import CountryFlag from "@/components/CountryFlag";

export function generateStaticParams() {
  return countries.map((c) => ({ code: c.code }));
}

export async function generateMetadata(props: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await props.params;
  return { title: `${countryName(code)} — Meta Lineup` };
}

export default async function CountryPage(props: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await props.params;
  const country = countries.find((c) => c.code === code);
  if (!country) notFound();
  const sections = getCountryProfile(code);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-8 sm:px-6">
      <header className="mb-8 flex items-center gap-3">
        <CountryFlag code={code} name={countryName(code)} size={40} />
        <div>
          <p className="text-sm font-medium text-emerald-400">{country.region}</p>
          <h1 className="text-3xl font-bold tracking-tight">{countryName(code)}</h1>
        </div>
      </header>

      <CountryProfile sections={sections} />
    </main>
  );
}
