"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import CountryFlag from "@/components/CountryFlag";
import { southAmerica, countryName } from "@/data/countries";
import type { QuizQuestion } from "@/data/quiz";

const BEST_STREAK_KEY = "meta-lineup-best-streak";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function readBestStreak(): number {
  if (typeof window === "undefined") return 0;
  const saved = Number(localStorage.getItem(BEST_STREAK_KEY) ?? 0);
  return Number.isNaN(saved) ? 0 : saved;
}

export default function QuizGame({ questions }: { questions: QuizQuestion[] }) {
  const [order, setOrder] = useState<QuizQuestion[]>(() => shuffle(questions));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(readBestStreak);
  const [answered, setAnswered] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const question = order[index];

  const options = useMemo(() => {
    if (!question) return [];
    const distractors = shuffle(
      southAmerica.filter((c) => c.code !== question.answerCode)
    )
      .slice(0, 3)
      .map((c) => c.code);
    return shuffle([question.answerCode, ...distractors]);
  }, [question]);

  if (!question) {
    return <p className="text-sm text-slate-500">Loading questions…</p>;
  }

  function handleAnswer(code: string) {
    if (selected) return;
    setSelected(code);
    setAnswered((a) => a + 1);
    if (code === question.answerCode) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        if (next > best) {
          setBest(next);
          localStorage.setItem(BEST_STREAK_KEY, String(next));
        }
        return next;
      });
    } else {
      setStreak(0);
    }
  }

  function next() {
    setSelected(null);
    if (index + 1 >= order.length) {
      setOrder(shuffle(questions));
      setIndex(0);
    } else {
      setIndex((i) => i + 1);
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
        <span>
          Score: <span className="font-semibold text-slate-200">{score}</span> / {answered}
        </span>
        <span>
          Streak: <span className="font-semibold text-slate-200">{streak}</span>{" "}
          <span className="text-slate-600">(best {best})</span>
        </span>
      </div>

      <p className="mb-1 text-xs font-medium text-emerald-400">{question.metaName}</p>
      <p className="mb-4 text-slate-200">{question.prompt}</p>

      {question.image ? (
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          <Image
            src={question.image}
            alt="Guess the country"
            fill
            unoptimized
            sizes="600px"
            className="object-contain p-3"
          />
        </div>
      ) : (
        <div className="flex aspect-4/3 w-full items-center justify-center rounded-xl border border-slate-800 bg-slate-900 px-6 text-center text-2xl font-bold text-slate-100">
          {question.factText}
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3">
        {options.map((code) => {
          const isCorrect = code === question.answerCode;
          const isSelected = code === selected;
          let cls = "border-slate-800 bg-slate-900 hover:border-emerald-500/50 cursor-pointer";
          if (selected) {
            if (isCorrect) cls = "border-emerald-500 bg-emerald-500/10";
            else if (isSelected) cls = "border-red-500 bg-red-500/10";
            else cls = "border-slate-800 bg-slate-900 opacity-50";
          }
          return (
            <button
              key={code}
              disabled={!!selected}
              onClick={() => handleAnswer(code)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm font-medium text-slate-100 transition ${cls}`}
            >
              <CountryFlag code={code} name={countryName(code)} />
              {countryName(code)}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-4 flex items-center justify-between">
          <a
            href={question.sourceUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-xs text-slate-500 underline hover:text-slate-300"
          >
            {question.sourceUrl ? "See source" : ""}
          </a>
          <button
            onClick={next}
            className="cursor-pointer rounded-full bg-emerald-500/15 px-5 py-2 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/40 hover:bg-emerald-500/25"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
