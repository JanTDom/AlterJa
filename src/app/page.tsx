"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import HeroSculpture from "@/components/landing/HeroSculpture";
import GroundedComparisonDemo from "@/components/landing/GroundedComparisonDemo";
import IdentityAssemblyPhases from "@/components/landing/IdentityAssemblyPhases";
import {
  Brain,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  CheckCircle2,
  FileText,
  SlidersHorizontal,
  Compass,
  Database,
  Radio,
  Share2,
  Archive,
  Terminal,
  Activity,
  ChevronRight,
  Eye,
} from "lucide-react";

export default function LandingPage() {
  const tickerItems = [
    "Twoje drugie ja zbudowane z Ciebie",
    "Pochodzenie każdego faktu i cytatu",
    "100% uziemienie · Zero konfabulacji",
    "Deterministyczna izolacja PostgreSQL RLS",
    "Ochrona marży i czasu właściciela",
    "Autentyczny styl i Twoje zasady",
    "Cyfrowa spuścizna i dyspozycja za życia",
    "Koniec z pracą ponad siły",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-sky-500/25 selection:text-sky-200 overflow-x-hidden">
      <Navbar />

      {/* 1. SCENA HERO: "TWOJE DRUGIE JA. ZBUDOWANE Z CIEBIE." */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-12 pb-20">
        {/* Szerokie tło kinowe z alterja-duality.jpg i głębią ambientową */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/alterja-duality.jpg"
            alt="Kosmiczny horyzont dualizmu organicznego człowieka i precyzyjnego cyfrowego sobowtóra"
            fill
            priority
            className="object-cover object-center scale-105 filter brightness-[0.45] contrast-[1.12]"
          />
          {/* Wieloplanowe maski gradientowe dla idealnego kontrastu typografii */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/60 to-slate-950 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
        </div>

        {/* Dynamiczny promień telemetryczny */}
        <div className="absolute inset-x-0 h-28 bg-gradient-to-b from-sky-400/0 via-sky-400/20 to-sky-400/0 border-b border-sky-300/50 pointer-events-none animate-scanline z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Lewa kolumna: Główna treść redakcyjna */}
            <div className="lg:col-span-7 space-y-8">
              {/* Mikro-plakietka statusowa */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-xl border border-white/20 shadow-2xl text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-white font-bold uppercase tracking-wider text-[11px]">
                  Architektura tożsamości cyfrowej
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-sky-300 font-semibold text-[11px]">alterja.pl</span>
              </div>

              {/* Tytuł główny zadany w briefie */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white editorial-display leading-[1.04]">
                  Twoje drugie ja. <br />
                  <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-white">
                    Zbudowane z Ciebie.
                  </span>
                </h1>

                {/* Podtytuł zadany w briefie */}
                <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
                  Cyfrowy model Twojej wiedzy, wspomnień i sposobu myślenia. Tworzony z rozmów i materiałów, które mu powierzysz.
                </p>
              </div>

              {/* Przyciski wejścia zadane w briefie */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/interview"
                  className="btn-luxe-primary !py-4 !px-8 text-base shadow-[0_0_35px_rgba(56,189,248,0.35)] animate-shimmer"
                >
                  <Sparkles className="w-4 h-4 text-sky-300" />
                  <span>Zbuduj swoje AlterJa</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
                <a
                  href="#zobacz-roznice"
                  className="btn-luxe-glass !py-4 !px-8 text-base"
                >
                  <Eye className="w-4 h-4 text-sky-400" />
                  <span>Zobacz, jak to działa</span>
                </a>
              </div>

              {/* Twarde gwarancje epistemiczne i architektoniczne */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/15 text-[11px] font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% uziemienie źródeł</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Izolacja PostgreSQL RLS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-300 shrink-0" />
                  <span>Prywatność i RODO</span>
                </div>
              </div>
            </div>

            {/* Prawa kolumna: Pamiętny moment animacji 1 — Interaktywna rzeźba 2.5D */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroSculpture />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PŁYNĄCA WSTĘGA MANIFESTU NA PEŁNĄ SZEROKOŚĆ (MARQUEE) */}
      <div className="py-4 bg-slate-950 border-y border-white/10 text-white overflow-hidden relative z-20">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 text-xs font-mono uppercase tracking-[0.18em]">
              <span className="text-slate-300 font-medium hover:text-white transition-colors">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. SEKCJA 01: PAMIĘTNY MOMENT ANIMACJI 2 — TRZY FAZY POWSTAWANIA SOBOWTÓRA */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-white/15 text-sky-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            01 / PROCES METAMORFOZY
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.08]">
            Trzy fazy powstawania <br />
            Twojego cyfrowego sobowtóra.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
            Od faktograficznych kart pamięci i dokumentów, przez heurystyki podejmowania decyzji, aż po unikalny rytm języka i nieprzekraczalne granice dyskrecji.
          </p>
        </div>

        <IdentityAssemblyPhases />
      </section>

      {/* 4. SEKCJA 02: PAMIĘTNY MOMENT ANIMACJI 3 — INTERAKTYWNE DEMO PORÓWNANIA ODPOWIEDZI */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-y border-white/10 bg-slate-900/40 relative overflow-hidden">
        {/* Tło fotograficzne alterja-matrix.jpg w subtelnym nastroju */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <Image
            src="/images/alterja-matrix.jpg"
            alt="Monumentalna katedra pamięci i lewitujące sześciany faktów AlterJa"
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-white/15 text-sky-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              02 / TEST PRAWDZIWEJ REKONSTRUKCJI
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.08]">
              Zobacz różnicę w odpowiedzi.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
              Sprawdź, jak na ten sam trudny dylemat odpowiada generyczny model AI oraz dwie uziemione tożsamości AlterJa o skrajnie różnych profilach decyzyjnych. Klikaj źródła dowodowe, by zobaczyć cytaty.
            </p>
          </div>

          <GroundedComparisonDemo />
        </div>
      </section>

      {/* 5. SEKCJA 03: MASTER BENTO GRID ZASTOSOWAŃ PRAKTYCZNYCH */}
      <section id="zastosowania" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-white/15 text-sky-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            03 / MOŻLIWOŚCI SYSTEMU
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.08]">
            Gdzie Twoje drugie ja <br />
            zmienia reguły gry.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
            Nie kolejna atrapa bota, lecz uziemiony model operacyjny. Przejmuje powtarzalne rozmowy, pilnuje Twoich zasad decyzyjnych i zabezpiecza życiową wiedzę.
          </p>
        </div>

        {/* Siatka Bento Haute-Couture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kafel 1 (Dominant 2x2): Autonomiczne delegowanie decyzji biznesowych */}
          <div className="md:col-span-2 p-8 sm:p-10 rounded-[2.5rem] bg-slate-900/80 border border-white/15 shadow-2xl space-y-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-semibold px-3 py-1 rounded-full bg-sky-950/60 border border-sky-400/30">
                  Autonomia w ustalonych granicach
                </span>
                <span className="text-xs font-mono text-slate-400">Warstwa 6</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-medium text-white tracking-tight leading-tight">
                Delegowanie decyzji i filtracja propozycji.
              </h3>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-xl">
                Twoja AlterJa odbiera zapytania biznesowe, weryfikuje propozycje pod kątem Twojej minimalnej marży, odrzuca próby wywierania presji i formułuje stanowcze warunki brzegowe. Do Ciebie trafiają wyłącznie sprawy wymagające osobistej autoryzacji.
              </p>
            </div>

            {/* Wizualny panel mechanizmu decyzyjnego */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-white/10 space-y-3 relative z-10 font-mono">
              <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2 text-sky-300">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Protokół filtracji wejściowej</span>
                </div>
                <span className="text-emerald-400">Autonomia 85%</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Obrona marży</span>
                  <span className="font-bold text-white">Nienaruszalna</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Filtr presji czasu</span>
                  <span className="font-bold text-sky-300">Odrzucenie blefu</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Eskalacja do Ciebie</span>
                  <span className="font-bold text-indigo-300">Tylko krytyczne</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/style-lab"
                className="text-xs font-mono text-sky-300 hover:text-sky-200 flex items-center gap-2 group-hover:translate-x-1 transition-transform"
              >
                <span>Skonfiguruj kryteria decyzyjne w Style Lab</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Kafel 2 (1x1): Nawigator pamięci osobistej */}
          <div className="p-8 rounded-[2.5rem] bg-slate-900/80 border border-white/15 shadow-2xl space-y-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
                <Brain className="w-6 h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-medium text-white tracking-tight">
                Nawigator własnej pamięci.
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Przeszukuj setki własnych wywiadów, notatek i umów w 120 ms. Zadaj pytanie o decyzję sprzed lat, a model zacytuje Twoje ówczesne argumenty z dokładnością do akapitu.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/memory"
                className="text-xs font-mono text-sky-300 hover:text-sky-200 flex items-center gap-2"
              >
                <span>Eksploruj skarbiec pamięci</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Kafel 3 (1x1): Zaufana reprezentacja 24/7 i API */}
          <div className="p-8 rounded-[2.5rem] bg-slate-900/80 border border-white/15 shadow-2xl space-y-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-300">
                <Terminal className="w-6 h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-medium text-white tracking-tight">
                Reprezentacja 24/7 i API.
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Wepnij sobowtóra do Slacka, wewnętrznego CRM-u lub skrzynki pocztowej. Pełna zgodność z OpenAPI 3.1 i deterministyczna kontrola tokenów dostępu.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/developer"
                className="text-xs font-mono text-sky-300 hover:text-sky-200 flex items-center gap-2"
              >
                <span>Dokumentacja API platformy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Kafel 4 (2x1 Panoramic): Cyfrowa spuścizna i archiwum pośmiertne */}
          <div className="md:col-span-2 relative p-8 sm:p-10 rounded-[2.5rem] overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-between min-h-[300px] group">
            {/* Zdjęcie alterja-constellation.jpg jako panoramiczne tło spuścizny */}
            <Image
              src="/images/alterja-constellation.jpg"
              alt="Kosmiczna konstelacja sfer pamięci i cyfrowej spuścizny AlterJa"
              fill
              className="object-cover object-center filter brightness-[0.4] contrast-[1.1] scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/40 pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/30 text-purple-300 text-xs font-mono">
                <Archive className="w-3.5 h-3.5" />
                <span>Dyspozycja za życia · Wieczność</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-medium text-white tracking-tight leading-tight">
                Cyfrowa spuścizna i archiwum dla bliskich.
              </h3>

              <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed">
                Sporządź bezpieczną dyspozycję pośmiertną. Wskaż zaufane osoby, które otrzymają autoryzowany wgląd w archiwum Twoich myśli, zasad i nagrań, chroniąc Twoją pamięć przed zapomnieniem.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                href="/legacy"
                className="btn-luxe-glass !py-3 !px-6 text-xs font-mono"
              >
                <span>Skonfiguruj cyfrową spuściznę</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SEKCJA 04: SUWERENNOŚĆ, KONTROLA I BEZPIECZEŃSTWO */}
      <section id="suwerennosc" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-white/15 text-sky-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              04 / SUWERENNOŚĆ I PRYWATNOŚĆ
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.08]">
              Pełna suwerenność danych. <br />
              Zero kompromisów.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
              AlterJa to nie usługa korporacyjna trenująca modele na Twoich zwierzeniach. To prywatny, uziemiony sejf kognitywny należący wyłącznie do Ciebie.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white">Izolacja PostgreSQL RLS</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Każdy rekord i wektor podlega deterministycznej izolacji Row Level Security. Żaden inny użytkownik nie ma wglądu w Twoje dane.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white">Pochodzenie wiedzy</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Każde twierdzenie ma przypisany cytat źródłowy z Twoich materiałów. Brak danych = uczciwe przyznanie braku wiedzy zamiast konfabulacji.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white">Prawo do zapomnienia</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Jednym kliknięciem trwale usuwasz lub korygujesz dowolne wspomnienie, wywiad lub dokument. Masz pełną władzę nad zawartością pamięci.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-300">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white">Pakiet eksportu danych</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                W każdej chwili pobierasz kompletną paczkę pamięci w otwartych formatach JSON i Markdown. Zero uzależnienia od platformy (no vendor lock-in).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SEKCJA 05: FINAŁOWE WEZWANIE DO DZIAŁANIA — "ZACZNIJ OD TEGO, CO WIESZ TYLKO TY." */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-t border-white/10">
        {/* Szerokie tło fotograficzne alterja-portal.jpg */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/alterja-portal.jpg"
            alt="Monumentalny kosmiczny portal wejścia do cyfrowego modelu człowieka AlterJa"
            fill
            className="object-cover object-center filter brightness-[0.5] contrast-[1.1] scale-105"
          />
          <div className="absolute inset-0 bg-radial-gradient from-slate-950/60 via-slate-950/85 to-slate-950 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/20 text-sky-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            05 / ROZPOCZNIJ BUDOWĘ
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium text-white editorial-display leading-[1.05]">
            Zacznij od tego, <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-white">
              co wiesz tylko Ty.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-sans max-w-2xl mx-auto font-normal">
            Zbudowanie pierwszej wersji Twojego cyfrowego modelu wymaga jedynie kilkunastu minut wywiadu autobiograficznego. Resztę uziemią Twoje dokumenty.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/interview"
              className="w-full sm:w-auto btn-luxe-primary !py-4 !px-9 text-base shadow-[0_0_40px_rgba(56,189,248,0.4)] animate-shimmer"
            >
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>Zbuduj swoje AlterJa</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto btn-luxe-glass !py-4 !px-8 text-base"
            >
              <Compass className="w-4 h-4 text-slate-300" />
              <span>Otwórz pulpit dowodzenia</span>
            </Link>
          </div>

          <p className="text-xs font-mono text-slate-400 pt-6">
            Brak opłat wstępnych · Pełna suwerenność RLS · Zgodność z RODO i Aktem o AI UE
          </p>
        </div>
      </section>
    </div>
  );
}
