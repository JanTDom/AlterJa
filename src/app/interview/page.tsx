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
  RefreshCw,
  Loader2,
  Award,
} from "lucide-react";
import { MemoryLayer } from "@/domains/types";

interface MicroQuestion {
  id: string;
  topic: string;
  question: string;
  context: string;
  category: MemoryLayer;
}

const INITIAL_QUESTIONS: MicroQuestion[] = [
  {
    id: "q-1",
    topic: "Kryteria wyboru ścieżki zawodowej",
    question: "Co w przeszłości najbardziej zaważyło na Twojej decyzji o zmianie środowiska pracy?",
    context: "Pozwala modelowi zrozumieć Twoje wartości w sferze zawodowej bez zgadywania.",
    category: "values",
  },
  {
    topic: "Reakcja na presję czasu",
    id: "q-2",
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
  const [questions, setQuestions] = useState<MicroQuestion[]>(INITIAL_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [answersCount, setAnswersCount] = useState(0);
  const [isGeneratingNext, setIsGeneratingNext] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSaveAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim()) return;

    const savedText = answerText.trim();

    try {
      await fetch("/api/interview/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: currentQ.topic,
          questionText: currentQ.question,
          answerText: savedText,
          category: currentQ.category,
        }),
      });
    } catch (err) {
      console.warn("Błąd zapisu odpowiedzi przez API:", err);
    }

    setAnswerText("");
    setAnswersCount((prev) => prev + 1);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsDone(true);
    }
  };

  const handleSkip = () => {
    setAnswerText("");
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsDone(true);
    }
  };

  const handleFetchAdaptiveQuestion = async () => {
    setIsGeneratingNext(true);
    try {
      const res = await fetch("/api/interview/generate-question", {
        method: "POST",
      });
      const data = await res.json();
      if (data && data.question) {
        setQuestions((prev) => [...prev, data]);
        setCurrentIdx(questions.length);
        setIsDone(false);
      }
    } catch (err) {
      console.error("[Adaptive Question Error]", err);
    } finally {
      setIsGeneratingNext(false);
    }
  };

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-blue/15 selection:text-alterja-blue">
      <Navbar />

      {/* PEŁNOFORMATOWA KINOWA SCENA FOTOGRAFICZNA — ALTERJA-SPHERE */}
      <section className="relative w-full min-h-[360px] md:min-h-[420px] flex items-center overflow-hidden bg-slate-950 border-b border-slate-800">
        <Image
          src="/images/alterja-sphere.jpg"
          alt="Sfera pytań ukrytych w pamięci i koncentryczne orbity tożsamości"
          fill
          priority
          className="object-cover object-center filter brightness-90 contrast-110 scale-[1.01]"
        />

        {/* Dynamiczny skaner biometryczny */}
        <div className="absolute inset-0 scanline-bar opacity-25 pointer-events-none" />

        {/* Kurtyna asymetryczna */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-blue-300 text-xs font-mono backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Studio wywiadu · Adaptacyjny silnik poznawczy</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white editorial-display leading-tight">
              Wywiad autobiograficzny o wysokiej wartości
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
              Model nie zgaduje Twoich poglądów — pyta o konkretne dylematy i kryteria życiowe. Każda odpowiedź natychmiast uziemia nową kartę pamięci.
            </p>
          </div>

          <div className="flex items-center gap-4 px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 text-xs font-mono text-slate-300 shadow-xl">
            <Fingerprint className="w-4 h-4 text-emerald-400" />
            <span>Zapisano odpowiedzi: {answersCount}</span>
          </div>
        </div>
      </section>

      {/* GŁÓWNA POWIERZCHNIA WYWIADU */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-8">
        {!isDone && currentQ ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span className="px-2.5 py-1 rounded-full bg-alterja-blue/10 text-alterja-blue font-semibold uppercase">
                  Pytanie {currentIdx + 1} z {questions.length}
                </span>
                <span>• Warstwa: {currentQ.category}</span>
              </div>

              <button
                type="button"
                onClick={handleFetchAdaptiveQuestion}
                disabled={isGeneratingNext}
                className="text-xs font-mono text-alterja-blue hover:underline flex items-center gap-1.5 disabled:opacity-50"
              >
                {isGeneratingNext ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )}
                <span>Wygeneruj nowe pytanie AI</span>
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-medium block">
                {currentQ.topic}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-medium text-slate-950 leading-relaxed">
                {currentQ.question}
              </h2>
              <p className="text-xs text-slate-500 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <strong className="text-slate-700">Wpływ na model:</strong> {currentQ.context}
              </p>
            </div>

            <form onSubmit={handleSaveAnswer} className="space-y-4">
              <textarea
                rows={6}
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Napisz szczerze i własnymi słowami. Nie musisz silić się na formę literacką — model uczy się Twojego autentycznego toku myślenia..."
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue leading-relaxed font-sans"
                required
              />

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-5 py-2.5 rounded-2xl text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  <span>Pomiń to pytanie</span>
                </button>

                <button
                  type="submit"
                  disabled={!answerText.trim()}
                  className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span>Zapisz w pamięci i przejdź dalej</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-medium text-slate-950">
                Sesja wywiadu zakończona
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Zapisano wszystkie odpowiedzi w bibliotece pamięci. Możesz przejść do rozmowy w trybie Rekonstrukcji lub wygenerować kolejne adaptacyjne pytania AI badające pozostałe warstwy.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={handleFetchAdaptiveQuestion}
                disabled={isGeneratingNext}
                className="px-6 py-3 rounded-2xl bg-alterja-blue hover:bg-blue-700 text-white text-xs font-medium shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                {isGeneratingNext ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>Wygeneruj kolejne mikropytanie AI</span>
              </button>

              <a
                href="/chat"
                className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium shadow-md transition-all active:scale-95"
              >
                Przejdź do czatu z modelem
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
