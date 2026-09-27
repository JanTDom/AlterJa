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
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans">
      <Navbar />

      {/* Sekcja Hero */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Oznaczenie tożsamości */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Cyfrowy model człowieka z pochodzeniem informacji</span>
            </div>

            {/* Monumentalne Logo AlterJa — Bije po oczach na jasnym tle */}
            <div className="py-2 flex justify-center">
              <div className="relative w-64 sm:w-80 h-20 sm:h-24 transition-transform hover:scale-[1.02] duration-300">
                <Image
                  src="/alterja-logo.png"
                  alt="AlterJa"
                  fill
                  className="object-contain drop-shadow-sm"
                  priority
                />
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-950 leading-[1.12]">
              Twój suwerenny model. <br />
              <span className="text-alterja-blue">Pamięć, styl i decyzje.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              AlterJa buduje rozwijający się model Twojej osoby: autobiograficznej pamięci,
              unikalnego rytmu wypowiedzi, wartości i wyborów życiowych. Każda odpowiedź posiada
              wskazany dowód źródłowy, a granice wiedzy są otwarcie szanowane.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Otwórz pulpit modelu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/interview"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-medium border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-alterja-blue" />
                <span>Rozpocznij wywiad adaptacyjny</span>
              </Link>
            </div>

            {/* Bezpieczeństwo i gwarancje */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span>Izolacja Row Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span>Brak treningu na modelach bazowych</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span>100% uziemienia w dowodach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja 3 Filarów — Klasa Światowa */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-600 font-semibold">
            Architektura trójmodułowa
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            Trzy fundamentalne filary AlterJa
          </h2>
          <p className="text-sm text-slate-600">
            Od intymnego poznania człowieka, przez integrację z zewnętrznymi aplikacjami, po dostojną dyspozycję na przyszłość.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Filar 1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-float transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-alterja-blue flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 font-semibold">Filar I</span>
                <h3 className="text-xl font-semibold text-slate-950">Cyfrowy model człowieka</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strukturalna pamięć autobiograficzna w 7 warstwach: od faktów i wiedzy po styl wypowiedzi, zasady moralne i wzorce podejmowania decyzji. Model przewiduje Twoje reakcje, a nie symuluje obcą osobowość.
              </p>
            </div>
            <Link
              href="/memory"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-alterja-blue hover:text-blue-800 transition-colors"
            >
              <span>Poznaj 7 warstw pamięci</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Filar 2 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-float transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-purple-700 flex items-center justify-center">
                <Key className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 font-semibold">Filar II</span>
                <h3 className="text-xl font-semibold text-slate-950">Platforma API dla aplikacji</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Udostępniaj swój styl i wiedzę w kontrolowany sposób. Precyzyjne granty uprawnień: przekształcaj teksty zgodnie z Twoją leksyką bez ujawniania sekretów biograficznych i prywatnych danych.
              </p>
            </div>
            <Link
              href="/developer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-purple-900 transition-colors"
            >
              <span>Portal deweloperski i specyfikacja</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Filar 3 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-float transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center">
                <Archive className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 font-semibold">Filar III</span>
                <h3 className="text-xl font-semibold text-slate-950">Cyfrowa spuścizna</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Świadome rozporządzenie tożsamością na wypadek śmierci. Wybór trybu (tylko archiwum, memoriał lub całkowite usunięcie), weryfikacja oficjalnym aktem zgonu z USC oraz ochrona bliskich przed symulacją.
              </p>
            </div>
            <Link
              href="/legacy"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors"
            >
              <span>Skonfiguruj dyspozycję cyfrową</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stopka */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="relative w-28 h-8">
              <Image src="/alterja-logo.png" alt="AlterJa" fill className="object-contain object-left" />
            </div>
            <span>© 2026 AlterJa (alterja.pl). Wszystkie prawa zastrzeżone.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Prywatność i RODO</Link>
            <Link href="/legacy" className="hover:text-slate-900 transition-colors">Spuścizna</Link>
            <Link href="/developer" className="hover:text-slate-900 transition-colors">API</Link>
            <Link href="/ops" className="hover:text-slate-900 transition-colors">Status</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
