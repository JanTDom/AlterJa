"use client";

import { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import { store } from "@/lib/db/store";
import { Shield, Lock, Download, Trash2, CheckCircle2, AlertTriangle, FileText, RefreshCw, KeyRound, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const profile = store.getProfile();
  const [consents, setConsents] = useState<Record<string, boolean>>(store.getConsentsMap());
  const [auditEvents, setAuditEvents] = useState<any[]>(store.getAuditEvents());
  const [exportState, setExportState] = useState<"idle" | "preparing" | "ready">("idle");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const toggleConsent = (purpose: string) => {
    setSavingKey(purpose);
    setTimeout(() => {
      const nextVal = !consents[purpose];
      const updated = store.updateConsent(purpose, nextVal);
      setConsents({ ...updated });
      setAuditEvents([...store.getAuditEvents()]);
      setSavingKey(null);
    }, 200);
  };

  const handleExportData = () => {
    setExportState("preparing");
    setTimeout(() => {
      const dump = store.exportAllUserData();
      const blob = new Blob([JSON.stringify(dump, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `alterja-export-${profile.id}-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportState("ready");
      setAuditEvents([...store.getAuditEvents()]);
    }, 600);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmationText !== "USUŃ WSZYSTKIE DANE") return;
    store.deleteAllUserData();
    setIsDeleted(true);
    setDeleteModalOpen(false);
  };

  if (isDeleted) {
    return (
      <div className="min-h-screen bg-alter-dark text-slate-100 flex flex-col justify-center items-center px-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-alter-card border border-alter-border text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-medium tracking-tight text-white">Dane zostały trwale usunięte</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Zgodnie z procedurą RODO (art. 17 — prawo do bycia zapomnianym), wszystkie warstwy pamięci, rekonstrukcja stylu, wywiady, logi i klucze API powiązane z tym profilem zostały nieodwracalnie wyczyszczone.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition-colors"
            >
              Powrót do strony głównej
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const consentItems: Array<{
    key: string;
    title: string;
    legalBasis: string;
    description: string;
    impact: string;
    isMandatory?: boolean;
  }> = [
    {
      key: "profiling_core",
      title: "Podstawowe profilowanie epistemiczne",
      legalBasis: "RODO art. 6 ust. 1 lit. a — zgoda dobrowolna",
      description: "Przetwarzanie przekazanych faktów i preferencji na potrzeby budowania struktury tożsamości.",
      impact: "Wyłączenie blokuje możliwość odpowiadania w trybie rekonstrukcji osobistej.",
    },
    {
      key: "memory_learning",
      title: "Ciągłe uczenie i weryfikacja hipotez",
      legalBasis: "RODO art. 6 ust. 1 lit. a — zgoda dobrowolna",
      description: "Automatyczne wyciąganie wniosków ze źródeł, podsumowań i konwersacji w celu aktualizacji wiedzy.",
      impact: "Wyłączenie zatrzymuje tworzenie nowych kart pamięci oraz weryfikację hipotez.",
    },
    {
      key: "style_analysis",
      title: "Modelowanie stylu i leksyki",
      legalBasis: "RODO art. 6 ust. 1 lit. a — zgoda dobrowolna",
      description: "Analiza rytmu zdań, doboru słownictwa, polskiej składni i wzorców argumentacji bez autodiagnoz psychologicznych.",
      impact: "Wyłączenie przywraca modelowi neutralny ton asystenta.",
    },
    {
      key: "third_party_sharing",
      title: "Dostęp zewnętrznych integracji przez API",
      legalBasis: "RODO art. 6 ust. 1 lit. a — zgoda dobrowolna",
      description: "Możliwość odpytywania modelu i stylu przez aplikacje trzecie posiadające wygenerowany przez Ciebie klucz tokenowy.",
      impact: "Wyłączenie natychmiast blokuje wszystkie aktywne klucze API w bramce brzegowej.",
    },
    {
      key: "legacy_preservation",
      title: "Cyfrowa spuścizna i protokół pośmiertny",
      legalBasis: "Dyspozycja za życia — oświadczenie woli użytkownika",
      description: "Zachowanie zatwierdzonego archiwum wiedzy i udostępnienie go wskazanym zaufanym opiekunom po weryfikacji zgonu.",
      impact: "Wyłączenie skutkuje automatycznym wygaszeniem konta w przypadku braku aktywności.",
    },
  ];

  return (
    <div className="min-h-screen bg-alter-dark text-slate-100 flex flex-col selection:bg-alter-blue/30 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Nagłówek */}
        <div className="border-b border-alter-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5" />
              Kontrola suwerenności danych · RODO i AI Act
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">Centrum prywatności i zgód</h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Pełna kontrola nad celami przetwarzania, prawem do bycia zapomnianym oraz audytowalnym rejestrem zdarzeń. Wszystkie dane są izolowane na poziomie bazy danych z politykami Row Level Security.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportData}
              disabled={exportState === "preparing"}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-alter-card hover:bg-slate-800 border border-alter-border text-xs font-medium text-slate-200 hover:text-white transition-colors"
            >
              {exportState === "preparing" ? (
                <RefreshCw className="w-4 h-4 animate-spin text-alter-blue" />
              ) : (
                <Download className="w-4 h-4 text-slate-400" />
              )}
              {exportState === "preparing" ? "Przygotowywanie..." : exportState === "ready" ? "Pobrano archiwum RODO" : "Eksport danych (JSON)"}
            </button>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-medium text-rose-300 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Usuń tożsamość cyfrową
            </button>
          </div>
        </div>

        {/* 5 Zgód operacyjnych */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-white tracking-tight">Cele przetwarzania i zgody formalne</h2>
              <p className="text-xs text-slate-400">Możesz wycofać każdą z powyższych zgód w dowolnym momencie z natychmiastowym skutkiem prawnym i technicznym.</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">5 aktywnych obszarów</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {consentItems.map((item) => {
              const active = consents[item.key];
              const isSaving = savingKey === item.key;
              return (
                <div
                  key={item.key}
                  className={`p-5 rounded-xl border transition-all ${
                    active ? "bg-alter-card border-alter-border" : "bg-alter-card/40 border-alter-border/50 opacity-80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{item.title}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                            active ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {active ? "Aktywna" : "Wycofana"}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-400">{item.legalBasis}</p>
                    </div>

                    <button
                      onClick={() => toggleConsent(item.key)}
                      disabled={isSaving}
                      aria-label={`Przełącz zgodę dla: ${item.title}`}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-alter-blue focus:ring-offset-2 focus:ring-offset-alter-dark ${
                        active ? "bg-alter-blue" : "bg-slate-800"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          active ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">{item.description}</p>

                  <div className="mt-4 pt-3 border-t border-alter-border/40 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item.impact}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Architektura bezpieczeństwa i gwarancje */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-alter-card border border-alter-border space-y-2">
            <div className="flex items-center gap-2 text-alter-blue text-sm font-medium">
              <Lock className="w-4 h-4" />
              Izolacja Row Level Security
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Każde zapytanie do bazy PostgreSQL jest ograniczone filtrem <code className="text-slate-200 font-mono text-[11px]">auth.uid() = user_id</code>. Żaden inny użytkownik ani klient API nie ma fizycznego dostępu do Twojej przestrzeni danych.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-alter-card border border-alter-border space-y-2">
            <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
              <KeyRound className="w-4 h-4" />
              Brak treningu modeli bazowych
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Twoje wypowiedzi, transkrypcje i biografie nie są wykorzystywane do publicznego douczania modeli Google Gemini ani żadnych innych modeli komercyjnych. Dane służą wyłącznie do wnioskowania w locie (RAG).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-alter-card border border-alter-border space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Standardy UE i polskie normy
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zgodność z RODO (w tym prawo do wyjaśnienia i art. 22 o profilowaniu), unijnym AI Act dla modeli wysokiego zaufania oraz wytycznymi UODO dotyczącymi systemów generatywnych.
            </p>
          </div>
        </section>

        {/* Dziennik audytu i operacji na danych */}
        <section className="p-6 rounded-2xl bg-alter-card border border-alter-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <h2 className="text-base font-medium text-white tracking-tight">Dziennik audytowy operacji prywatności</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Wszystkie wpisy są niezmienne (append-only)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-alter-dark/60 text-slate-400 border-b border-alter-border text-[11px] font-mono uppercase">
                <tr>
                  <th className="py-2.5 px-3">Czas (UTC)</th>
                  <th className="py-2.5 px-3">Zdarzenie</th>
                  <th className="py-2.5 px-3">Aktor</th>
                  <th className="py-2.5 px-3">Szczegóły operacji</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-alter-border/50 font-mono text-[11px]">
                {auditEvents.map((event: any) => (
                  <tr key={event.id} className="hover:bg-slate-800/20">
                    <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap">{new Date(event.timestamp).toLocaleString("pl-PL")}</td>
                    <td className="py-2.5 px-3 text-white font-medium">{event.event_type}</td>
                    <td className="py-2.5 px-3 text-slate-400">{event.actor}</td>
                    <td className="py-2.5 px-3 text-slate-300 max-w-md truncate">
                      {JSON.stringify(event.payload)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal potwierdzenia usunięcia konta */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full bg-alter-card border border-rose-500/40 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-medium text-white tracking-tight">Trwałe usunięcie tożsamości cyfrowej</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ta operacja jest <strong className="text-white">nieodwracalna</strong>. Spowoduje natychmiastowe usunięcie:
            </p>
            <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
              <li>Wszystkich 7 warstw pamięci autobiograficznej</li>
              <li>Wszystkich nagrań, transkrypcji i podłączonych źródeł</li>
              <li>Sformułowanych hipotez i wzorców stylu</li>
              <li>Wszystkich kluczy API i powiązanych integracji</li>
              <li>Dyspozycji pośmiertnych i cyfrowej spuścizny</li>
            </ul>

            <div className="pt-2">
              <label className="block text-[11px] font-mono text-slate-400 mb-1.5">
                Wpisz poniżej: <span className="text-white font-bold">USUŃ WSZYSTKIE DANE</span>
              </label>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder="USUŃ WSZYSTKIE DANE"
                className="w-full px-3 py-2 rounded-lg bg-alter-dark border border-alter-border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
              >
                Anuluj
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmationText !== "USUŃ WSZYSTKIE DANE"}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium text-white transition-colors"
              >
                Potwierdzam trwałe usunięcie
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
