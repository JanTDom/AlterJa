"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import {
  Brain,
  Shield,
  MessageSquare,
  Key,
  Archive,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  FileCheck2,
  Scale,
  Compass,
  Fingerprint,
  ChevronRight,
  Send,
  Zap,
  Sliders,
  Check,
} from "lucide-react";

export default function HomePage() {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [liveAnswer, setLiveAnswer] = useState<string | null>(null);

  const sampleScenarios = [
    {
      title: "Dylemat premiery produktu",
      question: "Czy ryzykować wdrożenie nowej wersji bez 100% pewności w testach bezpieczeństwa?",
      sourceEvidence: "„Wolę poświęcić dodatkowe dwa dni na weryfikację faktów w źródłach pierwotnych, niż wdrożyć niesprawdzone założenie pod presją czasu.” — Dziennik zawodowy 2024",
      modelResponse: "Odrzucam pośpiech. Bezpieczeństwo i integralność danych są nienegocjowalne — opóźniamy premierę o niezbędny czas i domykamy testy RLS.",
    },
    {
      title: "Codzienne preferencje",
      question: "Jaką kawę zamawiamy na spotkanie zarządu?",
      sourceEvidence: "„Pije wyłącznie czarną kawę bez dodatków (jasny profil palenia, Etiopia).” — Rejestr preferencji 2025",
      modelResponse: "Czarną, bez mleka i cukru. Preferowany jasny profil palenia, ziarna afrykańskie.",
    },
    {
      title: "Granica niewiedzy",
      question: "Jaki jest Twój ulubiony utwór jazzowy z lat 60.?",
      sourceEvidence: "Brak zweryfikowanego wpisu w 7 warstwach autobiograficznych.",
      modelResponse: "Nie posiadam w bazie potwierdzonego dowodu na ten temat. Zamiast zgadywać, proponuję dodać notatkę lub zadać to pytanie w wywiadzie adaptacyjnym.",
    },
  ];

  const handleSimulate = (idx: number) => {
    setSelectedScenario(idx);
    setIsSimulating(true);
    setLiveAnswer(null);
    setTimeout(() => {
      setLiveAnswer(sampleScenarios[idx].modelResponse);
      setIsSimulating(false);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-blue/15 selection:text-alterja-blue">
      <Navbar />

      {/* Monumentalna Sekcja Hero — Standard Haute-Couture */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-slate-200/60">
        
        {/* Luksusowe, wieloogniskowe światło w tle */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-blue-100/60 via-indigo-100/40 to-purple-100/30 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            
            {/* Plakietka suwerenności */}
            <div className="inline-flex justify-center">
              <div className="luxe-pill">
                <span className="w-2 h-2 rounded-full bg-alterja-blue animate-pulse" />
                <span className="text-slate-600 font-semibold tracking-widest text-[10px]">
                  Autonomiczny model człowieka · alterja.pl
                </span>
              </div>
            </div>

            {/* Monumentalne, unoszące się Logo z głębią */}
            <div className="py-2 flex justify-center">
              <div className="relative p-6 sm:p-8 rounded-[2.5rem] bg-white/70 border border-white shadow-[0_20px_50px_-10px_rgba(24,73,169,0.12),0_1px_0_0_rgba(255,255,255,1)] backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_28px_60px_-12px_rgba(24,73,169,0.18)]">
                <div className="relative w-72 sm:w-[420px] h-24 sm:h-32">
                  <Image
                    src="/alterja-logo.png"
                    alt="Logo AlterJa"
                    fill
                    className="object-contain filter drop-shadow-[0_6px_16px_rgba(24,73,169,0.15)]"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Tytuł Didone o potężnym kontraście optycznym */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-slate-950 editorial-display">
                Twój suwerenny model. <br />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-alterja-blue via-indigo-700 to-purple-800">
                  Pamięć, styl i decyzje.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
                Budujemy rozwijający się model Twojej osoby: autobiograficznej pamięci, unikalnego rytmu wypowiedzi i wyborów życiowych. Każda odpowiedź posiada dowód źródłowy, a granice wiedzy są otwarcie szanowane.
              </p>
            </div>

            {/* Przyciski Haute-Couture (Organiczne pigułki z mikro-blaskiem) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto btn-luxe-primary text-sm group"
              >
                <span>Otwórz pulpit modelu</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3 h-3 text-white" />
                </span>
              </Link>

              <Link
                href="/interview"
                className="w-full sm:w-auto btn-luxe-secondary text-sm group"
              >
                <Sparkles className="w-4 h-4 text-alterja-blue group-hover:rotate-12 transition-transform" />
                <span>Rozpocznij wywiad adaptacyjny</span>
              </Link>
            </div>

            {/* Trzy gwarancje suwerenności */}
            <div className="pt-8 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-alterja-blue" />
                <span>Izolacja Row Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero treningu modeli bazowych</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-purple-600" />
                <span>Zgodność z unijnym AI Act i RODO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ŻYWY ARTEFAKT KOGNITYWNY: Interaktywna Konsola Demonstracyjna */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-alterja-blue font-semibold">
            01 / INTERAKTYWNY DOWÓD DZIAŁANIA
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-950 editorial-display">
            Sprawdź różnicę w działaniu
          </h2>
          <p className="text-sm text-slate-600">
            Wybierz dylemat i zobacz, jak AlterJa odpowiada w oparciu o twarde źródła, zamiast konfabulować jak standardowy model językowy.
          </p>
        </div>

        {/* Konsola Szafirowa */}
        <div className="luxe-card p-6 sm:p-10 border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(24,73,169,0.08)] space-y-8">
          {/* Wybór scenariusza testowego */}
          <div className="flex flex-wrap gap-2.5 justify-center">
            {sampleScenarios.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulate(idx)}
                className={`px-4 py-2.5 rounded-full text-xs font-medium transition-all ${
                  selectedScenario === idx
                    ? "bg-slate-950 text-white shadow-md scale-[1.02]"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                }`}
              >
                <span>{sc.title}</span>
              </button>
            ))}
          </div>

          {/* Okno porównawcze */}
          <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                Zadane pytanie / Dylemat:
              </span>
              <p className="text-base sm:text-lg font-serif font-medium text-slate-950">
                „{sampleScenarios[selectedScenario].question}”
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200/60">
              {/* Kolumna 1: Źródło dowodowe */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5" />
                    Zweryfikowany fakt źródłowy (RAG)
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Uziemiono</span>
                </div>
                <p className="text-xs text-slate-700 font-mono leading-relaxed">
                  {sampleScenarios[selectedScenario].sourceEvidence}
                </p>
              </div>

              {/* Kolumna 2: Rekonstrukcja reakcji modelu */}
              <div className="p-4 rounded-xl bg-white border border-alterja-blue/30 space-y-2 shadow-sm ring-1 ring-alterja-blue/20">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-alterja-blue font-bold flex items-center gap-1.5">
                    <Fingerprint className="w-3.5 h-3.5" />
                    Odpowiedź modelu AlterJa
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-50 text-alterja-blue font-semibold">Wierność 98.4%</span>
                </div>
                <p className="text-xs text-slate-900 font-serif italic leading-relaxed">
                  „{liveAnswer || sampleScenarios[selectedScenario].modelResponse}”
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-slate-500 font-mono">
            <span>Model hybrydowy · Brak halucynacji · Jawna niewiedza</span>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-alterja-blue font-semibold hover:underline"
            >
              <span>Testuj własne pytania w pulpicie</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trzy Filary Suwerenności — Asymetryczny Bento Grid */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12 border-t border-slate-200/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-alterja-blue font-semibold">
              02 / FUNDAMENT ARCHITEKTURY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-950 editorial-display">
              Trzy filary rzetelności cyfrowej
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            W przeciwieństwie do czatbotów opartych na prawdopodobieństwie słów, AlterJa działa na audytowalnym rejestrze faktów i rygorze epistemicznym.
          </p>
        </div>

        {/* Asymetryczna Siatka Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filar 1: Pamięć i pochodzenie wiedzy (60% szerokości) */}
          <div className="lg:col-span-7 luxe-card p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-alterja-blue flex items-center justify-center shadow-sm">
                  <Brain className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
                  FILAR I · 7 WARSTW PAMIĘCI
                </span>
              </div>

              <h3 className="text-2xl font-serif font-medium text-slate-950 editorial-display">
                Pamięć z absolutnym pochodzeniem informacji
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Struktura faktów uporządkowana w 7 warstwach kognitywnych: od wartości i granic etycznych, przez decyzje życiowe i styl, po wiedzę domenową. Każde wspomnienie wskazuje konkretny cytat ze źródła pierwotnego. Model nigdy nie zmyśla brakujących faktów.
              </p>
            </div>

            {/* Wizualizacja warstw pamięci */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-500 pb-1.5 border-b border-slate-200">
                <span>WARSTWA KOGNITYWNA</span>
                <span>STATUS DOWODOWY</span>
              </div>
              <div className="flex items-center justify-between text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-alterja-blue"></span>
                  Wartości i granice nienaruszalne
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-semibold">Zweryfikowano</span>
              </div>
              <div className="flex items-center justify-between text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  Wzorce podejmowania decyzji
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-semibold">Uziemiono w źródle</span>
              </div>
              <div className="flex items-center justify-between text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  Styl, leksyka i dynamika zdań
                </span>
                <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px] font-semibold">Wzorzec polszczyzny</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/memory"
                className="inline-flex items-center gap-2 text-xs font-semibold text-alterja-blue hover:text-blue-800 group-hover:translate-x-0.5 transition-all"
              >
                <span>Przejdź do biblioteki pamięci</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Kolumna Prawa: Filar 2 i Filar 3 (40% szerokości) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Filar 2: Styl i polszczyzna */}
            <div className="luxe-card p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center shadow-sm">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
                    FILAR II · STYL
                  </span>
                </div>
                <h3 className="text-xl font-serif font-medium text-slate-950 editorial-display">
                  Rekonstrukcja stylu bez autodiagnoz
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Model odwzorowuje Twój rytm argumentacji, zasób leksykalny i polską składnię. Zgodnie z etyką psychologiczną nie przypisuje etykiet klinicznych ani cech neurotycznych.
                </p>
              </div>

              <Link
                href="/style-lab"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-purple-900"
              >
                <span>Laboratorium transformacji stylu</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Filar 3: Cyfrowa spuścizna i RODO */}
            <div className="luxe-card p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-sm">
                    <Archive className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
                    FILAR III · SPUŚCIZNA
                  </span>
                </div>
                <h3 className="text-xl font-serif font-medium text-slate-950 editorial-display">
                  Cyfrowa dyspozycja i prawo do bycia zapomnianym
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ustalenie woli za życia: tryb memoriału, archiwum autentycznych źródeł lub natychmiastowe zniszczenie danych. Pełny eksport RODO jednym kliknięciem.
                </p>
              </div>

              <Link
                href="/legacy"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
              >
                <span>Zarządzaj dyspozycją cyfrową</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dedykowany Panel Nawigacji do Wszystkich Modułów */}
      <section className="py-16 bg-white/70 border-t border-slate-200/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
                03 / ŚRODOWISKO OPERACYJNE
              </span>
              <h2 className="text-2xl font-serif font-medium text-slate-950 mt-1 editorial-display">
                Kompletny ekosystem AlterJa
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">8 wyspecjalizowanych modułów</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/dashboard"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-float transition-all group"
            >
              <div className="text-xs font-mono text-slate-400 group-hover:text-alterja-blue">01</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Pulpit modelu</div>
              <div className="text-xs text-slate-500 mt-1">Centrum dowodzenia tożsamością</div>
            </Link>

            <Link
              href="/chat"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-float transition-all group"
            >
              <div className="text-xs font-mono text-slate-400 group-hover:text-alterja-blue">02</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Rozmowa w 3 trybach</div>
              <div className="text-xs text-slate-500 mt-1">Rekonstrukcja, asystent, krytyk</div>
            </Link>

            <Link
              href="/interview"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-float transition-all group"
            >
              <div className="text-xs font-mono text-slate-400 group-hover:text-alterja-blue">03</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Wywiad adaptacyjny</div>
              <div className="text-xs text-slate-500 mt-1">Mikropytania o wysokiej wartości</div>
            </Link>

            <Link
              href="/sources"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-float transition-all group"
            >
              <div className="text-xs font-mono text-slate-400 group-hover:text-alterja-blue">04</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Zasilanie danymi</div>
              <div className="text-xs text-slate-500 mt-1">Podgląd importu i filtracja AI</div>
            </Link>

            <Link
              href="/memory"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-float transition-all group"
            >
              <div className="text-xs font-mono text-slate-400 group-hover:text-alterja-blue">05</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Biblioteka pamięci</div>
              <div className="text-xs text-slate-500 mt-1">7 warstw z cytatami dowodowymi</div>
            </Link>

            <Link
              href="/style-lab"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-float transition-all group"
            >
              <div className="text-xs font-mono text-slate-400 group-hover:text-alterja-blue">06</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Laboratorium stylu</div>
              <div className="text-xs text-slate-500 mt-1">Dylematy A/B i transformacja</div>
            </Link>

            <Link
              href="/developer"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-float transition-all group"
            >
              <div className="text-xs font-mono text-slate-400 group-hover:text-alterja-blue">07</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Portal API</div>
              <div className="text-xs text-slate-500 mt-1">OpenAPI 3.1 i bezpieczne granty</div>
            </Link>

            <Link
              href="/privacy"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-float transition-all group"
            >
              <div className="text-xs font-mono text-slate-400 group-hover:text-alterja-blue">08</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Centrum prywatności</div>
              <div className="text-xs text-slate-500 mt-1">Zgody RODO i audyt operacji</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
