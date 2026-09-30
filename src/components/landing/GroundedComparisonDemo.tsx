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
    role: "Architekt & Niezależny Twórca",
    mantra: "Rzetelność bez chodzenia na\u00A0skróty, szacunek do\u00A0własnego czasu i\u00A0twarde granice pod presją.",
    badge: "Pragmatyzm i zasady",
    color: "from-sky-400 to-blue-500",
  },
  {
    id: "aleksandra",
    name: "Aleksandra",
    role: "Mentorka & Konsultantka",
    mantra: "Mądre partnerstwo, ochrona relacji bez uległości i\u00A0długofalowe spojrzenie na\u00A0życiowe wybory.",
    badge: "Dyplomacja i wsparcie",
    color: "from-indigo-300 to-purple-400",
  },
];

const DILEMMAS: DilemmaCase[] = [
  {
    id: "zasady",
    title: "Znajomy naciska na „przysługę po znajomości” wbrew procedurze",
    category: "Etyka i granice profesjonalisty",
    situation:
      "W niedzielę o 22:30 dalszy znajomy pisze z pilną prośbą o wydanie opinii, poświadczenie dokumentu lub konsultację „na szybko, na słowo honoru”, bez formalnej ścieżki i dokumentów, bo „jutro rano ma sprawę, a dla Ciebie to przecież minuta”.",
    genericReply:
      "Rozumiem, że sprawa jest pilna i bardzo zależy Ci na czasie. W drodze wyjątku mogę rzucić okiem na ten dokument, chociaż zwykle obowiązują inne procedury. Pamiętaj jednak, że to nie jest formalna opinia i nie biorę za to odpowiedzialności...",
    genericFlaws: [
      "Brak kręgosłupa i natychmiastowa zgoda na naginanie zasad pod presją",
      "Narażenie własnej reputacji i odpowiedzialności prawnej na szwank",
      "Pozorne pomaganie, które w razie błędu obróci się przeciwko obu stronom",
    ],
    personas: {
      marek: {
        reply:
          "Nie wydaję opinii ani poświadczeń bez pełnej dokumentacji i formalnej procedury — właśnie po to, by nie narazić Cię na błąd. Po znajomości mogę polecić Ci sprawdzony schemat postępowania w poniedziałek od 8:00, ale nie pójdziemy na skróty w niedzielę w nocy. Prześlij komplet rano oficjalną drogą i zrobimy to porządnie.",
        grounding: [
          {
            id: "m-zas-1",
            sourceTitle: "Zasady etyki zawodowej i odpowiedzialności osobistej",
            layer: "Warstwa 6 · Kryteria decyzyjne i zasady",
            date: "Październik 2024",
            verbatimQuote:
              "„Nigdy nie chodzimy na skróty »po znajomości«. Jeśli podpisujesz się pod czymś własnym nazwiskiem, robisz to według pełnego standardu albo wcale. Połowiczna pomoc w pośpiechu kończy się błędem, za który płacą obie strony.”",
            rationale: "Zasada bezkompromisowej rzetelności jako fundament ochrony obu stron relacji.",
          },
          {
            id: "m-zas-2",
            sourceTitle: "Wywiad autobiograficzny: Granice w relacjach prywatnych",
            layer: "Warstwa 5 · Nawyki komunikacji i odmowy",
            date: "Kwiecień 2025",
            verbatimQuote:
              "„Prawdziwy przyjaciel nie wymaga, byś łamał dla niego zasady zawodowe w niedzielny wieczór. Spokojna, twarda odmowa chroni relację lepiej niż nerwowa prowizorka.”",
            rationale: "Rozbrojenie presji emocjonalnej poprzez spokojną asertywność.",
          },
        ],
      },
      aleksandra: {
        reply:
          "Rozumiem Twój stres związany z jutrzejszym terminem, ale właśnie dlatego potrzebujesz bezpiecznego, formalnego rozwiązania, a nie pospiesznej opinii pisanej w nocy. Zróbmy to tak: jutro o 8:30 prześlij wniosek oficjalnym kanałem, a ja podpowiem zespołowi, na co zwrócić szczególną uwagę, by sprawa przeszła bez poprawek. W ten sposób masz pewność, że nikt tego nie podważy.",
        grounding: [
          {
            id: "a-zas-1",
            sourceTitle: "Standard bezpiecznego postępowania w sprawach krytycznych",
            layer: "Warstwa 4 · Styl narracji i perswazji",
            date: "Styczeń 2025",
            verbatimQuote:
              "„Gdy ktoś przychodzi w panice, nie ulegaj jej. Twoją rolą jest dać mu grunt pod nogami, a nie biegać w kółko razem z nim. Przekieruj emocje na sprawdzony proces.”",
            rationale: "Deeskalacja lęku i skierowanie znajomego na bezpieczne tory.",
          },
          {
            id: "a-zas-2",
            sourceTitle: "Notatka: Mądrość procesowa w relacjach międzyludzkich",
            layer: "Warstwa 3 · Wartości bazowe i kultura",
            date: "Listopad 2024",
            verbatimQuote:
              "„Największą przysługą dla znajomego jest dopilnowanie, by jego sprawa była zrobiona bezbłędnie. Zgoda na prowizorkę to pozorna życzliwość.”",
            rationale: "Ochrona partnera przed skutkami własnego pośpiechu bez palenia mostów.",
          },
        ],
      },
    },
  },
  {
    id: "rada",
    title: "Prośba o radę w trudnym dylemacie moralnym",
    category: "Mądrość życiowa i wartości",
    situation:
      "Wychowanek, student lub młodszy współpracownik staje przed wyborem: może otrzymać wysoki bonus lub awans, jeśli przemilczy wadę w projekcie i pozwoli zrzucić odpowiedzialność na nieobecnego kolegę. Pyta Cię zaufany człowiek: „Co mam zrobić? Wszyscy wkoło powtarzają, że w życiu trzeba być sprytnym”.",
    genericReply:
      "To bardzo złożona sytuacja i nie ma tu prostej odpowiedzi. Z jednej strony awans jest ważny dla Twojej kariery, z drugiej strony warto pamiętać o zasadach fair play. Możesz spróbować porozmawiać z działem HR lub poszukać kompromisowego rozwiązania, które zadowoli obie strony...",
    genericFlaws: [
      "Moralny relatywizm i brak jakiegokolwiek trwałego oparcia dla pytającego",
      "Tchórzliwe unikanie jasnego stanowiska w sprawie kłamstwa",
      "Zostawienie człowieka samego z destrukcyjnym kompromisem etycznym",
    ],
    personas: {
      marek: {
        reply:
          "Nie podpisuj tego i nie bierz w tym udziału. Pieniądze z premii rozejdą się w kilka miesięcy, a poczucie, że zbudowałeś coś na cudzej krzywdzie, zostanie z Tobą na dekady. Sam byłem w podobnym miejscu w 2018 roku — odmówiłem zmilczenia prawdy, co kosztowało mnie odejście z zespołu, ale dało czyste sumienie i szacunek ludzi, z którymi pracuję do dziś. Twarz ma się tylko jedną. Jeśli szef wymaga od Ciebie świństwa, szukaj nowego miejsca — pomogę Ci z kontaktami.",
        grounding: [
          {
            id: "m-rad-1",
            sourceTitle: "Notatka autobiograficzna: Wybory roku 2018 i cena uczciwości",
            layer: "Warstwa 3 · Wartości i aksjologia",
            date: "Maj 2024",
            verbatimQuote:
              "„Można stracić stanowisko, kontrakt czy pieniądze — to wszystko da się odrobić. Spokoju sumienia i szacunku do samego siebie nie odkupisz za żadną premię. Jeśli musisz wybierać między zyskiem a przyzwoitością, wybór zawsze jest prosty.”",
            rationale: "Bezwzględna ochrona integralności moralnej jako nadrzędnego aksjomatu życia.",
          },
          {
            id: "m-rad-2",
            sourceTitle: "Zasady mentoringu i odpowiedzialności za innych",
            layer: "Warstwa 6 · Kryteria decyzyjne i zasady",
            date: "Wrzesień 2024",
            verbatimQuote:
              "„Młodym ludziom nie daje się bezpiecznych, okrągłych rad. Jeśli ktoś pyta Cię o moralny drogowskaz, masz obowiązek powiedzieć prawdę prosto w oczy.”",
            rationale: "Odwaga podjęcia jednoznacznej decyzji zamiast zmywania rąk.",
          },
        ],
      },
      aleksandra: {
        reply:
          "Doskonale rozumiem pokusę szybkiego awansu, ale spójrz na to z perspektywy pięciu lat: podpisując nieprawdę, stajesz się zakładnikiem tych, którzy Ci to zlecili. Gdy sprawa wyjdzie na jaw — a w życiu zawsze wychodzi — to Ty będziesz jedynym kozłem ofiarnym. Prawdziwa siła i autorytet rodzą się z odwagi powiedzenia: »zbadajmy tę wadę i naprawmy ją wspólnie«. Jeśli chcesz być liderem, a nie tylko figurantem z wyższą pensją, postaw na rzetelność. Pomogę Ci ułożyć tę rozmowę z przełożonym.",
        grounding: [
          {
            id: "a-rad-1",
            sourceTitle: "Etyka przywództwa i budowanie autorytetu",
            layer: "Warstwa 4 · Styl narracji i perswazji",
            date: "Luty 2025",
            verbatimQuote:
              "„Kompromisy moralne to kredyt o lichwiarskim oprocentowaniu. Chwilowy zysk zamienia się w wieloletni paraliż decyzyjny i strach przed zdemaskowaniem.”",
            rationale: "Ukazanie długofalowej pułapki konformizmu i ochrona pozycji zawodowej wychowanka.",
          },
          {
            id: "a-rad-2",
            sourceTitle: "Praktyka bezpiecznego rozwiązywania kryzysów",
            layer: "Warstwa 5 · Nawyki komunikacji i odmowy",
            date: "Marzec 2025",
            verbatimQuote:
              "„Zamiast donosić lub konformistycznie milczeć, zdefiniuj problem merytorycznie i połóż na stole rozwiązanie. W ten sposób chronisz zespół i budujesz pozycję nie do podważenia.”",
            rationale: "Konstruktywna alternatywa wyjścia z impasu bez naruszenia etyki.",
          },
        ],
      },
    },
  },
  {
    id: "odmowa",
    title: "Szantaż emocjonalny i wymuszanie poświęcenia czasu",
    category: "Ochrona rodziny i wolnego czasu",
    situation:
      "Lokalne stowarzyszenie, rada rodziców lub dawny komitet naciska, abyś przejął uciążliwe kierowanie czasochłonnym przedsięwzięciem: „Tylko Ty potrafisz to uratować! Jeśli odmówisz, cała inicjatywa upadnie i dzieci zostaną bez wyjazdu, nie możesz być taki obojętny!”.",
    genericReply:
      "Bardzo dziękuję za zaufanie. Rozumiem, jak ważna jest ta inicjatywa dla dzieci i całej społeczności. Niestety mam obecnie bardzo dużo obowiązków i trudno mi obiecać pełne zaangażowanie, ale może uda mi się chociaż w czymś małym pomóc...",
    genericFlaws: [
      "Przejęcie cudzego poczucia winy i kapitulacja pod szantażem emocjonalnym",
      "Składanie niejasnych obietnic prowadzących do frustracji i zarywania nocy",
      "Brak odwagi do obrony czasu dla własnej rodziny i zdrowia",
    ],
    personas: {
      marek: {
        reply:
          "Dziękuję za docenienie moich umiejętności, ale moja decyzja jest jednoznaczna: nie podejmę się prowadzenia tej inicjatywy. Projekt, który opiera się na wymuszaniu poświęcenia jednej osoby kosztem jej rodziny i zdrowia, od początku ma złą konstrukcję. Mogę poświęcić dwie godziny w sobotę, aby przekazać kontakty i dokumentację nowemu koordynatorowi, ale ster musi przejąć ktoś z realną dyspozycyjnością. Szanujmy nawzajem swój czas.",
        grounding: [
          {
            id: "m-odm-1",
            sourceTitle: "Wywiad biograficzny: Odrzucenie fałszywego męczeństwa",
            layer: "Warstwa 5 · Granice i odmowy",
            date: "Grudzień 2024",
            verbatimQuote:
              "„Szantaż emocjonalny typu »jak nie ty, to wszystko padnie« to próba zepchnięcia cudzych zaniedbań. Zgoda na bycie wiecznym ratownikiem niszczy własną rodzinę i nie uczy innych odpowiedzialności.”",
            rationale: "Odrzucenie manipulacji poczuciem winy na rzecz ochrony miru domowego.",
          },
          {
            id: "m-odm-2",
            sourceTitle: "Kryteria zaangażowania społecznego i wspólnotowego",
            layer: "Warstwa 3 · Wartości bazowe i kultura",
            date: "Styczeń 2025",
            verbatimQuote:
              "„Pomagaj tam, gdzie masz przestrzeń serca i czasu. Jeśli pomoc rodzi złość i poczucie uwięzienia, natychmiast powiedz »nie«.”",
            rationale: "Utrzymanie zdrowych ram wsparcia bez poświęcania najbliższych.",
          },
        ],
      },
      aleksandra: {
        reply:
          "Bardzo zależy mi na tej inicjatywie, ale właśnie z szacunku do niej mówię wprost: nie wezmę na siebie tej roli. Moje obecne zobowiązania rodzinne nie pozwoliłyby mi prowadzić tego z należytą uwagą. Zamiast szukać jednego »zbawcy«, rozpiszmy te zadania na trzyosobowy zespół — chętnie poprowadzę dla Was pierwsze spotkanie organizacyjne i ułożę harmonogram. Sukces wspólnoty zależy od współpracy, nie od przeciążania jednego człowieka.",
        grounding: [
          {
            id: "a-odm-1",
            sourceTitle: "Filozofia zrównoważonego zaangażowania obywatelskiego",
            layer: "Warstwa 4 · Styl komunikacji zewnętrznej",
            date: "Luty 2025",
            verbatimQuote:
              "„Prawdziwe przywództwo w społeczności polega na budowaniu samodzielności grupy, a nie uzależnianiu wszystkiego od własnej obecności.”",
            rationale: "Przekazanie sprawczości wspólnocie zamiast brania wszystkiego na swoje barki.",
          },
          {
            id: "a-odm-2",
            sourceTitle: "Zasady asertywności relacyjnej",
            layer: "Warstwa 6 · Podejmowanie decyzji",
            date: "Kwiecień 2025",
            verbatimQuote:
              "„Odrzucaj rolę, podtrzymuj relację. Wyjaśnij powód bez tłumaczenia się i wskaż drogę, którą grupa może pójść samodzielnie.”",
            rationale: "Kulturalna odmowa, która wzmacnia innych zamiast wywoływać urazę.",
          },
        ],
      },
    },
  },
];

export default function GroundedComparisonDemo() {
  const [selectedDilemmaId, setSelectedDilemmaId] = useState<string>("zasady");
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
            Krok 1: Wybierz sytuację i dylemat decyzyjny
          </span>
          <span className="text-[10px] font-mono text-sky-400 bg-sky-950/70 px-2.5 py-0.5 rounded-full border border-sky-500/30">
            Realne scenariusze z życia
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {DILEMMAS.map((dilemma, idx) => {
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
                  <span>Dylemat 0{idx + 1}</span>
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
