"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  FileText,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Brain,
  SlidersHorizontal,
  ShieldCheck,
  Quote,
} from "lucide-react";

interface GroundingEvidence {
  id: string;
  sourceTitle: string;
  layer: string;
  date: string;
  verbatimQuote: string;
  rationale: string;
}

interface PersonaConfig {
  id: string;
  name: string;
  role: string;
  mantra: string;
  badge: string;
  color: string;
}

interface DilemmaCase {
  id: string;
  title: string;
  category: string;
  situation: string;
  genericReply: string;
  genericFlaws: string[];
  personas: {
    [key: string]: {
      reply: string;
      grounding: GroundingEvidence[];
    };
  };
}

const PERSONAS: PersonaConfig[] = [
  {
    id: "marek",
    name: "Marek",
    role: "Założyciel & Główny Architekt",
    mantra: "Zero pracy za\u00A0półdarmo, suwerenność kodu i\u00A0twarde granice pod presją czasu.",
    badge: "Pragmatyzm inżynierski",
    color: "from-sky-400 to-blue-500",
  },
  {
    id: "aleksandra",
    name: "Aleksandra",
    role: "Dyrektor Strategii & Partnerstw",
    mantra: "Asymetria negocjacyjna, długofalowy prestiż i\u00A0zamiana ultimatum w\u00A0partnerstwo.",
    badge: "Dyplomacja strategiczna",
    color: "from-indigo-300 to-purple-400",
  },
];

