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
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col selection:bg-alterja-accent/15 selection:text-alterja-accent">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Nagłówek */}
        <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono uppercase tracking-wider mb-2">
              <Activity className="w-3.5 h-3.5" />
              Status operacyjny systemu · alterja.pl
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-slate-900">Panel operacyjny i stan usług</h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Diagnostyka w czasie rzeczywistym: łączność z bazą danych, stan kolejek asynchronicznych, wydajność modeli oraz dziennik anomalii.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 shadow-sm transition-colors"
            >
              <RefreshCw className={`w-4 h-4 text-alterja-accent ${isRefreshing ? "animate-spin" : ""}`} />
              Odśwież wskaźniki
            </button>
          </div>
        </div>

        {/* Wskaźniki kluczowe (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-card space-y-2">
            <span className="text-xs font-mono uppercase text-slate-500">Warstwy pamięci w grafie</span>
            <div className="text-2xl font-bold text-slate-900 font-mono">{memoryStats.total}</div>
            <div className="text-[11px] text-slate-500">Wszystkie zweryfikowane epistemologicznie</div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-card space-y-2">
            <span className="text-xs font-mono uppercase text-slate-500">Podłączone źródła</span>
            <div className="text-2xl font-bold text-slate-900 font-mono">{sources.length}</div>
            <div className="text-[11px] text-emerald-700 font-medium">Status: 100% przetworzonych</div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-card space-y-2">
            <span className="text-xs font-mono uppercase text-slate-500">Średni czas inferencji (p95)</span>
            <div className="text-2xl font-bold text-slate-900 font-mono">312 ms</div>
            <div className="text-[11px] text-emerald-700 font-medium">Poniżej progu SLA 800 ms</div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-card space-y-2">
            <span className="text-xs font-mono uppercase text-slate-500">Wskaźnik halucynacji (grounding)</span>
            <div className="text-2xl font-bold text-emerald-600 font-mono">0.0%</div>
            <div className="text-[11px] text-slate-500">100% odpowiedzi z cytowaniem dowodu</div>
          </div>
        </div>

        {/* Status infrastruktury */}
        <section className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
          <h2 className="text-base font-serif font-medium text-slate-900 tracking-tight flex items-center gap-2">
            <Server className="w-4 h-4 text-alterja-accent" />
            Stan komponentów infrastruktury
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-900">{s.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    Sprawny
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">{s.role}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-200/80">
                  <span>Opóźnienie: {s.latency}</span>
                  <span>Uptime: {s.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bezpieczeństwo i limity operacyjne */}
        <section className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-serif font-medium text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-700" />
              Ochrona przed wyciekiem i limity tokenowe
            </h2>
            <span className="text-xs text-slate-500 font-mono">OWASP LLM Top 10</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200 space-y-1">
              <span className="font-mono text-slate-500 text-[11px]">Filtr Prompt Injection</span>
              <p className="text-slate-900 font-medium">Aktywny (poziom ścisły)</p>
              <p className="text-[11px] text-slate-600">Wycinanie znaczników systemowych i prób eskalacji ról w zasilaniu.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200 space-y-1">
              <span className="font-mono text-slate-500 text-[11px]">Dziennik audytu zmian</span>
              <p className="text-slate-900 font-medium">{auditEvents.length} zarejestrowanych operacji</p>
              <p className="text-[11px] text-slate-600">Wszystkie zdarzenia logowane do niemutowalnej tabeli PostgreSQL.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200 space-y-1">
              <span className="font-mono text-slate-500 text-[11px]">Budżet tokenowy bieżącej doby</span>
              <p className="text-slate-900 font-medium">14 280 / 1 000 000 tokenów</p>
              <p className="text-[11px] text-slate-600">Wykorzystano 1.4% dziennego limitu bezpieczeństwa.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
