"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import HeroInteractiveSimulator from "@/components/landing/HeroInteractiveSimulator";
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
    "Niech Twoja kopia tyra za Ciebie",
    "Ona się nie męczy",
    "Koniec z pracą po nocach",
    "100% uziemienie · Zero konfabulacji",
    "Żelazna obrona Twojej marży i stawek",
    "Deterministyczna izolacja PostgreSQL RLS",
    "Święty spokój i powrót do życia",
    "Niezniszczalny silnik zmian na lepsze",
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

        {/* Dynamiczny promień telemetryczny */}
        <div className="absolute inset-x-0 h-32 bg-gradient-to-b from-sky-400/0 via-sky-400/20 to-sky-400/0 border-b border-sky-300/40 pointer-events-none animate-scanline z-10" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
          {/* Mikro-plakietka statusowa */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-xl border border-white/20 shadow-2xl text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold uppercase tracking-wider text-[11px]">
              Silnik zmian na lepsze
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-sky-300 font-semibold text-[11px]">alterja.pl</span>
          </div>

          {/* Główny manifest zadany przez użytkownika */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white editorial-display leading-[1.04]">
              Niech Twoja kopia tyra za Ciebie. <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-amber-200">
                Ona się nie męczy.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-3xl mx-auto">
              Biologiczny człowiek potrzebuje snu, regeneracji i świętego spokoju. Twoja AlterJa uczy się Twojego sposobu myślenia, zasad i stylu — po czym przejmuje powtarzalne rozmowy, trudne negocjacje i codzienne decyzje. Pilnuje Twojej marży i Twojego czasu 24 godziny na dobę.
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
            <a
              href="#czlowiek-vs-kopia"
              className="w-full sm:w-auto btn-luxe-glass !py-4 !px-8 text-base"
            >
              <Eye className="w-4 h-4 text-sky-400" />
              <span>Zobacz, jak to działa</span>
            </a>
          </div>

          {/* Pigułki inwariantów */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>0h zmęczenia na dobę</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>100% uziemienie zasad</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Nienaruszalna marża</span>
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
            która się nie męczy.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
            Każda trudna decyzja i powtarzalna rozmowa wyczerpuje Twoje zasoby kognitywne. Twoja AlterJa nie ma biologicznych ograniczeń.
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
                Wyczerpanie decyzyjne i permanentny stres
              </h3>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 font-sans pt-2">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>8 godzin snu na dobę:</strong> Gdy odpoczywasz, klienci czekają lub uciekają do konkurencji.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Zmęczenie po 16:00:</strong> Pod koniec dnia łatwiej ulegasz presji i niepotrzebnie zgadzasz się na rabat.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Praca po nocach i w weekendy:</strong> Ciągłe sprawdzanie telefonu kosztem zdrowia i rodziny.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Emocje i manipulacja:</strong> Trudne maile psują Ci humor na cały wieczór.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-rose-500/20 text-xs font-mono text-rose-300">
              Cena: Wypalenie zawodowe, utrata marży i brak wolnego czasu.
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
                  Nigdy się nie męczy
                </span>
              </div>

              <h3 className="text-2xl font-serif font-medium text-white">
                Niezłomna precyzja i obrona Twoich interesów 24/7
              </h3>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 font-sans pt-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>0 godzin snu:</strong> Odpowiada w 120 ms o 3:00 w nocy z taką samą trzeźwością umysłu, jak rano.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Żelazna obrona marży:</strong> Odrzuca nierealne rabaty bez wahania, zgodnie z Twoją twardą zasadą.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Filtracja 85% powtarzalnych spraw:</strong> Do Ciebie trafiają wyłącznie kluczowe kwestie wymagające podpisu.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Odporność na szantaż:</strong> Zero emocji, 100% uziemienie w Twoich wywiadach i dokumentach.</span>
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
              Zobacz różnicę w odpowiedzi.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
              Zobacz, jak na ten sam dylemat odpowiada bezduszny bot korporacyjny (gotowy oddać marżę i czas), a jak reaguje uziemiona AlterJa. Klikaj źródła dowodowe, by zobaczyć cytaty.
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
            04 / SILNIK ZMIAN NA LEPSZE
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.08]">
            Cztery obszary, <br />
            w których sobowtór zmienia wszystko.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
            To nie gadżet technologiczny. To osobista machina operacyjna, która przywraca Ci kontrolę nad czasem, pieniędzmi i energią życiową.
          </p>
        </div>

        {/* Siatka Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kafel 1 (Dominant 2x2): Twarda obrona marży i filtracja leadów */}
          <div className="md:col-span-2 p-8 sm:p-10 rounded-[2.5rem] bg-slate-900/80 border border-white/15 shadow-2xl space-y-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-semibold px-3 py-1 rounded-full bg-sky-950/60 border border-sky-400/30">
                  Obrona finansowa i negocjacje
                </span>
                <span className="text-xs font-mono text-slate-400">Warstwa 6 · Decyzje</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-medium text-white tracking-tight leading-tight">
                Koniec z rozdawaniem rabatów ze zmęczenia.
              </h3>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-xl">
                Większość strat na marży wynika z presji czasu i wieczornego zmęczenia. Twoja AlterJa odbiera zapytania cenowe, odrzuca nieopłacalne zlecenia i stawia twarde warunki brzegowe. Zanim wstaniesz rano, trudny klient wie, na jakich zasadach może z Tobą pracować.
              </p>
            </div>

            {/* Wizualny panel mechanizmu decyzyjnego */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-white/10 space-y-3 relative z-10 font-mono">
              <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2 text-sky-300">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Protokół obrony marży</span>
                </div>
                <span className="text-emerald-400 font-bold">100% obrony stawek</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Filtr minimalnej stawki</span>
                  <span className="font-bold text-white">Aktywny</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Odpieranie ultimatum</span>
                  <span className="font-bold text-sky-300">W locie (110 ms)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Eskalacja do człowieka</span>
                  <span className="font-bold text-indigo-300">Tylko po akceptacji</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/style-lab"
                className="text-xs font-mono text-sky-300 hover:text-sky-200 flex items-center gap-2 group-hover:translate-x-1 transition-transform"
              >
                <span>Skalibruj kryteria decyzyjne w Style Lab</span>
                <ChevronRight className="w-3.5 h-3.5" />
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
                Święty spokój i sen.
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Wyłącz telefon o 19:00. Twoja AlterJa odpowiada na maile i wiadomości w Twoim stylu, umawia kalendarz i informuje o terminach. Rano masz czystą skrzynkę i wypoczęty umysł.
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
                Skalowanie obecności 24/7.
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Wepnij sobowtóra do Slacka, poczty i systemów firmy. Odpowiadaj 50 kontrahentom równolegle, nie tracąc ani minuty ze swojego prywatnego dnia.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/developer"
                className="text-xs font-mono text-sky-300 hover:text-sky-200 flex items-center gap-2"
              >
                <span>Dokumentacja OpenAPI 3.1</span>
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
                <span>Wieczność · Dyspozycja za życia</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-medium text-white tracking-tight leading-tight">
                Twoja życiowa mądrość zachowana dla bliskich.
              </h3>

              <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed">
                Sporządź bezpieczną dyspozycję pośmiertną. Wskaż zaufane osoby, które otrzymają autoryzowany wgląd w archiwum Twoich myśli, zasad i nagrań, chroniąc Twoje życiowe dzieło przed zapomnieniem.
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
              05 / SUWERENNOŚĆ I PRYWATNOŚĆ
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-[1.08]">
              Pełna suwerenność danych. <br />
              Zero korporacyjnych modeli.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
              AlterJa to nie usługa trenująca obce modele na Twoich zwierzeniach. To prywatny, uziemiony sejf kognitywny należący wyłącznie do Ciebie.
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
              <h4 className="text-base font-semibold text-white">100% uziemienie wiedzy</h4>
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
            06 / CZAS NA TWÓJ RUCH
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium text-white editorial-display leading-[1.05]">
            Przestań brać wszystko <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-amber-200">
              na własne barki.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-sans max-w-2xl mx-auto font-normal">
            Stwórz swoją kopię, która nigdy się nie męczy. Rozpocznij od kilkunastominutowego wywiadu autobiograficznego i odzyskaj swój czas.
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
            Brak opłat wstępnych · Pełna suwerenność RLS · Zgodność z RODO i Aktem o AI UE
          </p>
        </div>
      </section>
    </div>
  );
}
