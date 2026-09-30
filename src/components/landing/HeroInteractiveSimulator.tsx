"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Clock,
  CheckCircle2,
  FileText,
  SlidersHorizontal,
  Flame,
  Moon,
} from "lucide-react";

interface Scenario {
  id: string;
  label: string;
  tag: string;
  incomingText: string;
  incomingSender: string;
  alterjaReply: string;
  ruleTitle: string;
  ruleQuote: string;
  humanImpact: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "olx",
    label: "Targowanie o\u00A0pół ceny na\u00A0OLX o\u00A023:00",
    tag: "Święty spokój i\u00A0ogłoszenia",
    incomingText:
      "„Dam 60 zł i biorę dzisiaj za pół godziny, niech pan opuści z tych 180 zł, nikt panu więcej za to nie da!”",
    incomingSender: "Użytkownik portalu ogłoszeniowego · 23:14",
    alterjaReply:
      "Dziękuję za wiadomość. Cena podana w ogłoszeniu jest ostateczna i wynosi 180 zł. Odbiór osobisty w ciągu dnia lub bezpieczna przesyłka przez aplikację. Jeśli kwota Panu nie odpowiada, życzę powodzenia w poszukiwaniach u innych sprzedawców. Pozdrawiam.",
    ruleTitle: "Zasada szacunku dla własnej ceny i czasu",
    ruleQuote:
      "„Nie wdajemy się w nocne dyskusje z marudami i nie oddajemy rzeczy za bezcen. Krótka, kulturalna odmowa bez tłumaczenia się.”",
    humanImpact: "Śpisz spokojnie. Zero irytacji i bezsensownego odpisywania przed snem.",
  },
  {
    id: "znajomy",
    label: "Znajomy chce darmową przysługę w\u00A0weekend",
    tag: "Ochrona wolnego czasu i\u00A0rodziny",
    incomingText:
      "„Hejka! Rzuć okiem na ten plik i zrób mi to na szybko, dla Ciebie to 5 minut roboty, a mi uratuje skórę. Pomożesz kumplowi po znajomości?”",
    incomingSender: "Znajomy · Sobota 19:45",
    alterjaReply:
      "Cześć! Weekend to czas dla rodziny i pełnego odcięcia od pracy, więc laptopa otwieram dopiero w poniedziałek. Jeśli sprawa jest pilna zawodowo, napisz rano w tygodniu — sprawdzę grafik i podeślę stawkę za konsultację. Dobrego odpoczynku!",
    ruleTitle: "Zasada obrony granic i prawa do odpoczynku",
    ruleQuote:
      "„»Po znajomości« nie oznacza pracy za darmo w sobotni wieczór. Kulturalna, życzliwa odmowa chroni relacje lepiej niż robienie czegoś z ukrytą złością.”",
    humanImpact: "Koniec z poczuciem winy i byciem darmowym pogotowiem ratunkowym w weekendy.",
  },
  {
    id: "porada",
    label: "Nocna prośba o\u00A0darmową konsultację zawodową",
    tag: "Ochrona powołania i\u00A0odpoczynku",
    incomingText:
      "„Hej! Rzuć okiem na te moje wyniki / umowę / plany na szybko, bo się strasznie stresuję przed jutrem. Powiedz tylko w dwóch zdaniach, czy jest bardzo źle!”",
    incomingSender: "Dalszy znajomy · Niedziela 22:45",
    alterjaReply:
      "Cześć! W pełni rozumiem Twój niepokój, ale rzetelna ocena w tak ważnej sprawie wymaga skupienia, wglądu w pełną dokumentację i normalnych warunków pracy — pisanie czegokolwiek na szybko w niedzielny wieczór na Messengerze byłoby z mojej strony nieodpowiedzialne. Zgłoś się jutro od 9:00 oficjalną drogą, a sprawdzimy to spokojnie i dokładnie. Dobrej, spokojnej nocy!",
    ruleTitle: "Zasada rzetelności zawodowej i bezpieczeństwa",
    ruleQuote:
      "„Nigdy nie stawiamy ocen ani diagnoz na kolanie w prywatnych wiadomościach przed snem. Prawdziwa pomoc wymaga skupienia i bezpiecznych ram.”",
    humanImpact: "Spokojny wieczór bez wciągania w cudzą panikę i bez poczucia winy.",
  },
  {
    id: "telemarketing",
    label: "Spam na\u00A0WhatsAppie i\u00A0wciskanie fotowoltaiki",
    tag: "Blokada spamu i\u00A0RODO",
    incomingText:
      "„Dzień dobry! Zauważyliśmy Pana profil i mamy unikalną ofertę dofinansowania instalacji OZE. Czy możemy porozmawiać 10 minut telefonicznie?”",
    incomingSender: "Nieznany numer · Wtorek 14:15",
    alterjaReply:
      "Dziękuję, nie wyrażam zgody na kontakt marketingowy i przetwarzanie mojego numeru w celach handlowych. Na podstawie art. 17 i 21 RODO wnoszę sprzeciw i żądam niezwłocznego usunięcia moich danych z Państwa bazy telemarketingowej.",
    ruleTitle: "Procedura ochrony prywatności i obrony przed spamem",
    ruleQuote:
      "„Nie marnujemy życia na wysłuchiwanie niechcianych ofert. Formalne powołanie się na RODO kończy temat w 10 sekund.”",
    humanImpact: "Czysty telefon i spokój, bez nachalnego wydzwaniania w ciągu dnia.",
  },
];

