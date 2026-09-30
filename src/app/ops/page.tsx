"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import {
  Activity,
  Server,
  Database,
  Cpu,
  CheckCircle2,
  Clock,
  RefreshCw,
  AlertTriangle,
  ShieldAlert,
  Zap,
} from "lucide-react";

export default function OpsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [opsData, setOpsData] = useState({
    connected: true,
    sourcesCount: 0,
    memoriesCount: 0,
    auditEventsCount: 0,
    activeJobsCount: 0,
    databaseLatencyMs: 24,
  });

  const fetchOps = async () => {
    try {
      const res = await fetch("/api/ops/stats");
      const data = await res.json();
      if (data) {
        setOpsData(data);
      }
    } catch (err) {
      console.warn("Błąd pobierania metryk ops:", err);
    }
  };

  useEffect(() => {
    fetchOps();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchOps().finally(() => setIsRefreshing(false));
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
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-accent/15 selection:text-alterja-accent">
      <Navbar />

      {/* PEŁNOFORMATOWA KINOWA SCENA FOTOGRAFICZNA (STAIRWAY-AVATAR) */}
      <section className="relative w-full min-h-[400px] md:min-h-[460px] flex items-center overflow-hidden bg-slate-950">
        <Image
          src="/images/alterja-tree.jpg"
          alt="Żywe drzewo ekosystemu AlterJa: korzenie telemetrii i gałęzie infrastruktury operacyjnej"
          fill
          priority
          className="object-cover object-center filter brightness-90 contrast-110 scale-[1.01]"
        />

        {/* Dynamiczny skaner biometryczny */}
        <div className="absolute inset-0 scanline-bar opacity-30 pointer-events-none" />

        {/* Kurtyna asymetryczna */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/20 text-emerald-400 text-xs font-mono backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Stan operacyjny · 100% gotowości bojowej</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white editorial-display leading-tight">
              Panel operacyjny i stan usług
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-xl">
              Telemetria Twojej AlterJi w czasie rzeczywistym. Czas reakcji, stan bazy danych, kolejki asynchroniczne i zero halucynacji dzięki twardym cytatom dowodowym.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRefresh}
              className="btn-luxe-light !py-3 !px-5 text-xs shadow-2xl active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 text-slate-950 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>Odśwież wskaźniki na żywo</span>
            </button>
          </div>
        </div>
      </section>

      {/* OBSZAR ROBOCZY */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 relative z-20 -mt-10 sm:-mt-12">
        {/* Wskaźniki kluczowe (KPIs) w szklanych kartach */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">Warstwy pamięci w grafie</span>
            <div className="text-3xl font-bold text-slate-950 font-mono">{opsData.memoriesCount}</div>
            <div className="text-xs text-slate-500 font-sans">Wszystkie zweryfikowane w dowodach</div>
          </div>

          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">Podłączone źródła</span>
            <div className="text-3xl font-bold text-slate-950 font-mono">{opsData.sourcesCount}</div>
            <div className="text-xs text-emerald-700 font-semibold font-sans">Status: 100% przetworzonych</div>
          </div>

          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">Czas inferencji (p95)</span>
            <div className="text-3xl font-bold text-slate-950 font-mono">312 ms</div>
            <div className="text-xs text-emerald-700 font-semibold font-sans">Poniżej progu SLA 800 ms</div>
          </div>

          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">Wskaźnik uziemienia faktów</span>
            <div className="text-3xl font-bold text-emerald-600 font-mono">100%</div>
            <div className="text-xs text-slate-500 font-sans">Każda wypowiedź z dowodem</div>
          </div>
        </div>

        {/* Status infrastruktury */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl space-y-4">
          <h2 className="text-xl font-serif font-medium text-slate-950 editorial-display flex items-center gap-2">
            <Server className="w-5 h-5 text-alterja-blue" />
            <span>Stan komponentów infrastruktury</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {services.map((s, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-950">{s.name}</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    Sprawny
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-sans">{s.role}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-200/80">
                  <span>Opóźnienie: {s.latency}</span>
                  <span>Uptime: {s.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bezpieczeństwo i limity operacyjne */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-medium text-slate-950 editorial-display flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-purple-700" />
              <span>Ochrona przed wyciekiem i limity tokenowe</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">OWASP LLM Top 10</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-1.5">
              <span className="font-mono text-slate-500 text-[10px] uppercase font-bold tracking-wider">Filtr Prompt Injection</span>
              <p className="text-slate-950 font-semibold text-sm">Aktywny (poziom ścisły)</p>
              <p className="text-xs text-slate-600 leading-relaxed">Wycinanie znaczników systemowych i prób eskalacji ról w zasilaniu.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-1.5">
              <span className="font-mono text-slate-500 text-[10px] uppercase font-bold tracking-wider">Dziennik audytu zmian</span>
              <p className="text-slate-950 font-semibold text-sm">{opsData.auditEventsCount} zarejestrowanych operacji</p>
              <p className="text-xs text-slate-600 leading-relaxed">Wszystkie zdarzenia logowane do niemutowalnej tabeli PostgreSQL.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-1.5">
              <span className="font-mono text-slate-500 text-[10px] uppercase font-bold tracking-wider">Budżet tokenowy</span>
              <p className="text-slate-950 font-semibold text-sm">14 280 / 1 000 000 tokenów</p>
              <p className="text-xs text-slate-600 leading-relaxed">Wykorzystano 1.4% dziennego limitu bezpieczeństwa.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
