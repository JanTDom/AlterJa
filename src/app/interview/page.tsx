"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  SkipForward,
  Brain,
  HelpCircle,
  Fingerprint,
  RefreshCw,
  Loader2,
  Award,
  Volume2,
  VolumeX,
  Mic,
  Square,
} from "lucide-react";
import { MemoryLayer } from "@/domains/types";

interface MicroQuestion {
  id: string;
  topic: string;
  question: string;
  context: string;
  category: MemoryLayer;
}

const INITIAL_QUESTIONS: MicroQuestion[] = [
  {
    id: "q-1",
    topic: "Kryteria wyboru ścieżki zawodowej",
    question: "Co w przeszłości najbardziej zaważyło na Twojej decyzji o zmianie środowiska pracy?",
    context: "Pozwala modelowi zrozumieć Twoje wartości w sferze zawodowej bez zgadywania.",
    category: "values",
  },
  {
    topic: "Reakcja na presję czasu",
    id: "q-2",
    question: "Gdy stajesz przed dylematem: dotrzymać terminu czy dopracować szczegół, jaki jest Twój naturalny odruch?",
    context: "Służy do kalibracji odpowiedzi w trybie asystenckim podczas nagłych kryzysów.",
    category: "decisions",
  },
  {
    id: "q-3",
    topic: "Odpoczynek i regeneracja",
    question: "Jakie warunki są dla Ciebie kluczowe, aby po intensywnym dniu naprawdę zregenerować siły?",
    context: "Pomaga asystentowi w planowaniu harmonogramu i poszanowaniu czasu ciszy.",
    category: "preferences",
  },
  {
    id: "q-4",
    topic: "Zarządzanie konfliktami",
    question: "Jak podchodzisz do sytuacji, w której kluczowy partner łamie wcześniejsze nieformalne ustalenie?",
    context: "Buduje warstwę wzorców reakcji w relacjach i negocjacjach.",
    category: "decisions",
  },
];

