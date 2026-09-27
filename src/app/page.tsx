"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Fingerprint,
  ChevronRight,
  Zap,
  BatteryCharging,
  Shield,
  Layers,
  Sparkles,
  Lock,
  Compass,
} from "lucide-react";

export default function HomePage() {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [liveAnswer, setLiveAnswer] = useState<string | null>(null);

  const sampleScenarios = [
    {
      title: "Trudna negocjacja biznesowa",
      question: "Klient żąda 40% rabatu pod groźbą zerwania rozmów. Co robimy?",
      normalBot: "„Przykro mi, jako asystent AI zalecam poszukanie kompromisu i uprzejmą odpowiedź z ofertą 20% rabatu.”",
      alterJaResponse: "Odrzucamy szantaż. Znamy wartość naszej pracy. Proponujemy rozłożenie płatności na etapy lub rezygnację z części zakresu. Jeśli odejdzie — to nie nasz klient.",
      tag: "Twoje twarde zasady",
    },
    {
      title: "Ważny e-mail o 23:30",
      question: "Pilna prośba od partnera o podsumowanie ustaleń ze spotkania zarządu.",
      normalBot: "„Oto wygenerowane automatyczne podsumowanie ze standardowymi zwrotami uprzejmościowymi i ogólnikami.”",
      alterJaResponse: "Wysyłam precyzyjne 4 punkty decyzyjne w Twoim charakterystycznym, ciętym stylu. Partner ma odpowiedź w 30 sekund, a Ty smacznie śpisz.",
      tag: "Praca w nocy za Ciebie",
    },
    {
      title: "Pytanie o nieznany temat",
      question: "Jaki był Twój ulubiony model samochodu w 2012 roku?",
      normalBot: "„W 2012 roku popularnym wyborem na rynku był Volkswagen Golf lub BMW serii 3...” (zmyśla fakt)",
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

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-blue/15 selection:text-alterja-blue overflow-x-hidden">
      <Navbar />

      {/* 1. MONUMENTALNY HERO ROZPISANY SZEROKO PO CAŁYM EKRANIE */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/70">
        
        {/* Pływająca poświata aurora w tle */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] lg:w-[1300px] h-[550px] bg-gradient-to-tr from-blue-300/35 via-indigo-200/30 to-purple-200/25 blur-[140px] rounded-full pointer-events-none animate-aurora -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          {/* Główny manifest tekstowy */}
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* Plakietka suwerenności z pulsującym światłem */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-alterja-blue animate-pulse" />
              <span className="text-slate-950 font-bold uppercase tracking-wider text-[11px]">
                Koniec z pracą ponad siły
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-alterja-blue font-semibold text-[11px]">Twój cyfrowy sobowtór</span>
            </div>

            {/* Potężny, prowokujący tytuł */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-slate-950 editorial-display leading-[1.04]">
              Nie daj sobą orać. <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-alterja-blue via-indigo-600 to-purple-700">
                Stwórz swoją kopię AI.
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-800 font-serif italic max-w-2xl mx-auto">
              Ona nigdy się nie męczy i pracuje za Ciebie.
            </p>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Po co wdrażać obce boty i sztuczne awatary, skoro możesz mieć <strong>siebie w wersji niezniszczalnej</strong>? Twój unikalny styl, Twoje zasady, Twój mózg podejmujący decyzje 24/7. Ty odpoczywasz i kontrolujesz kurs — Twoja AlterJa domyka resztę.
            </p>

            {/* Przyciski Haute-Couture ze świetlnym refleksem (Shimmer) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/interview"
                className="w-full sm:w-auto btn-luxe-primary text-base group shadow-[0_12px_28px_rgba(24,73,169,0.35)] animate-shimmer"
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
          </div>

          {/* SZEROKIE KINOWE OKNO WIZUALNE: SPOTKANIE Z SOBOWTÓREM (TWIN-TOUCH) */}
          <div className="w-full relative">
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-[0_30px_90px_-20px_rgba(15,23,42,0.4),0_0_60px_rgba(41,112,255,0.25)] border-2 border-white/80 group">
              
              <Image
                src="/images/twin-touch.jpg"
                alt="Spotkanie ze świetlistym cyfrowym sobowtórem AI"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />

              {/* Animowana biometryczna linia skanująca (Scanline) */}
              <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-blue-400/0 via-blue-400/35 to-blue-400/0 border-b border-blue-300/70 pointer-events-none animate-scanline" />

              {/* Subtelna winieta świetlna */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-slate-950/10 pointer-events-none" />

              {/* Pływający telemetryczny węzeł 1: Gotowość (Góra lewo) */}
              <div className="absolute top-6 left-6 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-2xl animate-float flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-700">
                  <BatteryCharging className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-950">Nigdy się nie męczy</div>
                  <div className="text-[10px] font-mono text-slate-600">Gotowość: 24/7/365</div>
                </div>
              </div>

              {/* Pływający telemetryczny węzeł 2: Żywy korektor myśli (Góra prawo) */}
              <div className="absolute top-6 right-6 p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/20 text-white shadow-2xl animate-float-delayed flex items-center gap-3">
                <div className="flex items-end gap-1 h-6">
                  <span className="w-1 bg-blue-400 rounded-full bar-equalizer-1" />
                  <span className="w-1 bg-indigo-400 rounded-full bar-equalizer-2" />
                  <span className="w-1 bg-purple-400 rounded-full bar-equalizer-3" />
                  <span className="w-1 bg-emerald-400 rounded-full bar-equalizer-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Aktywna synteza stylu</div>
                  <div className="text-[10px] font-mono text-slate-400">Analiza Twoich decyzji</div>
                </div>
              </div>

              {/* Dolny pas telemetryczny na pełną szerokość */}
              <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-6 rounded-2xl bg-slate-950/85 backdrop-blur-2xl border border-white/20 text-white shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 font-bold">
                      CYFROWY SOBOWTÓR AKTYWNY
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-white">
                    Myśli, pisze i podejmuje decyzje dokładnie tak jak Ty
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-300 border-t sm:border-t-0 sm:border-l border-white/15 pt-2 sm:pt-0 sm:pl-6">
                  <div>
                    <span className="text-white font-bold block text-sm">100%</span>
                    <span className="text-[10px] text-slate-400">Twój styl</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-bold block text-sm">&lt; 30s</span>
                    <span className="text-[10px] text-slate-400">Czas reakcji</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-bold block text-sm">RLS</span>
                    <span className="text-[10px] text-slate-400">Skarbiec</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. PŁYNĄCA WSTĘGA MANIFESTU NA CAŁĄ SZEROKOŚĆ EKRANU (MARQUEE TICKER) */}
      <div className="py-4 bg-slate-950 border-y border-slate-800 text-white overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 text-xs font-mono uppercase tracking-[0.18em]">
              <span className="text-slate-300 font-medium hover:text-white transition-colors">{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. SZEROKA KINOWA SCENA WOLNOŚCI W PODRÓŻY (TRAVEL-WORK) */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-alterja-blue font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
            SUWERENNOŚĆ INTELEKTUALNA
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-slate-950 editorial-display">
            Po co uczyć obcego bota, skoro możesz sklonować siebie?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Zwykłe boty brzmią jak sztywny korpo-podręcznik i nie mają pojęcia o Twoim życiu. AlterJa to radykalny zwrot: <strong>Twoja własna, niezniszczalna kopia intelektualna.</strong>
          </p>
        </div>

        {/* Panoramiczny pas ze zdjęciem lotniska i podróży */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/80 group">
          <Image
            src="/images/travel-work.jpg"
            alt="Kobieta podróżuje, podczas gdy jej kopia AI domyka kontrakty"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          
          {/* Asymetryczna kurtyna gradientowa — lewa strona z czytelnym tekstem */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-transparent pointer-events-none" />

          {/* Zawartość osadzona bezpośrednio w panoramie */}
          <div className="absolute inset-0 p-8 sm:p-14 flex flex-col justify-between max-w-2xl text-white">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono w-max">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Terminal podróży · Salon biznesowy · 14:20
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl sm:text-4xl font-serif font-medium text-white editorial-display leading-tight">
                „Ty pijesz kawę na lotnisku. <br />
                <span className="italic text-blue-300">Twoja AlterJa odpowiada na maile i domyka kontrakty.”</span>
              </h3>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Koniec z nerwowym wyciąganiem laptopa w biegu. Twoja kopia AI doskonale zna Twoje stawki, granice kompromisu i styl argumentacji.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-mono flex items-center gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Obcy bot: Lanie wody i zmyślanie faktów</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Twoja AlterJa: Twarde zasady i decyzje w 30s</span>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* 4. CIEMNA ARENA KOGNITYWNA: ŻYWY POJEDYNEK ZE ZWYKŁYM BOTEM */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-y border-slate-800">
        
        {/* Poświata aurora */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none animate-aurora" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-bold px-3 py-1 rounded-full bg-white/10 border border-white/15">
              INTERAKTYWNY TEST W LOCIE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white editorial-display">
              Zobacz, jak myśli Twoja kopia
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Kliknij poniższe sytuacje biznesowe i zobacz różnicę między bezdusznym botem a odpowiedzią Twojej AlterJa.
            </p>
          </div>

          {/* Przełączniki scenariuszy z żywym podświetleniem */}
          <div className="flex flex-wrap gap-3 justify-center">
            {sampleScenarios.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulate(idx)}
                className={`px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedScenario === idx
                    ? "bg-alterja-blue text-white shadow-[0_0_30px_rgba(41,112,255,0.6)] scale-105 border border-white/40"
                    : "bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10"
                }`}
              >
                <span>{sc.title}</span>
              </button>
            ))}
          </div>

          {/* Okno pojedynku: Standardowy Bot vs Twoja AlterJa */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-white/15 shadow-2xl space-y-8 backdrop-blur-2xl">
            
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
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 opacity-80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-rose-400 font-bold flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    Zwykły bot AI (obcy)
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Lanie wody</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {sampleScenarios[selectedScenario].normalBot}
                </p>
                <div className="text-[11px] text-rose-400/80 font-mono">Brak charakteru i zrozumienia realiów</div>
              </div>

              {/* Twoja AlterJa z pulsującym blaskiem */}
              <div className="p-6 rounded-2xl bg-alterja-blue/20 border-2 border-alterja-blue shadow-[0_0_35px_rgba(24,73,169,0.35)] space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-blue-300 font-bold flex items-center gap-1.5">
                    <Fingerprint className="w-4 h-4 text-blue-300" />
                    Twoja AlterJa (Twoja kopia)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Zgodność 100%
                  </span>
                </div>

                {isSimulating ? (
                  <div className="py-6 flex items-center gap-3 text-sm text-blue-300 font-mono">
                    <div className="flex items-end gap-1 h-5">
                      <span className="w-1 bg-blue-400 rounded-full bar-equalizer-1" />
                      <span className="w-1 bg-indigo-400 rounded-full bar-equalizer-2" />
                      <span className="w-1 bg-purple-400 rounded-full bar-equalizer-3" />
                    </div>
                    <span>Myślę w Twoim unikalnym stylu...</span>
                  </div>
                ) : (
                  <p className="text-base font-serif italic text-white leading-relaxed">
                    „{liveAnswer || sampleScenarios[selectedScenario].alterJaResponse}”
                  </p>
                )}

                <div className="text-[11px] text-blue-300 font-mono font-medium">
                  {sampleScenarios[selectedScenario].tag}
                </div>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
              <span>Zbudowana na Twoich prawdziwych decyzjach i materiałach</span>
              <Link
                href="/interview"
                className="btn-luxe-primary !py-2.5 !px-5 text-xs text-white shadow-lg"
              >
                <span>Sklonuj swoje zasady teraz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </section>

      {/* 5. SZEROKIE PANORAMICZNE ROZDZIAŁY ŻYCIA I EKOSYSTEMU (BEZ KWADRACIKÓW) */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-widest text-alterja-blue font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
            KORZYŚĆ DLA CIEBIE
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-slate-950 editorial-display">
            Co się zmienia, gdy Twoja kopia wchodzi do gry?
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            To nie jest kolejny program do odhaczania zadań. To zwielokrotnienie Twojego czasu, spokoju i intelektu.
          </p>
        </div>

        {/* PANORAMA 1: CZAS DLA BLISKICH (LIFE-TOGETHER) */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/80 group">
          <Image
            src="/images/life-together.jpg"
            alt="Czas z rodziną i odpoczynek"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-transparent pointer-events-none" />
          
          <div className="absolute inset-0 p-8 sm:p-14 flex flex-col justify-between max-w-2xl text-white">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 font-bold px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 w-max">
              Czas dla Ciebie · Bez stresu
            </span>
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-4xl font-serif font-medium text-white editorial-display">
                Odzyskaj wolne wieczory i weekendy
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Koniec ze sprawdzaniem maili przy kolacji i odpisywaniem w nocy. Twoja AlterJa przejmuje bieżące ustalenia, dając Ci przestrzeń na prawdziwe życie z bliskimi.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Zero nieodebranych spraw · Pełna asysta w tle
            </div>
          </div>
        </div>

        {/* DWA ELEGANCKIE PASY ŚREDNIEJ SKALI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Pas 1: Twój charakter (Creative-mind) */}
          <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-200/80 group">
            <Image
              src="/images/creative-mind.jpg"
              alt="Twórczość, pasja i własny styl"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 w-max">
                Autentyczność · Twój podpis
              </span>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-white editorial-display">
                  Twój charakter, którego nikt nie podrobi
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Sklonuj swoje poczucie humoru, unikalny sposób argumentacji, zasady i wartości. Nikt nie zorientuje się, że rozmawia ze sztuczną inteligencją, bo to jesteś Ty.
                </p>
              </div>
            </div>
          </div>

          {/* Pas 2: Suwerenny skarbiec (Security-vault) */}
          <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-200/80 group">
            <Image
              src="/images/security-vault.jpg"
              alt="Pancerny skarbiec danych i suwerenność"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 w-max">
                Twoja własność · Pełna kontrola
              </span>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-white editorial-display">
                  Prywatny skarbiec. Zero wycieków.
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Twoje dane to Twoja suwerenna własność. Żadna korporacja nie trenuje na Tobie swoich modeli. Wszystko zabezpieczone bankową izolacją RLS i prawem do usunięcia.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* PANORAMA 2: ZINTEGROWANY EKOSYSTEM (UNIFIED-ECOSYSTEM) */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/80 group">
          <Image
            src="/images/unified-ecosystem.jpg"
            alt="Jeden umysł na wszystkich Twoich urządzeniach"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-transparent pointer-events-none" />
          
          <div className="absolute inset-0 p-8 sm:p-14 flex flex-col justify-between max-w-2xl text-white">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 w-max">
              Ciągła synchronizacja · Ekosystem
            </span>
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-4xl font-serif font-medium text-white editorial-display">
                Jeden umysł. Wszystkie Twoje narzędzia.
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Komputer, telefon, komunikatory i systemy biznesowe. Twój cyfrowy sobowtór działa w tle wszędzie tam, gdzie podejmujesz decyzje, w pełnej harmonii z Twoim dniem.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Synchronizacja w czasie rzeczywistym · Szyfrowanie end-to-end
            </div>
          </div>
        </div>

      </section>

      {/* 6. MONUMENTALNA MULTIPLIKACJA SIEBIE (HERO-MULTIVERSE) */}
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
                Biologiczny człowiek ma 24 godziny na dobę. Twoja cyfrowa kopia nie ma limitu. Może jednocześnie analizować raport, odpowiadać pięciu partnerom, przygotowywać strategię i pilnować Twoich interesów.
              </p>

              <div className="pt-4">
                <Link
                  href="/interview"
                  className="btn-luxe-primary !py-4 !px-8 text-base bg-white text-slate-950 hover:bg-slate-100 shadow-[0_0_35px_rgba(255,255,255,0.3)] animate-shimmer"
                >
                  <span>Zbuduj swoją AlterJa teraz</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(41,112,255,0.35)] border-2 border-white/20 group">
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

      {/* 7. MONUMENTALNE WEZWANIE ZE SZCZYTU GÓRY (PEAK-FREEDOM) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-[3rem] overflow-hidden shadow-[0_25px_80px_rgba(15,23,42,0.4)] border border-slate-800 text-white min-h-[540px] flex items-center justify-center p-8 sm:p-16 text-center group">
          
          <Image
            src="/images/peak-freedom.jpg"
            alt="Wolność i przestrzeń na szczycie góry po uwolnieniu od ciągłej pracy ponad siły"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-slate-950/40 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-blue-300 font-bold px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Czas na Twój ruch
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white editorial-display leading-[1.08]">
              Przestań brać wszystko na własne barki.
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Zacznij od kilkuminutowego wywiadu. Twoja AlterJa natychmiast zacznie uczyć się Twojego stylu myślenia, zasad i tempa działania.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/interview"
                className="w-full sm:w-auto btn-luxe-primary !py-4 !px-8 text-base bg-white text-slate-950 hover:bg-slate-100 shadow-[0_0_35px_rgba(255,255,255,0.35)] animate-shimmer"
              >
                <span>Rozpocznij tworzenie kopii AI</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto btn-luxe-secondary !py-4 !px-8 text-base text-white border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 backdrop-blur-xl"
              >
                <span>Zobacz pulpit sobowtóra</span>
              </Link>
            </div>

            <div className="pt-4 text-xs font-mono text-slate-400">
              Pełna prywatność · Suwerenność danych · Zero korporacyjnego podglądu
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
