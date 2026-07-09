import { getQuizQuestions } from "@/data/quiz";
import QuizGame from "@/components/QuizGame";

export const metadata = {
  title: "Quiz — Meta Lineup",
  description: "Practice matching GeoGuessr metas to their country.",
};

export default async function QuizPage() {
  const questions = await getQuizQuestions();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-8 sm:px-6">
      <header className="mb-6">
        <p className="text-sm font-medium text-emerald-400">The Americas &amp; Europe</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Quiz</h1>
        <p className="mt-2 text-sm text-slate-400">
          Guess the country from the clue — {questions.length} questions pulled from
          every meta in the lineup.
        </p>
      </header>

      <QuizGame questions={questions} />
    </main>
  );
}