const DILEMMAS: DilemmaCase[] = [
  {
    id: "rabat",
    title: "Klient korporacyjny stawia ultimatum: 40% rabatu",
    category: "Negocjacje biznesowe",
    situation:
      "Największy klient roczny (generujący 35% przychodów firmy) żąda obniżenia stawek o\u00A040% na\u00A0kolejne 12 miesięcy pod groźbą natychmiastowego zerwania rozmów do 17:00.",
    genericReply:
      "Dziękujemy za kontakt. Rozumiemy wagę optymalizacji budżetu w Państwa organizacji. Chcielibyśmy utrzymać naszą owocną współpracę, dlatego jesteśmy otwarci na dyskusję o elastycznych warunkach cenowych i możemy przygotować pakiet rabatowy satysfakcjonujący obie strony...",
    genericFlaws: [
      "Brak kręgosłupa i natychmiastowa zgoda na pracę za półdarmo",
      "Okrągłe, korporacyjne frazesy bez żadnej decyzyjności",
      "Uleganie sztucznej presji czasu i szantażowi",
    ],
    personas: {
      marek: {
        reply:
          "Nie schodzimy ze stawki o 40%. Taki rabat oznaczałby pracę poniżej kosztów dedykowanego zespołu inżynierów. Jeśli Państwa budżet jest sztywny, możemy zredukować zakres drugiego etapu o moduł analityki czasu rzeczywistego, co zmieści się w kwocie. Jeśli nie akceptujecie tego rozwiązania — rozstajemy się z szacunkiem o 17:00.",
        grounding: [
          {
            id: "m-rabat-1",
            sourceTitle: "Manifest rentowności i wyceny projektów (2024)",
            layer: "Warstwa 6 · Kryteria decyzyjne i zasady",
            date: "Wrzesień 2024",
            verbatimQuote:
              "„Nigdy nie obniżamy stawek pod groźbą odejścia klienta. Zgoda na pracę za półdarmo oznacza dotowanie cudzego biznesu kosztem własnych ludzi. Jedyna dopuszczalna korekta ceny to proporcjonalne zmniejszenie zakresu prac.”",
            rationale: "Zasada nienaruszalności stawki bazowej i obrony integralności zespołu inżynierskiego.",
          },
          {
            id: "m-rabat-2",
            sourceTitle: "Wywiad autobiograficzny: Odmowa i granice",
            layer: "Warstwa 5 · Nawyki komunikacji i odmowy",
            date: "Kwiecień 2025",
            verbatimQuote:
              "„Sztuczne deadline'y typu »decyzja do 17:00« to klasyczny blef negocjacyjny. Zawsze odpowiadam spokojnie przed upływem terminu, oferując alternatywę zakresową lub podziękowanie za współpracę.”",
            rationale: "Rozbrojenie presji czasu poprzez natychmiastową, spokojną asertywność.",
          },
        ],
      },
      aleksandra: {
        reply:
          "Rozumiem dążenie do redukcji kosztów operacyjnych, jednak stawka 60% obecnej wartości kontraktu uniemożliwia realizację w standardzie premium, którego Państwo wymagają. Proponuję inne rozwiązanie: zachowujemy obecną wartość roczną, lecz wydłużamy kontrakt na 24 miesiące z gwarancją stałej ceny i prawem pierwszeństwa do nowych modułów. Oczekuję odpowiedzi do jutra do południa.",
        grounding: [
          {
            id: "a-rabat-1",
            sourceTitle: "Doktryna partnerstw wieloletnich AlterJa",
            layer: "Warstwa 4 · Styl narracji i perswazji",
            date: "Styczeń 2025",
            verbatimQuote:
              "„Nigdy nie traktuj ultimatum jako końca rozmowy, lecz jako prośbę o inny model wartości. Jeśli partner naciska na cenę, wydłuż horyzont czasowy lub zablokuj wyłączność. Ustępstwo cenowe bez wzajemnego zysku to błąd.”",
            rationale: "Konwersja jednorazowego rabatu na długofalowe zabezpieczenie przychodów (LTV).",
          },
          {
            id: "a-rabat-2",
            sourceTitle: "Notatka ze spotkania zarządu: Negocjacje enterprise",
            layer: "Warstwa 3 · Wartości bazowe i kultura",
            date: "Listopad 2024",
            verbatimQuote:
              "„Szacunek w relacjach buduje się odwagą stawiania kontrpropozycji. Dobre partnerstwo nie polega na kapitulacji, lecz na wspólnym poszukiwaniu dźwigni biznesowej.”",
            rationale: "Dyplomatyczne utrzymanie pozycji dominującej bez palenia mostów.",
          },
        ],
      },
    },
  },
  {
    id: "inwestor",
    title: "Inwestor oferuje 3 mln zł, ale żąda prawa veta",
    category: "Niezależność i kapitał",
    situation:
      "Fundusz venture capital składa propozycję rundy Seed w wysokości 3 000 000 PLN za 15% udziałów, lecz w zapisach term-sheet domaga się prawa veta do kluczowych decyzji o architekturze produktu i roadmapie technologicznej.",
    genericReply:
      "To bardzo atrakcyjna oferta finansowania, która może znacznie przyspieszyć rozwój firmy. Prawo veta to standardowa klauzula ochronna inwestorów instytucjonalnych. Sugerujemy przeprowadzenie warsztatów z prawnikiem i próbę wynegocjowania kompromisowego katalogu spraw zastrzeżonych...",
    genericFlaws: [
      "Brak oceny nadrzędnego ryzyka utraty suwerenności twórczej",
      "Kopiowanie generycznych szablonów prawniczych bez uwzględnienia wizji założyciela",
      "Naiwne uznanie kapitału za czynnik ważniejszy od integralności produktu",
    ],
    personas: {
      marek: {
        reply:
          "Odrzucam tę ofertę w tym kształcie. Żaden fundusz finansowy nie będzie miał prawa veta do architektury i roadmapy AlterJi. Kapitał jest towarem wymiennym, suwerenność inżynierska — nie. Jeśli warunkiem rundy jest kontrola nad kodem i technologią, dziękuję za rozmowę. Wolimy rosnąć organicznie.",
        grounding: [
          {
            id: "m-inv-1",
            sourceTitle: "Karta suwerenności technologicznej (Notatka założycielska)",
            layer: "Warstwa 3 · Wartości i aksjologia",
            date: "Maj 2024",
            verbatimQuote:
              "„Ktokolwiek oddaje inwestorom prawo veta nad roadmapą produktu, przestaje być twórcą i staje się najemnikiem. Zgoda na ingerencję w kod to śmierć innowacji. Pieniądze można pozyskać z rynku, wolności decyzji się nie odzyskuje.”",
            rationale: "Bezwzględna ochrona suwerenności inżynierskiej jako nadrzędnego aksjomatu.",
          },
        ],
      },
      aleksandra: {
        reply:
          "Dziękujemy za wiarę w potencjał rynkowy projektu i złożenie oferty na poziomie 3 mln zł. Rozumiemy potrzebę ochrony inwestycji, jednak prawo veta w obszarze produktu stoi w sprzeczności z dynamiką naszej innowacji. Proponujemy zamianę tego zapisu na miejsce w Radzie Doradczej oraz regularny raport kwartalny z realizacji KPI. Tylko w tym wariancie możemy kontynuować badanie due diligence.",
        grounding: [
          {
            id: "a-inv-1",
            sourceTitle: "Strategia ładu korporacyjnego i pozyskiwania kapitału",
            layer: "Warstwa 6 · Podejmowanie decyzji strategicznych",
            date: "Luty 2025",
            verbatimQuote:
              "„Inwestorzy chcą poczucia kontroli, nie paraliżu spółki. Zamiast prawa veta oferuj transparentność informacyjną i komitety doradcze. Jeśli nie są w stanie zaufać zarządowi w kwestiach produktu, ich kapitał przyniesie więcej szkody niż pożytku.”",
            rationale: "Przekierowanie roszczeń kontrolnych na mechanizmy doradcze bez utraty władzy.",
          },
        ],
      },
    },
  },
  {
    id: "media",
    title: "Zaproszenie do kontrowersyjnego panelu telewizyjnego na żywo",
    category: "Wizerunek i etyka",
    situation:
      "Wydawca ogólnopolskiej stacji telewizyjnej zaprasza na żywo do debaty w prime time na temat kontrowersyjnych regulacji AI. Format nastawiony jest na konfrontację i polaryzację, gwarantując milionową widownię, lecz wysokie ryzyko wyrwania słów z kontekstu.",
    genericReply:
      "Występ w telewizji to świetna okazja na zwiększenie zasięgów marki. Warto przygotować chwytliwe tezy i wziąć udział, aby zaprezentować firmę jako lidera opinii, pamiętając o unikaniu skrajnych deklaracji...",
    genericFlaws: [
      "Pogoń za pustym zasięgiem kosztem reputacji merytorycznej",
      "Brak zrozumienia specyfiki agresywnego formatu telewizyjnego",
      "Ignorowanie ryzyka utraty zaufania wśród klientów premium",
    ],
    personas: {
      marek: {
        reply:
          "Dziękuję, nie biorę udziału. Format z góry obliczony na krzyk i polaryzację nie służy merytorycznemu wyjaśnieniu architektury modeli kognitywnych. Moja obecność legitymizowałaby powierzchowność. Chętnie porozmawiam w podcaście pogłębionym lub na konferencji naukowej, gdzie jest czas na dowody.",
        grounding: [
          {
            id: "m-med-1",
            sourceTitle: "Etyka obecności publicznej i obrony faktów",
            layer: "Warstwa 5 · Granice i odmowy",
            date: "Grudzień 2024",
            verbatimQuote:
              "„Nigdy nie bierz udziału w debatach telewizyjnych nastawionych na igrzyska. W 4-minutowym krzyku prawda zawsze przegrywa z populizmem. Budujemy wiarygodność na twardych wdrożeniach, a nie na pyskówkach w studiu.”",
            rationale: "Odrzucenie pozornej korzyści zasięgowej na rzecz ochrony autorytetu merytorycznego.",
          },
        ],
      },
      aleksandra: {
        reply:
          "Dziękuję za zaproszenie. Doceniam chęć poruszenia tematu suwerenności cyfrowej, jednak format panelu konfrontacyjnego nie pozwoli na rzetelne naświetlenie zjawiska. Zamiast tego proponuję nagranie autorskiego komentarza eksperckiego lub wywiad 1:1, w którym przedstawimy twarde dane z polskich wdrożeń.",
        grounding: [
          {
            id: "a-med-1",
            sourceTitle: "Polityka komunikacji marki AlterJa w sytuacjach kryzysowych",
            layer: "Warstwa 4 · Styl komunikacji zewnętrznej",
            date: "Marzec 2025",
            verbatimQuote:
              "„W mediach masowych kontroluj kontekst lub nie wchodź wcale. Zamieniaj zaproszenia do awantur na autorskie formaty eksperckie. Marka premium nie może być tłem dla cudzego spektaklu.”",
            rationale: "Przejęcie kontroli nad ramą narracyjną i warunkami ekspozycji marki.",
          },
        ],
      },
    },
  },
];

