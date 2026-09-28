"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import { store } from "@/lib/db/store";
import { LegacyDirective } from "@/domains/types";
import {
  Landmark,
  ShieldAlert,
  HeartHandshake,
  UserCheck,
  Clock,
  FileCheck2,
  AlertCircle,
  Save,
  Check,
  Sparkles,
} from "lucide-react";

export default function LegacyPage() {
  const profile = store.getProfile();
  const [directive, setDirective] = useState<LegacyDirective>(store.getLegacyDirective());
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateLegacyDirective({
      mode: directive.mode,
      trusted_contact_email: directive.trusted_contact_email,
      inactivity_period_days: directive.inactivity_period_days,
      require_death_certificate: directive.require_death_certificate,
      posthumous_intro_message: directive.posthumous_intro_message,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const statusMap = {
    dormant: {
      label: "Dyspozycja aktywna za życia",
      desc: "Konto działa w pełnym trybie poznawczym. Protokół uśpiony.",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    },
    verification_pending: {
      label: "Weryfikacja zgłoszenia w toku",
      desc: "Trwa 30-dniowy okres karencji i sprawdzanie aktu zgonu z USC.",
      badge: "bg-amber-500/20 text-amber-300 border-amber-400/40",
    },
    active: {
      label: "Protokół pośmiertny aktywowany",
      desc: "Rdzeń pamięci został zamrożony. Dostęp dla wyznaczonych opiekunów.",
      badge: "bg-purple-500/20 text-purple-300 border-purple-400/40",
    },
    completed: {
      label: "Procedura zakończona",
      desc: "Wszystkie dyspozycje zostały w pełni zrealizowane.",
      badge: "bg-slate-500/20 text-slate-300 border-slate-400/40",
    },
  };

  const currentStatus = statusMap[directive.status] || statusMap.dormant;

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-accent/15 selection:text-alterja-accent">
      <Navbar />

      {/* PEŁNOFORMATOWA KINOWA SCENA FOTOGRAFICZNA (LINEAGE-LEGACY) */}
      <section className="relative w-full min-h-[400px] md:min-h-[460px] flex items-center overflow-hidden bg-slate-950">
        <Image
          src="/images/lineage-legacy.jpg"
          alt="Wielopokoleniowe przekazanie wiedzy i pamięci AlterJa"
          fill
          priority
          className="object-cover object-center scale-[1.02] filter brightness-90 contrast-105"
        />

        {/* Dynamiczny skaner biometryczny */}
        <div className="absolute inset-0 scanline-bar opacity-30 pointer-events-none" />

        {/* Kurtyna asymetryczna */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/20 text-purple-300 text-xs font-mono backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>Cyfrowa spuścizna · Oświadczenie woli za życia</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white editorial-display leading-tight">
              Cyfrowa spuścizna i nieśmiertelna wiedza
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-xl">
              Zachowaj swoje życiowe dzieło, wiedzę, wartości i autentyczny głos dla bliskich. Ty decydujesz, kto, kiedy i na jakich zasadach ma dostęp do Twojego archiwum.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-mono backdrop-blur-xl shadow-xl ${currentStatus.badge}`}>
              <Clock className="w-3.5 h-3.5" />
              {currentStatus.label}
            </span>
          </div>
        </div>
      </section>

      {/* OBSZAR ROBOCZY */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 relative z-20 -mt-10 sm:-mt-12">
        {/* Pouczenie etyczne w luksusowej karcie */}
        <div className="p-5 rounded-3xl bg-amber-50/90 border border-amber-200/90 shadow-md flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-800 space-y-1 font-sans">
            <p className="font-semibold text-slate-950 text-sm">Etyczne zasady cyfrowej spuścizny w AlterJa:</p>
            <p className="text-slate-700 leading-relaxed">
              System nigdy nie symuluje, że zmarły „żyje dalej w chmurze”. W przypadku aktywacji protokołu memorialnego każda odpowiedź jest jawnie oznaczona jako syntetyczna rekonstrukcja oparta na zamrożonych źródłach, a model ma bezwzględny zakaz wypowiadania się o wydarzeniach po dacie odejścia.
            </p>
          </div>
        </div>

        {/* Formularz konfiguracji dyspozycji */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Wybór trybu pośmiertnego */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl space-y-4">
            <h2 className="text-xl font-serif font-medium text-slate-950 editorial-display">
              1. Wybór trybu postępowania z tożsamością
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  directive.mode === "archive_only"
                    ? "bg-blue-50/70 border-alterja-blue ring-2 ring-alterja-blue shadow-md"
                    : "bg-slate-50/70 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Tylko archiwum pamiątek</span>
                    <input
                      type="radio"
                      name="mode"
                      value="archive_only"
                      checked={directive.mode === "archive_only"}
                      onChange={() => setDirective({ ...directive, mode: "archive_only" })}
                      className="sr-only"
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Bliscy otrzymują dostęp wyłącznie do autentycznych notatek, nagrań i dokumentów źródłowych. Generowanie nowych odpowiedzi zostaje całkowicie zablokowane.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-emerald-700 font-semibold">Rekomendowane dla pełnej autentyczności</div>
              </label>

              <label
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  directive.mode === "interactive_memorial"
                    ? "bg-purple-50/70 border-purple-600 ring-2 ring-purple-600 shadow-md"
                    : "bg-slate-50/70 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Interaktywny memoriał</span>
                    <input
                      type="radio"
                      name="mode"
                      value="interactive_memorial"
                      checked={directive.mode === "interactive_memorial"}
                      onChange={() => setDirective({ ...directive, mode: "interactive_memorial" })}
                      className="sr-only"
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Bliscy mogą zadawać pytania modelowi rekonstrukcyjnemu z zamrożonym rdzeniem pamięci. Model odpowiada z cytowaniem źródeł, bez konfabulacji.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-purple-700 font-semibold">Wymaga aktywnej zgody za życia</div>
              </label>

              <label
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  directive.mode === "total_erasure"
                    ? "bg-rose-50/70 border-rose-600 ring-2 ring-rose-600 shadow-md"
                    : "bg-slate-50/70 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Całkowite usunięcie</span>
                    <input
                      type="radio"
                      name="mode"
                      value="total_erasure"
                      checked={directive.mode === "total_erasure"}
                      onChange={() => setDirective({ ...directive, mode: "total_erasure" })}
                      className="sr-only"
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Po potwierdzeniu zgonu wszystkie zasoby tożsamości cyfrowej zostają nieodwracalnie skasowane (kryptograficzne niszczenie kluczy).
                  </p>
                </div>
                <div className="text-[11px] font-mono text-rose-700 font-semibold">Nieodwracalne zniszczenie danych</div>
              </label>
            </div>
          </div>

          {/* Opiekun zaufany i weryfikacja */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl space-y-4">
            <h2 className="text-xl font-serif font-medium text-slate-950 editorial-display">
              2. Opiekun zaufany i protokół weryfikacji
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1.5 flex items-center gap-1.5 font-medium">
                  <UserCheck className="w-3.5 h-3.5 text-alterja-blue" />
                  Adres e-mail zaufanego opiekuna
                </label>
                <input
                  type="email"
                  required
                  value={directive.trusted_contact_email}
                  onChange={(e) => setDirective({ ...directive, trusted_contact_email: e.target.value })}
                  placeholder="np. zaufany.bliski@domena.pl"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue shadow-inner"
                />
                <p className="text-[11px] text-slate-500 mt-1">Osoba ta będzie uprawniona do zgłoszenia zdarzenia oraz uwierzytelnienia dokumentów.</p>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1.5 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  Próg braku aktywności (w dniach)
                </label>
                <select
                  value={directive.inactivity_period_days}
                  onChange={(e) => setDirective({ ...directive, inactivity_period_days: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-alterja-blue shadow-inner"
                >
                  <option value={90}>90 dni (3 miesiące braku logowania)</option>
                  <option value={180}>180 dni (6 miesięcy braku logowania)</option>
                  <option value={365}>365 dni (1 rok braku logowania)</option>
                  <option value={730}>730 dni (2 lata braku logowania)</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1">Po tym czasie wyślemy prośbę o potwierdzenie aktywności przed kontaktem z opiekunem.</p>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  checked={directive.require_death_certificate}
                  onChange={(e) => setDirective({ ...directive, require_death_certificate: e.target.checked })}
                  className="mt-0.5 rounded text-alterja-blue"
                />
                <div>
                  <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                    Wymóg urzędowego aktu zgonu (USC) oraz 30-dniowa karencja
                  </span>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Bezwzględny wymóg dostarczenia oficjalnego odpisu aktu zgonu z Urzędu Stanu Cywilnego. W okresie karencji na Twój adres e-mail i numer telefonu wysyłane są powiadomienia z możliwością natychmiastowego anulowania procedury.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Wiadomość wprowadzająca dla bliskich */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl space-y-4">
            <h2 className="text-xl font-serif font-medium text-slate-950 editorial-display">
              3. Osobiste słowo wstępne dla bliskich
            </h2>
            <p className="text-xs text-slate-600">
              Tekst, który zostanie wyświetlony opiekunowi i uprawnionym osobom przy otwarciu memoriału lub archiwum.
            </p>
            <textarea
              rows={4}
              value={directive.posthumous_intro_message || ""}
              onChange={(e) => setDirective({ ...directive, posthumous_intro_message: e.target.value })}
              placeholder="Zostawiam to archiwum z myślą o Was. Znajdziecie tu moje myśli, spisane wspomnienia i podejście do życia..."
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue font-sans leading-relaxed shadow-inner"
            />
          </div>

          {/* Zapisanie dyspozycji */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Dyspozycja może być zmieniona lub unieważniona w każdej chwili za Twojego życia.</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-xs font-medium text-white shadow-md transition-all active:scale-95"
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
              <span>{isSaved ? "Zapisano dyspozycję" : "Zapisz dyspozycję pośmiertną"}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
