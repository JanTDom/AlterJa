"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  SkipForward,
  Brain,
  HelpCircle,
  Fingerprint,
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
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-blue/15 selection:text-alterja-blue">
      <Navbar />

      {/* PEŁNOFORMATOWA KINOWA SCENA FOTOGRAFICZNA (AVATAR-PORTRAIT) */}
      <section className="relative w-full min-h-[380px] md:min-h-[440px] flex items-center overflow-hidden bg-slate-950">
        <Image
          src="/images/avatar-portrait.jpg"
          alt="Twarz człowieka przechodząca w świetlisty profil cyfrowej kopii AI"
          fill
          priority
          className="object-cover object-center scale-[1.02] filter brightness-90 contrast-105"
        />

        {/* Dynamiczny skaner biometryczny */}
        <div className="absolute inset-0 scanline-bar opacity-30 pointer-events-none" />

        {/* Kurtyna asymetryczna */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/20 text-purple-300 text-xs font-mono backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>Studio wywiadu · Klonowanie tożsamości i myślenia</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white editorial-display leading-tight">
              Wytrenuj swojego sobowtóra, by myślał jak Ty
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-xl">
              Nie trać czasu na tłumaczenie w kółko tego samego. Kilka szczerych odpowiedzi sprawi, że Twoja kopia AI przejmie Twoje zasady, styl i priorytety decyzyjne.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/15 text-xs font-mono text-slate-300 shadow-xl">
            <Fingerprint className="w-4 h-4 text-purple-400" />
            <span>Szanowanie granic i odmowy</span>
          </div>
        </div>
      </section>

      {/* OBSZAR ROBOCZY - KARTA WYWIADU */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8 relative z-20 -mt-10 sm:-mt-12">
        {isDone ? (
          <div className="p-12 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-slate-950 editorial-display">
              Seria wywiadu zakończona
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Zapisano {answersCount} nowych odpowiedzi bezpośrednio w Twojej strukturze pamięci. Model uwzględni je w kolejnych dialogach i decyzjach.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setCurrentIdx(0);
                  setIsDone(false);
                }}
                className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium transition-all shadow-md active:scale-95"
              >
                Rozpocznij kolejną sesję
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                Obszar: {currentQ.category}
              </span>
              <span className="text-xs font-mono text-slate-500 font-medium">
                Pytanie {currentIdx + 1} z {SAMPLE_QUESTIONS.length}
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-alterja-blue font-bold block">
                {currentQ.topic}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-slate-950 leading-snug editorial-display">
                „{currentQ.question}”
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 italic font-sans leading-relaxed">
                {currentQ.context}
              </p>
            </div>

            <form onSubmit={handleSaveAnswer} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1.5 font-medium">
                  Twoja odpowiedź lub zasada (własnymi słowami)
                </label>
                <textarea
                  rows={4}
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Napisz szczerze, jak postępujesz. Twój sobowtór AI przejmie dokładnie ten sposób myślenia..."
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue focus:bg-white shadow-inner transition-all font-medium"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  <span>Pomiń to pytanie (szanuj swój czas)</span>
                </button>

                <button
                  type="submit"
                  disabled={!answerText.trim()}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 shrink-0"
                >
                  <span>Zapisz w pamięci sobowtóra</span>
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
