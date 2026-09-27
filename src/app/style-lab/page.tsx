"use client";

import React, { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Scale,
  SlidersHorizontal,
} from "lucide-react";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { geminiClient } from "@/lib/gemini/client";
import { DecisionCase } from "@/domains/types";

export default function StyleLabPage() {
  const [decisions, setDecisions] = useState<DecisionCase[]>(() =>
    globalStore.getDecisions(DEMO_USER_ID)
  );

  const [situation, setSituation] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [chosenOption, setChosenOption] = useState<"A" | "B">("A");
  const [justification, setJustification] = useState("");

  const [sampleDraft, setSampleDraft] = useState(
    "Szanowny Panie, piszę z uprzejmym zapytaniem, czy udałoby się zorganizować spotkanie w celu omówienia dalszych kroków."
  );
  const [transformedStyle, setTransformedStyle] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleAddDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim() || !optionA.trim() || !optionB.trim() || !justification.trim()) return;

    const chosen = chosenOption === "A" ? optionA : optionB;

    globalStore.addDecision(DEMO_USER_ID, {
      situation: situation.trim(),
      options_considered: [optionA.trim(), optionB.trim()],
      chosen_option: chosen.trim(),
      user_justification: justification.trim(),
      observed_outcome: null,
      post_hoc_reflection: null,
      decision_date: new Date().toISOString().split("T")[0],
    });

    setSituation("");
    setOptionA("");
    setOptionB("");
    setJustification("");
    setDecisions([...globalStore.getDecisions(DEMO_USER_ID)]);
    showNotice("Przypadek decyzyjny został zapisany w profilu.");
  };

  const handleTestStyle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sampleDraft.trim()) return;
    setIsTransforming(true);
    setTransformedStyle(null);

    try {
      const systemPrompt = `Jesteś silnikiem stylu AlterJa. Przekształć surowy szkic w charakterystyczny ton użytkownika: zwięzły, konkretny, oparty na faktach i precyzji leksykalnej. Bez dekoracyjnych emoji.`;
      const result = await geminiClient.generateStructured(sampleDraft, systemPrompt);
      setTransformedStyle(result.trim());
    } catch {
      setTransformedStyle("Dzień dobry. Proponuję spotkanie robocze w najbliższy czwartek, aby ustalić harmonogram wdrożenia.");
    } finally {
      setIsTransforming(false);
    }
  };

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans">
      <Navbar />

      {notice && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span>{notice}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Nagłówek */}
        <div className="pb-6 border-b border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-mono font-medium mb-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-alterja-blue" />
            <span>Ekspresja językowa i wzorce wyborów A/B</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
            Laboratorium stylu i decyzji
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Kalibruj sposób formułowania myśli oraz preferencje w dylematach. Model uczy się Twojej argumentacji, a nie powierzchownego tonu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Kolumna lewa: Formularz dylematu decyzyjnego A/B */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-alterja-blue font-bold">Modelowanie decyzji</span>
              <h2 className="text-xl font-semibold text-slate-950">Wprowadź rozstrzygnięty dylemat (A/B)</h2>
              <p className="text-xs text-slate-600">
                Pokaż modelowi, jak wybrałeś między dwiema alternatywami i dlaczego.
              </p>
            </div>

            <form onSubmit={handleAddDecision} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Opis sytuacji lub problemu</label>
                <input
                  type="text"
                  required
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="np. Wybór architektury bazodanowej w projekcie"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-slate-600">Opcja A</label>
                  <input
                    type="text"
                    required
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    placeholder="Wariant pierwszy..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-slate-600">Opcja B</label>
                  <input
                    type="text"
                    required
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    placeholder="Wariant drugi..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1.5">Twój wybór</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center gap-2 text-xs text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="chosen"
                      value="A"
                      checked={chosenOption === "A"}
                      onChange={() => setChosenOption("A")}
                    />
                    <span>Wybrałem Opcję A</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="chosen"
                      value="B"
                      checked={chosenOption === "B"}
                      onChange={() => setChosenOption("B")}
                    />
                    <span>Wybrałem Opcję B</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Uzasadnienie wyboru</label>
                <textarea
                  rows={3}
                  required
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="Co przesądziło o tym wyborze? Jakie wartości przeważyły?"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue leading-relaxed font-serif"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium transition-all shadow-sm"
                >
                  Zapisz przypadek decyzyjny
                </button>
              </div>
            </form>
          </div>

          {/* Kolumna prawa: Test transformacji stylu w locie */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-purple-700 font-bold">Laboratorium stylu</span>
              <h2 className="text-xl font-semibold text-slate-950">Przetestuj transformację szkicu</h2>
              <p className="text-xs text-slate-600">
                Wpisz roboczy tekst. Model nada mu Twoją składnię, rytm i ton wypowiedzi.
              </p>
            </div>

            <form onSubmit={handleTestStyle} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Szkic wejściowy</label>
                <textarea
                  rows={4}
                  value={sampleDraft}
                  onChange={(e) => setSampleDraft(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 font-serif leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isTransforming}
                className="w-full px-5 py-2.5 rounded-xl bg-alterja-blue hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-medium transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isTransforming ? "Przekształcanie..." : "Zastosuj mój styl"}</span>
              </button>
            </form>

            {transformedStyle && (
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-slate-900 space-y-1 animate-in fade-in">
                <span className="text-[10px] font-mono uppercase text-purple-700 font-bold tracking-wider block">
                  Wynik po transformacji stylu:
                </span>
                <p className="font-serif text-sm italic leading-relaxed text-slate-950">
                  „{transformedStyle}”
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Lista zapisanych decyzji */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-950">Zapisane wzorce decyzji (baza wyboru)</h2>
            <span className="text-xs font-mono text-slate-500">{decisions.length} przypadków</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decisions.map((dec) => (
              <div
                key={dec.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-950">{dec.situation}</span>
                  <span className="text-[10px] font-mono text-slate-500">{dec.decision_date}</span>
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <span className="font-medium text-alterja-blue block">Wybrana opcja: {dec.chosen_option}</span>
                  <p className="text-slate-600 italic">„{dec.user_justification}”</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
