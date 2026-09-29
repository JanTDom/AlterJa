"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import {
  Brain,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  Flame,
  CheckCircle2,
  XCircle,
  Layers,
  ChevronRight,
  Database,
  Radio,
  Eye,
  SlidersHorizontal,
  Compass,
} from "lucide-react";

export default function LandingPage() {
  const [activeLens, setActiveLens] = useState<"matrix" | "campus" | "core">("matrix");
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const lenses = {
    matrix: {
      title: "Katedra pamięci i cytowań",
      subtitle: "7 warstw faktów z twardym uziemieniem w dowodach",
      desc: "Model AlterJa nie konfabuluje. Każda odpowiedź posiada sygnaturę źródłową i cytat z Twoich prawdziwych notatek, wywiadów lub dokumentów.",
      image: "/images/alterja-matrix.jpg",
      tag: "100% uziemienia",
    },
    campus: {
      title: "Sanktuarium architektury umysłu",
      subtitle: "Wielopawilonowy ekosystem: pamięć, etyka, głos",
      desc: "Zorganizowana przestrzeń kognitywna, w której rozdzielono tryb rekonstrukcji osoby od asystenta i krytycznego partnera.",
      image: "/images/alterja-campus.jpg",
      tag: "Izolacja ról",
    },
    core: {
      title: "Kwantowy monolit inferencji",
      subtitle: "Transfer wiedzy w bezpieczne API i integracje",
      desc: "Podłącz swoją AlterJę do poczty, komunikatorów i systemów firmy. Niech decyduje w Twoim imieniu 24/7 z autorskimi kryteriami.",
      image: "/images/alterja-core.jpg",
      tag: "API v1 & RLS",
    },
  };

  const simulationCases = [
    {
      title: "Trudny klient żąda nierealnego rabatu 40%",
      aiGeneric: "Szanowny Panie, dziękujemy za kontakt. Niestety nasza polityka cenowa nie przewiduje takich rabatów, ale możemy porozmawiać o innych opcjach...",
      alterjaReply: "Nie schodzimy z ceny o 40%, bo to deprecjonuje jakość i marżę. Możemy zmniejszyć zakres etapu pierwszego o moduł raportowy, co zamknie się w Pańskim budżecie. Decyzja do jutra do 14:00.",
      rationale: "Zasada nienaruszalności stawek i twardego domykania terminów (warstwa Decyzji i Wartości).",
    },
    {
      title: "Partner biznesowy spóźnia się z kluczową umową o 3 dni",
      aiGeneric: "Rozumiem sytuację, opóźnienia się zdarzają. Proszę dać znać, kiedy dokument będzie gotowy do podpisu.",
      alterjaReply: "Daję czas do dziś do 18:00 na finalną wersję. Jeśli termin nie zostanie dotrzymany, wstrzymuję zasoby deweloperskie i przesuwam start o dwa tygodnie. Szanujmy wzajemne ustalenia.",
      rationale: "Konsekwentna ochrona zasobów i poszanowanie wiążących deklaracji (warstwa Relacji).",
    },
    {
      title: "Propozycja wejścia w ryzykowny, medialny projekt",
      aiGeneric: "To brzmi jak interesująca szansa! Warto rozważyć plusy i minusy oraz przygotować prezentację.",
      alterjaReply: "Projekt ma za dużo szumu medialnego, a za mało twardych fundamentów ekonomicznych. Na tym etapie mówię stanowcze: nie. Wracamy do rozmów, gdy pojawią się zweryfikowane liczby.",
      rationale: "Przedkładanie merytoryki nad medialny poklask (warstwa Wartości bazowych).",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-alterja-blue/25 selection:text-blue-200 overflow-x-hidden">
      <Navbar />

      {/* 1. SCENA HERO: ARCHITEKTONICZNY PRZEKRÓJ TOŻSAMOŚCI (ALTERJA-FINGERPRINT) */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Subtelne światłocienie tła */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-alterja-blue/15 blur-[140px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Lewa kolumna: Tekst i wezwanie do działania */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-2xl text-xs font-mono backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-alterja-gold animate-pulse" />
              <span className="text-white font-bold uppercase tracking-wider text-[11px]">
                Suwerenność kognitywna
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-blue-300 font-medium text-[11px]">Twój niezniszczalny sobowtór</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white editorial-display leading-[1.05]">
                Nie daj sobą orać. <br />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-amber-200">
                  Stwórz swoją kopię AI.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
                Człowiek potrzebuje snu, regeneracji i spokoju. Twoja AlterJa uczy się Twojego autentycznego stylu, poczucia humoru, zasad i kryteriów decyzyjnych. Przejmuje trudne konwersacje i pilnuje Twoich spraw 24/7.
              </p>
            </div>

            {/* Przyciski wejścia */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/interview"
                className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-medium text-sm transition-all shadow-xl shadow-white/10 active:scale-95 flex items-center justify-center gap-2.5"
              >
                <span>Rozpocznij wywiad tożsamości</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
              <Link
                href="/chat"
                className="px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-medium text-sm transition-all backdrop-blur-xl active:scale-95 flex items-center justify-center gap-2"
              >
                <Brain className="w-4 h-4 text-alterja-gold" />
                <span>Rozmawiaj z modelem live</span>
              </Link>
            </div>

            {/* Gwarancje epistemiczne */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero konfabulacji</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Izolacja RLS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zgodność z RODO</span>
              </div>
            </div>
          </div>

          {/* Prawa kolumna: Nowatorski pryzmat biometryczny (alterja-fingerprint.jpg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-700/80 shadow-[0_0_60px_rgba(59,130,246,0.15)] group">
              <Image
                src="/images/alterja-fingerprint.jpg"
                alt="Monumentalny świetlisty odcisk palca rozpadający się w sieć neuronową łączącą się ze świetlistą metropolią"
                fill
                priority
                className="object-cover object-center filter brightness-95 contrast-110 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Dynamiczny promień skanera */}
              <div className="absolute inset-0 scanline-bar opacity-30 pointer-events-none" />

              {/* Kurtyna nastrojowa */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 pointer-events-none" />

              {/* Nakładka telemetryczna */}
              <div className="absolute bottom-6 inset-x-6 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-slate-700 text-xs space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-alterja-gold uppercase tracking-wider">
                  <span>Biometryczny profil tożsamości</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Zsynchronizowany
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  Podpis kognitywny nie jest kopiowany przez modele zewnętrzne. Twoja pamięć jest uwięziona wyłącznie w Twojej instancji.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERAKTYWNY TRYPTYK POZNANIA (BENTO VIEWPORT: MATRIX, CAMPUS, CORE) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[11px] font-mono uppercase tracking-widest text-alterja-gold font-bold px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            Architektura 3 wymiarów
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white editorial-display">
            Wymiary Twojego cyfrowego alter ego
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Wybierz aspekt kognitywny, aby obejrzeć strukturę pamięci, sanktuarium umysłu oraz serwerowy monolit API.
          </p>
        </div>

        {/* Przyciski przełączania soczewek */}
        <div className="flex flex-wrap justify-center gap-3">
          {(["matrix", "campus", "core"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setActiveLens(key)}
              className={`px-6 py-3 rounded-2xl text-xs font-mono font-medium transition-all border ${
                activeLens === key
                  ? "bg-white text-slate-950 border-white shadow-xl shadow-white/10 scale-105"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-850"
              }`}
            >
              <span>{lenses[key].title}</span>
            </button>
          ))}
        </div>

        {/* Nowatorski ekran panoramiczny wybranej soczewki */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
          {/* Obraz soczewki */}
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-full overflow-hidden">
            <Image
              src={lenses[activeLens].image}
              alt={lenses[activeLens].title}
              fill
              className="object-cover object-center filter brightness-95 contrast-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/90 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent lg:hidden" />
          </div>

          {/* Opis architektoniczny soczewki */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-alterja-gold font-bold px-3 py-1 rounded-full bg-slate-950 border border-slate-800 inline-block">
                {lenses[activeLens].tag}
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-white">
                {lenses[activeLens].title}
              </h3>

              <p className="text-xs font-mono text-blue-300">
                {lenses[activeLens].subtitle}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {lenses[activeLens].desc}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <Link
                href={activeLens === "matrix" ? "/memory" : activeLens === "campus" ? "/dashboard" : "/developer"}
                className="inline-flex items-center gap-2 text-xs font-mono text-white hover:text-blue-300 transition-colors"
              >
                <span>Otwórz dedykowany moduł</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <span className="text-[10px] font-mono text-slate-500">AlterJa 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCENA DUALIZMU KOGNITYWNEGO: CZŁOWIEK VS CYFROWY SOBOWTÓR (ALTERJA-DUALITY) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-800 bg-slate-900/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Panoramiczny kadr dualizmu wkomponowany jako soczewka horyzontu */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-[320px] sm:h-[400px]">
            <Image
              src="/images/alterja-duality.jpg"
              alt="Horyzont dualizmu: organiczna tożsamość człowieka po lewej i cybernetyczny kryształowy sobowtór po prawej"
              fill
              className="object-cover object-center filter brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
              <div className="space-y-2 max-w-xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-alterja-gold font-bold">
                  Horyzont dualizmu
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif font-medium">
                  Organiczna myśl ↔ Cyfrowa precyzja
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Porównaj w locie, czym różni się odpowiedź generycznego bota od uziemionej w Twoich zasadach AlterJi.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-950/80 px-4 py-2 rounded-2xl border border-slate-700 text-xs font-mono text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Test dynamiczny</span>
              </div>
            </div>
          </div>

          {/* Symulator sytuacji decyzyjnych A/B */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Lewa kolumna: Wybór kazusu */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-2">
                Wybierz dylemat biznesowy:
              </span>
              {simulationCases.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCase(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs flex flex-col gap-1.5 ${
                    selectedCase === idx
                      ? "bg-white text-slate-950 border-white shadow-lg shadow-white/10"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850 hover:text-white"
                  }`}
                >
                  <span className="font-semibold text-sm">{c.title}</span>
                  <span className={`text-[11px] ${selectedCase === idx ? "text-slate-600" : "text-slate-500"}`}>
                    Dotknij, aby zobaczyć konfrontację
                  </span>
                </button>
              ))}
            </div>

            {/* Prawa kolumna: Bezpośrednie zderzenie odpowiedzi */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Generyczny bot */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-rose-500/30 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase">
                    <XCircle className="w-4 h-4" />
                    <span>Generyczny asystent (obcy)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans italic">
                    „{simulationCases[selectedCase].aiGeneric}”
                  </p>
                </div>
                <span className="text-[10px] font-mono text-rose-400/80 pt-2 border-t border-slate-800">
                  Wada: unikanie decyzji, lanie wody, brak twardych granic.
                </span>
              </div>

              {/* Twoja AlterJa */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-blue-500/40 shadow-xl space-y-3 flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-300 text-xs font-mono font-bold uppercase">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Twoja AlterJa (rekonstrukcja)</span>
                  </div>
                  <p className="text-xs text-white leading-relaxed font-sans font-medium">
                    „{simulationCases[selectedCase].alterjaReply}”
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-alterja-gold">
                  {simulationCases[selectedCase].rationale}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SCENA CYFROWEJ SPUŚCIZNY I OBSERWATORIUM (ALTERJA-CONSTELLATION) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[460px]">
            <Image
              src="/images/alterja-constellation.jpg"
              alt="Kosmiczna konstelacja pamięci i sfery wiedzy zawieszone w przestrzeni dla przyszłych pokoleń"
              fill
              className="object-cover object-center filter brightness-95 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/90 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800 inline-block">
              Wieczność i testament cyfrowy
            </span>

            <h3 className="text-3xl sm:text-4xl font-serif font-medium text-white leading-tight">
              Zachowaj swoje życiowe dzieło i mądrość
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              To nie tylko narzędzie na dziś. AlterJa umożliwia sporządzenie dyspozycji za życia. Wskazujesz zaufane osoby, które po Twojej śmierci otrzymają bezpieczny wgląd w archiwum myśli, nagrań i zasad, bez ryzyka zniekształcenia Twojej tożsamości.
            </p>

            <div className="pt-2">
              <Link
                href="/legacy"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-medium transition-all shadow-md active:scale-95"
              >
                <span>Skonfiguruj cyfrową spuściznę</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAŁOWA BRAMKA WEJŚCIOWA (ALTERJA-PORTAL) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center space-y-8">
        <div className="p-8 sm:p-14 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 shadow-2xl space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 font-bold px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
            Czas na Twój ruch
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white editorial-display">
            Przestań brać wszystko na własne barki.
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Zacznij od kilkuminutowego wywiadu. Twoja AlterJa natychmiast uziemi pierwsze karty pamięci i skalibruje styl odpowiedzi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/interview"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-medium text-xs tracking-wide transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Rozpocznij wywiad autobiograficzny</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-white font-medium text-xs tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Zobacz pulpit demonstracyjny</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
