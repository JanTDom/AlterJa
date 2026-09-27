"use client";

import React, { useState } from "react";
import {
  Sparkles,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  SkipForward,
  CornerDownRight,
  Brain,
  ThumbsUp,
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
];

export default function InterviewPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [answeredCount, setAnsweredCount] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);

  const currentQ = SAMPLE_QUESTIONS[currentIdx % SAMPLE_QUESTIONS.length];

  const handleSaveAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim()) return;

    // Zapis odpowiedzi bezpośrednio do pamięci jako autentyczna deklaracja
    globalStore.addMemory(DEMO_USER_ID, {
      layer: currentQ.category,
      title: currentQ.topic,
      content: answerText.trim(),
      epistemic_status: "user_declaration",
      confidence: "confirmed",
      is_superseded: false,
      evidence: [
        {
          id: `ev-ans-${Date.now()}`,
          user_id: DEMO_USER_ID,
          memory_item_id: "new",
          source_item_id: "interview",
          exact_quote: answerText.trim(),
          source_title: `Wywiad biograficzny: ${currentQ.topic}`,
          created_at: new Date().toISOString(),
        },
      ],
    });

    setAnswerText("");
    setCurrentIdx((prev) => prev + 1);
    setAnsweredCount((prev) => prev + 1);
    setNotice("Twoja odpowiedź została zapisana w pamięci ze statusem potwierdzonej deklaracji.");
    setTimeout(() => setNotice(null), 4000);
  };

  const handleSkip = (reason: string) => {
    setAnswerText("");
    setCurrentIdx((prev) => prev + 1);
    setNotice(`Pominięto pytanie (${reason}). System uszanuje tę decyzję.`);
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full">
      {/* Powiadomienie */}
      {notice && (
        <div className="mb-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-sm flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-xs text-purple-400">
            Zamknij
          </button>
        </div>
      )}

      {/* Nagłówek */}
      <div className="mb-8 pb-6 border-b border-alterja-border">
        <span className="text-xs uppercase tracking-wider text-alterja-purple font-semibold">
          Adaptacyjny wywiad biograficzny
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">Studio wywiadu</h1>
        <p className="text-sm text-slate-400 mt-1">
          Krótkie pytania o wysokim przyroście wiedzy przy minimalnym wysiłku poznawczym. Zawsze
          możesz odpowiedzieć „nie wiem” lub zmienić temat.
        </p>
      </div>

      {/* Karta pytania */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono">
            Temat: {currentQ.topic}
          </span>
          <span className="text-xs text-slate-400">
            Ukończone odpowiedzi w sesji: {answeredCount}
          </span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            {currentQ.question}
          </h2>
          <p className="text-xs text-slate-400 mt-2 flex items-center space-x-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>{currentQ.context}</span>
          </p>
        </div>

        <form onSubmit={handleSaveAnswer} className="space-y-4 pt-2">
          <textarea
            rows={4}
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Napisz swoimi słowami, co o tym myślisz..."
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-alterja-purple focus:ring-1 focus:ring-alterja-purple leading-relaxed"
            required
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleSkip("Nie wiem / Trudno powiedzieć")}
                className="px-3.5 py-2 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850 text-xs font-medium"
              >
                Nie wiem
              </button>
              <button
                type="button"
                onClick={() => handleSkip("Nie chcę o tym rozmawiać")}
                className="px-3.5 py-2 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850 text-xs font-medium"
              >
                Pomiń ten temat
              </button>
            </div>

            <button
              type="submit"
              disabled={!answerText.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-alterja-purple to-alterja-blue text-white text-xs font-semibold hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg shadow-purple-500/20"
            >
              <span>Zapisz w pamięci</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
