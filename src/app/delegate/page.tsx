"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import {
  Send,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  SlidersHorizontal,
  Flame,
  FileText,
  AlertTriangle,
  RotateCcw,
  Zap,
  Layers,
  ArrowRight,
  Compass,
  MessageSquare,
  Shield,
  HelpCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface QuickTemplate {
  id: string;
  label: string;
  channel: string;
  intent: string;
  text: string;
  sender: string;
}

const QUICK_TEMPLATES: QuickTemplate[] = [
  {
    id: "olx",
    label: "Targowanie na OLX o 23:00",
    channel: "olx",
    intent: "protect_rates",
    sender: "Kupujący na OLX · 23:14",
    text: "Dam 60 zł i biorę dzisiaj za pół godziny, niech pan opuści z tych 180 zł, nikt panu więcej za to nie da!",
  },
  {
    id: "znajomy",
    label: "Prośba o darmową przysługę w weekend",
    channel: "whatsapp",
    intent: "set_boundary",
    sender: "Znajomy · Sobota 19:40",
    text: "Cześć! Wiem, że weekend, ale zerknij mi na ten projekt na 5 minut, dla Ciebie to chwila, pomożesz kumplowi po znajomości?",
  },
  {
    id: "klient",
    label: "Klient wymusza 40% rabatu pod presją",
    channel: "email",
    intent: "protect_rates",
    sender: "Klient korporacyjny · Piątek 22:30",
    text: "Zarząd podpisze umowę tylko pod warunkiem 40% rabatu na cały rok. Czekam na decyzję do jutra do 8:00 rano, inaczej wybieramy konkurencję.",
  },
  {
    id: "spam",
    label: "Spam na WhatsAppie i wciskanie ofert",
    channel: "whatsapp",
    intent: "block_spam",
    sender: "Nieznany numer · Wtorek 14:10",
    text: "Dzień dobry! Zauważyliśmy Pana profil i mamy unikalną ofertę dofinansowania instalacji OZE. Czy możemy porozmawiać 10 minut telefonicznie?",
  },
  {
    id: "piatek",
    label: "Pilny mail od zleceniodawcy w piątek o 21:00",
    channel: "email",
    intent: "set_boundary",
    sender: "Zleceniodawca · Piątek 21:05",
    text: "Musimy pilnie wdrożyć te 6 poprawek przed poniedziałkiem rano. Zróbcie to w tę sobotę, to kluczowe dla startu kampanii.",
  },
];

