import CompareView from "@/components/CompareView";

export const metadata = {
  title: "Compare — Meta Lineup",
  description: "Compare two South American countries across every meta side by side.",
};

export default function ComparePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6">
      <header className="mb-8">
        <p className="text-sm font-medium text-emerald-400">South America</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Compare</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Torn between two countries? Pick both and see every meta side by side.
        </p>
      </header>

      <CompareView />
    </main>
  );
}