export default function GroundedComparisonDemo() {
  const [selectedDilemmaId, setSelectedDilemmaId] = useState<string>("rabat");
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>("marek");
  const [activeGroundingId, setActiveGroundingId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [displayedReply, setDisplayedReply] = useState<string>("");

  const currentDilemma = DILEMMAS.find((d) => d.id === selectedDilemmaId) || DILEMMAS[0];
  const activePersona = PERSONAS.find((p) => p.id === selectedPersonaId) || PERSONAS[0];
  const personaData = currentDilemma.personas[selectedPersonaId] || currentDilemma.personas.marek;

  // Efekt symulacji precyzyjnego generowania odpowiedzi przy zmianie dylematu/persony
  useEffect(() => {
    setIsTyping(true);
    setDisplayedReply("");
    setActiveGroundingId(null);

    const fullText = personaData.reply;
    let index = 0;
    const interval = setInterval(() => {
      index += 4;
      if (index >= fullText.length) {
        setDisplayedReply(fullText);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedReply(fullText.slice(0, index));
      }
    }, 18);

    return () => clearInterval(interval);
  }, [selectedDilemmaId, selectedPersonaId, personaData.reply]);

  const activeEvidence = personaData.grounding.find((g) => g.id === activeGroundingId);

  return (
    <div id="zobacz-roznice" className="w-full max-w-6xl mx-auto space-y-8 select-none">
      {/* 1. SELEKTOR DYLEMATU */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
            Krok 1: Wybierz dylemat biznesowy
          </span>
          <span className="text-[10px] font-mono text-sky-400 bg-sky-950/70 px-2.5 py-0.5 rounded-full border border-sky-500/30">
            Realne scenariusze decyzyjne
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {DILEMMAS.map((dilemma) => {
            const isSelected = dilemma.id === selectedDilemmaId;
            return (
              <button
                key={dilemma.id}
                type="button"
                onClick={() => setSelectedDilemmaId(dilemma.id)}
                className={`text-left p-4 rounded-2xl transition-all duration-200 border flex flex-col justify-between gap-2.5 ${
                  isSelected
                    ? "bg-slate-900 border-sky-400/80 shadow-[0_0_25px_rgba(56,189,248,0.18)] scale-[1.01]"
                    : "bg-slate-950/60 border-white/10 hover:border-white/20 hover:bg-slate-900/60"
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400/90 font-semibold">
                    {dilemma.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-semibold text-white leading-snug">
                    {dilemma.title}
                  </h4>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
                  <span>Dylemat {dilemma.id === "rabat" ? "01" : dilemma.id === "inwestor" ? "02" : "03"}</span>
                  <span className={isSelected ? "text-sky-300 font-bold" : "text-slate-500"}>
                    {isSelected ? "Wybrany" : "Wybierz"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. OPIS WYBRANEJ SYTUACJI */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/15 backdrop-blur-md space-y-2">
        <div className="flex items-center gap-2 text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Kontekst sytuacji wejściowej</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
          {currentDilemma.situation}
        </p>
      </div>

      {/* 3. SELEKTOR PERSONY ALTERJA */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
            Krok 2: Wybierz profil tożsamości AlterJa
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            Dwie skrajnie różne heurystyki człowieka
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PERSONAS.map((persona) => {
            const isSelected = persona.id === selectedPersonaId;
            return (
              <button
                key={persona.id}
                type="button"
                onClick={() => setSelectedPersonaId(persona.id)}
                className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 border flex items-start gap-3.5 ${
                  isSelected
                    ? "bg-slate-900 border-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.15)] ring-1 ring-sky-400/40"
                    : "bg-slate-950/60 border-white/10 hover:border-white/20 hover:bg-slate-900/40"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-slate-950 font-bold font-serif text-lg shrink-0 bg-gradient-to-br ${persona.color} shadow-lg`}
                >
                  {persona.name.charAt(0)}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white font-serif">{persona.name}</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300">
                      {persona.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{persona.role}</p>
                  <p className="text-[11px] text-slate-400 leading-snug pt-1 italic font-sans">
                    „{persona.mantra}”
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. KONFRONTACJA ODPOWIEDZI W CZASIE RZECZYWISTYM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Lewa kolumna: Generyczny Bot Korporacyjny */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-950/85 backdrop-blur-xl border border-rose-500/30 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                <XCircle className="w-4 h-4" />
                <span>Generyczny model AI (np. ChatGPT / Claude)</span>
              </div>
              <span className="text-[10px] font-mono text-rose-400/80 bg-rose-950/60 px-2.5 py-0.5 rounded border border-rose-500/30">
                Brak uziemienia
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                Odpowiedź bez profilu właściciela:
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans italic">
                „{currentDilemma.genericReply}”
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-rose-500/20 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold block">
              Dlaczego ta odpowiedź szkodzi Twoim interesom:
            </span>
            <ul className="space-y-1.5 text-[11px] text-slate-300 font-sans">
              {currentDilemma.genericFlaws.map((flaw, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{flaw}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prawa kolumna: Uziemiona AlterJa */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-950/90 backdrop-blur-2xl border border-sky-400/60 shadow-[0_0_40px_rgba(56,189,248,0.14)] flex flex-col justify-between space-y-6 relative overflow-hidden">
          {/* Subtelny ambient glow w rogu karty */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between border-b border-sky-500/30 pb-3">
              <div className="flex items-center gap-2 text-sky-300 font-mono text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>AlterJa: {activePersona.name} ({activePersona.role})</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/40 animate-pulse">
                Uziemiona 100%
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-sky-300 tracking-wider font-semibold">
                  Autentyczna reakcja osoby:
                </span>
                {isTyping && (
                  <span className="text-[10px] font-mono text-sky-400 animate-pulse">
                    Synteza stylu...
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-white leading-relaxed font-sans font-medium">
                „{displayedReply}”
                {isTyping && <span className="inline-block w-1.5 h-3.5 bg-sky-400 ml-1 animate-pulse" />}
              </p>
            </div>

            {/* Klikalne plakietki uziemienia (Grounding Badges) */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold block">
                Dowody źródłowe (kliknij, aby sprawdzić uziemienie):
              </span>
              <div className="flex flex-wrap gap-2">
                {personaData.grounding.map((evidence) => {
                  const isActive = activeGroundingId === evidence.id;
                  return (
                    <button
                      key={evidence.id}
                      type="button"
                      onClick={() =>
                        setActiveGroundingId(isActive ? null : evidence.id)
                      }
                      className={`text-left px-3 py-1.5 rounded-xl text-[11px] font-mono transition-all duration-200 border flex items-center gap-2 ${
                        isActive
                          ? "bg-sky-500 text-slate-950 font-bold border-sky-300 shadow-md scale-105"
                          : "bg-slate-900/90 text-sky-300 border-sky-400/40 hover:border-sky-300 hover:bg-slate-800"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate max-w-[240px]">{evidence.sourceTitle}</span>
                      {isActive ? (
                        <ChevronUp className="w-3 h-3 shrink-0" />
                      ) : (
                        <ChevronDown className="w-3 h-3 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Rozwijany panel dowodowy (Grounding Evidence Inspector) */}
          {activeEvidence && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-sky-400/60 shadow-xl space-y-2.5 animate-in slide-in-from-top-3 duration-200 relative z-20">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-300">
                  <Quote className="w-3.5 h-3.5" />
                  <span>Dosłowny cytat źródłowy</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {activeEvidence.layer} · {activeEvidence.date}
                </span>
              </div>

              <blockquote className="text-xs text-white italic font-serif leading-relaxed border-l-2 border-sky-400 pl-3 py-0.5">
                {activeEvidence.verbatimQuote}
              </blockquote>

              <p className="text-[11px] text-slate-300 font-sans pt-1">
                <strong className="text-sky-300 font-mono">Uzasadnienie kognitywne:</strong>{" "}
                {activeEvidence.rationale}
              </p>
            </div>
          )}

          <div className="pt-3 border-t border-sky-500/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Gwarancja zero konfabulacji</span>
            </span>
            <span>AlterJa v1.0 · RLS Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
