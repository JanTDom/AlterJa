"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import {
  Mic,
  Square,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Brain,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Radio,
  ShieldCheck,
  ChevronRight,
  Flame,
} from "lucide-react";

type VoiceState = "IDLE" | "CONNECTING" | "SPEAKING" | "LISTENING" | "TRANSCRIBING" | "ANALYZING";

interface DialogTurn {
  role: "assistant" | "user";
  text: string;
  rule?: string;
  layer?: string;
}

interface ExtractedRule {
  id: string;
  rule: string;
  layer: string;
  timestamp: string;
}

export default function VoiceInterviewPage() {
  const [state, setState] = useState<VoiceState>("IDLE");
  const [dialog, setDialog] = useState<DialogTurn[]>([]);
  const [rules, setRules] = useState<ExtractedRule[]>([]);
  const [currentAssistantText, setCurrentAssistantText] = useState<string>("");
  const [currentUserLiveText, setCurrentUserLiveText] = useState<string>("");
  const [activeLayer, setActiveLayer] = useState<string>("values");
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Zatrzymanie mowy i mikrofonu przy opuszczaniu widoku
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // Synteza mowy w języku polskim
  const speakText = (text: string, onEndCallback?: () => void) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || isMuted) {
      if (onEndCallback) onEndCallback();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pl-PL";
    utterance.rate = 0.96;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setState("SPEAKING");
    };

    utterance.onend = () => {
      currentUtteranceRef.current = null;
      if (onEndCallback) {
        onEndCallback();
      } else {
        setState("IDLE");
      }
    };

    utterance.onerror = () => {
      currentUtteranceRef.current = null;
      if (onEndCallback) onEndCallback();
      else setState("IDLE");
    };

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Rozpoczęcie proaktywnej sesji (Program inicjuje rozmowę pierwszy)
  const handleStartSession = async () => {
    setState("CONNECTING");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/interview/voice-turn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dialogHistory: [] }),
      });

      if (!res.ok) {
        throw new Error("Nie udało się nawiązać połączenia z silnikiem kognitywnym.");
      }

      const data = await res.json();
      const reply = data.assistantReply;
      setCurrentAssistantText(reply);
      setActiveLayer(data.targetLayer || "values");

      setDialog([{ role: "assistant", text: reply, layer: data.targetLayer }]);

      // Program od razu mówi powitanie na głos, po czym przełącza się w nasłuch
      speakText(reply, () => {
        startRecording();
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Wystąpił błąd";
      setErrorMessage(msg);
      setState("IDLE");
    }
  };

  // Rozpoczęcie nagrywania mowy użytkownika
  const startRecording = async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setErrorMessage("Twoja przeglądarka nie pozwala na nagrywanie dźwięku.");
      setState("IDLE");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await processUserVoice(audioBlob);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setState("LISTENING");
    } catch (err) {
      console.warn("Brak uprawnień do mikrofonu:", err);
      setErrorMessage("Proszę zezwolić na dostęp do mikrofonu, aby rozmawiać z programem.");
      setState("IDLE");
    }
  };

  // Zatrzymanie nagrywania i wysyłka do transkrypcji
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      setState("TRANSCRIBING");
      mediaRecorderRef.current.stop();
    }
  };

  // Przetworzenie głosu użytkownika przez multimodalne AI i dialog kognitywny
  const processUserVoice = async (audioBlob: Blob) => {
    setState("TRANSCRIBING");
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "user-response.webm");

      const transRes = await fetch("/api/voice/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!transRes.ok) {
        throw new Error("Błąd transkrypcji mowy.");
      }

      const transData = await transRes.json();
      const transcribedText = (transData.transcription || transData.text || "").trim();

      if (!transcribedText) {
        setErrorMessage("Nie zarejestrowano głosu. Spróbuj powtórzyć odpowiedź.");
        setState("IDLE");
        return;
      }

      setCurrentUserLiveText(transcribedText);

      // Aktualizacja historii dialogu o wypowiedź użytkownika
      const updatedHistory: DialogTurn[] = [...dialog, { role: "user", text: transcribedText }];
      setDialog(updatedHistory);

      // Analiza kognitywna i proaktywny follow-up asystenta
      setState("ANALYZING");
      const turnRes = await fetch("/api/interview/voice-turn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dialogHistory: updatedHistory,
          userSpeechText: transcribedText,
          activeLayer,
        }),
      });

      if (!turnRes.ok) {
        throw new Error("Błąd analizy kognitywnej.");
      }

      const turnData = await turnRes.json();

      // Zapis nowo odkrytej reguły myślenia
      if (turnData.extractedRule) {
        const newRuleItem: ExtractedRule = {
          id: `rule-${Date.now()}`,
          rule: turnData.extractedRule,
          layer: turnData.targetLayer || activeLayer,
          timestamp: new Date().toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" }),
        };
        setRules((prev) => [newRuleItem, ...prev]);
      }

      const nextAssistantSpeech = turnData.assistantReply;
      setCurrentAssistantText(nextAssistantSpeech);
      setActiveLayer(turnData.targetLayer || activeLayer);

      setDialog((prev) => [
        ...prev,
        {
          role: "assistant",
          text: nextAssistantSpeech,
          layer: turnData.targetLayer,
          rule: turnData.extractedRule,
        },
      ]);

      // Asystent odpowiada głosem, po czym znowu otwiera mikrofon użytkownika
      speakText(nextAssistantSpeech, () => {
        startRecording();
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Wystąpił błąd";
      setErrorMessage(msg);
      setState("IDLE");
    }
  };

  // Ponowne odczytanie ostatniego pytania asystenta
  const handleRepeatQuestion = () => {
    if (currentAssistantText) {
      speakText(currentAssistantText, () => {
        startRecording();
      });
    }
  };

  // Zakończenie sesji
  const handleEndSession = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setState("IDLE");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-300">
      <Navbar />

      {/* NAGŁÓWEK KINOWY Z DEDYKOWANYM AMBIENTEM */}
      <section className="relative w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-sky-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>Studio rozmowy głosowej · Proaktywny dialog kognitywny</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
              Proaktywny wywiad autobiograficzny
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Program sam prowadzi z Tobą rozmowę głosem: bada motywacje, analizuje reakcje na dylematy i w czasie rzeczywistym uziemia Twoje nadrzędne reguły myślenia.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-2 transition-colors"
              title={isMuted ? "Włącz dźwięk głosu" : "Wycisz dźwięk głosu"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
              <span>{isMuted ? "Głos wyłączony" : "Głos włączony"}</span>
            </button>

            <Link
              href="/interview"
              className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono transition-colors"
            >
              Tryb tekstowy
            </Link>
          </div>
        </div>
      </section>

      {/* GŁÓWNA POWIERZCHNIA INTERAKCJI GŁOSOWEJ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEWY PANEL: SCENA KINOWA I REAKTYWNY ORB GŁOSOWY */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 flex flex-col items-center justify-center min-h-[460px] overflow-hidden shadow-2xl backdrop-blur-md">
            {/* Tło fotograficzne w stylu Sphere */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <Image
                src="/images/alterja-sphere.jpg"
                alt="Sfera tożsamości"
                fill
                priority
                className="object-cover object-center filter blur-sm"
              />
            </div>

            {/* DYNAMICZNY KOGNITYWNY ORB GŁOSOWY */}
            <div className="relative z-10 flex flex-col items-center justify-center my-8">
              {/* Zewnętrzne aury animowane w zależności od stanu */}
              <div
                className={`w-44 h-44 sm:w-56 sm:h-56 rounded-full flex items-center justify-center transition-all duration-700 ${
                  state === "SPEAKING"
                    ? "bg-gradient-to-tr from-sky-500/20 via-blue-600/30 to-indigo-500/20 ring-4 ring-sky-400/40 animate-pulse scale-105"
                    : state === "LISTENING"
                    ? "bg-gradient-to-tr from-emerald-500/25 via-teal-600/30 to-sky-500/20 ring-4 ring-emerald-400/50 animate-pulse scale-110"
                    : state === "ANALYZING" || state === "TRANSCRIBING" || state === "CONNECTING"
                    ? "bg-gradient-to-tr from-amber-500/20 via-orange-600/25 to-yellow-500/20 ring-4 ring-amber-400/40 animate-spin"
                    : "bg-slate-800/40 ring-1 ring-slate-700/60 scale-95"
                }`}
              >
                {/* Wewnętrzny rdzeń orba */}
                <div
                  className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center transition-all shadow-inner ${
                    state === "SPEAKING"
                      ? "bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-sky-500/50 shadow-2xl"
                      : state === "LISTENING"
                      ? "bg-gradient-to-br from-emerald-400 to-teal-700 text-white shadow-emerald-500/50 shadow-2xl"
                      : state === "ANALYZING" || state === "TRANSCRIBING"
                      ? "bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-amber-500/50 shadow-2xl"
                      : "bg-slate-800 border border-slate-700 text-slate-400"
                  }`}
                >
                  {state === "SPEAKING" && <Radio className="w-10 h-10 animate-bounce" />}
                  {state === "LISTENING" && <Mic className="w-10 h-10 animate-pulse" />}
                  {(state === "ANALYZING" || state === "TRANSCRIBING" || state === "CONNECTING") && (
                    <Loader2 className="w-10 h-10 animate-spin" />
                  )}
                  {state === "IDLE" && <Brain className="w-10 h-10 text-slate-500" />}

                  <span className="text-[11px] font-mono tracking-wider uppercase mt-2 font-medium">
                    {state === "SPEAKING" && "AlterJa mówi"}
                    {state === "LISTENING" && "Słucham Cię"}
                    {state === "TRANSCRIBING" && "Transkrypcja"}
                    {state === "ANALYZING" && "Analiza toku"}
                    {state === "CONNECTING" && "Inicjacja"}
                    {state === "IDLE" && "Gotowy"}
                  </span>
                </div>
              </div>
            </div>

            {/* BIEŻĄCA TREŚĆ PYTANIA LUB WYPOWIEDZI NA ŻYWO */}
            <div className="relative z-10 w-full max-w-xl text-center space-y-3 px-2">
              {state === "IDLE" && dialog.length === 0 && (
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-serif text-white">
                    Rozpocznij proaktywny dialog poznawczy
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
                    Aplikacja przejrzy Twój profil, wykryje czego jeszcze o Tobie nie wie i zada Ci pierwsze sytuacyjne pytanie na głos.
                  </p>
                </div>
              )}

              {currentAssistantText && (
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-slate-200 text-sm sm:text-base font-serif leading-relaxed text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 block mb-1">
                    Głos AlterJi:
                  </span>
                  „{currentAssistantText}”
                </div>
              )}

              {errorMessage && (
                <p className="text-xs font-mono text-rose-400 bg-rose-950/30 border border-rose-900/50 p-2.5 rounded-xl">
                  {errorMessage}
                </p>
              )}
            </div>

            {/* KONTROLKI DOLNE */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-6 w-full">
              {state === "IDLE" && (
                <button
                  type="button"
                  onClick={handleStartSession}
                  className="px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium text-xs sm:text-sm shadow-lg shadow-sky-500/25 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Rozpocznij rozmowę głosową</span>
                </button>
              )}

              {state === "LISTENING" && (
                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium text-xs sm:text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition-all flex items-center gap-2 animate-pulse"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span>Zakończ wypowiedź i przeanalizuj</span>
                </button>
              )}

              {state === "SPEAKING" && (
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined" && "speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                    }
                    startRecording();
                  }}
                  className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-all flex items-center gap-2"
                >
                  <Mic className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Przejdź do odpowiedzi głosem</span>
                </button>
              )}

              {dialog.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={handleRepeatQuestion}
                    disabled={state === "CONNECTING" || state === "ANALYZING"}
                    className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono transition-all disabled:opacity-40"
                    title="Powtórz pytanie głosem"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleEndSession}
                    className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono transition-all"
                  >
                    Zakończ sesję
                  </button>
                </>
              )}
            </div>
          </div>

          {/* TRANSKRYPCJA PEŁNEGO DIALOGU W CZASIE RZECZYWISTYM */}
          {dialog.length > 0 && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Zapis przebiegu dialogu (weryfikacja faktów)</span>
              </h3>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-2 text-xs leading-relaxed">
                {dialog.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border ${
                      item.role === "assistant"
                        ? "bg-slate-950/60 border-slate-800 text-slate-300"
                        : "bg-sky-950/20 border-sky-900/40 text-sky-100 ml-4"
                    }`}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider block text-slate-500 mb-1">
                      {item.role === "assistant" ? "AlterJa (pytanie proaktywne)" : "Twój głos (transkrypcja)"}
                    </span>
                    <p className="font-sans">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PRAWY PANEL: RADAR POZNAWCZY — ZIDENTYFIKOWANY SYSTEM MYŚLENIA */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-sky-400" />
                <h2 className="text-base font-serif font-medium text-white">
                  Radar toku myślenia
                </h2>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                Odkryte reguły: {rules.length}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Każda Twoja odpowiedź głosowa jest analizowana pod kątem niezmiennych kryteriów decyzyjnych i natychmiast uziemia nową regułę w autobiograficznej pamięci RLS.
            </p>

            {rules.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl space-y-2">
                <Sparkles className="w-6 h-6 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-500 font-mono">
                  Zasady decyzyjne pojawią się tutaj natychmiast po udzieleniu pierwszej odpowiedzi głosem.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {rules.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-sky-500/40 transition-colors space-y-2 group"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span className="px-2 py-0.5 rounded bg-sky-950/60 text-sky-400 border border-sky-800/40 uppercase">
                        {r.layer}
                      </span>
                      <span>{r.timestamp}</span>
                    </div>

                    <p className="text-xs sm:text-sm font-sans text-slate-200 leading-snug font-medium">
                      „{r.rule}”
                    </p>

                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 pt-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Utrwalono w bazie pamięci</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <Link
                href="/memory"
                className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
              >
                <span>Przejdź do pełnej biblioteki pamięci</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
