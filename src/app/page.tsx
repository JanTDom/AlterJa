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
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const tickerItems = [
    "Nie daj sobą orać",
    "Twoja kopia nigdy się nie męczy",
    "Pełna suwerenność danych",
    "Zero korporacyjnych modeli",
    "Decyzje w Twoim imieniu 24/7",
    "Autentyczny styl i Twoje zasady",
    "Koniec z pracą po nocach",
    "Niezniszczalny cyfrowy sobowtór",
  ];

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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-alterja-blue/25 selection:text-blue-200 overflow-x-hidden">
      <Navbar />

      {/* 1. SCENA HERO: SZEROKIE KINOWE TŁO TOŻSAMOŚCI (ALTERJA-FINGERPRINT) */}
      <section className="photo-stage min-h-[92vh] sm:min-h-screen">
        {/* Zdjęcie na całą szerokość i wysokość ekranu */}
        <Image
          src="/images/alterja-fingerprint.jpg"
          alt="Świetlisty biometryczny odcisk palca rozpadający się w sieć neuronową i metropolię myśli"
          fill
          priority
          className="object-cover object-center scale-[1.02] filter brightness-90 contrast-105"
        />

        {/* Dynamiczny promień skanujący */}
        <div className="absolute inset-x-0 h-28 bg-gradient-to-b from-blue-400/0 via-blue-400/25 to-blue-400/0 border-b border-blue-300/70 pointer-events-none animate-scanline" />

        {/* Asymetryczna kurtyna kinowa dla idealnej czytelności */}
        <div className="absolute inset-0 photo-overlay-left pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

        {/* Treść unosząca się bezpośrednio w kadrze */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/20 shadow-2xl text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-alterja-gold animate-pulse" />
              <span className="text-white font-bold uppercase tracking-wider text-[11px]">
                Koniec z pracą ponad siły
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-blue-300 font-semibold text-[11px]">Twój cyfrowy sobowtór</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white editorial-display leading-[1.04]">
                Nie daj sobą orać. <br />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-amber-200">
                  Stwórz swoją kopię AI.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-xl">
                Biologiczny człowiek potrzebuje snu i regeneracji. Twoja AlterJa uczy się Twojego autentycznego stylu, poczucia humoru, zasad i kryteriów decyzyjnych. Przejmuje powtarzalne rozmowy i pilnuje Twoich spraw 24 godziny na dobę.
              </p>
            </div>

            {/* Przyciski wejścia */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/interview"
                className="btn-luxe-light !py-4 !px-8 text-base shadow-[0_0_35px_rgba(255,255,255,0.35)] animate-shimmer"
              >
                <span>Rozpocznij wywiad tożsamości</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
              <Link
                href="/chat"
                className="btn-luxe-glass !py-4 !px-8 text-base"
              >
                <Brain className="w-4 h-4 text-alterja-gold" />
                <span>Rozmawiaj z modelem live</span>
              </Link>
            </div>

            {/* Gwarancje epistemiczne */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/15 text-[11px] font-mono text-slate-300">
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
        </div>
      </section>

      {/* 2. PŁYNĄCA WSTĘGA MANIFESTU NA PEŁNĄ SZEROKOŚĆ (MARQUEE) */}
      <div className="py-4 bg-slate-950 border-y border-white/10 text-white overflow-hidden relative z-20">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 text-xs font-mono uppercase tracking-[0.18em]">
              <span className="text-slate-300 font-medium hover:text-white transition-colors">{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. SCENA DUALIZMU KOGNITYWNEGO: POJEDYNEK W LOCIE (ALTERJA-DUALITY) */}
      <section className="photo-stage min-h-[95vh] border-b border-white/10">
        {/* Szerokie tło horyzontu dualizmu */}
        <Image
          src="/images/alterja-duality.jpg"
          alt="Kosmiczny horyzont dualizmu: organiczna świadomość biologiczna i cybernetyczna precyzja"
          fill
          className="object-cover object-center scale-[1.02] filter brightness-90 contrast-105"
        />

        {/* Nastrojowa kurtyna kinowa */}
        <div className="absolute inset-0 photo-overlay-center pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-bold px-3 py-1 rounded-full bg-slate-950/80 border border-white/15">
              Horyzont dualizmu · Test decyzyjny w locie
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white editorial-display">
              Zobacz, jak myśli Twoja kopia
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Wybierz dylemat biznesowy i zobacz różnicę między bezdusznym botem a odpowiedzią Twojej uziemionej AlterJi.
            </p>
          </div>

          {/* Przyciski wyboru dylematu */}
          <div className="flex flex-wrap justify-center gap-3">
            {simulationCases.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCase(idx)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-mono transition-all border ${
                  selectedCase === idx
                    ? "bg-white text-slate-950 border-white shadow-xl shadow-white/10 font-bold scale-105"
                    : "bg-slate-950/80 backdrop-blur-md text-slate-300 border-white/15 hover:border-white/30"
                }`}
              >
                <span>Dylemat {idx + 1}: {c.title.slice(0, 32)}...</span>
              </button>
            ))}
          </div>

          {/* Konfrontacja odpowiedzi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Generyczny asystent */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/85 backdrop-blur-xl border border-rose-500/30 space-y-4 flex flex-col justify-between shadow-2xl">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <XCircle className="w-4 h-4" />
                  <span>Generyczny bot korporacyjny</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans italic">
                  „{simulationCases[selectedCase].aiGeneric}”
                </p>
              </div>
              <span className="text-[11px] font-mono text-rose-400/80 pt-3 border-t border-white/10">
                Wada: unikanie decyzji, lanie wody, brak twardych granic.
              </span>
            </div>

            {/* Twoja AlterJa */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 backdrop-blur-xl border border-blue-400/50 space-y-4 flex flex-col justify-between shadow-2xl shadow-blue-500/10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Twoja niezniszczalna AlterJa</span>
                </div>
                <p className="text-xs sm:text-sm text-white leading-relaxed font-sans font-medium">
                  „{simulationCases[selectedCase].alterjaReply}”
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-alterja-gold">
                {simulationCases[selectedCase].rationale}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SCENA KATEDRY PAMIĘCI: 7 WARSTW WIEDZY (ALTERJA-MATRIX) */}
      <section className="photo-stage min-h-[92vh] border-b border-white/10">
        {/* Zdjęcie monumentalnej katedry pamięci na całą szerokość */}
        <Image
          src="/images/alterja-matrix.jpg"
          alt="Monumentalna katedra pamięci i lewitujące sześciany faktów AlterJa"
          fill
          className="object-cover object-center scale-[1.02] filter brightness-90 contrast-105"
        />

        {/* Asymetryczna kurtyna z lewej strony */}
        <div className="absolute inset-0 photo-overlay-left pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-blue-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Skarbiec prawdy · 7 warstw kognitywnych
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white editorial-display leading-tight">
                Pamięć uziemiona w twardych dowodach.
              </h2>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                AlterJa nie generuje fikcji. Każda teza, pogląd czy deklaracja pochodzi z konkretnego cytatu, notatki, wywiadu lub dokumentu w Twojej bibliotece. Jeśli czegoś nie ma w pamięci — model otwarcie o tym informuje.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/15">
                <span className="text-xs font-mono uppercase text-blue-400 font-bold block">Warstwa 1-2</span>
                <span className="text-sm font-semibold text-white">Biografia i Wiedza</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/15">
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold block">Warstwa 3-4</span>
                <span className="text-sm font-semibold text-white">Wartości i Styl</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/15">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold block">Warstwa 5-6</span>
                <span className="text-sm font-semibold text-white">Nawyki i Decyzje</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/15">
                <span className="text-xs font-mono uppercase text-purple-400 font-bold block">Warstwa 7</span>
                <span className="text-sm font-semibold text-white">Kontekst i Granice</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/memory"
                className="btn-luxe-glass !py-3.5 !px-6 text-xs"
              >
                <span>Eksploruj bibliotekę pamięci</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SCENA SANKTUARIUM ARCHITEKTURY UMYSŁU (ALTERJA-CAMPUS) */}
      <section className="photo-stage min-h-[92vh] border-b border-white/10">
        {/* Zdjęcie kampusu architektury umysłu na całą szerokość */}
        <Image
          src="/images/alterja-campus.jpg"
          alt="Sanktuarium i kampus architektury umysłu AlterJa: połączone pawilony pamięci, dźwięku i etyki"
          fill
          className="object-cover object-center scale-[1.02] filter brightness-90 contrast-105"
        />

        {/* Asymetryczna kurtyna z lewej strony */}
        <div className="absolute inset-0 photo-overlay-left pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Architektura bez kompromisów · Zero korpo-bełkotu
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white editorial-display leading-tight">
                Podczas gdy Ty odpoczywasz, <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-white">
                  Twoja AlterJa pilnuje spraw.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                Rozdzieliliśmy rolę rekonstrukcji osoby od asystenta i krytycznego partnera. Dzięki temu Twój cyfrowy model zachowuje absolutną dyskrecję, nie zgaduje Twoich decyzji i odciąża Cię dokładnie tam, gdzie powtarzalne konwersacje kradną Twój cenny czas.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="btn-luxe-light !py-3.5 !px-6 text-xs"
              >
                <span>Otwórz pulpit dowodzenia</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SCENA KWANTOWEGO MONOLITU INTEGRACJI I API (ALTERJA-CORE) */}
      <section className="photo-stage min-h-[92vh] border-b border-white/10">
        {/* Zdjęcie kwantowego monolitu API na całą szerokość */}
        <Image
          src="/images/alterja-core.jpg"
          alt="Kwantowy monolit i serwerowa bramka API AlterJa"
          fill
          className="object-cover object-center scale-[1.02] filter brightness-90 contrast-105"
        />

        {/* Asymetryczna kurtyna z lewej strony */}
        <div className="absolute inset-0 photo-overlay-left pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-purple-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Platforma API v1 · Szybkość i prywatność
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white editorial-display leading-tight">
                Wepnij sobowtóra do systemów firmy.
              </h2>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                Dzięki bezpiecznym tokenom dostępu i deterministycznej kontroli RLS, Twoja AlterJa może odpowiadać na zapytania w Slacku, poczcie elektronicznej czy wewnętrznym CRM. Opóźnienie poniżej 120 ms i pełna wierność zasadom.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/developer"
                className="btn-luxe-glass !py-3.5 !px-6 text-xs"
              >
                <span>Dokumentacja OpenAPI 3.1</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SCENA KOSMICZNEJ KONSTELACJI I SPUŚCIZNY (ALTERJA-CONSTELLATION) */}
      <section className="photo-stage min-h-[92vh] border-b border-white/10">
        {/* Zdjęcie kosmicznej konstelacji na całą szerokość */}
        <Image
          src="/images/alterja-constellation.jpg"
          alt="Kosmiczna konstelacja pamięci i sfery wiedzy zachowujące tożsamość na wieczność"
          fill
          className="object-cover object-center scale-[1.02] filter brightness-90 contrast-105"
        />

        {/* Nastrojowa kurtyna kinowa */}
        <div className="absolute inset-0 photo-overlay-center pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/20 text-purple-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Wieczność · Dyspozycja za życia
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white editorial-display leading-tight">
            Zachowaj swoje życiowe dzieło i mądrość.
          </h2>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto font-normal">
            To nie tylko narzędzie na dziś. AlterJa umożliwia sporządzenie dyspozycji pośmiertnej. Wskazujesz zaufane osoby, które otrzymają wgląd w archiwum Twoich myśli, zasad i nagrań, chroniąc bliskich przed zapomnieniem.
          </p>

          <div className="flex justify-center pt-2">
            <Link
              href="/legacy"
              className="btn-luxe-light !py-4 !px-8 text-sm"
            >
              <span>Skonfiguruj cyfrową spuściznę</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FINAŁOWA BRAMKA WEJŚCIOWA: PORTAL DO NIEZNISZCZALNEGO SOBOWTÓRA (ALTERJA-PORTAL) */}
      <section className="photo-stage min-h-[95vh] justify-center text-center">
        {/* Zdjęcie kosmicznego portalu na pełną szerokość tła */}
        <Image
          src="/images/alterja-portal.jpg"
          alt="Kosmiczny portal wejścia do cyfrowego modelu człowieka AlterJa"
          fill
          className="object-cover object-center scale-[1.02] filter brightness-90 contrast-105"
        />

        {/* Nastrojowa kurtyna kinowa */}
        <div className="absolute inset-0 photo-overlay-center pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
          <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-blue-300 font-bold px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Czas na Twój ruch
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white editorial-display leading-[1.08]">
            Przestań brać wszystko na własne barki.
          </h2>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-xl mx-auto">
            Zacznij od kilkuminutowego wywiadu. Twoja AlterJa natychmiast uziemi pierwsze karty pamięci i skalibruje styl odpowiedzi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/interview"
              className="w-full sm:w-auto btn-luxe-light !py-4 !px-8 text-base shadow-[0_0_40px_rgba(255,255,255,0.4)] animate-shimmer"
            >
              <span>Rozpocznij wywiad autobiograficzny</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto btn-luxe-glass !py-4 !px-8 text-base"
            >
              <span>Zobacz pulpit sobowtóra</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
