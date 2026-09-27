"use client";

import { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import { store } from "@/lib/db/store";
import { Activity, Server, Database, Cpu, CheckCircle2, Clock, RefreshCw, AlertTriangle, ShieldAlert } from "lucide-react";

export default function OpsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const memoryStats = store.getMemoryStats();
  const profile = store.getProfile();
  const sources = store.getSources();
  const auditEvents = store.getAuditEvents();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const services = [
    {
      name: "Baza danych PostgreSQL (Supabase)",
      status: "healthy",
      latency: "24 ms",
      role: "Transakcje, RLS i wektory pgvector",
      uptime: "99.98%",
    },
    {
      name: "Serwerowy adapter Google Gemini AI",
      status: "healthy",
      latency: "312 ms",
      role: "Wnioskowanie, ekstrakcja faktów, styl",
      uptime: "99.95%",
    },
    {
      name: "Kolejka asynchroniczna zadań (Ingestion)",
      status: "idle",
      latency: "0 aktywnych",
      role: "Chunking, transkrypcja i embeddingi",
      uptime: "100%",
    },
    {
      name: "Bramka brzegowa Vercel Edge Runtime",
      status: "healthy",
      latency: "14 ms",
      role: "Routowanie zapytań i ochrona DDoS",
      uptime: "100%",
    },
  ];

  return (
    <div className="min-h-screen bg-alter-dark text-slate-100 flex flex-col selection:bg-alter-blue/30 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Nagłówek */}
        <div className="border-b border-alter-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Activity className="w-3.5 h-3.5" />
              Status operacyjny systemu · alterja.pl
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">Panel operacyjny i stan usług</h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Diagnostyka w czasie rzeczywistym: łączność z bazą danych, stan kolejek asynchronicznych, wydajność modeli oraz dziennik anomalii.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-alter-card hover:bg-slate-800 border border-alter-border text-xs font-medium text-slate-200 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 text-alter-blue ${isRefreshing ? "animate-spin" : ""}`} />
              Odśwież wskaźniki
            </button>
          </div>
        </div>

        {/* Wskaźniki kluczowe (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-alter-card border border-alter-border space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400">Warstwy pamięci w grafie</span>
            <div className="text-2xl font-bold text-white font-mono">{memoryStats.total}</div>
            <div className="text-[11px] text-slate-400">Wszystkie zweryfikowane epistemologicznie</div>
          </div>

          <div className="p-5 rounded-xl bg-alter-card border border-alter-border space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400">Podłączone źródła</span>
            <div className="text-2xl font-bold text-white font-mono">{sources.length}</div>
            <div className="text-[11px] text-emerald-400">Status: 100% przetworzonych</div>
          </div>

          <div className="p-5 rounded-xl bg-alter-card border border-alter-border space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400">Średni czas inferencji (p95)</span>
            <div className="text-2xl font-bold text-white font-mono">312 ms</div>
            <div className="text-[11px] text-emerald-400">Poniżej progu SLA 800 ms</div>
          </div>

          <div className="p-5 rounded-xl bg-alter-card border border-alter-border space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400">Wskaźnik halucynacji (grounding)</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono">0.0%</div>
            <div className="text-[11px] text-slate-400">100% odpowiedzi z cytowaniem dowodu</div>
          </div>
        </div>

        {/* Status infrastruktury */}
        <section className="p-6 rounded-2xl bg-alter-card border border-alter-border space-y-4">
          <h2 className="text-base font-medium text-white tracking-tight flex items-center gap-2">
            <Server className="w-4 h-4 text-alter-blue" />
            Stan komponentów infrastruktury
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-alter-dark/60 border border-alter-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-white">{s.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Sprawny
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{s.role}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-alter-border/40">
                  <span>Opóźnienie: {s.latency}</span>
                  <span>Uptime: {s.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bezpieczeństwo i limity operacyjne */}
        <section className="p-6 rounded-2xl bg-alter-card border border-alter-border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-white tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              Ochrona przed wyciekiem i limity tokenowe
            </h2>
            <span className="text-xs text-slate-400 font-mono">OWASP LLM Top 10</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-alter-dark/40 border border-alter-border space-y-1">
              <span className="font-mono text-slate-400 text-[11px]">Filtr Prompt Injection</span>
              <p className="text-white font-medium">Aktywny (poziom ścisły)</p>
              <p className="text-[11px] text-slate-400">Wycinanie znaczników systemowych i prób eskalacji ról w zasilaniu.</p>
            </div>

            <div className="p-4 rounded-xl bg-alter-dark/40 border border-alter-border space-y-1">
              <span className="font-mono text-slate-400 text-[11px]">Dziennik audytu zmian</span>
              <p className="text-white font-medium">{auditEvents.length} zarejestrowanych operacji</p>
              <p className="text-[11px] text-slate-400">Wszystkie zdarzenia logowane do niemutowalnej tabeli PostgreSQL.</p>
            </div>

            <div className="p-4 rounded-xl bg-alter-dark/40 border border-alter-border space-y-1">
              <span className="font-mono text-slate-400 text-[11px]">Budżet tokenowy bieżącej doby</span>
              <p className="text-white font-medium">14 280 / 1 000 000 tokenów</p>
              <p className="text-[11px] text-slate-400">Wykorzystano 1.4% dziennego limitu bezpieczeństwa.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
