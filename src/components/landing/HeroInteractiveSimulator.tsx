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
    id: "rabat",
    label: "Klient wymusza 40% rabatu o 22:30",
    tag: "Obrona marży i stawek",
    incomingText:
      "„Cześć, zarząd zaakceptuje Waszą ofertę tylko pod warunkiem 40% rabatu. Czekam na potwierdzenie do jutra do 8:00 rano, inaczej idziemy do konkurencji.”",
    incomingSender: "Klient korporacyjny · Piątek 22:34",
    alterjaReply:
      "Dziękuję za wiadomość. Nie schodzimy z ceny o 40%, ponieważ zredukowałoby to zespół inżynierów dedykowany do projektu. Jeśli budżet jest sztywny, możemy wyciąć moduł raportowy w czasie rzeczywistym z pierwszego etapu, co zamknie się w Państwa kwocie. Jeśli nie akceptujecie Państwo tej opcji — szanujemy Wasz wybór konkurencji. Decyzja do 14:00.",
    ruleTitle: "Zasada nienaruszalności stawki bazowej",
    ruleQuote:
      "„Nigdy nie obniżamy stawek pod presją odejścia. Jedyna dopuszczalna korekta ceny to proporcjonalne zmniejszenie zakresu.”",
    humanImpact: "Ty spokojnie śpisz. Rano masz obronioną marżę i twarde warunki.",
  },
  {
    id: "niedziela",
    label: "Żądanie spotkania w niedzielę rano",
    tag: "Święty spokój i regeneracja",
    incomingText:
      "„Musimy natychmiast omówić draft umowy. Proponuję spotkanie online jutro w niedzielę o 9:00 rano. Sprawa jest krytyczna.”",
    incomingSender: "Partner biznesowy · Sobota 23:15",
    alterjaReply:
      "Weekend to czas regeneracji zespołu. W niedziele nie prowadzimy spotkań operacyjnych. Przejrzałem draft umowy — kluczowe uwagi naniosłem w trybie rejestracji zmian. Omówimy je w poniedziałek o 9:30. Do usłyszenia.",
    ruleTitle: "Zasada ochrony niedzieli i higieny regeneracji",
    ruleQuote:
      "„Kto nie szanuje Twojego odpoczynku, nie uszanuje też Twojej pracy. Żadnych spotkań w weekendy bez stanu wyższej konieczności.”",
    humanImpact: "Zero nerwowego sprawdzania telefonu. Weekend z rodziną nietknięty.",
  },
  {
    id: "inwestor",
    label: "Inwestor żąda prawa veta do kodu",
    tag: "Suwerenność i wolność twórcza",
    incomingText:
      "„Oferujemy 3 mln zł za 15% udziałów, ale warunkiem koniecznym jest osobiste prawo veta funduszu do zmian w architekturze i roadmapie.”",
    incomingSender: "Fundusz VC · Wtorek 14:10",
    alterjaReply:
      "Odrzucam tę ofertę w tym kształcie. Żaden podmiot zewnętrzny nie otrzyma prawa veta do architektury i roadmapy technologicznej AlterJi. Kapitał jest towarem wymiennym, suwerenność inżynierska — nie. Jeśli nie ufacie zarządowi w kwestiach produktu, rozwijamy się ze środków własnych.",
    ruleTitle: "Karta suwerenności inżynierskiej",
    ruleQuote:
      "„Zgoda na ingerencję inwestorów w kod to śmierć innowacji. Pieniądze można pozyskać z rynku, utraconej wolności się nie odzyskuje.”",
    humanImpact: "Nie sprzedajesz duszy i suwerenności za cudzy kapitał.",
  },
  {
    id: "spoznienie",
    label: "Kontrahent spóźnia się z umową o 3 dni",
    tag: "Dyscyplina i szacunek czasu",
    incomingText:
      "„Przepraszamy za poślizg z finalizacją umowy deweloperskiej. Mamy urwanie głowy. Dajcie nam jeszcze 3 dni, a wy w międzyczasie już zacznijcie prace.”",
    incomingSender: "Dyrektor operacyjny · Środa 11:20",
    alterjaReply:
      "Nie rozpoczynamy prac deweloperskich bez podpisanego porozumienia i zaksięgowanej zaliczki. Zasoby inżynierskie zostają wstrzymane i przekierowane do innego projektu. Do rozmów wracamy po otrzymaniu podpisanej umowy — start opóźni się o 14 dni roboczych. Szanujmy wzajemne ustalenia.",
    ruleTitle: "Zasada wzajemności i formalnego zabezpieczenia",
    ruleQuote:
      "„Nigdy nie pracuj »na gębę«. Kto nie podpisuje umowy na czas, nie zapłaci na czas.”",
    humanImpact: "Chronisz zespół przed pracą za darmo i chaosem.",
  },
];

export default function HeroInteractiveSimulator() {
  const [selectedId, setSelectedId] = useState<string>("rabat");
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
              Twoja kopia w akcji
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
            <span>Wiadomość przychodząca z zewnątrz:</span>
            <span className="text-rose-400 font-semibold">{scenario.incomingSender}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-sans italic leading-relaxed">
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

          <p className="text-sm sm:text-base text-white leading-relaxed font-sans font-medium">
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
            <span className="text-slate-400 text-[10px]">Uziemienie w Warstwie 6 · Zero konfabulacji</span>
          </div>

          {/* Rozwinięcie zasady decyzyjnej */}
          {showRule && (
            <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-400/40 text-xs space-y-1.5 animate-in fade-in duration-200">
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                Dosłowny cytat z Twojego kodeksu decyzyjnego:
              </span>
              <p className="text-slate-200 font-sans italic leading-relaxed">
                {scenario.ruleQuote}
              </p>
            </div>
          )}
        </div>

        {/* Dolna konkluzja korzyści życiowej */}
        <div className="pt-1 flex items-center gap-2.5 text-xs font-mono text-emerald-300 bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-500/30">
          <Flame className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Efekt w Twoim życiu:</strong> {scenario.humanImpact}
          </span>
        </div>
      </div>
    </div>
  );
}