export default function HeroInteractiveSimulator() {
  const [selectedId, setSelectedId] = useState<string>("olx");
  const [displayedReply, setDisplayedReply] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showRule, setShowRule] = useState<boolean>(false);

  const scenario = SCENARIOS.find((s) => s.id === selectedId) || SCENARIOS[0];

  useEffect(() => {
    setIsTyping(true);
    setDisplayedReply("");
    setShowRule(false);

    const fullText = scenario.alterjaReply;
    let index = 0;
    const interval = setInterval(() => {
      index += 5;
      if (index >= fullText.length) {
        setDisplayedReply(fullText);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedReply(fullText.slice(0, index));
      }
    }, 15);

    return () => clearInterval(interval);
  }, [selectedId, scenario.alterjaReply]);

  return (
    <div className="w-full max-w-4xl mx-auto select-none space-y-6">
      {/* 1. SELEKTOR PRZYPADKÓW W FORMIE SZYBKICH PIGUŁEK (DELPHI STYLE) */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {SCENARIOS.map((sc) => {
          const isSelected = sc.id === selectedId;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => setSelectedId(sc.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 border flex items-center gap-2 ${
                isSelected
                  ? "bg-white text-slate-950 font-bold border-white shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-105"
                  : "bg-slate-900/80 text-slate-300 border-white/15 hover:border-white/30 hover:bg-slate-800/80"
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isSelected ? "text-sky-600" : "text-sky-400"}`} />
              <span>{sc.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. GŁÓWNA KINOWA KONSOLA SYMULACJI */}
      <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-slate-950/90 backdrop-blur-2xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] p-6 sm:p-8 space-y-6">
        {/* Górny pasek telemetrii konsoli */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold uppercase tracking-wider text-[11px]">
              Twoja kopia w&nbsp;akcji
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-sky-300 font-semibold">{scenario.tag}</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              <Moon className="w-3 h-3" />
              <span>Czas reakcji: 120 ms (gdy Ty śpisz)</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>0% zmęczenia</span>
            </span>
          </div>
        </div>

        {/* Ciało symulacji: Przychodzące trudne żądanie */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            <span>Wiadomość przychodząca z&nbsp;zewnątrz:</span>
            <span className="text-rose-400 font-semibold">{scenario.incomingSender}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-sans italic leading-relaxed text-pretty">
            {scenario.incomingText}
          </p>
        </div>

        {/* Natychmiastowa reakcja uziemionego sobowtóra */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-sky-950/40 via-slate-900/80 to-slate-950 border border-sky-400/50 shadow-inner space-y-3 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-mono font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Odpowiedź Twojej AlterJi (wysłana natychmiast):</span>
            </div>
            {isTyping && (
              <span className="text-[10px] font-mono text-sky-400 animate-pulse">
                Generowanie stylu...
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-white leading-relaxed font-sans font-medium text-pretty">
            {displayedReply}
            {isTyping && <span className="inline-block w-2 h-4 bg-sky-400 ml-1 animate-pulse" />}
          </p>

          {/* Plakietka rozwijania zasady źródłowej */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setShowRule(!showRule)}
              className="text-sky-300 hover:text-white flex items-center gap-1.5 underline underline-offset-4 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showRule ? "Ukryj zasadę decyzyjną" : `Sprawdź źródło: ${scenario.ruleTitle}`}</span>
            </button>
            <span className="text-slate-400 text-[10px]">Uziemienie w&nbsp;Warstwie 6 · Zero konfabulacji</span>
          </div>

          {/* Rozwinięcie zasady decyzyjnej */}
          {showRule && (
            <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-400/40 text-xs space-y-1.5 animate-in fade-in duration-200">
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                Dosłowny cytat z&nbsp;Twojego kodeksu decyzyjnego:
              </span>
              <p className="text-slate-200 font-sans italic leading-relaxed text-pretty">
                {scenario.ruleQuote}
              </p>
            </div>
          )}
        </div>

        {/* Dolna konkluzja korzyści życiowej */}
        <div className="pt-1 flex items-center gap-2.5 text-xs font-mono text-emerald-300 bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-500/30">
          <Flame className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Efekt w&nbsp;Twoim życiu:</strong> {scenario.humanImpact}
          </span>
        </div>
      </div>
    </div>
  );
}
