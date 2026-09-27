import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  Search,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sekcja Hero */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-alterja-border">
        {/* Subtelne tło gradientowe */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-alterja-blue/15 via-alterja-purple/15 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-alterja-blue/10 border border-alterja-blue/30 text-alterja-blue text-xs font-medium mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cyfrowy model człowieka z pochodzeniem informacji</span>
            </div>

            <div className="relative w-48 h-16 mx-auto mb-6">
              <Image
                src="/alterja-logo.png"
                alt="AlterJa"
                fill
                className="object-contain"
                priority
              />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Twój kontrolowany model. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                Wiedza, styl i decyzje.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-normal">
              AlterJa tworzy rozwijający się cyfrowy model Twojej osoby: autobiograficznej pamięci,
              sposobu wypowiadania się, preferencji, wartości i wyborów. Każda odpowiedź ma
              wskazane źródło, a brak wiedzy jest otwarcie przyznawany.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-alterja-blue to-alterja-purple text-white font-medium shadow-xl shadow-alterja-blue/20 hover:opacity-95 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Otwórz pulpit demonstracyjny</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#demo"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-850 hover:text-white transition-colors flex items-center justify-center space-x-2"
              >
                <span>Zobacz, jak działa pamięć</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trzy filary wartości */}
      <section id="idea" className="py-20 bg-alterja-dark/40 border-b border-alterja-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Jeden model, trzy bezpieczne zastosowania
            </h2>
            <p className="text-slate-400">
              Ten sam, rzetelnie udokumentowany rdzeń tożsamości służy do codziennej pracy,
              integracji z narzędziami oraz zachowania spuścizny.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel rounded-2xl p-8 border border-alterja-border flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Prywatny asystent</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Zna Twój kontekst, projekty i preferencje. Pomaga formułować myśli, podejmować
                  decyzje i analizować argumenty bez konieczności ciągłego tłumaczenia sytuacji od
                  nowa.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-blue-400 font-medium">
                Tryby: Rekonstrukcja · Asystent · Krytyk
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-8 border border-alterja-border flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <Key className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Kontrolowane API</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Udostępniaj wybrane zdolności modelu (np. redagowanie tekstu w Twoim stylu)
                  zewnętrznym edytorom. Aplikacja do stylu nie otrzymuje dostępu do prywatnej
                  biografii.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-purple-400 font-medium">
                Granularne granty OAuth · RFC 9700
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-8 border border-alterja-border flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                  <Archive className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Cyfrowa spuścizna</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Domyślnie wyłączony moduł umożliwiający określenie woli po śmierci: od trwałego
                  usunięcia profilu po pasywne archiwum dla bliskich lub oznaczoną rekonstrukcję za
                  ich zgodą.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-amber-400 font-medium">
                Weryfikacja aktu zgonu · Zamrożony rdzeń
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demonstracja na fikcyjnym profilu: Jak działa pamięć */}
      <section id="demo" className="py-20 border-b border-alterja-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs uppercase tracking-wider text-alterja-blue font-semibold">
              Jawna weryfikacja epistemiczna
            </span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">
              Pamięć z dowodem pochodzenia, nie czarna skrzynka
            </h2>
            <p className="text-slate-400">
              Oto jak wygląda wpis pamięci w AlterJi na przykładzie fikcyjnego profilu testowego:
            </p>
          </div>

          <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium">
                  Warstwa: Wartości i priorytety
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Potwierdzona deklaracja</span>
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">ID: mem-01-val</span>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">
                Prymat rzetelności nad pośpiechem
              </h4>
              <p className="text-slate-200 text-base leading-relaxed">
                Właściciel preferuje dokładną weryfikację w źródłach pierwotnych i odrzuca
                podejmowanie decyzji pod presją czasu bez solidnych dowodów.
              </p>
            </div>

            {/* Karta dowodu pochodzenia */}
            <div className="rounded-xl bg-slate-900/90 border border-amber-500/30 p-4 sm:p-5 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
                  <Search className="w-3.5 h-3.5" />
                  <span>Dowód źródłowy (Grounding Citation)</span>
                </span>
                <span className="text-xs text-slate-400">Dokument: Dziennik zawodowy 2024</span>
              </div>
              <blockquote className="text-sm italic text-slate-300 pl-3 border-l-2 border-amber-400">
                „Wolę poświęcić dodatkowe dwa dni na weryfikację faktów w źródłach pierwotnych, niż
                wdrożyć niesprawdzone założenie pod presją czasu.”
              </blockquote>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>Status weryfikacji: 100% ugruntowany w autoryzowanym materiale</span>
              <span className="text-amber-400/90 font-medium">Zero halucynacji biograficznych</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bezpieczeństwo i RODO */}
      <section id="security" className="py-20 bg-alterja-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-6">
                <Lock className="w-3.5 h-3.5" />
                <span>Prywatność jako architektura (Privacy by Design)</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Twoja tożsamość nie staje się darmowym paliwem dla cudzych modeli
              </h2>
              <ul className="space-y-4 text-slate-300 text-sm">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Deterministyczna kontrola w bazie:</strong> Uprawnienia są egzekwowane
                    przez PostgreSQL Row Level Security (RLS), a nie przez zawodne prompty językowe.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Brak sekretów w interfejsie:</strong> Klucze administracyjne bazy nigdy
                    nie trafiają do przeglądarki użytkownika.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Prawdziwe prawo do bycia zapomnianym:</strong> Usunięcie faktu trwale
                    kasuje rekord, cytaty i indeks wektorowy bez pozostawiania kopii w pamięci
                    podręcznej.
                  </span>
                </li>
              </ul>

              <div className="mt-8">
                <Link
                  href="/privacy"
                  className="text-sm text-alterja-blue hover:text-blue-300 font-medium inline-flex items-center space-x-1"
                >
                  <span>Sprawdź centrum prywatności i zarządzanie zgodami</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-8 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Siedem odseparowanych warstw modelu
              </h3>
              <div className="space-y-2.5 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-blue-400">1. Biografia i zdarzenia</span>
                  <span className="text-slate-400">Fakty chronologiczne</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-indigo-400">2. Wiedza i doświadczenie</span>
                  <span className="text-slate-400">Kompetencje domenowe</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-purple-400">3. Styl komunikacji</span>
                  <span className="text-slate-400">Leksyka, rytm, składnia</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-amber-400">4. Preferencje codzienne</span>
                  <span className="text-slate-400">Wybory i nawyki</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-emerald-400">5. Wartości i priorytety</span>
                  <span className="text-slate-400">Zasady nienaruszalne</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-cyan-400">6. Przypadki decyzyjne</span>
                  <span className="text-slate-400">Wybory z uzasadnieniem</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-rose-400">7. Kontekst sytuacyjny</span>
                  <span className="text-slate-400">Okoliczności i role</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
