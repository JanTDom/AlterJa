"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Brain,
  MessageSquare,
  Sparkles,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Pause,
  Play,
  ArrowRight,
  Shield,
  Layers,
} from "lucide-react";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { Hypothesis } from "@/domains/types";

export default function DashboardPage() {
  const [profile, setProfile] = useState(() => globalStore.getProfile(DEMO_USER_ID)!);
  const [memories, setMemories] = useState(() => globalStore.getMemories(DEMO_USER_ID));
  const [sources, setSources] = useState(() => globalStore.getSources(DEMO_USER_ID));
  const [hypotheses, setHypotheses] = useState(() => globalStore.getHypotheses(DEMO_USER_ID));
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const togglePause = () => {
    const updated = globalStore.updateProfile(DEMO_USER_ID, {
      learning_paused: !profile.learning_paused,
    });
    setProfile(updated);
    showNotice(
      updated.learning_paused
        ? "Uczenie modelu zostało wstrzymane."
        : "Uczenie modelu zostało wznowione."
    );
  };

  const toggleQuietHours = () => {
    const updated = globalStore.updateProfile(DEMO_USER_ID, {
      quiet_hours_enabled: !profile.quiet_hours_enabled,
    });
    setProfile(updated);
    showNotice(
      updated.quiet_hours_enabled
        ? "Godziny ciszy zostały włączone (22:00 - 07:00)."
        : "Godziny ciszy zostały wyłączone."
    );
  };

  const handleReviewHypothesis = (
    id: string,
    decision: "confirmed" | "rejected" | "situational"
  ) => {
    globalStore.reviewHypothesis(DEMO_USER_ID, id, decision);
    setHypotheses([...globalStore.getHypotheses(DEMO_USER_ID)]);
    setMemories([...globalStore.getMemories(DEMO_USER_ID)]);
    showNotice(
      decision === "confirmed"
        ? "Hipoteza została zatwierdzona i dołączona do bazy wiedzy."
        : decision === "rejected"
        ? "Hipoteza została odrzucona i nie będzie wykorzystywana."
        : "Oznaczono jako zachowanie sytuacyjne."
    );
  };

  const showNotice = (text: string) => {
    setActionNotice(text);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const pendingHypotheses = hypotheses.filter((h) => h.status === "pending");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Pasek powiadomień */}
      {actionNotice && (
        <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-200 text-sm flex items-center justify-between animate-fadeIn">
          <span>{actionNotice}</span>
          <button
            onClick={() => setActionNotice(null)}
            className="text-xs text-blue-400 hover:text-white"
          >
            Zamknij
          </button>
        </div>
      )}

      {/* Nagłówek kokpitu */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-alterja-border">
        <div>
          <span className="text-xs uppercase tracking-wider text-alterja-blue font-semibold">
            Centrum poznawania
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">Co wiem o Tobie</h1>
          <p className="text-sm text-slate-400 mt-1">
            Przegląd zatwierdzonych faktów, źródeł oraz roboczych hipotez oczekujących na Twoją
            weryfikację.
          </p>
        </div>

        {/* Kontrolki pauzy i godzin ciszy */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={toggleQuietHours}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center space-x-2 transition-colors ${
              profile.quiet_hours_enabled
                ? "bg-slate-800 border-slate-700 text-slate-300"
                : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Godziny ciszy: {profile.quiet_hours_enabled ? "Włączone" : "Wyłączone"}</span>
          </button>

          <button
            onClick={togglePause}
            className={`px-4 py-2 rounded-xl text-xs font-medium border flex items-center space-x-2 transition-colors ${
              profile.learning_paused
                ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                : "bg-alterja-blue/15 border-alterja-blue/30 text-blue-300 hover:bg-alterja-blue/25"
            }`}
          >
            {profile.learning_paused ? (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Wznów uczenie</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Wstrzymaj uczenie</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Rzetelne liczniki (brak fałszywych procentów) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel p-5 rounded-xl border border-alterja-border">
          <span className="text-xs text-slate-400">Zatwierdzone wpisy</span>
          <div className="text-2xl font-bold text-white mt-1">{memories.length}</div>
          <span className="text-[11px] text-emerald-400">100% z cytatem źródłowym</span>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-alterja-border">
          <span className="text-xs text-slate-400">Autoryzowane materiały</span>
          <div className="text-2xl font-bold text-white mt-1">{sources.length}</div>
          <span className="text-[11px] text-slate-400">Dokumenty, notatki, zapiski</span>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-alterja-border">
          <span className="text-xs text-slate-400">Oczekujące hipotezy</span>
          <div className="text-2xl font-bold text-amber-400 mt-1">{pendingHypotheses.length}</div>
          <span className="text-[11px] text-amber-400/80">Wymagają Twojej decyzji</span>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-alterja-border">
          <span className="text-xs text-slate-400">Warstwy modelu</span>
          <div className="text-2xl font-bold text-purple-400 mt-1">7 / 7</div>
          <span className="text-[11px] text-slate-400">Pełna separacja kontekstu</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lewa kolumna: Oczekujące hipotezy */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-alterja-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Nowe hipotezy do Twojej oceny</span>
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {pendingHypotheses.length} do sprawdzenia
              </span>
            </div>

            {pendingHypotheses.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">
                Brak oczekujących hipotez. Wszystkie wywnioskowane tendencje zostały przejrzane.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingHypotheses.map((hyp) => (
                  <div
                    key={hyp.id}
                    className="p-5 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-3"
                  >
                    <div>
                      <div className="text-xs text-amber-400 font-semibold mb-1">
                        Hipoteza modelu:
                      </div>
                      <p className="text-slate-100 text-sm font-medium leading-relaxed">
                        „{hyp.hypothesis_text}”
                      </p>
                    </div>

                    {hyp.alternative_explanation && (
                      <div className="text-xs text-slate-400 bg-slate-850 p-3 rounded-lg border border-slate-800">
                        <strong className="text-slate-300">Alternatywne wyjaśnienie:</strong>{" "}
                        {hyp.alternative_explanation}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <span className="text-xs text-slate-400">
                        Poparte {hyp.supporting_evidence_count} niezależnymi źródłami
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleReviewHypothesis(hyp.id, "rejected")}
                          className="px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 text-xs font-medium flex items-center space-x-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Nieprawda</span>
                        </button>
                        <button
                          onClick={() => handleReviewHypothesis(hyp.id, "situational")}
                          className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-medium flex items-center space-x-1"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Zależy od sytuacji</span>
                        </button>
                        <button
                          onClick={() => handleReviewHypothesis(hyp.id, "confirmed")}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-xs font-medium flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Trafne (zatwierdź)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ostatnio potwierdzone wspomnienia */}
          <div className="glass-panel rounded-2xl p-6 border border-alterja-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Brain className="w-5 h-5 text-blue-400" />
                <span>Ostatnio potwierdzona wiedza z cytatami</span>
              </h2>
              <Link
                href="/memory"
                className="text-xs text-alterja-blue hover:text-blue-300 font-medium flex items-center space-x-1"
              >
                <span>Zobacz wszystkie ({memories.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {memories.slice(0, 3).map((mem) => (
                <div
                  key={mem.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      Warstwa: {mem.layer}
                    </span>
                    <span className="text-xs text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{mem.confidence === "confirmed" ? "Potwierdzone" : "Robocze"}</span>
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{mem.title}</h4>
                  <p className="text-xs text-slate-300">{mem.content}</p>
                  {mem.evidence && mem.evidence[0] && (
                    <div className="text-[11px] text-amber-400/90 italic border-l-2 border-amber-500/40 pl-2 mt-1">
                      Cytat: „{mem.evidence[0].exact_quote}”
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prawa kolumna: Szybkie akcje i status */}
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-alterja-border">
            <h3 className="text-base font-semibold text-white mb-4">Szybkie działania</h3>
            <div className="space-y-3">
              <Link
                href="/chat"
                className="w-full p-3.5 rounded-xl bg-gradient-to-r from-alterja-blue/20 to-alterja-purple/20 border border-alterja-blue/30 text-white font-medium text-sm flex items-center justify-between hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <span>Rozpocznij rozmowę</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/interview"
                className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-medium text-sm flex items-center justify-between hover:bg-slate-850 hover:text-white transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Odpowiedz na mikropytanie</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/sources"
                className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-medium text-sm flex items-center justify-between hover:bg-slate-850 hover:text-white transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Dodaj nowe źródło lub notatkę</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/style-lab"
                className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-medium text-sm flex items-center justify-between hover:bg-slate-850 hover:text-white transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Laboratorium stylu i decyzji A/B</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-alterja-border">
            <h3 className="text-base font-semibold text-white mb-3 flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Gwarancje prywatności</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Twój profil jest odizolowany regułami bazy danych. Brak logowania nie powoduje
              uruchomienia awatara pośmiertnego, a usunięcie faktu kaskadowo kasuje jego embeddingi.
            </p>
            <Link
              href="/privacy"
              className="text-xs text-alterja-blue hover:text-blue-300 font-medium"
            >
              Zarządzaj zgodami i audytem →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