export default function DelegatePage() {
  const [activeTab, setActiveTab] = useState<"reply" | "audit" | "automate">("reply");

  // Stan dla Trybu Odpowiedzi
  const [incomingText, setIncomingText] = useState("");
  const [channel, setChannel] = useState("email");
  const [intent, setIntent] = useState("protect_rates");
  const [tone, setTone] = useState("assertive");
  const [senderInfo, setSenderInfo] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [replyResult, setReplyResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Stan dla Audytu
  const [auditText, setAuditText] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  const applyTemplate = (t: QuickTemplate) => {
    setIncomingText(t.text);
    setChannel(t.channel);
    setIntent(t.intent);
    setSenderInfo(t.sender);
    setReplyResult(null);
  };

  const handleGenerateReply = async (customTone?: string) => {
    if (!incomingText.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);
    setCopied(false);

    try {
      const res = await fetch("/api/delegate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskType: "reply",
          incomingText,
          channel,
          intent,
          tone: customTone || tone,
          senderInfo,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setReplyResult(json);
      } else {
        setErrorMsg(json.error || "Wystąpił błąd podczas generowania odpowiedzi.");
      }
    } catch (err: any) {
      setErrorMsg("Błąd sieci. Sprawdź połączenie.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunAudit = async () => {
    if (!auditText.trim()) return;
    setIsAuditing(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/delegate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskType: "audit",
          incomingText: auditText,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setAuditResult(json.data);
      } else {
        setErrorMsg(json.error || "Błąd podczas analizy propozycji.");
      }
    } catch (err) {
      setErrorMsg("Błąd połączenia.");
    } finally {
      setIsAuditing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-sky-500/25 selection:text-sky-200">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Nagłówek modułu wykonawczego */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-white/15 text-xs font-mono text-sky-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CENTRUM WYKONAWCZE · TWOJA KOPIA W AKCJI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white editorial-display leading-tight">
            Oddeleguj zadanie do AlterJi. <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-amber-200">
              Ona odpisze i podejmie decyzję za Ciebie.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-3xl text-pretty">
            Zamiast tracić czas na odpisywanie marudom, stresowanie się roszczeniowymi mailami czy wahanie się nad trudnymi propozycjami — wklej treść tutaj. Twoja AlterJa przeanalizuje sprawę przez pryzmat Twoich zasad, wygeneruje gotową ripostę w Twoim stylu lub oceni ryzyka.
          </p>
        </div>

        {/* Zakładki trybów wykonawczych */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("reply")}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "reply"
                ? "bg-white text-slate-950 shadow-[0_0_25px_rgba(255,255,255,0.3)] scale-[1.02]"
                : "bg-slate-900 text-slate-300 border border-white/10 hover:border-white/20 hover:text-white"
            }`}
          >
            <Send className="w-3.5 h-3.5 text-sky-500" />
            <span>Odpisz za mnie na wiadomość</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("audit")}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "audit"
                ? "bg-white text-slate-950 shadow-[0_0_25px_rgba(255,255,255,0.3)] scale-[1.02]"
                : "bg-slate-900 text-slate-300 border border-white/10 hover:border-white/20 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Prześwietl ofertę lub propozycję</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("automate")}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "automate"
                ? "bg-white text-slate-950 shadow-[0_0_25px_rgba(255,255,255,0.3)] scale-[1.02]"
                : "bg-slate-900 text-slate-300 border border-white/10 hover:border-white/20 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Automatyzacja i skrzynka pocztowa</span>
          </button>
        </div>

        {/* 1. TRYB: ODPISZ ZA MNIE */}
        {activeTab === "reply" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Lewa kolumna: Formularz wejściowy */}
            <div className="lg:col-span-7 space-y-6">
              {/* Szybkie szablony do przetestowania jednym kliknięciem */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Szybkie szablony z życia (kliknij, aby wkleić):
                </span>
                <div className="flex flex-wrap gap-2">
                  {QUICK_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => applyTemplate(tmpl)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-sky-400/40 text-slate-300 hover:text-white text-xs font-mono transition-colors text-left"
                    >
                      {tmpl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pole wklejania wiadomości */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/15 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <label htmlFor="incomingMsg" className="text-xs font-mono text-slate-300 uppercase tracking-wider font-semibold">
                    Wklej wiadomość, na którą masz odpisać:
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">
                    Mail · SMS · OLX · WhatsApp · Slack
                  </span>
                </div>

                <textarea
                  id="incomingMsg"
                  rows={5}
                  value={incomingText}
                  onChange={(e) => setIncomingText(e.target.value)}
                  placeholder="np. Cześć, czy zrobisz ten projekt za pół ceny i dokończysz w tę niedzielę?"
                  className="w-full rounded-xl bg-slate-950 border border-white/10 p-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400 font-sans leading-relaxed"
                />

                {/* Parametry taktyczne odpowiedzi */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-400 block">Cel odpowiedzi:</label>
                    <select
                      value={intent}
                      onChange={(e) => setIntent(e.target.value)}
                      className="w-full rounded-lg bg-slate-950 border border-white/10 p-2 text-xs font-mono text-slate-200 focus:border-sky-400"
                    >
                      <option value="protect_rates">Obrona stawek i cen</option>
                      <option value="set_boundary">Obrona wolnego czasu</option>
                      <option value="block_spam">Blokada spamu (RODO)</option>
                      <option value="diplomatic">Dyplomatyczna odmowa</option>
                      <option value="general">Mój naturalny styl</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-400 block">Kanał kontaktu:</label>
                    <select
                      value={channel}
                      onChange={(e) => setChannel(e.target.value)}
                      className="w-full rounded-lg bg-slate-950 border border-white/10 p-2 text-xs font-mono text-slate-200 focus:border-sky-400"
                    >
                      <option value="email">Poczta e-mail</option>
                      <option value="olx">Portal OLX / Vinted</option>
                      <option value="whatsapp">WhatsApp / Komunikator</option>
                      <option value="sms">Wiadomość SMS</option>
                      <option value="slack">Slack / Teams</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-400 block">Poziom asertywności:</label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full rounded-lg bg-slate-950 border border-white/10 p-2 text-xs font-mono text-slate-200 focus:border-sky-400"
                    >
                      <option value="assertive">Stanowczy i bezpośredni</option>
                      <option value="diplomatic">Kulturalny z buforem</option>
                      <option value="casual">Luźny i zwięzły</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    disabled={isLoading || !incomingText.trim()}
                    onClick={() => handleGenerateReply()}
                    className="w-full btn-luxe-primary !py-3.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(56,189,248,0.3)] disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4 text-sky-300" />
                    <span>{isLoading ? "Twoja AlterJa analizuje zasady i pisze..." : "Wygeneruj odpowiedź sobowtóra (120 ms)"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Prawa kolumna: Gotowa odpowiedź i uziemienie w pamięci */}
            <div className="lg:col-span-5 space-y-6">
              {replyResult ? (
                <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-sky-950/40 via-slate-900/90 to-slate-950 border border-sky-400/50 shadow-2xl space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2 text-sky-300 text-xs font-mono font-bold uppercase">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Odpowiedź gotowa do wysłania:</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Czas: {replyResult.latencyMs} ms
                    </span>
                  </div>

                  {/* Ciało wygenerowanej wiadomości */}
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-white/10 font-sans text-sm text-slate-100 leading-relaxed relative group">
                    <p className="whitespace-pre-wrap">{replyResult.data.replyText}</p>
                  </div>

                  {/* Przyciski akcji: Kopiuj do schowka */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(replyResult.data.replyText)}
                      className="flex-1 btn-luxe-primary !py-3 text-xs font-mono font-bold flex items-center justify-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-300" />
                          <span>Skopiowano do schowka</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-white" />
                          <span>Skopiuj treść do schowka</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Uzasadnienie decyzyjne i powołana zasada */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-400/30 text-xs font-mono space-y-2">
                    <div className="flex items-center gap-2 text-sky-400 font-semibold">
                      <Shield className="w-3.5 h-3.5" />
                      <span>Uziemienie decyzyjne: {replyResult.data.ruleApplied}</span>
                    </div>
                    <p className="text-slate-300 font-sans text-xs italic">
                      „{replyResult.data.rationale}”
                    </p>
                  </div>

                  {/* Alternatywne warianty tonu */}
                  {replyResult.data.alternativeTones && (
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                        Alternatywne warianty riposty:
                      </span>
                      <div className="space-y-2">
                        {replyResult.data.alternativeTones.sharper && (
                          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs flex items-start justify-between gap-3">
                            <span className="text-slate-300 font-sans">{replyResult.data.alternativeTones.sharper}</span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(replyResult.data.alternativeTones.sharper)}
                              className="text-sky-300 hover:text-white shrink-0 text-[11px] font-mono underline"
                            >
                              Kopiuj
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/10 text-center space-y-4 py-16">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mx-auto">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-white">Czekam na wiadomość</h3>
                    <p className="text-xs text-slate-400 font-sans max-w-xs mx-auto">
                      Wybierz jeden z gotowych szablonów po lewej lub wklej własną treść, aby zobaczyć, jak zareaguje Twoja AlterJa.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. TRYB: PRZEŚWIETL OFERTĘ / AUDYT ZASAD */}
        {activeTab === "audit" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/15 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <label htmlFor="auditInput" className="text-xs font-mono text-slate-300 uppercase tracking-wider font-semibold">
                    Wklej propozycję, zapytanie ofertowe lub warunki umowy:
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">
                    Analiza zgodności z Twoimi wartościami
                  </span>
                </div>

                <textarea
                  id="auditInput"
                  rows={6}
                  value={auditText}
                  onChange={(e) => setAuditText(e.target.value)}
                  placeholder="np. Proponujemy współpracę przy projekcie marketingowym. Wynagrodzenie: 3000 zł płatne po 60 dniach od wdrożenia, w zamian za nielimitowane poprawki przez cały okres trwania umowy..."
                  className="w-full rounded-xl bg-slate-950 border border-white/10 p-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400 font-sans leading-relaxed"
                />

                <button
                  type="button"
                  disabled={isAuditing || !auditText.trim()}
                  onClick={handleRunAudit}
                  className="w-full btn-luxe-primary !py-3.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(56,189,248,0.3)] disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isAuditing ? "Trwa prześwietlanie przez 7 warstw zasad..." : "Prześwietl ofertę pod kątem moich zasad"}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              {auditResult ? (
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/20 shadow-2xl space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Werdykt Twojej AlterJi:
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                        auditResult.verdict === "ODRZUĆ"
                          ? "bg-rose-950/80 border-rose-500/50 text-rose-300"
                          : auditResult.verdict === "POSTAW TWARDE WARUNKI"
                          ? "bg-amber-950/80 border-amber-500/50 text-amber-300"
                          : "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                      }`}
                    >
                      {auditResult.verdict}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 text-xs font-mono">
                    <span className="text-slate-300">Wskaźnik zgodności z Twoimi wartościami:</span>
                    <span className="text-sky-300 font-bold text-sm">{auditResult.matchScore}%</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                    {auditResult.summary}
                  </p>

                  {auditResult.redFlags && auditResult.redFlags.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-semibold block">
                        Wykryte pułapki i czerwone flagi:
                      </span>
                      <ul className="space-y-2 text-xs font-sans text-slate-300">
                        {auditResult.redFlags.map((flag: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {auditResult.counterProposal && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
                          Proponowana kontroferta do wysłania:
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(auditResult.counterProposal)}
                          className="text-[10px] font-mono text-sky-300 hover:text-white underline"
                        >
                          Kopiuj
                        </button>
                      </div>
                      <p className="text-xs font-sans text-slate-200 italic leading-relaxed">
                        „{auditResult.counterProposal}”
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/10 text-center space-y-4 py-16">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-white">Audytor w gotowości</h3>
                    <p className="text-xs text-slate-400 font-sans max-w-xs mx-auto">
                      Wklej treść oferty, zapytania lub prośby, aby sprawdzić, czy nie narusza Twoich zasad i stawek.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. TRYB: AUTOMATYZACJA I SKRZYNKA POCZTOWA */}
        {activeTab === "automate" && (
          <div className="p-8 sm:p-10 rounded-[2.5rem] bg-slate-900/80 border border-white/15 space-y-8 shadow-2xl">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold px-3 py-1 rounded-full bg-amber-950/60 border border-amber-400/30">
                Integracje i ciągła autonomia
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white">
                Jak podpiąć AlterJa, aby pracowała w tle?
              </h2>
              <p className="text-sm text-slate-300 font-sans leading-relaxed text-pretty">
                Twoja kopia nie musi czekać, aż manualnie przekleisz wiadomość. Możesz spiąć ją ze swoją skrzynką e-mail, komunikatorem lub formularzem kontaktowym.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-white/10 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">1. Szkice odpowiedzi (Gmail / Outlook)</h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Gdy przychodzi trudny mail po godzinach, AlterJa generuje gotowy szkic odpowiedzi (Draft) na Twojej skrzynce. Rano wystarczy jedno kliknięcie „Wyślij”.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/90 border border-white/10 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-300">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">2. Webhooki (Zapier / Make / n8n)</h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Podłącz webhook do formularza www lub skrzynki OLX. Każde zapytanie cenowe jest natychmiast analizowane przez Twoją bazę zasad.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/90 border border-white/10 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">3. API bezpośrednie</h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Skorzystaj z dedykowanego endpointu `/api/v1/persona/respond` i zintegruj sobowtóra z własnym oprogramowaniem lub botem Slacka.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/developer"
                className="btn-luxe-primary !py-3 !px-6 text-xs font-mono flex items-center gap-2"
              >
                <span>Pobierz klucz API i dokumentację OpenAPI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-xs font-mono text-slate-400">
                100% izolacja PostgreSQL RLS · Zero wycieku danych
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
