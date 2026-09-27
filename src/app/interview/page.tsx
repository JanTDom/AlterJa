"use client";

import React, { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  SkipForward,
  Brain,
  HelpCircle,
} from "lucide-react";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";

interface MicroQuestion {
  id: string;
  topic: string;
  question: string;
  context: string;
  category: "biography" | "values" | "preferences" | "decisions";
}

const SAMPLE_QUESTIONS: MicroQuestion[] = [
  {
    id: "q-1",
    topic: "Kryteria wyboru ścieżki zawodowej",
    question: "Co w przeszłości najbardziej zaważyło na Twojej decyzji o zmianie środowiska pracy?",
    context: "Pozwala modelowi zrozumieć Twoje wartości w sferze zawodowej bez zgadywania.",
    category: "values",
  },
  {
    id: "q-2",
    topic: "Reakcja na presję czasu",
    question: "Gdy stajesz przed dylematem: dotrzymać terminu czy dopracować szczegół, jaki jest Twój naturalny odruch?",
    context: "Służy do kalibracji odpowiedzi w trybie asystenckim podczas nagłych kryzysów.",
    category: "decisions",
  },
  {
    id: "q-3",
    topic: "Odpoczynek i regeneracja",
    question: "Jakie warunki są dla Ciebie kluczowe, aby po intensywnym dniu naprawdę zregenerować siły?",
    context: "Pomaga asystentowi w planowaniu harmonogramu i poszanowaniu czasu ciszy.",
    category: "preferences",
  },
  {
    id: "q-4",
    topic: "Zarządzanie konfliktami",
    question: "Jak podchodzisz do sytuacji, w której kluczowy partner łamie wcześniejsze nieformalne ustalenie?",
    context: "Buduje warstwę wzorców reakcji w relacjach i negocjacjach.",
    category: "decisions",
  },
];

export default function InterviewPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [answersCount, setAnswersCount] = useState(0);

  const currentQ = SAMPLE_QUESTIONS[currentIdx];

  const handleSaveAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim()) return;

    globalStore.addMemory(DEMO_USER_ID, {
      layer: currentQ.category,
      title: `Wywiad: ${currentQ.topic}`,
      content: answerText.trim(),
      epistemic_status: "user_declaration",
      confidence: "confirmed",
      is_superseded: false,
    });

    setAnswerText("");
    setAnswersCount((prev) => prev + 1);

    if (currentIdx + 1 < SAMPLE_QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsDone(true);
    }
  };

  const handleSkip = () => {
    setAnswerText("");
    if (currentIdx + 1 < SAMPLE_QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsDone(true);
    }
  };

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        {/* Nagłówek */}
        <div className="pb-6 border-b border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-mono font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5 text-alterja-blue" />
            <span>Studio adaptacyjnego wywiadu · Szanowanie granic</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
            Mikropytania o wysokiej wartości poznawczej
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Odpowiadaj tylko na pytania, na które masz ochotę. Pomięcie pytania jest w pełni naturalnym wyborem i uczy model szacunku dla Twoich granic.
          </p>
        </div>

        {isDone ? (
          <div className="p-12 rounded-3xl bg-white border border-slate-200 shadow-card text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-950">Seria wywiadu zakończona</h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Zapisano {answersCount} nowych odpowiedzi bezpośrednio w Twojej strukturze pamięci. Model uwzględni je w kolejnych dialogach.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setCurrentIdx(0);
                  setIsDone(false);
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 hover:bg-slate-50"
              >
                Rozpocznij kolejną sesję
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold">
                Kategoria: {currentQ.category}
              </span>
              <span className="text-xs font-mono text-slate-600">
                Pytanie {currentIdx + 1} z {SAMPLE_QUESTIONS.length}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-medium text-alterja-blue block">{currentQ.topic}</span>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-950 leading-snug">
                „{currentQ.question}”
              </h2>
              <p className="text-xs text-slate-600 italic">{currentQ.context}</p>
            </div>

            <form onSubmit={handleSaveAnswer} className="space-y-4 pt-2">
              <textarea
                rows={4}
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Wpisz szczerą odpowiedź własnymi słowami..."
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue font-serif leading-relaxed"
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  <span>Pomiń to pytanie</span>
                </button>

                <button
                  type="submit"
                  disabled={!answerText.trim()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-medium transition-colors shadow-sm"
                >
                  <span>Zapisz w pamięci modelu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
