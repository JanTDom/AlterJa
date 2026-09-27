"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Scale,
  FileCheck,
} from "lucide-react";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { DecisionCase } from "@/domains/types";

export default function StyleLabPage() {
  const [decisions, setDecisions] = useState<DecisionCase[]>(() =>
    globalStore.getDecisions(DEMO_USER_ID)
  );

  // Formularz nowego przypadku decyzyjnego
  const [situation, setSituation] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [chosenOption, setChosenOption] = useState<"A" | "B">("A");
  const [justification, setJustification] = useState("");

  // Test stylu: wejście tekstu do transformacji
  const [sampleDraft, setSampleDraft] = useState(
    "Szanowny Panie, piszę z zapytaniem czy udałoby się zorganizować spotkanie w celu omówienia dalszych kroków."
  );
  const [transformedStyle, setTransformedStyle] = useState<string | null>(null);
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

    setNotice("Przypadek decyzyjny został trwale zapisany w warstwie decyzji.");
    setTimeout(() => setNotice(null), 4000);
  };

  const handleTransformStyle = () => {
    // Model stylu użytkownika: powściągliwy, konkretny, profesjonalny
    setTransformedStyle(
      "Dzień dobry. Czy możemy ustalić termin krótkiej rozmowy o kolejnych krokach w projekcie? Proponuję czwartek przed południem."
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {notice && (
        <div className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-sm flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-xs text-cyan-400">
            Zamknij
          </button>
        </div>
      )}

      {/* Nagłówek */}
      <div className="mb-8 pb-6 border-b border-alterja-border">
        <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
          Modelowanie ekspresji i wyborów
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Laboratorium stylu i decyzji
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Testowanie wiernego odwzorowania Twojego stylu oraz rejestrowanie przypadków decyzyjnych z
          uzasadnieniem.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lewa kolumna: Transformacja stylu */}
        <div className="glass-panel rounded-2xl p-6 border border-alterja-border space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Test silnika stylu (Style Rewrite)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Wklej roboczy tekst, aby przeredagować go według Twojego indywidualnego rytmu i
              rejestru językowego.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Szkic tekstu wejściowego:
            </label>
            <textarea
              rows={4}
              value={sampleDraft}
              onChange={(e) => setSampleDraft(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm leading-relaxed"
            />
          </div>

          <button
            type="button"
            onClick={handleTransformStyle}
            className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Zastosuj profil stylu użytkownika</span>
          </button>

          {transformedStyle && (
            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 space-y-2">
              <div className="text-xs font-semibold text-cyan-300 flex items-center justify-between">
                <span>Wersja w Twoim stylu:</span>
                <span className="text-[10px] text-slate-400">Rejestr zawodowy</span>
              </div>
              <p className="text-sm text-slate-100 font-medium leading-relaxed">
                „{transformedStyle}”
              </p>
              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                Wyróżniki: eliminacja korporacyjnych ozdobników, naturalny szyk, zachowanie
                powściągliwości.
              </div>
            </div>
          )}
        </div>

        {/* Prawa kolumna: Rejestr przypadków decyzyjnych */}
        <div className="glass-panel rounded-2xl p-6 border border-alterja-border space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Scale className="w-5 h-5 text-amber-400" />
              <span>Dodaj przypadek decyzyjny (Wybór A/B)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Zarejestruj dylemat, rozważane warianty oraz powód wyboru. Pozwala to modelowi
              zrozumieć Twoje kryteria oceny.
            </p>
          </div>

          <form onSubmit={handleAddDecision} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Sytuacja decyzyjna (dylemat)
              </label>
              <input
                type="text"
                placeholder="np. Wybór podwykonawcy, negocjacje umowy, zmiana terminu"
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Opcja A</label>
                <input
                  type="text"
                  placeholder="Pierwszy wariant"
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Opcja B</label>
                <input
                  type="text"
                  placeholder="Drugi wariant"
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-1">
              <span className="text-xs text-slate-400">Twój faktyczny wybór:</span>
              <label className="inline-flex items-center space-x-1.5 cursor-pointer text-xs text-slate-200">
                <input
                  type="radio"
                  name="chosen"
                  checked={chosenOption === "A"}
                  onChange={() => setChosenOption("A")}
                />
                <span>Opcja A</span>
              </label>
              <label className="inline-flex items-center space-x-1.5 cursor-pointer text-xs text-slate-200">
                <input
                  type="radio"
                  name="chosen"
                  checked={chosenOption === "B"}
                  onChange={() => setChosenOption("B")}
                />
                <span>Opcja B</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Co przeważyło o decyzji? (Uzasadnienie człowieka)
              </label>
              <textarea
                rows={2}
                placeholder="Wyjaśnij powód bez dorabiania teorii po czasie..."
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors"
            >
              Zapisz w warstwie decyzji
            </button>
          </form>
        </div>
      </div>

      {/* Lista wcześniejszych decyzji */}
      <div className="mt-10 glass-panel rounded-2xl p-6 border border-alterja-border">
        <h3 className="text-base font-semibold text-white mb-4">
          Zarejestrowane przypadki decyzyjne ({decisions.length})
        </h3>
        <div className="space-y-4">
          {decisions.map((d) => (
            <div
              key={d.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-sm">{d.situation}</span>
                <span className="text-slate-500 font-mono">{d.decision_date || "Brak daty"}</span>
              </div>
              <div className="text-emerald-400 font-medium">
                Wybór: {d.chosen_option}
              </div>
              {d.user_justification && (
                <div className="text-slate-300 italic bg-slate-950 p-2.5 rounded border border-slate-800">
                  Uzasadnienie człowieka: „{d.user_justification}”
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
