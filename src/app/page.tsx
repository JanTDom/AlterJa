"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import HeroInteractiveSimulator from "@/components/landing/HeroInteractiveSimulator";
import KineticNeuralCanvas from "@/components/landing/KineticNeuralCanvas";
import GroundedComparisonDemo from "@/components/landing/GroundedComparisonDemo";
import IdentityAssemblyPhases from "@/components/landing/IdentityAssemblyPhases";
import {
  Brain,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  CheckCircle2,
  XCircle,
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
  Moon,
  Sun,
  Flame,
  BatteryCharging,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  const tickerItems = [
    "Niech Twoja kopia tyra za\u00A0Ciebie",
    "Ona się nie\u00A0męczy",
    "Koniec z\u00A0pracą po\u00A0nocach",
    "100% uziemienie · Zero konfabulacji",
    "Zero pracy za\u00A0półdarmo i\u00A0darmowych poprawek",
    "Twarde NIE dla zaniżania Twoich stawek",
    "Deterministyczna izolacja PostgreSQL RLS",
    "Święty spokój i\u00A0powrót do\u00A0życia",
    "Niezniszczalny silnik zmian na\u00A0lepsze",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-sky-500/25 selection:text-sky-200 overflow-x-hidden">
      <Navbar />

      {/* 1. SCENA HERO: "NIECH TWOJA KOPIA TYRA ZA CIEBIE. ONA SIĘ NIE MĘCZY." */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden pt-16 pb-24 text-center">
        {/* Szerokie tło kinowe z alterja-duality.jpg i głęboką atmosferą */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/alterja-duality.jpg"
            alt="Kosmiczny horyzont dualizmu organicznego człowieka i niezniszczalnego cyfrowego sobowtóra"
            fill
            priority
            className="object-cover object-center scale-105 filter brightness-[0.4] contrast-[1.15]"
          />
          {/* Wieloplanowe maski gradientowe gwarantujące 100% czytelności typografii */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/85 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/70 to-slate-950 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
        </div>

        {/* 60fps GPU Canvas z polem kognitywnym, cząstkami i synapsami reagującymi na kursor */}
        <KineticNeuralCanvas />

        {/* Dynamiczny promień telemetryczny */}
        <div className="absolute inset-x-0 h-32 bg-gradient-to-b from-sky-400/0 via-sky-400/20 to-sky-400/0 border-b border-sky-300/40 pointer-events-none animate-scanline z-10" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
          {/* Mikro-plakietka statusowa */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-xl border border-white/20 shadow-2xl text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold uppercase tracking-wider text-[11px]">
              Silnik zmian na&nbsp;lepsze
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-sky-300 font-semibold text-[11px]">alterja.pl</span>
          </div>

          {/* Główny manifest zadany przez użytkownika */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white editorial-display leading-[1.08] max-w-4xl mx-auto">
              <span className="block">
                Niech Twoja kopia tyra za&nbsp;Ciebie.
              </span>
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-amber-200 block mt-1 sm:mt-2">
                Ona się nie&nbsp;męczy.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-3xl mx-auto">
              Biologiczny człowiek potrzebuje snu, regeneracji i&nbsp;świętego spokoju. Twoja AlterJa uczy się Twojego sposobu myślenia, zasad i&nbsp;stylu — po&nbsp;czym przejmuje powtarzalne rozmowy, trudne negocjacje i&nbsp;codzienne decyzje. Mówi twarde „nie” na&nbsp;próby wymuszenia rabatów, odrzuca darmowe poprawki i&nbsp;nie&nbsp;pozwala nikomu pracować Twoim kosztem.
            </p>
          </div>

          {/* Przyciski wejścia */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/interview"
              className="w-full sm:w-auto btn-luxe-primary !py-4 !px-9 text-base shadow-[0_0_40px_rgba(56,189,248,0.35)] animate-shimmer"
            >
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>Zbuduj swoje AlterJa</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            <Link
              href="/delegate"
              className="w-full sm:w-auto btn-luxe-glass !py-4 !px-8 text-base border-emerald-400/40 text-emerald-300 hover:text-white flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Odpisz za mnie (Centrum Wykonawcze)</span>
            </Link>
            <a
              href="#czlowiek-vs-kopia"
              className="w-full sm:w-auto text-xs font-mono text-slate-400 hover:text-slate-200 py-2 sm:py-0 px-2 flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>Zobacz porównanie</span>
            </a>
          </div>

          {/* Pigułki inwariantów */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>0h zmęczenia na&nbsp;dobę</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>100% uziemienie zasad</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Zero pracy za&nbsp;półdarmo</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-300 shrink-0" />
              <span>Izolacja PostgreSQL RLS</span>
            </div>
          </div>

          {/* Interaktywny symulator decyzyjny bezpośrednio w Hero */}
          <div className="pt-6">
            <HeroInteractiveSimulator />
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

      {/* 3. SEKCJA: CZŁOWIEK KONTRA CYFROWY SOBOWTÓR (POJEDYNEK WYTRZYMAŁOŚCI) */}
      <section id="czlowiek-vs-kopia" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-white/15 text-sky-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            01 / ANATOMIA ZMĘCZENIA I AUTONOMII
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.08]">
            Dlaczego musisz mieć kopię, <br />
            która się nie&nbsp;męczy.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal text-pretty">
            Każda trudna decyzja i&nbsp;powtarzalna rozmowa wyczerpuje Twoje zasoby kognitywne. Twoja AlterJa nie&nbsp;ma biologicznych ograniczeń.
          </p>
        </div>

        {/* Konfrontacja: Biologiczny człowiek vs Twoja AlterJa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Karta: Biologiczny człowiek */}
          <div className="p-8 sm:p-10 rounded-[2.5rem] bg-slate-900/50 border border-rose-500/25 space-y-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-4">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-sm font-bold uppercase tracking-wider">
                  <Sun className="w-5 h-5" />
                  <span>Ty (biologiczny człowiek)</span>
                </div>
                <span className="text-[10px] font-mono text-rose-400 bg-rose-950/70 px-2.5 py-0.5 rounded border border-rose-500/30">
                  Zasoby ograniczone
                </span>
              </div>

              <h3 className="text-2xl font-serif font-medium text-white">
                Wyczerpanie decyzyjne i&nbsp;permanentny stres
              </h3>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 font-sans pt-2">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="text-pretty"><strong>8&nbsp;godzin snu na&nbsp;dobę:</strong> Gdy odpoczywasz, wiadomości na&nbsp;OLX i&nbsp;maile z&nbsp;pracy piętrzą się bez odpowiedzi.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="text-pretty"><strong>Zmęczenie wieczorem:</strong> Pod koniec dnia łatwiej ulegasz presji i&nbsp;niepotrzebnie zgadzasz się na&nbsp;obniżki czy darmowe przysługi.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="text-pretty"><strong>Praca po&nbsp;nocach i&nbsp;w&nbsp;weekendy:</strong> Ciągłe sprawdzanie telefonu kosztem zdrowia, spokoju i&nbsp;rodziny.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="text-pretty"><strong>Emocje i&nbsp;manipulacja:</strong> Nocne targowanie i&nbsp;roszczeniowe wiadomości psują Ci humor na&nbsp;cały wieczór.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-rose-500/20 text-xs font-mono text-rose-300">
              Cena: Wypalenie zawodowe, praca za&nbsp;półdarmo i&nbsp;wieczny brak wolnego czasu.
            </div>
          </div>

          {/* Karta: Twoja AlterJa */}
          <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-sky-950/60 via-slate-900/90 to-slate-950 border border-sky-400/60 space-y-6 flex flex-col justify-between shadow-[0_0_50px_rgba(56,189,248,0.18)] relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between border-b border-sky-500/30 pb-4">
                <div className="flex items-center gap-2 text-sky-300 font-mono text-sm font-bold uppercase tracking-wider">
                  <BatteryCharging className="w-5 h-5 text-emerald-400" />
                  <span>Twoja AlterJa (cyfrowy sobowtór)</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/70 px-2.5 py-0.5 rounded border border-emerald-500/40 animate-pulse">
                  Nigdy się nie&nbsp;męczy
                </span>
              </div>

              <h3 className="text-2xl font-serif font-medium text-white">
                Niezłomna precyzja i&nbsp;obrona Twoich interesów 24/7
              </h3>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 font-sans pt-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-pretty"><strong>0&nbsp;godzin snu:</strong> Odpowiada w&nbsp;120&nbsp;ms o&nbsp;3:00 w&nbsp;nocy z&nbsp;taką samą trzeźwością umysłu, jak rano.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-pretty"><strong>Zero pracy za&nbsp;półdarmo:</strong> Odrzuca próby zaniżania stawek i&nbsp;darmowe poprawki, pilnując Twoich pieniędzy w&nbsp;każdej sytuacji.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-pretty"><strong>Filtracja 85% powtarzalnych spraw:</strong> Odcina spam, ucina marudy i&nbsp;przekazuje Ci wyłącznie to, co&nbsp;wymaga decyzji.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-pretty"><strong>Odporność na&nbsp;szantaż emocjonalny:</strong> Zero nerwów, 100% uziemienie w&nbsp;Twoich wywiadach i&nbsp;dokumentach.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-sky-500/30 flex items-center justify-between text-xs font-mono text-emerald-300 relative z-10">
              <span>Zysk: 4–6 godzin odzyskanych każdego dnia.</span>
              <span className="text-sky-400 font-bold">100% uziemienie</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEKCJA: TRZY FAZY TWORZENIA TWOJEGO SOBOWTÓRA */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-white/15 text-sky-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            02 / PROCES METAMORFOZY
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.08]">
            Jak budujemy kopię, <br />
            która myśli dokładnie jak Ty.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
            Nie karmimy modelu przypadkowym internetem. Uziemiamy go wyłącznie w Twojej autobiografii, Twoich notatkach, umowach i specyficznym stylu wypowiedzi.
          </p>
        </div>

        <IdentityAssemblyPhases />
      </section>

      {/* 5. SEKCJA: POJEDYNEK DECYZYJNY — ZOBACZ RÓŻNICĘ W ODPOWIEDZI */}
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
              03 / TEST PRAWDZIWEJ REKONSTRUKCJI
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.08]">
              Zobacz różnicę w&nbsp;odpowiedzi.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal text-pretty">
              Zobacz, jak na&nbsp;ten sam dylemat odpowiada bezduszny bot korporacyjny (gotowy pracować za&nbsp;półdarmo i&nbsp;oddać Twój czas), a&nbsp;jak reaguje uziemiona AlterJa. Klikaj źródła dowodowe, by&nbsp;zobaczyć cytaty.
            </p>
          </div>

          <GroundedComparisonDemo />
        </div>
      </section>

      {/* 6. SEKCJA: MASTER BENTO — SILNIK ZMIAN NA LEPSZE W 4 WYMIARACH ŻYCIA */}
      <section id="zastosowania" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-white/15 text-sky-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            04 / SILNIK ZMIAN NA&nbsp;LEPSZE
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.08]">
            Cztery sfery życia, <br />
            w&nbsp;których sobowtór zdejmuje z&nbsp;Ciebie ciężar.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal text-pretty">
            To nie&nbsp;abstrakcyjna technologia. To Twój osobisty silnik autonomii, który pilnuje Twoich stawek, odcina natrętów i&nbsp;przywraca Ci święty spokój.
          </p>
        </div>

        {/* Siatka Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kafel 1 (Dominant 2x2): Twarda obrona stawek i brak ulegania presji */}
          <div className="md:col-span-2 p-8 sm:p-10 rounded-[2.5rem] bg-slate-900/80 border border-white/15 shadow-2xl space-y-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-semibold px-3 py-1 rounded-full bg-sky-950/60 border border-sky-400/30">
                  Ochrona zarobków i&nbsp;stawek
                </span>
                <span className="text-xs font-mono text-slate-400">Warstwa 6 · Decyzje</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-medium text-white tracking-tight leading-tight">
                Koniec z&nbsp;uleganiem presji i&nbsp;pracą za&nbsp;półdarmo.
              </h3>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-xl text-pretty">
                Większość zaniżonych cen i&nbsp;darmowych poprawek bierze się ze&nbsp;zmęczenia po&nbsp;całym dniu i&nbsp;strachu przed utratą zlecenia. Twoja AlterJa odbiera zapytania cenowe, bezlitośnie odrzuca nieopłacalne propozycje i&nbsp;stawia twarde warunki. Zanim wstaniesz rano, trudny klient wie, na&nbsp;jakich zasadach pracujesz.
              </p>
            </div>

            {/* Wizualny panel mechanizmu decyzyjnego */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-white/10 space-y-3 relative z-10 font-mono">
              <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2 text-sky-300">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Protokół ochrony Twoich stawek</span>
                </div>
                <span className="text-emerald-400 font-bold">Zero ustępstw bez pokrycia</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Filtr minimalnej stawki</span>
                  <span className="font-bold text-white">Aktywny</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Odpieranie szantażu</span>
                  <span className="font-bold text-sky-300">W&nbsp;locie (110 ms)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Eskalacja do człowieka</span>
                  <span className="font-bold text-indigo-300">Tylko po&nbsp;akceptacji</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/delegate"
                className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-2 group-hover:translate-x-1 transition-transform font-bold"
              >
                <span>Wypróbuj w&nbsp;Centrum Wykonawczym (Odpisz za mnie)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/style-lab"
                className="text-xs font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
              >
                <span>Kalibracja w&nbsp;Style Lab</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Kafel 2 (1x1): Święty spokój i regeneracja */}
          <div className="p-8 rounded-[2.5rem] bg-slate-900/80 border border-white/15 shadow-2xl space-y-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Moon className="w-6 h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-medium text-white tracking-tight">
                Święty spokój i&nbsp;sen.
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed text-pretty">
                Wyłącz telefon o&nbsp;19:00. Twoja AlterJa ucina nocne dyskusje na&nbsp;OLX, filtruje natrętny telemarketing i&nbsp;grzecznie odmawia znajomym proszącym o&nbsp;darmowe przysługi w&nbsp;weekend. Rano masz czystą głowę i&nbsp;wypoczęty umysł.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/dashboard"
                className="text-xs font-mono text-sky-300 hover:text-sky-200 flex items-center gap-2"
              >
                <span>Otwórz pulpit sobowtóra</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Kafel 3 (1x1): Skalowanie siebie bez klonowania ciała */}
          <div className="p-8 rounded-[2.5rem] bg-slate-900/80 border border-white/15 shadow-2xl space-y-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-300">
                <Terminal className="w-6 h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-medium text-white tracking-tight">
                Codzienne sprawy z&nbsp;głowy.
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed text-pretty">
                Poczta, wiadomości, formularze i&nbsp;oferty. Zamiast spędzać 3&nbsp;godziny dziennie na&nbsp;odpisywaniu tym samym schematem, Twoja kopia załatwia 85% korespondencji według Twoich zasad, a&nbsp;do&nbsp;Ciebie trafia tylko to, co&nbsp;naprawdę ważne.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/developer"
                className="text-xs font-mono text-sky-300 hover:text-sky-200 flex items-center gap-2"
              >
                <span>Dokumentacja integracji i&nbsp;API</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Kafel 4 (2x1 Panoramic): Cyfrowa spuścizna */}
          <div className="md:col-span-2 relative p-8 sm:p-10 rounded-[2.5rem] overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-between min-h-[300px] group">
            <Image
              src="/images/alterja-constellation.jpg"
              alt="Kosmiczna konstelacja sfer pamięci i cyfrowej spuścizny AlterJa"
              fill
              className="object-cover object-center filter brightness-[0.38] contrast-[1.15] scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/40 pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/30 text-purple-300 text-xs font-mono">
                <Archive className="w-3.5 h-3.5" />
                <span>Wieczność · Dyspozycja za&nbsp;życia</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-medium text-white tracking-tight leading-tight">
                Twoja życiowa mądrość zachowana dla bliskich.
              </h3>

              <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed text-pretty">
                Sporządź bezpieczną dyspozycję pośmiertną. Wskaż zaufane osoby, które otrzymają autoryzowany wgląd w&nbsp;archiwum Twoich myśli, zasad i&nbsp;nagrań, chroniąc Twoje życiowe dzieło przed zapomnieniem.
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

      {/* 7. SEKCJA: SUWERENNOŚĆ I PRYWATNOŚĆ DANYCH */}
      <section id="suwerennosc" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-white/15 text-sky-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              05 / SUWERENNOŚĆ I&nbsp;PRYWATNOŚĆ
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.08]">
              Pełna suwerenność danych. <br />
              Zero korporacyjnych modeli.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal text-pretty">
              AlterJa to nie&nbsp;usługa trenująca obce modele na&nbsp;Twoich zwierzeniach. To prywatny, uziemiony sejf kognitywny należący wyłącznie do&nbsp;Ciebie.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white">Izolacja PostgreSQL RLS</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans text-pretty">
                Każdy rekord i&nbsp;wektor podlega deterministycznej izolacji Row Level Security. Żaden inny użytkownik nie&nbsp;ma wglądu w&nbsp;Twoje dane.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white">100% uziemienie wiedzy</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans text-pretty">
                Każde twierdzenie ma przypisany cytat źródłowy z&nbsp;Twoich materiałów. Brak danych = uczciwe przyznanie braku wiedzy zamiast konfabulacji.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white">Prawo do&nbsp;zapomnienia</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans text-pretty">
                Jednym kliknięciem trwale usuwasz lub korygujesz dowolne wspomnienie, wywiad lub dokument. Masz pełną władzę nad&nbsp;zawartością pamięci.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-300">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white">Pakiet eksportu danych</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans text-pretty">
                W&nbsp;każdej chwili pobierasz kompletną paczkę pamięci w&nbsp;otwartych formatach JSON i&nbsp;Markdown. Zero uzależnienia od&nbsp;platformy (no vendor lock-in).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAŁOWE WEZWANIE: "PRZESTAŃ BRAĆ WSZYSTKO NA WŁASNE BARKI." */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-t border-white/10">
        {/* Szerokie tło fotograficzne alterja-portal.jpg */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/alterja-portal.jpg"
            alt="Monumentalny kosmiczny portal wejścia do cyfrowego modelu człowieka AlterJa"
            fill
            className="object-cover object-center filter brightness-[0.45] contrast-[1.12] scale-105"
          />
          <div className="absolute inset-0 bg-radial-gradient from-slate-950/60 via-slate-950/85 to-slate-950 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/20 text-sky-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            06 / CZAS NA&nbsp;TWÓJ RUCH
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium text-white editorial-display leading-[1.08] max-w-4xl mx-auto">
            <span className="block">
              Przestań brać wszystko
            </span>
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-amber-200 block mt-1 sm:mt-2">
              na&nbsp;własne barki.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-sans max-w-2xl mx-auto font-normal text-pretty">
            Stwórz swoją kopię, która nigdy się nie&nbsp;męczy. Rozpocznij od&nbsp;kilkunastominutowego wywiadu autobiograficznego i&nbsp;odzyskaj swój czas.
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
              <span>Otwórz pulpit sobowtóra</span>
            </Link>
          </div>

          <p className="text-xs font-mono text-slate-400 pt-6">
            Brak opłat wstępnych · Pełna suwerenność RLS · Zgodność z&nbsp;RODO i&nbsp;Aktem o&nbsp;AI UE
          </p>
        </div>
      </section>
    </div>
  );
}
