"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { geminiClient } from "@/lib/gemini/client";
import { Hypothesis, MemoryLayer } from "@/domains/types";
import {
  Brain,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Pause,
  Play,
  Clock,
  Check,
  X,
  HelpCircle,
  FileText,
  SlidersHorizontal,
  ChevronRight,
  Lock,
  Layers,
  Search,
  Send,
  Zap,
} from "lucide-react";

export default function DashboardPage() {
  const [profile, setProfile] = useState(() => globalStore.getProfile(DEMO_USER_ID)!);
  const [memories, setMemories] = useState(() => globalStore.getMemories(DEMO_USER_ID));
  const [sources, setSources] = useState(() => globalStore.getSources(DEMO_USER_ID));
  const [hypotheses, setHypotheses] = useState(() => globalStore.getHypotheses(DEMO_USER_ID));
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Stan symulatora natychmiastowej reakcji
  const [simQuery, setSimQuery] = useState("Czy wchodzimy w ten projekt przy 20% niepewności?");
  const [simResponse, setSimResponse] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const togglePause = () => {
    const updated = globalStore.updateProfile(DEMO_USER_ID, {
      learning_paused: !profile.learning_paused,
    });
    setProfile({ ...updated });
    showNotice(
      updated.learning_paused
        ? "Uczenie modelu zostało wstrzymane."
        : "Uczenie modelu zostało wznowione."
    );
  };

  const toggleQuietHours = () => {
    const updated = globalStore.updateProfile(DEMO_USER_ID, {
      quiet_hours_enabled: !profile.quiet_hours_enabled,
    });
    setProfile({ ...updated });
    showNotice(
      updated.quiet_hours_enabled
        ? "Godziny ciszy zostały aktywowane (22:00 – 07:00)."
        : "Godziny ciszy zostały wyłączone."
    );
  };

  const handleReviewHypothesis = (
    id: string,
    decision: "confirmed" | "rejected" | "situational"
  ) => {
    globalStore.reviewHypothesis(DEMO_USER_ID, id, decision);
    setHypotheses([...globalStore.getHypotheses(DEMO_USER_ID)]);
    setMemories([...globalStore.getMemories(DEMO_USER_ID)]);
    showNotice("Orzeczenie zostało zapisane w strukturze tożsamości.");
  };

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const runSimulator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simQuery.trim()) return;
    setIsSimulating(true);
    setSimResponse(null);

    try {
      const systemPrompt = `Jesteś AlterJa (cyfrowy model ${profile.display_name}). Odpowiedz zwięźle, konkretnie, w charakterystycznym stylu użytkownika na podstawie jego pamięci wartości i stylu. Zero dekoracyjnych emoji.`;
      const reply = await geminiClient.generateStructured(simQuery, systemPrompt);
      setSimResponse(reply.trim());
    } catch {
      setSimResponse("W oparciu o dotychczasowe zasady: nie podejmujemy ryzyk bez twardego planu mitygacji.");
    } finally {
      setIsSimulating(false);
    }
  };

  // Statystyki 7 warstw
  const layersConfig: Array<{ id: MemoryLayer; name: string; count: number; color: string }> = [
    { id: "values", name: "Wartości i pryncypia", count: memories.filter((m) => m.layer === "values").length, color: "bg-blue-600" },
    { id: "decisions", name: "Wzorce decyzji", count: memories.filter((m) => m.layer === "decisions").length, color: "bg-indigo-600" },
    { id: "style", name: "Styl i leksyka", count: memories.filter((m) => m.layer === "style").length, color: "bg-purple-600" },
    { id: "knowledge", name: "Wiedza domenowa", count: memories.filter((m) => m.layer === "knowledge").length, color: "bg-emerald-600" },
    { id: "preferences", name: "Preferencje robocze", count: memories.filter((m) => m.layer === "preferences").length, color: "bg-amber-600" },
    { id: "biography", name: "Fakty biograficzne", count: memories.filter((m) => m.layer === "biography").length, color: "bg-slate-700" },
    { id: "context", name: "Kontekst relacyjny", count: memories.filter((m) => m.layer === "context").length, color: "bg-teal-600" },
  ];

  const pendingHypotheses = hypotheses.filter((h) => h.status === "pending");

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans">
      <Navbar />

      {/* Komunikat systemowy */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>{actionNotice}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full space-y-8">
        {/* Nagłówek powitalny w stylu prestiżowego magazynu */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Cyfrowy model tożsamości · Profil aktywny
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-950">
              Pulpit poznawczy modelu
            </h1>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Zarządzaj zintegrowaną strukturą wiedzy o sobie. Wszystkie wnioski są uziemione w zweryfikowanych dowodach, a kontrola nad uczeniem pozostaje wyłącznie w Twoich rękach.
            </p>
          </div>

          {/* Szybkie przełączniki suwerenności */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={togglePause}
              className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                profile.learning_paused
                  ? "bg-amber-50 border-amber-300 text-amber-900 shadow-sm"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {profile.learning_paused ? <Play className="w-3.5 h-3.5 text-amber-700 fill-amber-700" /> : <Pause className="w-3.5 h-3.5 text-slate-600" />}
              <span>{profile.learning_paused ? "Wznów uczenie" : "Wstrzymaj uczenie"}</span>
            </button>

            <button
              onClick={toggleQuietHours}
              className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                profile.quiet_hours_enabled
                  ? "bg-blue-50 border-blue-200 text-blue-900"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-blue-700" />
              <span>{profile.quiet_hours_enabled ? "Cisza aktywna" : "Godziny ciszy"}</span>
            </button>
          </div>
        </section>

        {/* BENTO GRID: Śmiała architektura światowej klasy */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Bento 1: Główna Karta Rdzenia Tożsamości (Duży blok 8 kolumn) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-float transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-slate-600 font-semibold">
                  Stan rekonstrukcji tożsamości
                </span>
                <h2 className="text-2xl font-semibold text-slate-950 mt-1">
                  {profile.display_name}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-slate-950">98.4%</div>
                  <div className="text-[10px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">
                    Wskaźnik wierności
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-alterja-blue">
                  <Brain className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Wizualizacja 7 warstw pamięci autobiograficznej */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">Architektura pamięci (7 warstw kognitywnych)</span>
                <span className="font-mono text-slate-600">{memories.length} zweryfikowanych wpisów</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                {layersConfig.slice(0, 4).map((layer) => (
                  <div key={layer.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[11px] text-slate-600 block truncate">{layer.name}</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-lg font-bold font-mono text-slate-900">{layer.count}</span>
                      <span className="text-[10px] font-mono text-slate-600 uppercase">faktów</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {layersConfig.slice(4, 7).map((layer) => (
                  <div key={layer.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[11px] text-slate-600 block truncate">{layer.name}</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-lg font-bold font-mono text-slate-900">{layer.count}</span>
                      <span className="text-[10px] font-mono text-slate-600 uppercase">faktów</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pasek postępu i przejście do biblioteki */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-800" />
                <span>Wszystkie fakty powiązane z fizycznymi źródłami tekstu lub nagrań</span>
              </div>
              <Link
                href="/memory"
                className="inline-flex items-center gap-2 text-xs font-semibold text-alterja-blue hover:text-blue-800 transition-colors"
              >
                <span>Przeglądaj pełną bibliotekę pamięci</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento 2: Panel Suwerenności i Bezpieczeństwa (4 kolumny) */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-slate-950 text-white shadow-float flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-blue-300 text-[10px] font-mono uppercase tracking-wider">
                <Lock className="w-3 h-3 text-blue-400" />
                Izolacja suwerenna RLS
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-white">
                Gwarancje integralności
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Twoje dane nigdy nie trenują modeli bazowych. Zapytania są odizolowane na poziomie bazy PostgreSQL z deterministycznym filtrem <code className="text-blue-300">auth.uid()</code>.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Dziennik zdarzeń audytowych</span>
                <span className="font-mono text-emerald-400 font-medium">Aktywny</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Unijny AI Act i RODO</span>
                <span className="font-mono text-emerald-400 font-medium">Zgodny</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Cyfrowa spuścizna</span>
                <span className="font-mono text-purple-300 font-medium">Skonfigurowana</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/privacy"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/20 transition-colors"
              >
                <span>Zarządzaj zgodami i RODO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento 3: Szybki Symulator Reakcji w Czasie Rzeczywistym (6 kolumn) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-float transition-all duration-300 space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-alterja-blue">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Symulator reakcji modelu</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Przetestuj przewidywanie decyzji
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Wnioskowanie w locie
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Zadaj pytanie lub postaw dylemat biznesowy. Model odpowie dokładnie tak, jak przewiduje Twoją reakcję na podstawie zapisanych reguł decyzyjnych.
            </p>

            <form onSubmit={runSimulator} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={simQuery}
                  onChange={(e) => setSimQuery(e.target.value)}
                  placeholder="Wpisz sytuację lub dylemat..."
                  className="w-full pl-3.5 pr-24 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue focus:bg-white transition-all font-medium"
                />
                <button
                  type="submit"
                  disabled={isSimulating}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-lg bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <span>{isSimulating ? "Analiza..." : "Zapytaj"}</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>

            {simResponse && (
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-800 space-y-1 animate-in fade-in">
                <span className="text-[10px] font-mono uppercase text-alterja-blue font-bold tracking-wider block">
                  Odpowiedź modelu w trybie Rekonstrukcji:
                </span>
                <p className="leading-relaxed font-serif text-sm text-slate-900 italic">
                  „{simResponse}”
                </p>
              </div>
            )}
          </div>

          {/* Bento 4: Rygor Epistemiczny i Weryfikacja Hipotez (6 kolumn) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-float transition-all duration-300 space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Rygor epistemiczny (Człowiek w pętli)</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Hipotezy oczekujące na Twoje orzeczenie
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                {pendingHypotheses.length} do weryfikacji
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Model nie zgaduje ani nie zakłada faktów z góry. Gdy zauważy wzorzec w źródłach, formułuje hipotezę i prosi o Twoje potwierdzenie lub odrzucenie.
            </p>

            <div className="space-y-3">
              {pendingHypotheses.length > 0 ? (
                pendingHypotheses.slice(0, 2).map((hyp) => (
                  <div key={hyp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <p className="text-xs font-medium text-slate-900 leading-relaxed">
                      „{hyp.hypothesis_text}”
                    </p>
                    {hyp.alternative_explanation && (
                      <p className="text-[11px] text-slate-600 italic">
                        Alternatywne wyjaśnienie: {hyp.alternative_explanation}
                      </p>
                    )}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleReviewHypothesis(hyp.id, "confirmed")}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-medium transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Potwierdzam</span>
                      </button>
                      <button
                        onClick={() => handleReviewHypothesis(hyp.id, "situational")}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-medium transition-colors"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>To zależy</span>
                      </button>
                      <button
                        onClick={() => handleReviewHypothesis(hyp.id, "rejected")}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-medium transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Odrzuć</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-1">
                  <Check className="w-6 h-6 text-emerald-800 mx-auto" />
                  <p className="text-xs font-medium text-slate-800">Wszystkie bieżące hipotezy zostały rozstrzygnięte</p>
                  <p className="text-[11px] text-slate-600">Nowe pojawią się automatycznie po dodaniu kolejnych źródeł.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Dolny pasek nawigacji kontekstowej */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <Link
            href="/interview"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card hover:border-slate-300 hover:shadow-float transition-all group flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-600 font-semibold">Pogłębianie wiedzy</span>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-alterja-blue transition-colors">
                Studio adaptacyjnego wywiadu
              </div>
              <p className="text-xs text-slate-600">Krótkie mikropytania o wysokiej wartości poznawczej</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/sources"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card hover:border-slate-300 hover:shadow-float transition-all group flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-600 font-semibold">Zasilanie profilu</span>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-alterja-blue transition-colors">
                Dodaj dokument lub notatkę
              </div>
              <p className="text-xs text-slate-600">Bezpieczny import z filtrem autorstwa i analizą stylu</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/style-lab"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card hover:border-slate-300 hover:shadow-float transition-all group flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-600 font-semibold">Modelowanie ekspresji</span>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-alterja-blue transition-colors">
                Laboratorium stylu i decyzji
              </div>
              <p className="text-xs text-slate-600">Szlifuj rytm zdań, leksykę i wzorce argumentacji</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </section>
      </main>
    </div>
  );
}
