"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import { store } from "@/lib/db/store";
import {
  Shield,
  Lock,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  RefreshCw,
  KeyRound,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

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
      <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col justify-center items-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-serif font-medium tracking-tight text-slate-900 editorial-display">
            Dane zostały trwale usunięte
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Zgodnie z procedurą RODO (art. 17 — prawo do bycia zapomnianym), wszystkie warstwy pamięci, rekonstrukcja stylu, wywiady, logi i klucze API powiązane z tym profilem zostały nieodwracalnie wyczyszczone.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-xs font-medium text-white transition-all shadow-md active:scale-95"
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
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-accent/15 selection:text-alterja-accent">
      <Navbar />

      {/* PEŁNOFORMATOWA KINOWA SCENA FOTOGRAFICZNA (TREE-OF-MIND) */}
      <section className="relative w-full min-h-[400px] md:min-h-[460px] flex items-center overflow-hidden bg-slate-950">
        <Image
          src="/images/tree-of-mind.jpg"
          alt="Kosmiczne drzewo umysłu i nienaruszalny skarbiec AlterJa"
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/20 text-emerald-400 text-xs font-mono backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Pancerny skarbiec · Zero korporacyjnego treningu</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white editorial-display leading-tight">
              Prywatność i absolutna suwerenność
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-xl">
              Twoja wiedza to Twoja wyłączna własność. Żadna korporacja nie trenuje na Tobie swoich modeli, a wszystkie dane są chronione bankową izolacją RLS.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleExportData}
              disabled={exportState === "preparing"}
              className="btn-luxe-light !py-3 !px-5 text-xs shadow-2xl active:scale-95"
            >
              {exportState === "preparing" ? (
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              ) : (
                <Download className="w-4 h-4 text-slate-950" />
              )}
              <span>{exportState === "preparing" ? "Przygotowywanie..." : exportState === "ready" ? "Pobrano archiwum RODO" : "Eksport danych (JSON)"}</span>
            </button>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-xs font-medium text-rose-200 transition-all active:scale-95"
            >
              <Trash2 className="w-4 h-4 text-rose-300" />
              <span>Usuń tożsamość</span>
            </button>
          </div>
        </div>
      </section>

      {/* OBSZAR ROBOCZY */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 relative z-20 -mt-10 sm:-mt-12">
        {/* 5 Zgód operacyjnych w luksusowych kartach */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-medium text-slate-950 editorial-display">
                Cele przetwarzania i zgody formalne
              </h2>
              <p className="text-xs text-slate-500">
                Możesz wycofać każdą ze zgód w dowolnym momencie z natychmiastowym skutkiem technicznym.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">5 aktywnych obszarów</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {consentItems.map((item) => {
              const active = consents[item.key];
              const isSaving = savingKey === item.key;
              return (
                <div
                  key={item.key}
                  className={`p-6 rounded-3xl border transition-all ${
                    active
                      ? "bg-white/95 backdrop-blur-xl border-slate-200/90 shadow-md"
                      : "bg-white/60 border-slate-200/60 opacity-80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono ${
                            active
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {active ? "Aktywna" : "Wycofana"}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-500">{item.legalBasis}</p>
                    </div>

                    <button
                      onClick={() => toggleConsent(item.key)}
                      disabled={isSaving}
                      aria-label={`Przełącz zgodę dla: ${item.title}`}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-alterja-accent focus:ring-offset-2 focus:ring-offset-white ${
                        active ? "bg-slate-950" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          active ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed font-sans">{item.description}</p>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{item.impact}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Architektura bezpieczeństwa i gwarancje */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-alterja-blue text-sm font-semibold">
              <Lock className="w-4 h-4" />
              <span>Izolacja Row Level Security</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Każde zapytanie do bazy PostgreSQL jest ograniczone filtrem <code className="text-slate-800 font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">auth.uid() = user_id</code>. Żaden inny użytkownik ani klient API nie ma fizycznego dostępu do Twojej przestrzeni danych.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-purple-700 text-sm font-semibold">
              <KeyRound className="w-4 h-4" />
              <span>Brak treningu modeli bazowych</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Twoje wypowiedzi, transkrypcje i biografie nie są wykorzystywane do publicznego douczania modeli Google Gemini ani żadnych innych modeli komercyjnych. Dane służą wyłącznie do wnioskowania w locie (RAG).
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Standardy UE i polskie normy</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Zgodność z RODO (w tym prawo do wyjaśnienia i art. 22 o profilowaniu), unijnym AI Act dla modeli wysokiego zaufania oraz wytycznymi UODO dotyczącymi systemów generatywnych.
            </p>
          </div>
        </section>

        {/* Dziennik audytu i operacji na danych */}
        <section className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <h2 className="text-base font-serif font-medium text-slate-900 tracking-tight editorial-display">
                Dziennik audytowy operacji prywatności
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">Wszystkie wpisy są niezmienne (append-only)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[11px] font-mono uppercase">
                <tr>
                  <th className="py-2.5 px-3">Czas (UTC)</th>
                  <th className="py-2.5 px-3">Zdarzenie</th>
                  <th className="py-2.5 px-3">Aktor</th>
                  <th className="py-2.5 px-3">Szczegóły operacji</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {auditEvents.map((event: any) => (
                  <tr key={event.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">{new Date(event.timestamp).toLocaleString("pl-PL")}</td>
                    <td className="py-2.5 px-3 text-slate-900 font-medium">{event.event_type}</td>
                    <td className="py-2.5 px-3 text-slate-500">{event.actor}</td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-md truncate">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full bg-white border border-rose-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-serif font-medium text-slate-900 tracking-tight">
                Trwałe usunięcie tożsamości cyfrowej
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ta operacja jest <strong className="text-slate-900 font-semibold">nieodwracalna</strong>. Spowoduje natychmiastowe usunięcie:
            </p>
            <ul className="text-xs text-slate-600 list-disc list-inside space-y-1 font-sans">
              <li>Wszystkich 7 warstw pamięci autobiograficznej</li>
              <li>Wszystkich nagrań, transkrypcji i podłączonych źródeł</li>
              <li>Sformułowanych hipotez i wzorców stylu</li>
              <li>Wszystkich kluczy API i powiązanych integracji</li>
              <li>Dyspozycji pośmiertnych i cyfrowej spuścizny</li>
            </ul>

            <div className="pt-2">
              <label className="block text-[11px] font-mono text-slate-500 mb-1.5">
                Wpisz poniżej: <span className="text-slate-900 font-bold">USUŃ WSZYSTKIE DANE</span>
              </label>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder="USUŃ WSZYSTKIE DANE"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white shadow-inner font-mono font-bold"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition-colors"
              >
                Anuluj
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmationText !== "USUŃ WSZYSTKIE DANE"}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium text-white transition-all shadow-md active:scale-95"
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
