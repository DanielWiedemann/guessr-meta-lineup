import { metas } from "@/data";
import MetaSwitcher from "@/components/MetaSwitcher";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6">
      <header className="mb-8">
        <p className="text-sm font-medium text-emerald-400">
          Latin America &amp; Europe
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          Meta Lineup
        </h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Not sure which country you&apos;re in? Skip hunting through
          country-by-country guides — browse every documented variant of a
          meta side by side and match it to what you see in-game.
        </p>
      </header>

      <MetaSwitcher metas={metas} />

      <footer className="mt-16 border-t border-slate-800 pt-6 text-xs text-slate-500">
        <p>
          Clue images and information sourced from{" "}
          <a
            href="https://www.plonkit.net/guide"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-slate-400 underline hover:text-slate-200"
          >
            Plonk It
          </a>{" "}
          (
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-slate-400 underline hover:text-slate-200"
          >
            CC BY-NC-SA 4.0
          </a>
          ),{" "}
          <a
            href="https://geohints.com"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-slate-400 underline hover:text-slate-200"
          >
            GeoHints
          </a>{" "}
          and{" "}
          <a
            href="https://commons.wikimedia.org/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-slate-400 underline hover:text-slate-200"
          >
            Wikimedia Commons
          </a>{" "}
          contributors (individual photo credits shown in each detail view).
          Flags from{" "}
          <a
            href="https://www.worldometers.info/geography/flags-of-the-world/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-slate-400 underline hover:text-slate-200"
          >
            Worldometer
          </a>
          . This is an unofficial, non-commercial fan project and isn&apos;t
          affiliated with any of these sites, GeoGuessr, or WorldGuessr.
        </p>
      </footer>
    </main>
  );
}
