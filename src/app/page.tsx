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
  Clock,
  BatteryCharging,
  Globe2,
  Flame,
  UserCheck,
  Infinity as InfinityIcon,
} from "lucide-react";

export default function HomePage() {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [liveAnswer, setLiveAnswer] = useState<string | null>(null);

  const sampleScenarios = [
    {
      title: "Trudna negocjacja biznesowa",
      question: "Klient żąda 40% rabatu pod groźbą zerwania rozmów. Co robimy?",
      normalBot: "„Przykro mi, jako asystent AI zalecam poszukanie kompromisu i uprzejmą odpowiedź z ofertą 20%.”",
      alterJaResponse: "Odrzucamy szantaż. Znamy wartość naszej pracy. Proponujemy rozłożenie płatności na etapy lub rezygnację z części zakresu. Jeśli odejdzie — to nie nasz klient.",
      tag: "Twoje twarde zasady",
    },
    {
      title: "Ważny e-mail o 23:30",
      question: "Pilna prośba od partnera o podsumowanie ustaleń ze spotkania zarządu.",
      normalBot: "„Oto wygenerowane automatyczne podsumowanie ze standardowymi frazami uprzejmościowymi.”",
      alterJaResponse: "Wysyłam precyzyjne 4 punkty decyzyjne w Twoim charakterystycznym, ciętym stylu. Partner ma odpowiedź w 30 sekund, a Ty smacznie śpisz.",
      tag: "Praca w nocy za Ciebie",
    },
    {
      title: "Pytanie o nieznany temat",
      question: "Jaki był Twój ulubiony model samochodu w 2012 roku?",
      normalBot: "„W 2012 roku popularnym wyborem był Volkswagen Golf lub BMW serii 3...” (zmyśla)",
      alterJaResponse: "Nie pamiętam, abym kiedykolwiek o tym wspominał w notatkach. Nie zgaduję za Ciebie — zapytam Cię o to w wolnej chwili.",
      tag: "Zero zmyślania",
    },
  ];

  const handleSimulate = (idx: number) => {
    setSelectedScenario(idx);
    setIsSimulating(true);
    setLiveAnswer(null);
    setTimeout(() => {
      setLiveAnswer(sampleScenarios[idx].alterJaResponse);
      setIsSimulating(false);
    }, 280);
  };

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-blue/15 selection:text-alterja-blue overflow-x-hidden">
      <Navbar />

      {/* 1. MONUMENTALNA SEKCJA HERO — PORYWAJĄCY PRZEKAZ I EFEKT WOW */}
      <section className="relative overflow-hidden pt-8 pb-20 lg:pt-16 lg:pb-32 border-b border-slate-200/70">
        
        {/* Wieloogniskowa poświata energetyczna */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1100px] h-[500px] bg-gradient-to-tr from-blue-200/50 via-indigo-100/40 to-purple-200/30 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Lewa kolumna: Bezkompromisowy manifest */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              {/* Plakietka buntu przeciwko orce */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
                <span className="text-slate-800 font-bold uppercase tracking-wider text-[11px]">
                  Koniec z oraniem ponad siły
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-alterja-blue font-semibold text-[11px]">Twoja kopia AI</span>
              </div>

              {/* Potężny, prowokujący tytuł */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-slate-950 editorial-display leading-[1.04]">
                  Nie daj sobą orać. <br />
                  <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-alterja-blue via-indigo-600 to-purple-700">
                    Stwórz swoją kopię AI.
                  </span>
                </h1>

                <p className="text-xl sm:text-2xl text-slate-800 font-serif italic pt-1">
                  Ona nigdy się nie męczy i pracuje za Ciebie.
                </p>
              </div>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                Po co wdrażać obce boty i sztuczne awatary, skoro możesz mieć <strong>siebie w wersji niezniszczalnej</strong>? Twój unikalny styl, Twoje zasady, Twój mózg podejmujący decyzje 24/7. Ty odpoczywasz i kontrolujesz kurs — Twoja AlterJa domyka resztę.
              </p>

              {/* Przyciski Haute-Couture z energią */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/interview"
                  className="w-full sm:w-auto btn-luxe-primary text-base group shadow-[0_12px_28px_rgba(24,73,169,0.3)]"
                >
                  <span>Stwórz swoją kopię AI</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </Link>

                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto btn-luxe-secondary text-base group"
                >
                  <Zap className="w-4 h-4 text-alterja-blue group-hover:scale-110 transition-transform" />
                  <span>Zobacz pulpit swojego sobowtóra</span>
                </Link>
              </div>

              {/* Szybkie metryki zaufania */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-bold font-mono text-slate-950">24/7</div>
                  <div className="text-xs text-slate-500 font-medium">Ciągła praca bez snu</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-alterja-blue">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Twój unikalny styl</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-emerald-700">0h</div>
                  <div className="text-xs text-slate-500 font-medium">Nocnego ślęczenia</div>
                </div>
              </div>
            </div>

            {/* Prawa kolumna: Spektakularny obraz sobowtóra z pływającymi kartami */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35),0_0_50px_rgba(41,112,255,0.25)] border-2 border-white/80 group">
                <Image
                  src="/images/twin-touch.jpg"
                  alt="Spotkanie z własnym cyfrowym sobowtórem AI"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                
                {/* Winieta i refleks światła */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Pływająca plakietka 1: Wydolność 24/7 (Góra prawo) */}
                <div className="absolute top-6 right-6 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-xl animate-float flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-700">
                    <BatteryCharging className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-950">Nigdy się nie męczy</div>
                    <div className="text-[10px] font-mono text-slate-600">Gotowość: 24/7/365</div>
                  </div>
                </div>

                {/* Pływająca plakietka 2: Twój sobowtór (Dół lewo) */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/20 text-white shadow-2xl animate-float-delayed flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-blue-300 font-bold">
                      CYFROWY BLIŹNIAK AKTYWNY
                    </div>
                    <div className="text-sm font-semibold text-white">
                      Myśli, pisze i decyduje jak Ty
                    </div>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-alterja-blue flex items-center justify-center text-white shadow-lg">
                    <Zap className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ZDERZENIE ŚWIATÓW: DLACZEGO OBCY BOT TO BŁĄD, A TWOJA KOPIA TO POTĘGA */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-alterja-blue font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
            PARADYGMAT SUWERENNOŚCI
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-slate-950 editorial-display">
            Po co uczyć obcego bota, skoro możesz sklonować siebie?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Świat zachłysnął się generycznymi asystentami, którzy brzmią jak nudny podręcznik i nie mają pojęcia o Twoim życiu. AlterJa to radykalnie inne podejście: <strong>Twoja własna, niezniszczalna kopia intelektualna.</strong>
          </p>
        </div>

        {/* Duże okno porównawcze z obrazem podróży */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Obraz: Kobieta w podróży, AI pracuje */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 group">
              <Image
                src="/images/travel-work.jpg"
                alt="Kobieta podróżuje, podczas gdy jej kopia AI pracuje na laptopie"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 font-bold">
                  WOLNOŚĆ I SPOKÓJ
                </span>
                <p className="text-lg font-serif italic text-white">
                  „Ty pijesz kawę na lotnisku. Twoja AlterJa odpowiada na maile i domyka kontrakty.”
                </p>
              </div>
            </div>
          </div>

          {/* Karty kontrastu: Obcy Bot vs Twoja AlterJa */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Zwykłe boty */}
            <div className="p-6 rounded-2xl bg-white border border-rose-200/80 shadow-sm space-y-2 opacity-90">
              <div className="flex items-center gap-2 text-rose-700 font-semibold text-xs font-mono uppercase tracking-wider">
                <span>✕ Generyczne boty i obce awatary</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Mówią sztywnym, syntetycznym korpo-językiem. Zmyślają fakty, gdy czegoś nie wiedzą. Musisz im sto razy tłumaczyć, kim jesteś i czego wymagasz.
              </p>
            </div>

            {/* Twoja AlterJa */}
            <div className="p-7 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/60 border-2 border-alterja-blue/40 shadow-lg space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-alterja-blue font-bold text-xs font-mono uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-alterja-blue" />
                  <span>Twoja niezniszczalna AlterJa</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-alterja-blue text-white font-bold">
                  PRECYZJA 100%
                </span>
              </div>
              <p className="text-base font-serif text-slate-950 leading-relaxed font-medium">
                Mówi dokładnie Twoim głosem i Twoim rytmem zdań. Podejmuje decyzje zgodnie z Twoimi zasadami. Gdy czegoś nie wie — otwarcie pyta, zamiast narażać Twoją reputację.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-alterja-blue font-semibold">
                <Zap className="w-3.5 h-3.5" />
                <span>Pracuje za Ciebie, gdy Ty śpisz lub odpoczywasz z rodziną</span>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* 3. ŻYWA KONSOLA: PRZETESTUJ RÓŻNICĘ W DZIAŁANIU (EFEKT WOW) */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-y border-slate-800">
        
        {/* Poświata szafirowa */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-bold px-3 py-1 rounded-full bg-white/10 border border-white/15">
              INTERAKTYWNY DOWÓD W LOCIE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white editorial-display">
              Zobacz, jak myśli Twoja kopia
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Kliknij poniższe sytuacje biznesowe i zobacz różnicę między bezdusznym botem a odpowiedzią Twojej AlterJa.
            </p>
          </div>

          {/* Przełączniki scenariuszy */}
          <div className="flex flex-wrap gap-3 justify-center">
            {sampleScenarios.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulate(idx)}
                className={`px-5 py-3 rounded-full text-xs font-medium transition-all ${
                  selectedScenario === idx
                    ? "bg-alterja-blue text-white shadow-[0_0_25px_rgba(41,112,255,0.5)] scale-105 border border-white/40"
                    : "bg-white/10 hover:bg-white/15 text-slate-300 border border-white/10"
                }`}
              >
                <span>{sc.title}</span>
              </button>
            ))}
          </div>

          {/* Okno pojedynku: Standardowy Bot vs Twoja AlterJa */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-white/15 shadow-2xl space-y-8 backdrop-blur-2xl">
            
            {/* Pytanie testowe */}
            <div className="space-y-1 pb-4 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                Sytuacja / Pytanie od klienta lub partnera:
              </span>
              <p className="text-xl sm:text-2xl font-serif font-medium text-white italic">
                „{sampleScenarios[selectedScenario].question}”
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Zwykły bot */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-rose-400 font-bold">
                    ✕ Zwykły bot AI (Obcy)
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Lanie wody</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {sampleScenarios[selectedScenario].normalBot}
                </p>
                <div className="text-[11px] text-rose-400/80 font-mono">Brak charakteru i zrozumienia realiów</div>
              </div>

              {/* Twoja AlterJa */}
              <div className="p-6 rounded-2xl bg-alterja-blue/20 border-2 border-alterja-blue shadow-[0_0_30px_rgba(24,73,169,0.3)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-blue-300 font-bold flex items-center gap-1.5">
                    <Fingerprint className="w-4 h-4 text-blue-300" />
                    Twoja AlterJa (Twoja kopia)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">
                    Zgodność 100%
                  </span>
                </div>
                <p className="text-base font-serif italic text-white leading-relaxed">
                  „{liveAnswer || sampleScenarios[selectedScenario].alterJaResponse}”
                </p>
                <div className="text-[11px] text-blue-300 font-mono font-medium">
                  {sampleScenarios[selectedScenario].tag}
                </div>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
              <span>Zbudowana na Twoich prawdziwych decyzjach i materiałach</span>
              <Link
                href="/interview"
                className="btn-luxe-primary !py-2.5 !px-5 text-xs text-white"
              >
                <span>Sklonuj swoje zasady teraz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </section>

      {/* 4. GALERIA WOLNOŚCI: JAK ALTERJA ODMIENIA TWOJE ŻYCIE */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-widest text-alterja-blue font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
            KORZYŚĆ DLA CIEBIE
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-slate-950 editorial-display">
            Co zyskujesz, gdy przestajesz orać samemu?
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            To nie jest kolejna aplikacja do klikania. To zwielokrotnienie Twojego czasu, zdrowia i intelektu.
          </p>
        </div>

        {/* 3 Duże Filary Wizualne z nadesłanymi grafikami */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Filar 1: Czas dla bliskich */}
          <div className="luxe-card p-6 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/life-together.jpg"
                  alt="Czas z rodziną i odpoczynek"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-serif font-medium text-slate-950 editorial-display">
                Odzyskaj wolne wieczory i weekendy
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Koniec ze sprawdzaniem maili przy kolacji i odpisywaniem w nocy. Twoja AlterJa przejmuje bieżące ustalenia, dając Ci przestrzeń na to, co naprawdę ważne.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono text-alterja-blue font-bold">
              Czas dla Ciebie · Bez stresu
            </div>
          </div>

          {/* Filar 2: Twój niepowtarzalny styl i mądrość */}
          <div className="luxe-card p-6 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/creative-mind.jpg"
                  alt="Twórczość, pasja i własny styl"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-serif font-medium text-slate-950 editorial-display">
                Twój charakter, którego nikt nie podrobi
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sklonuj swoje poczucie humoru, unikalny sposób argumentacji, zasady i wartości. Nikt nie zorientuje się, że rozmawia z modelem, bo to jesteś Ty.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono text-purple-700 font-bold">
              Autentyczność · Twój podpis
            </div>
          </div>

          {/* Filar 3: Suwerenność i pancerny skarbiec */}
          <div className="luxe-card p-6 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/security-vault.jpg"
                  alt="Pancerny skarbiec danych i suwerenność"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-serif font-medium text-slate-950 editorial-display">
                Prywatny skarbiec. Zero wycieków.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Twoje dane to Twoja własność. Żadna korporacja nie trenuje na Tobie swoich modeli. Wszystko zabezpieczone bankową izolacją RLS i prawem do usunięcia.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono text-emerald-700 font-bold">
              Twoja własność · Pełna kontrola
            </div>
          </div>

        </div>

      </section>

      {/* 5. MONUMENTALNA MULTIPLIKACJA SIEBIE — OBRAZ HERO-MULTIVERSE */}
      <section className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-bold px-3 py-1 rounded-full bg-white/10 border border-white/15">
                ZWIELEKROTNIONY POTĘCJAŁ
              </span>
              
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white editorial-display leading-[1.08]">
                Jeden Ty. <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                  Nieskończona liczba działań.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Biologiczny człowiek ma 24 godziny na dobę. Twoja cyfrowa kopia nie ma limitu. Może jednocześnie analizować raport, odpowiadać pięciu klientom, przygotowywać strategię i pilnować Twoich interesów.
              </p>

              <div className="pt-4">
                <Link
                  href="/interview"
                  className="btn-luxe-primary !py-4 !px-8 text-base bg-white text-slate-950 hover:bg-slate-100 shadow-[0_0_35px_rgba(255,255,255,0.3)]"
                >
                  <span>Zbuduj swoją AlterJa teraz</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(41,112,255,0.3)] border-2 border-white/20 group">
                <Image
                  src="/images/hero-multiverse.jpg"
                  alt="Zwielokrotniony umysł człowieka w galerii przyszłości"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-sm font-serif italic text-slate-200">
                    „Nie buduj obcych agentów. Miej siebie w wersji niezniszczalnej.”
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 6. DOLNE WEZWANIE DO DZIAŁANIA (CTA) */}
      <section className="py-24 max-w-5xl mx-auto px-4 text-center space-y-8">
        <h2 className="text-4xl sm:text-5xl font-serif font-medium text-slate-950 editorial-display">
          Gotowy przestać orać samemu?
        </h2>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          Zacznij od 5-minutowego wywiadu. Twoja AlterJa natychmiast zacznie uczyć się Twoich zasad i stylu myślenia.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/interview"
            className="w-full sm:w-auto btn-luxe-primary text-base shadow-xl"
          >
            <span>Rozpocznij tworzenie kopii AI</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto btn-luxe-secondary text-base"
          >
            <span>Przejdź do pulpitu</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