export default function InterviewPage() {
  const [questions, setQuestions] = useState<MicroQuestion[]>(INITIAL_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [answersCount, setAnswersCount] = useState(0);
  const [isGeneratingNext, setIsGeneratingNext] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [lastLearnedRule, setLastLearnedRule] = useState<string | null>(null);

  const currentQ = questions[currentIdx];

  // Odsłuch pytania głosem (SpeechSynthesis)
  const handleToggleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!currentQ) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentQ.question);
    utterance.lang = "pl-PL";
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Nagrywanie głosu użytkownika przez MediaRecorder i transkrypcja AI
  const handleToggleRecording = async () => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      return;
    }

    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      alert("Twoja przeglądarka nie obsługuje nagrywania dźwięku.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        if (chunks.length === 0) return;

        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        setIsTranscribing(true);

        try {
          const formData = new FormData();
          formData.append("audio", audioBlob, "voice-answer.webm");

          const res = await fetch("/api/voice/transcribe", {
            method: "POST",
            body: formData,
          });

          if (res.ok) {
            const data = await res.json();
            if (data.text) {
              setAnswerText((prev) => (prev ? `${prev} ${data.text}` : data.text));
            }
          }
        } catch (err) {
          console.warn("[Voice Transcription Error]", err);
        } finally {
          setIsTranscribing(false);
        }
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.warn("[Microphone Access Error]", err);
      alert("Nie udało się uzyskać dostępu do mikrofonu. Sprawdź uprawnienia w przeglądarce.");
    }
  };

  const handleSaveAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim() || isSaving) return;

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const savedText = answerText.trim();
    setIsSaving(true);

    try {
      const res = await fetch("/api/interview/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: currentQ.topic,
          questionText: currentQ.question,
          answerText: savedText,
          category: currentQ.category,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.cognitiveRule) {
          setLastLearnedRule(data.cognitiveRule);
        }
      }
    } catch (err) {
      console.warn("Błąd zapisu odpowiedzi przez API:", err);
    } finally {
      setIsSaving(false);
    }

    setAnswerText("");
    setAnswersCount((prev) => prev + 1);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsDone(true);
    }
  };

  const handleSkip = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setAnswerText("");
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsDone(true);
    }
  };

  const handleFetchAdaptiveQuestion = async () => {
    setIsGeneratingNext(true);
    try {
      const res = await fetch("/api/interview/generate-question", {
        method: "POST",
      });
      const data = await res.json();
      if (data && data.question) {
        setQuestions((prev) => [...prev, data]);
        setCurrentIdx(questions.length);
        setIsDone(false);
      }
    } catch (err) {
      console.error("[Adaptive Question Error]", err);
    } finally {
      setIsGeneratingNext(false);
    }
  };

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-blue/15 selection:text-alterja-blue">
      <Navbar />

      {/* PEŁNOFORMATOWA KINOWA SCENA FOTOGRAFICZNA — ALTERJA-SPHERE */}
      <section className="relative w-full min-h-[360px] md:min-h-[420px] flex items-center overflow-hidden bg-slate-950 border-b border-slate-800">
        <Image
          src="/images/alterja-sphere.jpg"
          alt="Sfera pytań ukrytych w pamięci i koncentryczne orbity tożsamości"
          fill
          priority
          className="object-cover object-center filter brightness-90 contrast-110 scale-[1.01]"
        />

        {/* Dynamiczny skaner biometryczny */}
        <div className="absolute inset-0 scanline-bar opacity-25 pointer-events-none" />

        {/* Kurtyna asymetryczna */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-blue-300 text-xs font-mono backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Studio wywiadu · Adaptacyjny silnik poznawczy</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white editorial-display leading-tight">
              Wywiad autobiograficzny o wysokiej wartości
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
              Model nie zgaduje Twoich poglądów — pyta o konkretne dylematy i kryteria życiowe. Każda odpowiedź natychmiast uziemia nową kartę pamięci.
            </p>
          </div>

          <div className="flex items-center gap-4 px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 text-xs font-mono text-slate-300 shadow-xl">
            <Fingerprint className="w-4 h-4 text-emerald-400" />
            <span>Zapisano odpowiedzi: {answersCount}</span>
          </div>
        </div>
      </section>

      {/* GŁÓWNA POWIERZCHNIA WYWIADU */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-8">
        {/* BANER PROAKTYWNEJ ROZMOWY GŁOSOWEJ */}
        <div className="rounded-3xl border border-sky-200/80 bg-gradient-to-r from-sky-50 via-blue-50/60 to-indigo-50/40 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Mic className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-900">
                Wolisz rozmawiać naturalnie głosem?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                Uruchom proaktywny dialog głosowy. Program sam rozpocznie rozmowę, zbada Twój system wartości i w locie wyekstrahuje zasady myślenia.
              </p>
            </div>
          </div>
          <Link
            href="/interview/voice"
            className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium transition-all shadow-md shrink-0 flex items-center justify-center gap-2 self-start sm:self-auto"
          >
            <span>Przejdź do rozmowy głosowej</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {!isDone && currentQ ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span className="px-2.5 py-1 rounded-full bg-alterja-blue/10 text-alterja-blue font-semibold uppercase">
                  Pytanie {currentIdx + 1} z {questions.length}
                </span>
                <span>• Warstwa: {currentQ.category}</span>
              </div>

              <button
                type="button"
                onClick={handleFetchAdaptiveQuestion}
                disabled={isGeneratingNext}
                className="text-xs font-mono text-alterja-blue hover:underline flex items-center gap-1.5 disabled:opacity-50"
              >
                {isGeneratingNext ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )}
                <span>Wygeneruj nowe pytanie AI</span>
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-medium block">
                {currentQ.topic}
              </span>
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-serif font-medium text-slate-950 leading-relaxed">
                  {currentQ.question}
                </h2>
                <button
                  type="button"
                  onClick={handleToggleSpeak}
                  className={`p-2.5 rounded-full border transition-all shrink-0 ${
                    isSpeaking
                      ? "bg-amber-100 border-amber-300 text-amber-700 animate-pulse"
                      : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
                  }`}
                  title={isSpeaking ? "Zatrzymaj czytanie na głos" : "Odczytaj pytanie na głos"}
                  aria-label={isSpeaking ? "Zatrzymaj czytanie na głos" : "Odczytaj pytanie na głos"}
                >
                  {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-slate-500 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <strong className="text-slate-700">Wpływ na model:</strong> {currentQ.context}
              </p>
            </div>

            {lastLearnedRule && (
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200/80 text-sky-950 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-700 font-medium">
                  <Brain className="w-3.5 h-3.5" />
                  <span>Zidentyfikowana zasada myślenia (utrwalona w pamięci)</span>
                </div>
                <p className="text-xs sm:text-sm font-sans leading-relaxed">
                  „{lastLearnedRule}”
                </p>
              </div>
            )}

            <form onSubmit={handleSaveAnswer} className="space-y-4">
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                <span>Wpisz odpowiedź lub odpowiedz głosem do mikrofonu:</span>
                <button
                  type="button"
                  onClick={handleToggleRecording}
                  disabled={isTranscribing}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                    isRecording
                      ? "bg-red-500 text-white border-red-600 animate-pulse"
                      : isTranscribing
                      ? "bg-slate-100 text-slate-400 border-slate-200 cursor-wait"
                      : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
                  }`}
                >
                  {isRecording ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Zakończ nagrywanie</span>
                    </>
                  ) : isTranscribing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transkrypcja AI...</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5" />
                      <span>Mów odpowiedź</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                rows={6}
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Napisz szczerze i własnymi słowami lub użyj przycisku »Mów odpowiedź« powyżej. Model uczy się Twojego autentycznego toku myślenia..."
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue leading-relaxed font-sans"
                required
              />

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-5 py-2.5 rounded-2xl text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  <span>Pomiń to pytanie</span>
                </button>

                <button
                  type="submit"
                  disabled={!answerText.trim() || isSaving}
                  className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Analiza kognitywna i zapis...</span>
                    </>
                  ) : (
                    <>
                      <span>Zapisz w pamięci i przejdź dalej</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-medium text-slate-950">
                Sesja wywiadu zakończona
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Zapisano wszystkie odpowiedzi w bibliotece pamięci. Możesz przejść do rozmowy w trybie Rekonstrukcji lub wygenerować kolejne adaptacyjne pytania AI badające pozostałe warstwy.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={handleFetchAdaptiveQuestion}
                disabled={isGeneratingNext}
                className="px-6 py-3 rounded-2xl bg-alterja-blue hover:bg-blue-700 text-white text-xs font-medium shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                {isGeneratingNext ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>Wygeneruj kolejne mikropytanie AI</span>
              </button>

              <a
                href="/chat"
                className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium shadow-md transition-all active:scale-95"
              >
                Przejdź do czatu z modelem
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
