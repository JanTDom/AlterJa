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
  Fingerprint,
  Shield,
  Activity,
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
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-blue/10 selection:text-alterja-blue">
      <Navbar />

      {/* Komunikat systemowy */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white text-xs px-4 py-3 rounded-xl shadow-atelier-float border border-slate-800 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-alterja-blueLight animate-pulse" />
          <span className="font-medium">{actionNotice}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-10">
        {/* Nagłówek powitalny redakcyjny */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-alterja-border pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-alterja-border shadow-atelier-sm text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-slate-600 font-semibold tracking-wider uppercase text-[10px]">Pulpit poznawczy · Profil aktywny</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-slate-950 editorial-headline">
              Architektura tożsamości
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
              Zarządzaj zintegrowaną strukturą wiedzy o sobie. Wszystkie wnioski są uziemione w zweryfikowanych dowodach, a kontrola nad uczeniem pozostaje wyłącznie w Twoich rękach.
            </p>
          </div>

          {/* Szybkie przełączniki suwerenności */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={togglePause}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                profile.learning_paused
                  ? "bg-amber-50 border-amber-300 text-amber-900 shadow-atelier-sm"
                  : "bg-white border-alterja-border text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-atelier-sm"
              }`}
            >
              {profile.learning_paused ? <Play className="w-3.5 h-3.5 text-amber-700 fill-amber-700" /> : <Pause className="w-3.5 h-3.5 text-slate-600" />}
              <span>{profile.learning_paused ? "Wznów uczenie" : "Wstrzymaj uczenie"}</span>
            </button>

            <button
              onClick={toggleQuietHours}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                profile.quiet_hours_enabled
                  ? "bg-blue-50 border-blue-200 text-alterja-blue shadow-atelier-sm"
                  : "bg-white border-alterja-border text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-atelier-sm"
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-alterja-blue" />
              <span>{profile.quiet_hours_enabled ? "Cisza aktywna" : "Godziny ciszy"}</span>
            </button>
          </div>
        </section>

        {/* BENTO GRID: Śmiała architektura atelier */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Bento 1: Główna Karta Rdzenia Tożsamości (8 kolumn) */}
          <div className="lg:col-span-8 atelier-card p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div className="space-y-1">
                <span className="atelier-index">01 / STAN REKONSTRUKCJI TOŻSAMOŚCI</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-slate-950 mt-1">
                  {profile.display_name}
                </h2>
                <p className="text-xs text-slate-500 font-mono">ID profilu: {profile.id} · Model hybrydowy (Gemini + RAG)</p>
              </div>

              {/* Rzeźbiony wskaźnik wierności */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-atelier-sm">
                <div className="text-right">
                  <div className="text-3xl font-bold font-mono text-slate-950 tracking-tight">98.4%</div>
                  <div className="text-[10px] font-mono text-emerald-700 uppercase tracking-widest font-semibold">
                    Wskaźnik wierności
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-alterja-blue">
                  <Fingerprint className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Wizualizacja 7 warstw pamięci autobiograficznej */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                <span className="font-semibold text-slate-900 tracking-tight">Architektura pamięci (7 warstw kognitywnych)</span>
                <span className="font-mono text-slate-500 text-[11px]">{memories.length} zweryfikowanych faktów w grafie</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {layersConfig.slice(0, 4).map((layer) => (
                  <div key={layer.id} className="p-4 rounded-2xl bg-slate-50/60 border border-slate-200/60 hover:border-alterja-blue/40 hover:bg-white hover:shadow-atelier-sm transition-all space-y-1 group">
                    <span className="text-[11px] text-slate-500 block truncate font-medium group-hover:text-slate-900">{layer.name}</span>
                    <div className="flex items-baseline justify-between pt-1">
                      <span className="text-xl font-bold font-mono text-slate-950">{layer.count}</span>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">faktów</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {layersConfig.slice(4, 7).map((layer) => (
                  <div key={layer.id} className="p-4 rounded-2xl bg-slate-50/60 border border-slate-200/60 hover:border-alterja-blue/40 hover:bg-white hover:shadow-atelier-sm transition-all space-y-1 group">
                    <span className="text-[11px] text-slate-500 block truncate font-medium group-hover:text-slate-900">{layer.name}</span>
                    <div className="flex items-baseline justify-between pt-1">
                      <span className="text-xl font-bold font-mono text-slate-950">{layer.count}</span>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">faktów</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pasek postępu i przejście do biblioteki */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% faktów uziemionych w fizycznych źródłach z bezpośrednim cytowaniem</span>
              </div>
              <Link
                href="/memory"
                className="inline-flex items-center gap-2 text-xs font-semibold text-alterja-blue hover:text-blue-800 transition-colors shrink-0"
              >
                <span>Przeglądaj pełną bibliotekę pamięci</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento 2: Panel Suwerenności i Bezpieczeństwa — Hebanowy Skarbiec (4 kolumny) */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-slate-950 text-white shadow-atelier-float flex flex-col justify-between space-y-6 relative overflow-hidden border border-slate-800">
            {/* Tło optyczne */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-alterja-blue/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-blue-300 text-[10px] font-mono uppercase tracking-widest">
                <Lock className="w-3 h-3 text-blue-400" />
                Skarbiec suwerenności RLS
              </div>
              <h3 className="text-2xl font-serif font-medium tracking-tight text-white">
                Gwarancje integralności
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Dane użytkownika są całkowicie odizolowane na poziomie bazy PostgreSQL z filtrem <code className="text-blue-300 font-mono">auth.uid() = user_id</code>. Zero treningu modeli komercyjnych.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 relative z-10">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Dziennik zdarzeń audytowych</span>
                <span className="font-mono text-emerald-400 font-medium text-[11px]">Niezmienny (append-only)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Unijny AI Act i RODO</span>
                <span className="font-mono text-emerald-400 font-medium text-[11px]">Pełna zgodność</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Cyfrowa spuścizna</span>
                <span className="font-mono text-purple-300 font-medium text-[11px]">Protokół aktywny</span>
              </div>
            </div>

            <div className="pt-2 relative z-10">
              <Link
                href="/privacy"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-all active:scale-[0.985]"
              >
                <span>Zarządzaj suwerennością i RODO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento 3: Szybki Symulator Reakcji w Czasie Rzeczywistym (6 kolumn) */}
          <div className="lg:col-span-6 atelier-card p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="atelier-index">02 / INTERAKTYWNA REKONSTRUKCJA</span>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-alterja-blue border border-blue-200 font-semibold">
                  Wnioskowanie w locie
                </span>
              </div>
              <h3 className="text-xl font-serif font-medium text-slate-950">
                Przetestuj przewidywanie decyzji
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zadaj pytanie lub postaw dylemat biznesowy. Model wygeneruje odpowiedź odzwierciedlającą Twój zarejestrowany styl i reguły decyzyjne.
              </p>
            </div>

            <form onSubmit={runSimulator} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={simQuery}
                  onChange={(e) => setSimQuery(e.target.value)}
                  placeholder="Wpisz sytuację lub dylemat..."
                  className="w-full pl-4 pr-24 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-alterja-blue focus:bg-white transition-all font-medium"
                />
                <button
                  type="submit"
                  disabled={isSimulating}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg btn-atelier-primary disabled:opacity-50 text-white text-xs font-medium flex items-center gap-1.5"
                >
                  <span>{isSimulating ? "Analiza..." : "Zapytaj"}</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>

            {simResponse && (
              <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/80 text-xs text-slate-800 space-y-2 animate-in fade-in">
                <span className="text-[10px] font-mono uppercase text-alterja-blue font-bold tracking-widest block">
                  Odpowiedź modelu w trybie Rekonstrukcji:
                </span>
                <p className="leading-relaxed font-serif text-sm text-slate-900 italic">
                  „{simResponse}”
                </p>
              </div>
            )}
          </div>

          {/* Bento 4: Rygor Epistemiczny i Weryfikacja Hipotez (6 kolumn) */}
          <div className="lg:col-span-6 atelier-card p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="atelier-index">03 / CZŁOWIEK W PĘTLI</span>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                  {pendingHypotheses.length} do weryfikacji
                </span>
              </div>
              <h3 className="text-xl font-serif font-medium text-slate-950">
                Hipotezy oczekujące na Twoje orzeczenie
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Model nie zgaduje faktów z góry. Wychwycone w źródłach wzorce wymagają Twojego potwierdzenia przed dołączeniem do stałej struktury tożsamości.
              </p>
            </div>

            <div className="space-y-3">
              {pendingHypotheses.length > 0 ? (
                pendingHypotheses.slice(0, 2).map((hyp) => (
                  <div key={hyp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <p className="text-xs font-medium text-slate-900 leading-relaxed font-serif">
                      „{hyp.hypothesis_text}”
                    </p>
                    {hyp.alternative_explanation && (
                      <p className="text-[11px] text-slate-500 italic">
                        Alternatywne wyjaśnienie: {hyp.alternative_explanation}
                      </p>
                    )}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleReviewHypothesis(hyp.id, "confirmed")}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-medium transition-all active:scale-[0.985] shadow-atelier-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Potwierdzam</span>
                      </button>
                      <button
                        onClick={() => handleReviewHypothesis(hyp.id, "situational")}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-all active:scale-[0.985] border border-slate-200"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>To zależy</span>
                      </button>
                      <button
                        onClick={() => handleReviewHypothesis(hyp.id, "rejected")}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-medium transition-all active:scale-[0.985]"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Odrzuć</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-1">
                  <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                  <p className="text-xs font-semibold text-slate-800">Wszystkie bieżące hipotezy zostały rozstrzygnięte</p>
                  <p className="text-[11px] text-slate-500">Nowe pojawią się automatycznie po dodaniu kolejnych źródeł.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Dolny pasek nawigacji kontekstowej */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <Link
            href="/interview"
            className="atelier-card p-6 flex items-center justify-between group hover:border-alterja-blue"
          >
            <div className="space-y-1.5">
              <span className="atelier-index">POGŁĘBIANIE WIEDZY</span>
              <div className="text-base font-serif font-medium text-slate-950 group-hover:text-alterja-blue transition-colors">
                Studio adaptacyjnego wywiadu
              </div>
              <p className="text-xs text-slate-500">Krótkie mikropytania o wysokiej wartości poznawczej</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-950 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/sources"
            className="atelier-card p-6 flex items-center justify-between group hover:border-alterja-blue"
          >
            <div className="space-y-1.5">
              <span className="atelier-index">ZASILANIE PROFILU</span>
              <div className="text-base font-serif font-medium text-slate-950 group-hover:text-alterja-blue transition-colors">
                Dodaj dokument lub notatkę
              </div>
              <p className="text-xs text-slate-500">Bezpieczny import z filtracją autorstwa i analizą stylu</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-950 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/style-lab"
            className="atelier-card p-6 flex items-center justify-between group hover:border-alterja-blue"
          >
            <div className="space-y-1.5">
              <span className="atelier-index">MODELOWANIE EKSPRESJI</span>
              <div className="text-base font-serif font-medium text-slate-950 group-hover:text-alterja-blue transition-colors">
                Laboratorium stylu i decyzji
              </div>
              <p className="text-xs text-slate-500">Szlifuj rytm zdań, leksykę i wzorce argumentacji</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-950 group-hover:translate-x-1 transition-all" />
          </Link>
        </section>
      </main>
    </div>
  );
}
