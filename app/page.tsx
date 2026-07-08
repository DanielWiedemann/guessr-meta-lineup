import { metas } from "@/data/metas";
import MetaGallery from "@/components/MetaGallery";

const upcomingMetas = ["Poles", "License plates", "Lamp posts", "Road lines"];

export default function Home() {
  const meta = metas[0];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6">
      <header className="mb-8">
        <p className="text-sm font-medium text-emerald-400">South America</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          Meta Lineup
        </h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Not sure which country you&apos;re in? Skip hunting through
          country-by-country guides — browse every documented variant of a
          meta side by side and match it to what you see in-game.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        <span className="rounded-full bg-emerald-500/15 px-4 py-1.5 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/40">
          {meta.name}
        </span>
        {upcomingMetas.map((name) => (
          <span
            key={name}
            className="rounded-full bg-slate-900 px-4 py-1.5 text-sm text-slate-500 ring-1 ring-slate-800"
          >
            {name} · soon
          </span>
        ))}
      </div>

      <p className="mb-6 max-w-2xl text-sm text-slate-400">{meta.description}</p>

      <MetaGallery meta={meta} />

      <footer className="mt-16 border-t border-slate-800 pt-6 text-xs text-slate-500">
        <p>
          Images and clues sourced from{" "}
          <a
            href="https://www.plonkit.net/guide"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-slate-400 underline hover:text-slate-200"
          >
            Plonk It
          </a>
          , licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-slate-400 underline hover:text-slate-200"
          >
            CC BY-NC-SA 4.0
          </a>
          . This is an unofficial, non-commercial fan project and isn&apos;t
          affiliated with Plonk It or GeoGuessr.
        </p>
      </footer>
    </main>
  );
}
