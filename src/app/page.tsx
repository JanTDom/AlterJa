import React from "react";
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
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-blue/10 selection:text-alterja-blue">
      <Navbar />

      {/* Monumentalna Sekcja Hero — Standard Atelier */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-alterja-border">
        {/* Dekoracyjne linie architektoniczne w tle */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="max-w-7xl mx-auto h-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-6 px-4">
            <div className="border-r border-slate-200/60 h-full"></div>
            <div className="border-r border-slate-200/60 h-full hidden sm:block"></div>
            <div className="border-r border-slate-200/60 h-full hidden lg:block"></div>
            <div className="border-r border-slate-200/60 h-full hidden lg:block"></div>
            <div className="border-r border-slate-200/60 h-full hidden lg:block"></div>
            <div className="border-r border-slate-200/60 h-full"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            
            {/* Indeks architektoniczny */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-alterja-border shadow-atelier-sm text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-alterja-blue animate-pulse"></span>
              <span className="text-slate-500 font-semibold tracking-widest uppercase text-[10px]">AlterJa · System tożsamości cyfrowej</span>
            </div>

            {/* Monumentalne, rzeźbione Logo AlterJa */}
            <div className="py-4 flex justify-center">
              <div className="relative p-6 rounded-3xl bg-white/60 border border-white/80 shadow-atelier-float backdrop-blur-md transition-transform duration-500 hover:scale-[1.02]">
                <div className="relative w-72 sm:w-96 h-24 sm:h-28">
                  <Image
                    src="/alterja-logo.png"
                    alt="Logo AlterJa"
                    fill
                    className="object-contain filter drop-shadow-[0_4px_12px_rgba(24,73,169,0.12)]"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Główny tytuł redakcyjny */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-slate-950 editorial-headline">
                Twój suwerenny model. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-alterja-blue via-blue-700 to-indigo-800">
                  Pamięć, styl i decyzje.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
                Budujemy rozwijający się model Twojej osoby: autobiograficznej pamięci, unikalnego rytmu wypowiedzi i wyborów życiowych. Każda odpowiedź posiada dowód źródłowy, a granice wiedzy są otwarcie szanowane.
              </p>
            </div>

            {/* Główne wezwania do działania */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-xl btn-atelier-primary font-medium text-sm flex items-center justify-center gap-2.5 group"
              >
                <span>Otwórz pulpit modelu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/interview"
                className="w-full sm:w-auto px-8 py-4 rounded-xl btn-atelier-secondary font-medium text-sm flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-alterja-blue" />
                <span>Rozpocznij wywiad adaptacyjny</span>
              </Link>
            </div>

            {/* Sygnatury rygoru epistemicznego */}
            <div className="pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-alterja-blue" />
                <span>Izolacja Row Level Security (RLS)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Brak treningu modeli bazowych</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-purple-600" />
                <span>Zgodność z unijnym AI Act i RODO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asymetryczna Kompozycja Bento — Trzy Filary Suwerenności */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-alterja-border pb-8">
          <div>
            <span className="atelier-index">01 / ARCHITEKTURA TOŻSAMOŚCI</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-950 mt-2">
              Trzy filary rzetelności cyfrowej
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            W przeciwieństwie do powszechnych czatbotów generujących domysły, AlterJa działa na rygorystycznych dowodach i audytowalnym rejestrze faktów.
          </p>
        </div>

        {/* Asymetryczna Siatka Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filar 1: Pamięć i pochodzenie wiedzy (60% szerokości) */}
          <div className="lg:col-span-7 atelier-card p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-alterja-blue flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <span className="atelier-index">FILAR I · 7 WARSTW PAMIĘCI</span>
              </div>

              <h3 className="text-2xl font-serif font-medium text-slate-950">
                Pamięć z absolutnym pochodzeniem informacji
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Struktura faktów uporządkowana w 7 warstwach kognitywnych: od wartości i granic etycznych, przez decyzje życiowe i styl, po wiedzę domenową. Każde wspomnienie wskazuje konkretny cytat ze źródła pierwotnego. Model nigdy nie zmyśla brakujących faktów.
              </p>
            </div>

            {/* Wizualizacja warstw pamięci w stylu atelier */}
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
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">Zweryfikowano</span>
              </div>
              <div className="flex items-center justify-between text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  Wzorce podejmowania decyzji
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">Uziemiono w źródle</span>
              </div>
              <div className="flex items-center justify-between text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  Styl, leksyka i dynamika zdań
                </span>
                <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px]">Wzorzec polszczyzny</span>
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
            <div className="atelier-card p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <span className="atelier-index">FILAR II · STYL</span>
                </div>
                <h3 className="text-xl font-serif font-medium text-slate-950">
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
            <div className="atelier-card p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                    <Archive className="w-5 h-5" />
                  </div>
                  <span className="atelier-index">FILAR III · SPUŚCIZNA</span>
                </div>
                <h3 className="text-xl font-serif font-medium text-slate-950">
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
      <section className="py-16 bg-white border-t border-alterja-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="atelier-index">02 / NAWIGACJA PLATFORMY</span>
              <h2 className="text-2xl font-serif font-medium text-slate-950 mt-1">Kompletne środowisko pracy</h2>
            </div>
            <span className="text-xs font-mono text-slate-500">8 wyspecjalizowanych modułów</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/dashboard"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-card transition-all group"
            >
              <div className="text-xs font-mono text-slate-500 group-hover:text-alterja-blue">01</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Pulpit modelu</div>
              <div className="text-xs text-slate-500 mt-1">Centrum dowodzenia tożsamością</div>
            </Link>

            <Link
              href="/chat"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-card transition-all group"
            >
              <div className="text-xs font-mono text-slate-500 group-hover:text-alterja-blue">02</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Rozmowa w 3 trybach</div>
              <div className="text-xs text-slate-500 mt-1">Rekonstrukcja, asystent, krytyk</div>
            </Link>

            <Link
              href="/interview"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-card transition-all group"
            >
              <div className="text-xs font-mono text-slate-500 group-hover:text-alterja-blue">03</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Wywiad adaptacyjny</div>
              <div className="text-xs text-slate-500 mt-1">Mikropytania o wysokiej wartości</div>
            </Link>

            <Link
              href="/sources"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-card transition-all group"
            >
              <div className="text-xs font-mono text-slate-500 group-hover:text-alterja-blue">04</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Zasilanie danymi</div>
              <div className="text-xs text-slate-500 mt-1">Podgląd importu i filtracja AI</div>
            </Link>

            <Link
              href="/memory"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-card transition-all group"
            >
              <div className="text-xs font-mono text-slate-500 group-hover:text-alterja-blue">05</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Biblioteka pamięci</div>
              <div className="text-xs text-slate-500 mt-1">7 warstw z cytatami dowodowymi</div>
            </Link>

            <Link
              href="/style-lab"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-card transition-all group"
            >
              <div className="text-xs font-mono text-slate-500 group-hover:text-alterja-blue">06</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Laboratorium stylu</div>
              <div className="text-xs text-slate-500 mt-1">Dylematy A/B i transformacja</div>
            </Link>

            <Link
              href="/developer"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-card transition-all group"
            >
              <div className="text-xs font-mono text-slate-500 group-hover:text-alterja-blue">07</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Portal API</div>
              <div className="text-xs text-slate-500 mt-1">OpenAPI 3.1 i bezpieczne granty</div>
            </Link>

            <Link
              href="/privacy"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-alterja-blue hover:shadow-atelier-card transition-all group"
            >
              <div className="text-xs font-mono text-slate-500 group-hover:text-alterja-blue">08</div>
              <div className="text-sm font-semibold text-slate-950 mt-2">Centrum prywatności</div>
              <div className="text-xs text-slate-500 mt-1">Zgody RODO i audyt operacji</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
