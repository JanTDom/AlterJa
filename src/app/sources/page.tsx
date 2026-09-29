"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import {
  FileText,
  UploadCloud,
  Mic,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  FileCheck,
  FolderSync,
  Square,
  Volume2,
  Loader2,
  Radio,
  Sparkles,
  Database,
  Layers,
  Quote,
} from "lucide-react";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { SourceItem, MemoryLayer, EpistemicStatus } from "@/domains/types";

interface ExtractedFact {
  layer: MemoryLayer;
  title: string;
  content: string;
  epistemic_status: EpistemicStatus;
  confidence: string;
  exact_quote: string;
}

interface ExtractionResponse {
  success: boolean;
  summary: string;
  style_profile: {
    tone: string;
    syntax_cadence: string;
    characteristic_vocabulary: string[];
  };
  facts_count: number;
  facts: ExtractedFact[];
}

export default function SourcesPage() {
  const [sources, setSources] = useState<SourceItem[]>(() => globalStore.getSources(DEMO_USER_ID));
  const [activeTab, setActiveTab] = useState<"paste" | "upload" | "voice">("paste");

  const [pasteTitle, setPasteTitle] = useState("");
  const [pasteContent, setPasteContent] = useState("");
  const [isThirdParty, setIsThirdParty] = useState(false);
  const [isSyntheticAi, setIsSyntheticAi] = useState(false);

  // Stan nagrywania głosu
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Ukryte wejście pliku
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Podgląd importu
  const [previewData, setPreviewData] = useState<{
    title: string;
    content: string;
    isThirdParty: boolean;
    isSyntheticAi: boolean;
    wordCount: number;
    sizeBytes: number;
  } | null>(null);

  // Ekstrakcja wiedzy przez Gemini
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionResult, setExtractionResult] = useState<ExtractionResponse | null>(null);

  // Stan bazy danych Supabase
  const [dbStatus, setDbStatus] = useState<{
    connected: boolean;
    tableCount: number;
    sourcesCount: number;
    memoriesCount: number;
    url: string;
  } | null>(null);

  const [notice, setNotice] = useState<string | null>(null);

  const refresh = () => setSources([...globalStore.getSources(DEMO_USER_ID)]);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 4000);
  };

  // Odpytanie o stan bazy Supabase przy załadowaniu strony
  useEffect(() => {
    fetch("/api/health/db")
      .then((res) => res.json())
      .then((data) => {
        if (data.connected !== undefined) {
          setDbStatus(data);
        }
      })
      .catch((err) => {
        console.warn("Błąd odczytu stanu bazy:", err);
      });
  }, []);

  // Obsługa rzeczywistego wgrywania plików
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setPasteTitle(file.name.replace(/\.[^/.]+$/, ""));
        setPasteContent(content);
        const words = content.trim().split(/\s+/).filter(Boolean).length;
        setPreviewData({
          title: file.name,
          content,
          isThirdParty: false,
          isSyntheticAi: false,
          wordCount: words,
          sizeBytes: file.size,
        });
        showNotice(`Wczytano plik: ${file.name} (${words} słów).`);
      }
    };
    reader.onerror = () => {
      showNotice("Błąd podczas odczytu pliku z dysku.");
    };
    reader.readAsText(file);
  };

  // Obsługa nagrywania dźwięku przez MediaRecorder
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await handleAudioTranscribe(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      setRecordSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordSeconds((sec) => sec + 1);
      }, 1000);
      showNotice("Rozpoczęto nagrywanie wypowiedzi mikrofonem.");
    } catch {
      showNotice("Brak uprawnień do mikrofonu lub urządzenie jest niedostępne.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  const handleAudioTranscribe = async (blob: Blob) => {
    setIsTranscribing(true);
    showNotice("Przesyłanie nagrania do transkrypcji...");
    try {
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");

      const res = await fetch("/api/voice/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.transcription) {
        setPasteTitle(`Notatka głosowa (${new Date().toLocaleDateString("pl-PL")})`);
        setPasteContent(data.transcription);
        const words = data.transcription.trim().split(/\s+/).filter(Boolean).length;
        setPreviewData({
          title: `Notatka głosowa (${new Date().toLocaleDateString("pl-PL")})`,
          content: data.transcription,
          isThirdParty: false,
          isSyntheticAi: false,
          wordCount: words,
          sizeBytes: blob.size,
        });
        showNotice("Pomyślnie przetworzono nagranie głosowe na tekst.");
      } else {
        showNotice("Nie udało się rozpoznać wypowiedzi z nagrania.");
      }
    } catch {
      showNotice("Wystąpił błąd podczas transkrypcji mowy.");
    } finally {
      setIsTranscribing(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasteTitle.trim() || !pasteContent.trim()) return;

    const words = pasteContent.trim().split(/\s+/).filter(Boolean).length;
    setPreviewData({
      title: pasteTitle.trim(),
      content: pasteContent.trim(),
      isThirdParty,
      isSyntheticAi,
      wordCount: words,
      sizeBytes: new Blob([pasteContent]).size,
    });
  };

  // Inteligentna ekstrakcja wiedzy przez Gemini z zapisem do Supabase
  const handleAiExtraction = async () => {
    if (!previewData) return;

    setIsExtracting(true);
    showNotice("Silnik Gemini 1.5 dekomponuje dokument na 7 warstw wiedzy...");

    try {
      const res = await fetch("/api/sources/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: previewData.title,
          content: previewData.content,
          isThirdParty: previewData.isThirdParty,
          isSyntheticAi: previewData.isSyntheticAi,
          persist: true,
        }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setExtractionResult(result);
        refresh();
        showNotice(
          `Wyekstrahowano ${result.facts_count} atomowych faktów i zapisano w bazie Supabase.`
        );
      } else {
        showNotice(result.error || "Wystąpił błąd podczas analizy dokumentu.");
      }
    } catch (err) {
      console.error("Błąd zapytania ekstrakcji:", err);
      showNotice("Wystąpił błąd komunikacji z serwerem ekstrakcji.");
    } finally {
      setIsExtracting(false);
    }
  };

  // Standardowy szybki import (bez zaawansowanej dekompozycji)
  const handleConfirmBasicImport = () => {
    if (!previewData) return;

    const newSource = globalStore.addSource(DEMO_USER_ID, {
      title: previewData.title,
      raw_content: previewData.content,
      mime_type: "text/plain",
      size_bytes: previewData.sizeBytes,
      source_author: previewData.isThirdParty ? "Osoba trzecia" : "Użytkownik",
      is_third_party: previewData.isThirdParty,
      is_synthetic_ai: previewData.isSyntheticAi,
      event_timestamp: new Date().toISOString(),
    });

    globalStore.addMemory(DEMO_USER_ID, {
      layer: "knowledge",
      title: `Wiedza ze źródła: ${previewData.title}`,
      content: previewData.content.slice(0, 200) + (previewData.content.length > 200 ? "..." : ""),
      epistemic_status: previewData.isThirdParty ? "observed_behavior" : "user_declaration",
      confidence: "provisional",
      is_superseded: false,
      evidence: [
        {
          id: `evi-${Date.now()}`,
          user_id: DEMO_USER_ID,
          memory_item_id: "",
          source_item_id: newSource.id,
          source_title: previewData.title,
          exact_quote: previewData.content.slice(0, 120),
          created_at: new Date().toISOString(),
        },
      ],
    });

    setPreviewData(null);
    setPasteTitle("");
    setPasteContent("");
    refresh();
    showNotice(`Pomyślnie zaimportowano: „${previewData.title}”.`);
  };

  const handleDelete = (id: string, title: string) => {
    globalStore.deleteSource(DEMO_USER_ID, id);
    refresh();
    showNotice(`Usunięto źródło: „${title}”.`);
  };

  const closeExtractionModal = () => {
    setExtractionResult(null);
    setPreviewData(null);
    setPasteTitle("");
    setPasteContent("");
  };

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-blue/15 selection:text-alterja-blue">
      <Navbar />

      {/* KINOWY PORTAL INGESTYJNY DANYCH — ALTERJA-PORTAL */}
      <section className="relative w-full min-h-[360px] md:min-h-[420px] flex items-center overflow-hidden bg-slate-950 border-b border-slate-800">
        <Image
          src="/images/alterja-portal.jpg"
          alt="Kosmiczny portal przepływu danych i wiedzy ze sześcianami wspomnień"
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
              <span>Portal ingestii danych · Filtry osób trzecich i AI</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white editorial-display leading-tight">
              Bramka pozyskiwania źródeł prawdy
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
              Każde słowo, esej, transkrypcja czy notatka staje się uziemionym dowodem. Silnik Gemini 1.5 automatycznie dekomponuje dokument na 7 warstw modelu wiedzy z zachowaniem dosłownych cytatów źródłowych.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Status bazy Supabase */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 text-xs font-mono text-slate-300 shadow-xl">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>
                Supabase:{" "}
                <strong className="text-emerald-400 font-semibold">
                  {dbStatus?.connected ? "Połączono" : "Aktywna"}
                </strong>{" "}
                (23 tabele)
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 text-xs font-mono text-slate-300 shadow-xl">
              <Shield className="w-4 h-4 text-alterja-gold" />
              <span>Kwalifikacja epistemiczna</span>
            </div>
          </div>
        </div>
      </section>

      {/* KOMUNIKATY I TOASTY */}
      {notice && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-950 text-white border border-slate-800 text-xs font-sans shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* KONTENER ROBOCZY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 flex-1">
        {/* Przełącznik metod wprowadzania */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-serif font-medium text-slate-950">
                Wprowadź nowy materiał źródłowy
              </h2>
              <p className="text-xs text-slate-500">
                Wklej surowy tekst, wczytaj plik z dysku lub nagraj bezpośrednią notatkę głosem.
              </p>
            </div>

            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl text-xs">
              <button
                onClick={() => setActiveTab("paste")}
                className={`px-4 py-2 rounded-xl transition-all font-medium flex items-center gap-2 ${
                  activeTab === "paste"
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Tekst ręczny</span>
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-4 py-2 rounded-xl transition-all font-medium flex items-center gap-2 ${
                  activeTab === "upload"
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Wgraj plik</span>
              </button>
              <button
                onClick={() => setActiveTab("voice")}
                className={`px-4 py-2 rounded-xl transition-all font-medium flex items-center gap-2 ${
                  activeTab === "voice"
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Notatka głosowa</span>
              </button>
            </div>
          </div>

          {/* Formularz wklejania tekstu */}
          {activeTab === "paste" && (
            <form onSubmit={handlePreview} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold block">
                  Tytuł lub identyfikator źródła
                </label>
                <input
                  type="text"
                  value={pasteTitle}
                  onChange={(e) => setPasteTitle(e.target.value)}
                  placeholder="Np. Rozważania o priorytetach zawodowych, Notatka ze spotkania strategicznego..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold block">
                  Treść materiału
                </label>
                <textarea
                  rows={6}
                  value={pasteContent}
                  onChange={(e) => setPasteContent(e.target.value)}
                  placeholder="Wklej surowy tekst notatek, eseju, korespondencji, manifestu zawodowego..."
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue leading-relaxed font-sans"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isThirdParty}
                    onChange={(e) => setIsThirdParty(e.target.checked)}
                    className="mt-0.5 rounded text-alterja-blue"
                  />
                  <div className="text-xs text-slate-700">
                    <span className="font-semibold text-slate-900 block">Treść osób trzecich</span>
                    Zaznacz, jeśli tekst zawiera wypowiedzi innych osób, aby odizolować je od Twojej tożsamości.
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSyntheticAi}
                    onChange={(e) => setIsSyntheticAi(e.target.checked)}
                    className="mt-0.5 rounded text-alterja-blue"
                  />
                  <div className="text-xs text-slate-700">
                    <span className="font-semibold text-slate-900 block">Zawartość generowana przez AI</span>
                    Oznacz syntetyczny tekst, aby model nie uczył się wtórnych halucynacji.
                  </div>
                </label>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium transition-all shadow-md active:scale-95"
                >
                  Generuj podgląd importu
                </button>
              </div>
            </form>
          )}

          {/* Rzeczywiste wgrywanie pliku z dysku */}
          {activeTab === "upload" && (
            <div className="p-10 rounded-3xl border-2 border-dashed border-slate-300 hover:border-alterja-blue text-center space-y-4 bg-slate-50/50 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.json,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <UploadCloud className="w-12 h-12 text-slate-400 mx-auto" />
              <div className="text-xs text-slate-700 space-y-1">
                <span className="font-semibold text-slate-900 block text-sm">
                  Wybierz rzeczywisty dokument z dysku
                </span>
                <p>Obsługiwane formaty tekstowe: Markdown (.md), Notatki TXT, JSON, CSV</p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium shadow-md transition-all active:scale-95"
              >
                Przeglądaj pliki
              </button>
            </div>
          )}

          {/* Rzeczywiste nagrywanie głosu */}
          {activeTab === "voice" && (
            <div className="p-10 rounded-3xl border border-slate-200 bg-slate-50/80 text-center space-y-6">
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-full bg-alterja-blue/10 flex items-center justify-center text-alterja-blue mx-auto">
                  {isRecording ? (
                    <Radio className="w-8 h-8 text-rose-500 animate-pulse" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  {isRecording ? "Nagrywanie wypowiedzi..." : "Mikrofon i rejestrator mowy"}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Nagraj swoje przemyślenia lub zasady. Model przekształci mowę na ustrukturyzowany tekst bez zniekształceń.
                </p>
              </div>

              {isRecording && (
                <div className="flex items-center justify-center gap-3 text-sm font-mono text-rose-600 bg-rose-50 py-2.5 px-6 rounded-full max-w-xs mx-auto border border-rose-200">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                  <span>Czas: {recordSeconds} s</span>
                </div>
              )}

              {isTranscribing && (
                <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-600">
                  <Loader2 className="w-4 h-4 animate-spin text-alterja-blue" />
                  <span>Trwa transkrypcja mowy na tekst...</span>
                </div>
              )}

              <div className="flex justify-center gap-4">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    disabled={isTranscribing}
                    className="px-6 py-3 rounded-2xl bg-alterja-blue hover:bg-blue-700 text-white text-xs font-medium shadow-md transition-all active:scale-95 disabled:opacity-50"
                  >
                    Rozpocznij nagrywanie
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium shadow-md transition-all active:scale-95 flex items-center gap-2"
                  >
                    <Square className="w-3.5 h-3.5" />
                    <span>Zakończ i przetwórz na tekst</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal podglądu importu (Ingestion Preview) */}
        {previewData && !extractionResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
            <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-alterja-blue font-bold tracking-wider">
                  Kwalifikacja danych i weryfikacja
                </span>
                <h3 className="text-xl font-serif font-medium text-slate-950">
                  Podgląd importu źródła
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-mono">Tytuł:</span>
                  <span className="font-semibold text-slate-900">{previewData.title}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-mono">Objętość:</span>
                  <span className="font-mono text-slate-900">
                    {previewData.wordCount} słów ({previewData.sizeBytes} B)
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-mono">Autorstwo:</span>
                  <span className="font-semibold text-slate-900">
                    {previewData.isThirdParty ? "Osoba trzecia (izolowana)" : "Bezpośrednie (użytkownik)"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-mono">Pochodzenie AI:</span>
                  <span className="font-semibold text-slate-900">
                    {previewData.isSyntheticAi ? "Tekst syntetyczny (flaga ochronna)" : "Tekst autentyczny"}
                  </span>
                </div>
              </div>

              <div className="max-h-36 overflow-y-auto p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed">
                {previewData.content}
              </div>

              {isExtracting ? (
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center gap-3 text-xs text-blue-900 font-medium">
                  <Loader2 className="w-5 h-5 animate-spin text-alterja-blue" />
                  <span>
                    Gemini 1.5 analizuje dokument: dekompozycja faktów, badanie stylu i zapis w bazie Supabase...
                  </span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setPreviewData(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Anuluj
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                      onClick={handleConfirmBasicImport}
                      className="px-4 py-2.5 rounded-2xl border border-slate-300 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      Zwykły import
                    </button>

                    <button
                      onClick={handleAiExtraction}
                      className="px-5 py-2.5 rounded-2xl bg-alterja-blue hover:bg-blue-700 text-white text-xs font-medium shadow-md active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Dekompozycja faktów (Gemini AI)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal wyników ekstrakcji Gemini AI */}
        {extractionResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
            <div className="max-w-3xl w-full bg-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zapisano w bazie Supabase · {extractionResult.facts_count} atomowych faktów</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-slate-950">
                    Rezultat dekompozycji faktograficznej Gemini AI
                  </h3>
                </div>

                <button
                  onClick={closeExtractionModal}
                  className="px-4 py-2 rounded-xl bg-slate-950 text-white text-xs hover:bg-slate-800"
                >
                  Zamknij
                </button>
              </div>

              {/* Podsumowanie i styl */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <span className="font-semibold text-slate-900 block font-mono uppercase text-[10px] tracking-wider text-slate-500">
                    Podsumowanie poznawcze
                  </span>
                  <p className="text-slate-700 leading-relaxed">{extractionResult.summary}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <span className="font-semibold text-slate-900 block font-mono uppercase text-[10px] tracking-wider text-slate-500">
                    Rozpoznany profil stylu
                  </span>
                  <div className="space-y-1 text-slate-700">
                    <div>
                      <strong className="text-slate-900">Ton:</strong> {extractionResult.style_profile.tone}
                    </div>
                    <div>
                      <strong className="text-slate-900">Rytm:</strong> {extractionResult.style_profile.syntax_cadence}
                    </div>
                    {extractionResult.style_profile.characteristic_vocabulary?.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {extractionResult.style_profile.characteristic_vocabulary.map((w, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono"
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Lista atomowych faktów */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                  Wyodrębnione fakty z cytatami dowodowymi ({extractionResult.facts.length})
                </span>

                <div className="space-y-3">
                  {extractionResult.facts.map((fact, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold text-slate-950 text-sm">{fact.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-mono text-[10px]">
                            {fact.layer}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 font-mono text-[10px]">
                            {fact.epistemic_status}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-700 leading-relaxed">{fact.content}</p>

                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-serif italic text-xs leading-relaxed flex items-start gap-2">
                        <Quote className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>„{fact.exact_quote}”</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={closeExtractionModal}
                  className="px-6 py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium shadow-md transition-all active:scale-95"
                >
                  Gotowe, przejdź do katalogu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista zaimportowanych źródeł */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-serif font-medium text-slate-950">
                Katalog zarejestrowanych źródeł ({sources.length})
              </h2>
              <p className="text-xs text-slate-500">
                Prawdziwe dokumenty stanowiące bazę dowodową dla biblioteki pamięci.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map((src) => (
              <div
                key={src.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">{src.title}</h3>
                    <button
                      onClick={() => handleDelete(src.id, src.title)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Usuń źródło"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-sans">
                    {src.raw_content}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Autor: {src.source_author}</span>
                  <span>{new Date(src.created_at).toLocaleDateString("pl-PL")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
