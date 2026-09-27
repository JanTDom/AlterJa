"use client";

import { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import { store } from "@/lib/db/store";
import { LegacyDirective } from "@/domains/types";
import { Landmark, ShieldAlert, HeartHandshake, UserCheck, Clock, FileCheck2, AlertCircle, Save, Check } from "lucide-react";

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
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    verification_pending: {
      label: "Weryfikacja zgłoszenia w toku",
      desc: "Trwa 30-dniowy okres karencji i sprawdzanie aktu zgonu z USC.",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    active: {
      label: "Protokół pośmiertny aktywowany",
      desc: "Rdzeń pamięci został zamrożony. Dostęp dla wyznaczonych opiekunów.",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
    completed: {
      label: "Procedura zakończona",
      desc: "Wszystkie dyspozycje zostały w pełni zrealizowane.",
      badge: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    },
  };

  const currentStatus = statusMap[directive.status] || statusMap.dormant;

  return (
    <div className="min-h-screen bg-alter-dark text-slate-100 flex flex-col selection:bg-alter-blue/30 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Nagłówek */}
        <div className="border-b border-alter-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Landmark className="w-3.5 h-3.5" />
              Cyfrowa spuścizna i protokół pośmiertny
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">Dyspozycja cyfrowa</h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Ustalenie woli za życia w kwestii zachowania tożsamości cyfrowej, dostępu dla bliskich oraz ochrony przed fałszowaniem pamięci po śmierci.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono ${currentStatus.badge}`}>
              <Clock className="w-3.5 h-3.5" />
              {currentStatus.label}
            </span>
          </div>
        </div>

        {/* Ważne pouczenie etyczne i prawne */}
        <div className="p-4 rounded-xl bg-alter-card border border-alter-border/80 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 space-y-1">
            <p className="font-medium text-white">Etyczne zasady cyfrowej spuścizny w AlterJa:</p>
            <p className="text-slate-400 leading-relaxed">
              System nigdy nie symuluje, że zmarły „żyje dalej w chmurze”. W przypadku aktywacji protokołu memorialnego każda odpowiedź jest jawnie oznaczona jako syntetyczna rekonstrukcja oparta na zamrożonych źródłach, a model ma bezwzględny zakaz wypowiadania się o wydarzeniach mających miejsce po dacie śmierci.
            </p>
          </div>
        </div>

        {/* Formularz konfiguracji dyspozycji */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Wybór trybu pośmiertnego */}
          <div className="p-6 rounded-2xl bg-alter-card border border-alter-border space-y-4">
            <h2 className="text-base font-medium text-white tracking-tight">1. Wybór trybu postępowania z tożsamością</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  directive.mode === "archive_only"
                    ? "bg-slate-800/60 border-alter-blue ring-1 ring-alter-blue"
                    : "bg-alter-dark/40 border-alter-border hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Tylko archiwum pamiątek</span>
                    <input
                      type="radio"
                      name="mode"
                      value="archive_only"
                      checked={directive.mode === "archive_only"}
                      onChange={() => setDirective({ ...directive, mode: "archive_only" })}
                      className="sr-only"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Bliscy otrzymują dostęp wyłącznie do autentycznych notatek, nagrań i dokumentów źródłowych. Generowanie nowych odpowiedzi przez model AI zostaje całkowicie zablokowane.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-emerald-400">Rekomendowane dla pełnej autentyczności</div>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  directive.mode === "interactive_memorial"
                    ? "bg-slate-800/60 border-alter-blue ring-1 ring-alter-blue"
                    : "bg-alter-dark/40 border-alter-border hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Interaktywny memoriał</span>
                    <input
                      type="radio"
                      name="mode"
                      value="interactive_memorial"
                      checked={directive.mode === "interactive_memorial"}
                      onChange={() => setDirective({ ...directive, mode: "interactive_memorial" })}
                      className="sr-only"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Bliscy mogą zadawać pytania modelowi rekonstrukcyjnemu z zamrożonym rdzeniem pamięci. Model odpowiada z cytowaniem źródeł, bez konfabulacji i bez prawa do uczenia się.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-purple-400">Wymaga aktywnej zgody za życia</div>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  directive.mode === "total_erasure"
                    ? "bg-slate-800/60 border-alter-blue ring-1 ring-alter-blue"
                    : "bg-alter-dark/40 border-alter-border hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Całkowite usunięcie</span>
                    <input
                      type="radio"
                      name="mode"
                      value="total_erasure"
                      checked={directive.mode === "total_erasure"}
                      onChange={() => setDirective({ ...directive, mode: "total_erasure" })}
                      className="sr-only"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Po potwierdzeniu zgonu wszystkie zasoby tożsamości cyfrowej zostają nieodwracalnie skasowane (kryptograficzne niszczenie kluczy szyfrujących i rekordów w bazie).
                  </p>
                </div>
                <div className="text-[11px] font-mono text-rose-400">Nieodwracalne zniszczenie danych</div>
              </label>
            </div>
          </div>

          {/* Opiekun zaufany i weryfikacja */}
          <div className="p-6 rounded-2xl bg-alter-card border border-alter-border space-y-4">
            <h2 className="text-base font-medium text-white tracking-tight">2. Opiekun zaufany i protokół weryfikacji</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-alter-blue" />
                  Adres e-mail zaufanego opiekuna
                </label>
                <input
                  type="email"
                  required
                  value={directive.trusted_contact_email}
                  onChange={(e) => setDirective({ ...directive, trusted_contact_email: e.target.value })}
                  placeholder="np. zaufany.bliski@domena.pl"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-alter-dark border border-alter-border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-alter-blue"
                />
                <p className="text-[11px] text-slate-400 mt-1">Osoba ta będzie uprawniona do zgłoszenia zdarzenia oraz uwierzytelnienia dokumentów.</p>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  Próg braku aktywności (w dniach)
                </label>
                <select
                  value={directive.inactivity_period_days}
                  onChange={(e) => setDirective({ ...directive, inactivity_period_days: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-alter-dark border border-alter-border text-xs text-white focus:outline-none focus:border-alter-blue"
                >
                  <option value={90}>90 dni (3 miesiące braku logowania)</option>
                  <option value={180}>180 dni (6 miesięcy braku logowania)</option>
                  <option value={365}>365 dni (1 rok braku logowania)</option>
                  <option value={730}>730 dni (2 lata braku logowania)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">Po tym czasie wyślemy prośbę o potwierdzenie aktywności przed kontaktem z opiekunem.</p>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={directive.require_death_certificate}
                  onChange={(e) => setDirective({ ...directive, require_death_certificate: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-alter-border bg-alter-dark text-alter-blue focus:ring-alter-blue"
                />
                <div>
                  <span className="text-xs font-medium text-white flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                    Wymóg urzędowego aktu zgonu (USC) oraz 30-dniowa karencja
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Bezwzględny wymóg dostarczenia oficjalnego odpisu aktu zgonu z Urzędu Stanu Cywilnego. W okresie karencji na Twój adres e-mail i numer telefonu wysyłane są powiadomienia z możliwością natychmiastowego anulowania procedury jednym kliknięciem.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Wiadomość wprowadzająca dla bliskich */}
          <div className="p-6 rounded-2xl bg-alter-card border border-alter-border space-y-4">
            <h2 className="text-base font-medium text-white tracking-tight">3. Osobiste słowo wstępne dla bliskich</h2>
            <p className="text-xs text-slate-400">
              Tekst, który zostanie wyświetlony opiekunowi i uprawnionym osobom przy pierwszym otwarciu memoriału lub archiwum.
            </p>
            <textarea
              rows={4}
              value={directive.posthumous_intro_message || ""}
              onChange={(e) => setDirective({ ...directive, posthumous_intro_message: e.target.value })}
              placeholder="Zostawiam to archiwum z myślą o Was. Znajdziecie tu moje myśli, spisane wspomnienia i podejście do życia..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-alter-dark border border-alter-border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-alter-blue font-mono leading-relaxed"
            />
          </div>

          {/* Zapisanie dyspozycji */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              Dyspozycja może być zmieniona lub unieważniona w każdej chwili za Twojego życia.
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-alter-blue hover:bg-blue-600 text-xs font-medium text-white transition-colors"
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
              {isSaved ? "Zapisano dyspozycję" : "Zapisz dyspozycję pośmiertną"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
