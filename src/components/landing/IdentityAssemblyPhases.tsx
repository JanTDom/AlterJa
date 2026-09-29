"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Brain,
  Sliders,
  Shield,
  Layers,
  FileCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface Phase {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  headline: string;
  description: string;
  layers: string;
  imageSrc: string;
  imageAlt: string;
  tag: string;
  metrics: { label: string; value: string }[];
  highlight: string;
}

const PHASES: Phase[] = [
  {
    id: "pamiec",
    stepNumber: "01",
    tag: "Faza pierwsza · Epistemologia",
    title: "To, co pamiętasz",
    subtitle: "Biografia, fakty i dorobek",
    headline: "Zamiana surowych dokumentów i rozmów w uziemiony skarbiec wiedzy.",
    description:
      "AlterJa nie spekuluje o Twojej przeszłości. Na podstawie wywiadów autobiograficznych, notatek, książek, umów i nagrań ekstrahujemy atomowe karty pamięci. Każdy fakt posiada sygnaturę czasową, dosłowny cytat i źródło pochodzenia.",
    layers: "Warstwy 1–2: Tożsamość autobiograficzna & Dziedziny wiedzy",
    imageSrc: "/images/alterja-matrix.jpg",
    imageAlt: "Monumentalna katedra pamięci i lewitujące sześciany faktów AlterJa",
    metrics: [
      { label: "Pochodzenie twierdzeń", value: "100% uziemione" },
      { label: "Baza wektorowa", value: "pgvector HNSW" },
      { label: "Izolacja danych", value: "PostgreSQL RLS" },
    ],
    highlight: "„Jeśli w Twoich materiałach brak informacji — model otwarcie odpowiada: »Nie mam w pamięci takiego faktu«.”",
  },
  {
    id: "heurystyki",
    stepNumber: "02",
    tag: "Faza druga · Aksjologia",
    title: "To, jak myślisz",
    subtitle: "Wartości, heurystyki i decyzje",
    headline: "Kodyfikacja Twoich życiowych zasad i kryteriów decyzyjnych.",
    description:
      "Wiedza to za mało — kluczem jest tożsamość w działaniu. Model uczy się Twojej tolerancji ryzyka, nieprzekraczalnych zasad etycznych, kryteriów wyboru partnerów biznesowych i tego, jak reagujesz na presję i manipulację.",
    layers: "Warstwy 3–5: Wartości bazowe, Styl perswazji & Kryteria decyzji",
    imageSrc: "/images/alterja-duality.jpg",
    imageAlt: "Kosmiczny horyzont dualizmu: organiczna świadomość i cybernetyczna precyzja AlterJa",
    metrics: [
      { label: "Ochrona marży", value: "Niepodważalna" },
      { label: "Tolerancja ryzyka", value: "Skalibrowana" },
      { label: "Determinizm woli", value: "Zgodny z zasadami" },
    ],
    highlight: "„Twoja AlterJa nie podejmuje zgadywanek. Działa w twardych granicach Twoich autoryzowanych kryteriów.”",
  },
  {
    id: "ekspresja",
    stepNumber: "03",
    tag: "Faza trzecia · Autentyczność",
    title: "To, co sprawia, że jesteś sobą",
    subtitle: "Styl języka, poczucie humoru i granice",
    headline: "Niewymuszona obecność, charakterystyczny rytm frazy i twarde granice.",
    description:
      "Ostatni szlif to autentyczny tembr komunikacyjny: specyficzny zasób słów, preferowana długość zdań, ironia, konstruktywna krytyka i prawo do stanowczego odmówienia. Żadnego szablonowego korpo-bełkotu.",
    layers: "Warstwy 6–7: Nawyki ekspresji językowej, Poczucie humoru & Dyskrecja",
    imageSrc: "/images/alterja-tree.jpg",
    imageAlt: "Świetliste drzewo neuronowe reprezentujące unikalną architekturę stylu człowieka",
    metrics: [
      { label: "Kalka korporacyjna", value: "0% wyeliminowana" },
      { label: "Wierność frazie", value: "98.4%" },
      { label: "Poufność rozmów", value: "Szyfrowana E2E" },
    ],
    highlight: "„Osoby trzecie rozmawiające z Twoją AlterJą czują rozmowę z Tobą, a nie z asystentem call-center.”",
  },
];

export default function IdentityAssemblyPhases() {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  const activePhase = PHASES[activePhaseIndex];

  return (
    <div id="metamorfoza" className="w-full max-w-7xl mx-auto space-y-10 select-none">
      {/* Zakładki wyboru fazy z numeracją i wskaźnikiem postępu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PHASES.map((phase, idx) => {
          const isActive = idx === activePhaseIndex;
          return (
            <button
              key={phase.id}
              type="button"
              onClick={() => setActivePhaseIndex(idx)}
              className={`p-5 rounded-3xl text-left transition-all duration-300 border flex flex-col justify-between gap-4 relative overflow-hidden ${
                isActive
                  ? "bg-slate-900 border-sky-400 shadow-[0_0_35px_rgba(56,189,248,0.18)] scale-[1.02]"
                  : "bg-slate-950/60 border-white/10 hover:border-white/20 hover:bg-slate-900/40"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-400 animate-pulse" />
              )}
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-sky-400/90">{phase.stepNumber}</span>
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    isActive
                      ? "bg-sky-500/20 text-sky-300 border border-sky-400/40"
                      : "bg-white/5 text-slate-400"
                  }`}
                >
                  {phase.subtitle}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-serif font-semibold text-white tracking-tight">
                  {phase.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans line-clamp-2">
                  {phase.headline}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Główna scena wybranej fazy: Monumentalne 2.5D zintegrowane z opisem */}
      <div className="relative rounded-[2.5rem] overflow-hidden border border-white/15 bg-slate-950/90 shadow-2xl min-h-[550px] flex flex-col lg:flex-row items-stretch">
        {/* Szerokie tło fotograficzne fazy */}
        <div className="relative w-full lg:w-1/2 min-h-[320px] lg:min-h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
          <Image
            src={activePhase.imageSrc}
            alt={activePhase.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-all duration-700 ease-out scale-100 hover:scale-105"
          />
          {/* Asymetryczna kurtyna kinowa */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-slate-950/40 lg:to-slate-950" />

          {/* Oznaczenie warstwy na zdjęciu */}
          <div className="absolute top-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-[11px] font-mono text-sky-300">
            {activePhase.layers}
          </div>
        </div>

        {/* Panel narracyjny i telemetria */}
        <div className="relative w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 z-10 bg-slate-950/70 backdrop-blur-xl">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950/60 border border-sky-400/30 text-sky-300 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{activePhase.tag}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-serif font-medium text-white tracking-tight leading-tight">
              {activePhase.headline}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              {activePhase.description}
            </p>

            <blockquote className="p-4 rounded-2xl bg-white/[0.03] border-l-2 border-sky-400 text-xs text-sky-200 font-sans italic leading-relaxed">
              {activePhase.highlight}
            </blockquote>
          </div>

          {/* Siatka wskaźników telemetrycznych fazy */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
              Kluczowe inwarianty architektury:
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {activePhase.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 font-mono text-center"
                >
                  <span className="text-[10px] text-slate-400 block truncate">{m.label}</span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-0.5 truncate">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
