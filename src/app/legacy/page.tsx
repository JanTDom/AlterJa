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
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    verification_pending: {
      label: "Weryfikacja zgłoszenia w toku",
      desc: "Trwa 30-dniowy okres karencji i sprawdzanie aktu zgonu z USC.",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
    },
    active: {
      label: "Protokół pośmiertny aktywowany",
      desc: "Rdzeń pamięci został zamrożony. Dostęp dla wyznaczonych opiekunów.",
      badge: "bg-purple-50 text-purple-700 border-purple-200",
    },
    completed: {
      label: "Procedura zakończona",
      desc: "Wszystkie dyspozycje zostały w pełni zrealizowane.",
      badge: "bg-slate-100 text-slate-700 border-slate-200",
    },
  };

  const currentStatus = statusMap[directive.status] || statusMap.dormant;

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col selection:bg-alterja-accent/15 selection:text-alterja-accent">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Nagłówek */}
        <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono uppercase tracking-wider mb-2">
              <Landmark className="w-3.5 h-3.5" />
              Cyfrowa spuścizna i protokół pośmiertny
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-slate-900">Dyspozycja cyfrowa</h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
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
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-800 space-y-1">
            <p className="font-semibold text-slate-900">Etyczne zasady cyfrowej spuścizny w AlterJa:</p>
            <p className="text-slate-600 leading-relaxed">
              System nigdy nie symuluje, że zmarły „żyje dalej w chmurze”. W przypadku aktywacji protokołu memorialnego każda odpowiedź jest jawnie oznaczona jako syntetyczna rekonstrukcja oparta na zamrożonych źródłach, a model ma bezwzględny zakaz wypowiadania się o wydarzeniach mających miejsce po dacie śmierci.
            </p>
          </div>
        </div>

        {/* Formularz konfiguracji dyspozycji */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Wybór trybu pośmiertnego */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
            <h2 className="text-base font-serif font-medium text-slate-900 tracking-tight">1. Wybór trybu postępowania z tożsamością</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  directive.mode === "archive_only"
                    ? "bg-blue-50/40 border-alterja-accent ring-1 ring-alterja-accent shadow-sm"
                    : "bg-slate-50/50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">Tylko archiwum pamiątek</span>
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
                    Bliscy otrzymują dostęp wyłącznie do autentycznych notatek, nagrań i dokumentów źródłowych. Generowanie nowych odpowiedzi przez model AI zostaje całkowicie zablokowane.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-emerald-700 font-medium">Rekomendowane dla pełnej autentyczności</div>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  directive.mode === "interactive_memorial"
                    ? "bg-purple-50/40 border-purple-600 ring-1 ring-purple-600 shadow-sm"
                    : "bg-slate-50/50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">Interaktywny memoriał</span>
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
                    Bliscy mogą zadawać pytania modelowi rekonstrukcyjnemu z zamrożonym rdzeniem pamięci. Model odpowiada z cytowaniem źródeł, bez konfabulacji i bez prawa do uczenia się.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-purple-700 font-medium">Wymaga aktywnej zgody za życia</div>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  directive.mode === "total_erasure"
                    ? "bg-rose-50/40 border-rose-600 ring-1 ring-rose-600 shadow-sm"
                    : "bg-slate-50/50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">Całkowite usunięcie</span>
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
                    Po potwierdzeniu zgonu wszystkie zasoby tożsamości cyfrowej zostają nieodwracalnie skasowane (kryptograficzne niszczenie kluczy szyfrujących i rekordów w bazie).
                  </p>
                </div>
                <div className="text-[11px] font-mono text-rose-700 font-medium">Nieodwracalne zniszczenie danych</div>
              </label>
            </div>
          </div>

          {/* Opiekun zaufany i weryfikacja */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
            <h2 className="text-base font-serif font-medium text-slate-900 tracking-tight">2. Opiekun zaufany i protokół weryfikacji</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-alterja-accent" />
                  Adres e-mail zaufanego opiekuna
                </label>
                <input
                  type="email"
                  required
                  value={directive.trusted_contact_email}
                  onChange={(e) => setDirective({ ...directive, trusted_contact_email: e.target.value })}
                  placeholder="np. zaufany.bliski@domena.pl"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-alterja-accent focus:bg-white"
                />
                <p className="text-[11px] text-slate-500 mt-1">Osoba ta będzie uprawniona do zgłoszenia zdarzenia oraz uwierzytelnienia dokumentów.</p>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  Próg braku aktywności (w dniach)
                </label>
                <select
                  value={directive.inactivity_period_days}
                  onChange={(e) => setDirective({ ...directive, inactivity_period_days: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-alterja-accent focus:bg-white"
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
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={directive.require_death_certificate}
                  onChange={(e) => setDirective({ ...directive, require_death_certificate: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-alterja-accent focus:ring-alterja-accent"
                />
                <div>
                  <span className="text-xs font-medium text-slate-900 flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                    Wymóg urzędowego aktu zgonu (USC) oraz 30-dniowa karencja
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Bezwzględny wymóg dostarczenia oficjalnego odpisu aktu zgonu z Urzędu Stanu Cywilnego. W okresie karencji na Twój adres e-mail i numer telefonu wysyłane są powiadomienia z możliwością natychmiastowego anulowania procedury jednym kliknięciem.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Wiadomość wprowadzająca dla bliskich */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
            <h2 className="text-base font-serif font-medium text-slate-900 tracking-tight">3. Osobiste słowo wstępne dla bliskich</h2>
            <p className="text-xs text-slate-500">
              Tekst, który zostanie wyświetlony opiekunowi i uprawnionym osobom przy pierwszym otwarciu memoriału lub archiwum.
            </p>
            <textarea
              rows={4}
              value={directive.posthumous_intro_message || ""}
              onChange={(e) => setDirective({ ...directive, posthumous_intro_message: e.target.value })}
              placeholder="Zostawiam to archiwum z myślą o Was. Znajdziecie tu moje myśli, spisane wspomnienia i podejście do życia..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-alterja-accent focus:bg-white font-mono leading-relaxed"
            />
          </div>

          {/* Zapisanie dyspozycji */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-600" />
              Dyspozycja może być zmieniona lub unieważniona w każdej chwili za Twojego życia.
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-alterja-accent hover:bg-alterja-accent/90 text-xs font-medium text-white shadow-sm transition-colors"
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-200" /> : <Save className="w-4 h-4" />}
              {isSaved ? "Zapisano dyspozycję" : "Zapisz dyspozycję pośmiertną"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
