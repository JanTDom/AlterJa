"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import { Hypothesis, MemoryLayer, MemoryItem } from "@/domains/types";
import { LayerCoverage, SuggestedActionItem } from "@/lib/proactivity/engine";
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
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function DashboardPage() {
  const [profile, setProfile] = useState<{ display_name: string; email: string; learning_paused: boolean; quiet_hours_enabled: boolean }>({
    display_name: "Użytkownik",
    email: "",
    learning_paused: false,
    quiet_hours_enabled: false,
  });
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [sourcesCount, setSourcesCount] = useState(0);
  const [coverage, setCoverage] = useState<LayerCoverage[]>([]);
  const [suggestedActions, setSuggestedActions] = useState<SuggestedActionItem[]>([]);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Symulator reakcji
  const [simQuery, setSimQuery] = useState("Czy wchodzimy w ten projekt przy 20% niepewności?");
  const [simResponse, setSimResponse] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [statsRes, memRes, proRes] = await Promise.all([
          fetch("/api/dashboard/stats").then((r) => (r.ok ? r.json() : null)),
          fetch("/api/memory").then((r) => (r.ok ? r.json() : null)),
          fetch("/api/proactivity").then((r) => (r.ok ? r.json() : null)),
        ]);

        if (statsRes && statsRes.success) {
          setSourcesCount(statsRes.sourcesCount || 0);
        }

        if (memRes && memRes.success && Array.isArray(memRes.memories)) {
          setMemories(memRes.memories);
        }

        if (proRes && proRes.success) {
          if (Array.isArray(proRes.coverage)) setCoverage(proRes.coverage);
          if (Array.isArray(proRes.suggestedActions)) setSuggestedActions(proRes.suggestedActions);
        }
      } catch (err) {
        console.warn("Błąd ładowania danych pulpitu:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleActionComplete = async (actionId: string, status: "done" | "dismissed") => {
    try {
      await fetch("/api/proactivity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actionId, status }),
      });

      setSuggestedActions((prev) => prev.filter((a) => a.id !== actionId));
      showNotice(status === "done" ? "Zadanie oznaczone jako wykonane." : "Zadanie pominięte.");
    } catch {
      showNotice("Błąd aktualizacji zadania.");
    }
  };

  const runSimulator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simQuery.trim()) return;
    setIsSimulating(true);
    setSimResponse(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: simQuery,
          mode: "reconstruction",
        }),
      });

      if (!res.ok) {
        setSimResponse("Silnik rekonstrukcji nie zwrócił odpowiedzi dla tego zapytania.");
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value);
          const lines = text.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const parsed = JSON.parse(line.slice(6));
                if (parsed.chunk) {
                  accumulated += parsed.chunk;
                  setSimResponse(accumulated);
                }
              } catch (parseErr) {
                console.warn("Błąd parsowania fragmentu SSE w symulacji:", parseErr);
              }
            }
          }
        }
      }
    } catch (simErr) {
      console.warn("Błąd silnika symulacji:", simErr);
      setSimResponse("Wystąpił problem z połączeniem z silnikiem symulacji.");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl text-xs font-mono text-white animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* Nagłówek powitalny */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400">
              alterja.pl · Centrum poznawania
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white">
              Pulpit modelu tożsamości
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Zarządzaj 7 warstwami wiedzy autobiograficznej, sprawdzaj luki i wykonuj sugerowane zadania.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sources"
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition-colors shadow-lg shadow-sky-500/20 flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Podłącz materiały</span>
            </Link>
            <Link
              href="/chat"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700 flex items-center gap-2"
            >
              <Brain className="w-3.5 h-3.5 text-sky-400" />
              <span>Rozmowa z modelem</span>
            </Link>
          </div>
        </div>

        {/* 1. SEKCJA: DZIŚ DLA CIEBIE (SILNIK PROAKTYWNOŚCI) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-lg font-serif font-medium text-white">
                Dziś dla Ciebie
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Inicjatywa systemu · Zasada proaktywności
            </span>
          </div>

          {suggestedActions.length === 0 ? (
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 text-slate-400 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Wszystkie bieżące luki poznawcze zostały domknięte. Model posiada stabilne pokrycie.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suggestedActions.map((action) => (
                <div
                  key={action.id}
                  className="p-5 rounded-2xl border border-amber-500/30 bg-slate-900/90 shadow-xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
                        {action.action_type === "question" ? "Pytanie uzupełniające" : "Podłączenie źródła"}
                      </span>
                      <span className="text-slate-500">Priorytet: {action.priority}</span>
                    </div>

                    <p className="text-xs text-slate-200 font-sans leading-relaxed">
                      {action.payload.question || action.rationale}
                    </p>

                    <p className="text-[11px] text-slate-400 italic">
                      {action.rationale}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    {action.action_type === "question" ? (
                      <Link
                        href="/interview"
                        className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-medium transition-colors flex items-center gap-1.5"
                      >
                        <span>Odpowiedz teraz</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <Link
                        href="/sources"
                        className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-medium transition-colors flex items-center gap-1.5"
                      >
                        <span>Przejdź do źródeł</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => handleActionComplete(action.id, "dismissed")}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-[11px] transition-colors"
                    >
                      Pomiń
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 2. SEKCJA: MAPA POKRYCIA 7 WARSTW PAMIĘCI */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              <h2 className="text-lg font-serif font-medium text-white">
                Mapa pokrycia 7 warstw modelu
              </h2>
            </div>
            <Link href="/memory" className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1">
              <span>Biblioteka pamięci</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coverage.map((cov) => (
              <div
                key={cov.layer}
                className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-white">{cov.name}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    cov.status === "rich" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                    cov.status === "solid" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" :
                    cov.status === "minimal" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                    "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}>
                    {cov.score}%
                  </span>
                </div>

                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      cov.status === "rich" ? "bg-emerald-400" :
                      cov.status === "solid" ? "bg-sky-400" :
                      cov.status === "minimal" ? "bg-amber-400" :
                      "bg-rose-400"
                    }`}
                    style={{ width: `${Math.max(5, cov.score)}%` }}
                  />
                </div>

                <div className="text-[11px] text-slate-400 flex justify-between items-center">
                  <span>Wpisy: {cov.count}</span>
                  <span className="truncate text-[10px] text-slate-500 max-w-[140px]">{cov.missingPrompt}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SEKCJA: SZYBKI TEST REKONSTRUKCJI */}
        <section className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/80 space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400">
              Sprawdzenie spójności
            </span>
            <h2 className="text-xl font-serif font-medium text-white">
              Szybka symulacja decyzji modelu
            </h2>
            <p className="text-xs text-slate-400">
              Wpisz dowolne pytanie decyzyjne, aby zweryfikować czy model odwołuje się do Twoich ugruntowanych zasad.
            </p>
          </div>

          <form onSubmit={runSimulator} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={simQuery}
              onChange={(e) => setSimQuery(e.target.value)}
              placeholder="Wpisz sytuację decyzyjną..."
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="submit"
              disabled={isSimulating || !simQuery.trim()}
              className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs tracking-wide transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSimulating ? "Analiza zasad..." : "Sprawdź reakcję"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {simResponse && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-in fade-in">
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400">
                Odpowiedź modelu AlterJa:
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {simResponse}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
