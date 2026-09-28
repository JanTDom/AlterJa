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
  Zap,
  BatteryCharging,
  Shield,
  Layers,
  Sparkles,
  Lock,
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-alterja-blue/25 selection:text-blue-200 overflow-x-hidden">
      <Navbar />

      {/* 1. SCENA HERO: PORTAL DO NIEZNISZCZALNEGO SOBOWTÓRA (PORTAL-MIRROR) */}
      <section className="photo-stage min-h-[92vh] sm:min-h-screen justify-center text-center">
        
        {/* Zdjęcie na całą szerokość i wysokość tła */}
        <Image
          src="/images/portal-mirror.jpg"
          alt="Spotkanie z własnym cyfrowym sobowtórem w portalu światła i pamięci"
          fill
          className="object-cover object-center transition-transform duration-1000 scale-[1.02] hover:scale-105"
          priority
        />

        {/* Dynamiczny promień skanujący na cały ekran */}
        <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-blue-400/0 via-blue-400/30 to-blue-400/0 border-b border-blue-300/80 pointer-events-none animate-scanline" />

        {/* Nastrojowa kurtyna kinowa dla idealnej czytelności */}
        <div className="absolute inset-0 photo-overlay-center pointer-events-none" />

        {/* Warstwa treści unosząca się w centrum sceny */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-8">
          
          {/* Pływająca plakietka suwerenności */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/20 shadow-2xl text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-alterja-blue animate-pulse" />
            <span className="text-white font-bold uppercase tracking-wider text-[11px]">
              Koniec z pracą ponad siły
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-blue-300 font-semibold text-[11px]">Twój cyfrowy sobowtór</span>
          </div>

          {/* Potężny, prowokujący tytuł */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white editorial-display leading-[1.04]">
              Nie daj sobą orać. <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                Stwórz swoją kopię AI.
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-200 font-serif italic max-w-2xl mx-auto">
              Ona nigdy się nie męczy i pracuje za Ciebie.
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Po co wdrażać obce boty i sztuczne awatary, skoro możesz mieć <strong>siebie w wersji niezniszczalnej</strong>? Twój unikalny styl, Twoje zasady, Twój mózg podejmujący decyzje 24/7. Ty odpoczywasz i kontrolujesz kurs — Twoja AlterJa domyka resztę.
          </p>

          {/* Przyciski Haute-Couture ze świetlnym refleksem (Shimmer) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/interview"
              className="w-full sm:w-auto btn-luxe-light !py-4 !px-8 text-base shadow-[0_0_40px_rgba(255,255,255,0.35)] animate-shimmer"
            >
              <span>Stwórz swoją kopię AI</span>
              <span className="w-6 h-6 rounded-full bg-slate-900/10 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </span>
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto btn-luxe-glass !py-4 !px-8 text-base"
            >
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Zobacz pulpit swojego sobowtóra</span>
            </Link>
          </div>

          {/* Telemetria HUD na dole sceny hero */}
          <div className="pt-8 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-white/15">
              <div className="text-2xl font-bold font-mono text-white">24/7/365</div>
              <div className="text-[11px] text-slate-400 font-medium">Gotowość bez snu</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-white/15">
              <div className="text-2xl font-bold font-mono text-blue-400">100%</div>
              <div className="text-[11px] text-slate-400 font-medium">Twój unikalny styl</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-white/15">
              <div className="text-2xl font-bold font-mono text-emerald-400">&lt; 30s</div>
              <div className="text-[11px] text-slate-400 font-medium">Czas reakcji</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-white/15">
              <div className="flex items-center gap-1.5 h-8">
                <span className="w-1.5 bg-blue-400 rounded-full bar-equalizer-1" />
                <span className="w-1.5 bg-indigo-400 rounded-full bar-equalizer-2" />
                <span className="w-1.5 bg-purple-400 rounded-full bar-equalizer-3" />
                <span className="w-1.5 bg-emerald-400 rounded-full bar-equalizer-4" />
              </div>
              <div className="text-[11px] text-slate-400 font-medium">Żywa synteza zasad</div>
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

      {/* 3. SCENA ZWIELOKROTNIONEJ ENERGII: ŚWIETLISTY SOBOWTÓR W AKCJI (RADIANT-AVATAR) */}
      <section className="photo-stage min-h-[92vh]">
        
        {/* Zdjęcie na pełną szerokość tła */}
        <Image
          src="/images/radiant-avatar.jpg"
          alt="Świetlisty cyfrowy sobowtór unoszący się z wiedzą i technologią do gwiazd"
          fill
          className="object-cover object-center transition-transform duration-1000 scale-[1.02] hover:scale-105"
        />

        {/* Kurtyna asymetryczna z lewej strony */}
        <div className="absolute inset-0 photo-overlay-left pointer-events-none" />

        {/* Zawartość osadzona bezpośrednio w kadrze */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-8">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Nieskończona skala · 24 godziny na dobę
            </div>

            <div className="space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-bold block">
                ZWIELOKROTNIONY POTĘCJAŁ
              </span>
              
              <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white editorial-display leading-tight">
                „Podczas gdy Ty odpoczywasz, <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-white">
                  Twoja AlterJa domyka setki spraw.”
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                Biologiczny człowiek potrzebuje snu i regeneracji. Twoja cyfrowa kopia nie zna zmęczenia. Analizuje umowy, odpowiada kluczowym partnerom, przygotowuje oferty handlowe i pilnuje Twoich interesów bez utraty ostrości umysłu.
              </p>
            </div>

            {/* Szklane etykiety kontrastu bezpośrednio na zdjęciu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Generyczny bot (obcy)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Lanie wody, sztywne korpo-formułki, zmyślanie faktów i brak zrozumienia Twoich realiów.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-alterja-blue/30 backdrop-blur-xl border border-blue-400/50 space-y-2">
                <div className="flex items-center gap-2 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Twoja niezniszczalna AlterJa</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Twarde zasady, natychmiastowe decyzje, 100% wierności Twojemu stylowi myślenia.
                </p>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 4. KOSMICZNA KATEDRA PAMIĘCI I POJEDYNEK W LOCIE (MEMORY-CATHEDRAL) */}
      <section className="photo-stage min-h-[95vh] border-y border-white/10">
        
        {/* Zdjęcie monumentalnej katedry pamięci w tle */}
        <Image
          src="/images/memory-cathedral.jpg"
          alt="Kosmiczna katedra pamięci i spiralne pierścienie wiedzy"
          fill
          className="object-cover object-center transition-transform duration-1000 scale-[1.02] hover:scale-105"
        />

        {/* Głębokie tło dla idealnej czytelności konsoli */}
        <div className="absolute inset-0 photo-overlay-center pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-bold px-3 py-1 rounded-full bg-slate-950/80 border border-white/15">
              INTERAKTYWNY TEST W LOCIE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white editorial-display">
              Zobacz, jak myśli Twoja kopia
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Kliknij poniższe sytuacje biznesowe i zobacz różnicę między bezdusznym botem a odpowiedzią Twojej AlterJa.
            </p>
          </div>

          {/* Przełączniki scenariuszy */}
          <div className="flex flex-wrap gap-3 justify-center">
            {sampleScenarios.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulate(idx)}
                className={`px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedScenario === idx
                    ? "bg-alterja-blue text-white shadow-[0_0_30px_rgba(41,112,255,0.6)] scale-105 border border-white/40"
                    : "bg-slate-950/80 hover:bg-slate-900 text-slate-300 border border-white/15 backdrop-blur-xl"
                }`}
              >
                <span>{sc.title}</span>
              </button>
            ))}
          </div>

          {/* Okno pojedynku bezpośrednio na tle katedry pamięci */}
          <div className="glass-panel-luxe p-8 sm:p-12 rounded-3xl space-y-8">
            
            <div className="space-y-1 pb-4 border-b border-white/15">
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
              <div className="p-6 rounded-2xl bg-alterja-blue/25 border-2 border-alterja-blue shadow-[0_0_35px_rgba(24,73,169,0.35)] space-y-3 relative overflow-hidden">
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

      {/* 5. SCENA DRZEWA UMYSŁU: SUWERENNY SKARBIEC WIEDZY (TREE-OF-MIND) */}
      <section className="photo-stage min-h-[90vh]">
        
        {/* Zdjęcie kosmicznego drzewa umysłu na pełną szerokość tła */}
        <Image
          src="/images/tree-of-mind.jpg"
          alt="Kosmiczne drzewo umysłu i pamięci tworzące profil człowieka"
          fill
          className="object-cover object-center transition-transform duration-1000 scale-[1.02] hover:scale-105"
        />

        {/* Kurtyna asymetryczna z lewej strony */}
        <div className="absolute inset-0 photo-overlay-left pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6 text-white">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-mono w-max">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Pancerny skarbiec · Zero korporacyjnego treningu
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white editorial-display leading-tight">
              Twoja wiedza to Twoja wyłączna własność.
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Żadna globalna korporacja nie trenuje na Tobie swoich modeli. Wszystkie Twoje notatki, zasady, wspomnienia i decyzje są chronione bankową izolacją RLS i podlegają prawu do natychmiastowego usunięcia.
            </p>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-white/15">
                <span className="text-xl font-bold font-mono text-white block">100%</span>
                <span className="text-xs text-slate-400">Prywatności</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-white/15">
                <span className="text-xl font-bold font-mono text-emerald-400 block">0</span>
                <span className="text-xs text-slate-400">Wycieków danych</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-white/15 col-span-2 sm:col-span-1">
                <span className="text-xl font-bold font-mono text-blue-400 block">RLS</span>
                <span className="text-xs text-slate-400">Izolacja rekordów</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 6. SCENA HYBRYDOWEGO PORTRETU: AUTENTYCZNY CHARAKTER (AVATAR-PORTRAIT) */}
      <section className="photo-stage min-h-[90vh]">
        
        {/* Zdjęcie portretu przejścia człowieka w świetlistą sieć neuronową */}
        <Image
          src="/images/avatar-portrait.jpg"
          alt="Twarz człowieka przechodząca w świetlisty profil cyfrowej kopii AI"
          fill
          className="object-cover object-center transition-transform duration-1000 scale-[1.02] hover:scale-105"
        />

        {/* Kurtyna asymetryczna z lewej strony */}
        <div className="absolute inset-0 photo-overlay-left pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6 text-white">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-purple-300 text-xs font-mono w-max">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Autentyczność · Twój podpis intelektualny
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white editorial-display leading-tight">
              To nie jest obcy awatar. <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-white">
                To jesteś Ty w wersji niezniszczalnej.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Nie buduj bezdusznych botów, które brzmią jak szary podręcznik. AlterJa przejmuje Twoje poczucie humoru, unikalny sposób argumentacji, riposty i wartości. Nikt nie zorientuje się, że rozmawia ze sztuczną inteligencją, bo to jesteś Ty.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
              <div className="px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15">
                Cięty rytm wypowiedzi
              </div>
              <div className="px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15">
                Autorskie zasady decyzyjne
              </div>
              <div className="px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15">
                Zero fałszywych ugrzecznień
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 7. SCENA FINAŁOWA: SCHODY DO WOLNOŚCI (STAIRWAY-AVATAR) */}
      <section className="photo-stage min-h-[95vh] justify-center text-center">
        
        {/* Zdjęcie kryształowych schodów do niebiańskiego sobowtóra */}
        <Image
          src="/images/stairway-avatar.jpg"
          alt="Wejście po kryształowych schodach pamięci do niezniszczalnego sobowtóra AI"
          fill
          className="object-cover object-center transition-transform duration-1000 scale-[1.02] hover:scale-105"
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
            Zacznij od kilkuminutowego wywiadu. Twoja AlterJa natychmiast zacznie uczyć się Twojego stylu myślenia, zasad i tempa działania.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/interview"
              className="w-full sm:w-auto btn-luxe-light !py-4 !px-8 text-base shadow-[0_0_40px_rgba(255,255,255,0.4)] animate-shimmer"
            >
              <span>Rozpocznij tworzenie kopii AI</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto btn-luxe-glass !py-4 !px-8 text-base"
            >
              <span>Zobacz pulpit sobowtóra</span>
            </Link>
          </div>

          <div className="pt-6 text-xs font-mono text-slate-400">
            Pełna prywatność · Suwerenność danych · Zero korporacyjnego podglądu
          </div>

        </div>

      </section>

    </div>
  );
}
