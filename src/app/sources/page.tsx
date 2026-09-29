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
} from "lucide-react";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { SourceItem } from "@/domains/types";

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

  const [previewData, setPreviewData] = useState<{
    title: string;
    content: string;
    isThirdParty: boolean;
    isSyntheticAi: boolean;
    wordCount: number;
    sizeBytes: number;
  } | null>(null);

  const [notice, setNotice] = useState<string | null>(null);

  const refresh = () => setSources([...globalStore.getSources(DEMO_USER_ID)]);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

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
        showNotice(`Wczytano plik: ${file.name} (${words} słów)`);
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
        stream.getTracks().forEach((track) => track.stop());
        setIsTranscribing(true);

        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.webm");

        try {
          const res = await fetch("/api/voice/transcribe", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (data.transcription) {
            setPasteTitle(`Notatka głosowa (${new Date().toLocaleTimeString("pl-PL")})`);
            setPasteContent(data.transcription);
            setActiveTab("paste");
            showNotice("Transkrypcja nagrania powiodła się.");
          }
        } catch {
          showNotice("Błąd podczas transkrypcji nagrania.");
        } finally {
          setIsTranscribing(false);
        }
      };

      recorder.start(250);
      setIsRecording(true);
      setRecordSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);
    } catch {
      showNotice("Brak dostępu do mikrofonu lub przeglądarka blokuje nagrywanie.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
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

  const handleConfirmImport = () => {
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

    // Automatyczne zasilenie biblioteki pamięci z dowodem
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
    showNotice(`Pomyślnie zaimportowano: „${previewData.title}” do bazy wiedzy.`);
  };

  const handleDelete = (id: string, title: string) => {
    globalStore.deleteSource(DEMO_USER_ID, id);
    refresh();
    showNotice(`Usunięto źródło: „${title}”.`);
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
              Każde słowo, esej, transkrypcja czy notatka staje się uziemionym dowodem. System automatycznie izoluje wypowiedzi osób trzecich i chroni model przed wtórnymi halucynacjami.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 text-xs font-mono text-slate-300 shadow-xl">
            <Shield className="w-4 h-4 text-alterja-gold" />
            <span>Kwalifikacja epistemiczna</span>
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
                  placeholder="Np. Rozważania o priorytetach 2026, Notatka ze spotkania z zarządem..."
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
                  placeholder="Wklej surowy tekst notatek, eseju, korespondencji..."
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
        {previewData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
            <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-alterja-blue font-bold tracking-wider">
                  Kwalifikacja danych
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

              <div className="max-h-40 overflow-y-auto p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed">
                {previewData.content}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setPreviewData(null)}
                  className="px-5 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
                >
                  Anuluj
                </button>
                <button
                  onClick={handleConfirmImport}
                  className="px-5 py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium shadow-md active:scale-95"
                >
                  Zatwierdź import do pamięci
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
