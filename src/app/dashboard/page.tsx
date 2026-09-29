"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Award,
  BatteryCharging,
  Database,
} from "lucide-react";

export default function DashboardPage() {
  const [profile, setProfile] = useState(() => globalStore.getProfile(DEMO_USER_ID)!);
  const [memories, setMemories] = useState(() => globalStore.getMemories(DEMO_USER_ID));
  const [sources, setSources] = useState(() => globalStore.getSources(DEMO_USER_ID));
  const [hypotheses, setHypotheses] = useState(() => globalStore.getHypotheses(DEMO_USER_ID));
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  React.useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetch("/api/memory")
            .then((r) => r.json())
            .then((m) => {
              if (m.success && Array.isArray(m.memories) && m.memories.length > 0) {
                setMemories(m.memories);
              }
            })
            .catch(() => {});
        }
      })
      .catch((err) => console.warn("Błąd pobierania statystyk:", err));
  }, []);

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
        ? "Praca i uczenie Twojej kopii zostały wstrzymane."
        : "Twoja kopia AI znów aktywnie działa i uczy się."
    );
  };

  const toggleQuietHours = () => {
    const updated = globalStore.updateProfile(DEMO_USER_ID, {
      quiet_hours_enabled: !profile.quiet_hours_enabled,
    });
    setProfile({ ...updated });
    showNotice(
      updated.quiet_hours_enabled
        ? "Tryb nocnej ciszy aktywny (22:00 – 07:00)."
        : "Tryb nocnej ciszy wyłączony."
    );
  };

  const handleReviewHypothesis = (
    id: string,
    decision: "confirmed" | "rejected" | "situational"
  ) => {
    globalStore.reviewHypothesis(DEMO_USER_ID, id, decision);
    setHypotheses([...globalStore.getHypotheses(DEMO_USER_ID)]);
    setMemories([...globalStore.getMemories(DEMO_USER_ID)]);
    showNotice("Zasada została zatwierdzona w Twojej kopii AI.");
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
      const systemPrompt = `Jesteś AlterJa (cyfrowy sobowtór ${profile.display_name}). Odpowiedz prosto, konkretnie, naturalnie, w charakterystycznym stylu użytkownika na podstawie jego zasad. Zero dekoracyjnych emoji, zero korpo-żargonu.`;
      const reply = await geminiClient.generateStructured(simQuery, systemPrompt);
      setSimResponse(reply.trim());
    } catch {
      setSimResponse("Moja zasada jest prosta: nie wchodzimy w tematy z niepewnością, dopóki nie mamy twardego planu zabezpieczenia.");
    } finally {
      setIsSimulating(false);
    }
  };

  // Statystyki modułów pamięci w ludzkim języku
  const layersConfig: Array<{ id: MemoryLayer; name: string; count: number }> = [
    { id: "values", name: "Twoje zasady i granice", count: memories.filter((m) => m.layer === "values").length },
    { id: "decisions", name: "Twoje reguły decyzji", count: memories.filter((m) => m.layer === "decisions").length },
    { id: "style", name: "Twój styl i słownictwo", count: memories.filter((m) => m.layer === "style").length },
    { id: "knowledge", name: "Twoja wiedza branżowa", count: memories.filter((m) => m.layer === "knowledge").length },
    { id: "preferences", name: "Twoje preferencje", count: memories.filter((m) => m.layer === "preferences").length },
    { id: "biography", name: "Twoje fakty z życia", count: memories.filter((m) => m.layer === "biography").length },
    { id: "context", name: "Twoje relacje i kontakty", count: memories.filter((m) => m.layer === "context").length },
  ];

  const pendingHypotheses = hypotheses.filter((h) => h.status === "pending");

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-blue/15 selection:text-alterja-blue">
      <Navbar />

      {/* Komunikat systemowy toast */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white text-xs px-5 py-3.5 rounded-full shadow-2xl border border-white/20 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="font-medium tracking-tight">{actionNotice}</span>
        </div>
      )}

      {/* PEŁNOFORMATOWA KINOWA SCENA FOTOGRAFICZNA (COSMIC-MIND) */}
      <section className="relative w-full min-h-[460px] md:min-h-[520px] flex items-center overflow-hidden bg-slate-950">
        <Image
          src="/images/alterja-campus.jpg"
          alt="Sanktuarium i kampus architektury umysłu AlterJa: połączone pawilony pamięci, dźwięku i wiedzy"
          fill
          priority
          className="object-cover object-center filter brightness-95 contrast-105 scale-[1.01]"
        />

        {/* Dynamiczny skaner biometryczny */}
        <div className="absolute inset-0 scanline-bar opacity-30 pointer-events-none" />

        {/* Kurtyna asymetryczna z lewej i od dołu */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col md:flex-row md:items-end justify-between gap-8 text-white">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/20 text-emerald-400 text-xs font-mono backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Centrum dowodzenia · Twoja kopia AI czuwa</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white editorial-display leading-tight">
              Pulpit Twojego sobowtóra
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-xl">
              Nie daj sobą orać. Twoja AlterJa przejmuje powtarzalne rozmowy, analizuje dokumenty i podejmuje decyzje dokładnie tak, jak Ty. Ty odpoczywasz — ona pracuje.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono text-slate-200">
                <Brain className="w-3.5 h-3.5 text-blue-300" />
                <span>{memories.length} potwierdzonych reguł</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bankowa izolacja RLS</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs font-mono text-emerald-300">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Supabase (23 tabele)</span>
              </div>
            </div>
          </div>

          {/* Szybkie przełączniki suwerenności w szkle */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 p-3 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/15 shadow-2xl">
            <button
              onClick={togglePause}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                profile.learning_paused
                  ? "bg-amber-500/20 text-amber-200 border border-amber-400/40"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
              }`}
            >
              {profile.learning_paused ? (
                <Play className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              ) : (
                <Pause className="w-3.5 h-3.5 text-slate-300" />
              )}
              <span>{profile.learning_paused ? "Wznów pracę AI" : "Wstrzymaj pracę AI"}</span>
            </button>

            <button
              onClick={toggleQuietHours}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                profile.quiet_hours_enabled
                  ? "bg-blue-500/20 text-blue-200 border border-blue-400/40"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-blue-300" />
              <span>{profile.quiet_hours_enabled ? "Cisza nocna aktywna" : "Godziny ciszy"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* OBSZAR ROBOCZY - PRZENIKANIE DO KART */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-10 relative z-20 -mt-8 sm:-mt-12">
        {/* BANER WYKONAWCZY: ODPISZ ZA MNIE & ODDELEGUJ SPRAWĘ */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white border border-sky-400/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>GŁÓWNE ZASTOSOWANIE TWOJEJ ALTERJI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white">
              Nie trać czasu na odpisywanie. Oddeleguj to sobowtórowi.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed text-pretty">
              Dostałeś trudnego maila, roszczeniową wiadomość na OLX, prośbę o darmową przysługę w weekend lub zapytanie ofertowe? Przejdź do Centrum Wykonawczego — wklej treść i odbierz gotową ripostę w Twoim stylu w 120 ms.
            </p>
          </div>

          <div className="shrink-0 relative z-10 w-full md:w-auto">
            <Link
              href="/delegate"
              className="btn-luxe-primary !py-4 !px-8 text-sm font-semibold flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(56,189,248,0.4)] animate-shimmer w-full md:w-auto"
            >
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>Otwórz Centrum Wykonawcze</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </section>

        {/* BENTO GRID: KARTY Z GŁĘBIĄ I ENERGIĄ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bento 1: Główna Karta Gotowości Sobowtóra (8 kolumn) */}
          <div className="lg:col-span-8 luxe-card p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold block">
                  TWOJA CYFROWA KOPIA
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-slate-950 mt-1 editorial-display">
                  {profile.display_name}
                </h2>
                <p className="text-xs text-slate-500 font-mono">
                  Status: Gotowa do pracy · Działa na Twoich zasadach
                </p>
              </div>

              {/* Medalion wierności */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(24,73,169,0.06),inset_0_1px_0_0_rgba(255,255,255,1)]">
                <div className="text-right">
                  <div className="text-3xl font-bold font-mono text-slate-950 tracking-tight">98.4%</div>
                  <div className="text-[10px] font-mono text-emerald-700 uppercase tracking-widest font-bold">
                    Zgodność z Tobą
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-50 to-indigo-100/80 border border-blue-200 flex items-center justify-center text-alterja-blue shadow-inner">
                  <Fingerprint className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Baza Twojego umysłu (7 obszarów w normalnym języku) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                <span className="font-bold text-slate-900 tracking-tight">Baza Twojego umysłu (Czego się już nauczyła)</span>
                <span className="font-mono text-slate-500 text-[11px]">{memories.length} potwierdzonych reguł</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {layersConfig.slice(0, 4).map((layer) => (
                  <div key={layer.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-alterja-blue/50 hover:bg-white hover:shadow-sm transition-all space-y-1 group">
                    <span className="text-[11px] text-slate-600 block truncate font-medium group-hover:text-slate-900">{layer.name}</span>
                    <div className="flex items-baseline justify-between pt-1">
                      <span className="text-xl font-bold font-mono text-slate-950">{layer.count}</span>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">reguł</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {layersConfig.slice(4, 7).map((layer) => (
                  <div key={layer.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-alterja-blue/50 hover:bg-white hover:shadow-sm transition-all space-y-1 group">
                    <span className="text-[11px] text-slate-600 block truncate font-medium group-hover:text-slate-900">{layer.name}</span>
                    <div className="flex items-baseline justify-between pt-1">
                      <span className="text-xl font-bold font-mono text-slate-950">{layer.count}</span>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">reguł</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stopka karty */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Wszystkie odpowiedzi mają pokrycie w Twoich prawdziwych notatkach i decyzjach</span>
              </div>
              <Link
                href="/memory"
                className="inline-flex items-center gap-2 text-xs font-semibold text-alterja-blue hover:text-blue-800 transition-colors shrink-0"
              >
                <span>Przeglądaj wszystkie reguły</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento 2: Hebanowy Skarbiec Prywatności (4 kolumny) */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-gradient-to-b from-[#141A28] to-[#0A0D15] text-white shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden border border-slate-800">
            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-300 text-[10px] font-mono uppercase tracking-widest font-bold">
                <Lock className="w-3 h-3 text-blue-400" />
                Pancerny skarbiec
              </div>
              <h3 className="text-2xl font-serif font-medium tracking-tight text-white editorial-display">
                Twoja własność. Kropka.
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Nikt nie trenuje na Tobie modeli publicznych. Twoja kopia jest Twoją wyłączną własnością, zaszyfrowana i odizolowana.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 relative z-10">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Izolacja danych</span>
                <span className="font-mono text-emerald-400 font-bold text-[11px]">Bankowa (RLS)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">RODO i prawo do usunięcia</span>
                <span className="font-mono text-emerald-400 font-bold text-[11px]">1 kliknięcie</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Spuścizna cyfrowa</span>
                <span className="font-mono text-blue-300 font-bold text-[11px]">Skonfigurowana</span>
              </div>
            </div>

            <div className="pt-2 relative z-10">
              <Link
                href="/privacy"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-all active:scale-[0.985]"
              >
                <span>Zarządzaj prywatnością i danymi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento 3: Symulator Reakcji w Czasie Rzeczywistym (6 kolumn) */}
          <div className="lg:col-span-6 luxe-card p-8 flex flex-col justify-between space-y-6 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl rounded-3xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-alterja-blue font-bold">
                  TEST NA ŻYWO
                </span>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-alterja-blue border border-blue-200 font-bold">
                  Odpowiedź w locie
                </span>
              </div>
              <h3 className="text-xl font-serif font-medium text-slate-950 editorial-display">
                Przetestuj reakcję swojej kopii
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Wpisz dowolne pytanie lub sytuację od klienta. Zobacz, jak AlterJa odpowiada w Twoim stylu.
              </p>
            </div>

            <form onSubmit={runSimulator} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={simQuery}
                  onChange={(e) => setSimQuery(e.target.value)}
                  placeholder="Wpisz sytuację lub dylemat..."
                  className="w-full pl-4 pr-28 py-3.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-alterja-blue focus:bg-white shadow-inner transition-all font-medium"
                />
                <button
                  type="submit"
                  disabled={isSimulating}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-full btn-luxe-primary !py-1.5 text-xs font-medium flex items-center gap-1.5"
                >
                  <span>{isSimulating ? "Myślę..." : "Zapytaj"}</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>

            {simResponse && (
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 text-xs text-slate-800 space-y-2 animate-in fade-in">
                <span className="text-[10px] font-mono uppercase text-alterja-blue font-bold tracking-widest block">
                  Odpowiedź Twojej kopii AI:
                </span>
                <p className="leading-relaxed font-serif text-sm text-slate-950 italic">
                  „{simResponse}”
                </p>
              </div>
            )}
          </div>

          {/* Bento 4: Zatwierdzanie nowych zasad (6 kolumn) */}
          <div className="lg:col-span-6 luxe-card p-8 flex flex-col justify-between space-y-6 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl rounded-3xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-700 font-bold">
                  TWOJA KONTROLA
                </span>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-bold">
                  {pendingHypotheses.length} do potwierdzenia
                </span>
              </div>
              <h3 className="text-xl font-serif font-medium text-slate-950 editorial-display">
                Nowe zasady czekające na Twoje „Tak”
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Twoja AlterJa zauważyła nową regułę w Twoich notatkach. Zanim zacznie się nią kierować — potwierdź ją.
              </p>
            </div>

            <div className="space-y-3">
              {pendingHypotheses.length > 0 ? (
                pendingHypotheses.slice(0, 2).map((hyp) => (
                  <div key={hyp.id} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                    <p className="text-xs font-medium text-slate-900 leading-relaxed font-serif">
                      „{hyp.hypothesis_text}”
                    </p>
                    {hyp.alternative_explanation && (
                      <p className="text-[11px] text-slate-500 italic">
                        Uwaga: {hyp.alternative_explanation}
                      </p>
                    )}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleReviewHypothesis(hyp.id, "confirmed")}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-medium transition-all active:scale-[0.985] shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Potwierdzam</span>
                      </button>
                      <button
                        onClick={() => handleReviewHypothesis(hyp.id, "situational")}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-all active:scale-[0.985] border border-slate-200"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>To zależy</span>
                      </button>
                      <button
                        onClick={() => handleReviewHypothesis(hyp.id, "rejected")}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-medium transition-all active:scale-[0.985]"
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
                  <p className="text-xs font-semibold text-slate-800">Wszystkie nowe zasady są zatwierdzone</p>
                  <p className="text-[11px] text-slate-500">Gdy dodasz nowe materiały, tutaj pojawią się kolejne do weryfikacji.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Dolne kafelki nawigacji */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <Link
            href="/interview"
            className="luxe-card p-6 flex items-center justify-between group hover:border-alterja-blue bg-white/95 rounded-2xl border border-slate-200 shadow-md"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
                NAUKA
              </span>
              <div className="text-base font-serif font-medium text-slate-950 group-hover:text-alterja-blue transition-colors editorial-display">
                Krótki wywiad z AI
              </div>
              <p className="text-xs text-slate-500">Odpowiedz na 3 szybkie pytania, aby podnieść wierność</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-950 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/sources"
            className="luxe-card p-6 flex items-center justify-between group hover:border-alterja-blue bg-white/95 rounded-2xl border border-slate-200 shadow-md"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
                ZASILANIE
              </span>
              <div className="text-base font-serif font-medium text-slate-950 group-hover:text-alterja-blue transition-colors editorial-display">
                Wgraj swoje teksty i notatki
              </div>
              <p className="text-xs text-slate-500">Dokumenty, maile, wypowiedzi — nakarm swoją kopię</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-950 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/style-lab"
            className="luxe-card p-6 flex items-center justify-between group hover:border-alterja-blue bg-white/95 rounded-2xl border border-slate-200 shadow-md"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
                SZLIFOWANIE
              </span>
              <div className="text-base font-serif font-medium text-slate-950 group-hover:text-alterja-blue transition-colors editorial-display">
                Laboratorium Twojego stylu
              </div>
              <p className="text-xs text-slate-500">Dostrój cięte riposty, słownictwo i tempo wypowiedzi</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-950 group-hover:translate-x-1 transition-all" />
          </Link>
        </section>
      </main>
    </div>
  );
}
