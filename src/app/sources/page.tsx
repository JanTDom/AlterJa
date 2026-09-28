"use client";

import React, { useState } from "react";
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

  const [previewData, setPreviewData] = useState<{
    title: string;
    content: string;
    isThirdParty: boolean;
    isSyntheticAi: boolean;
    wordCount: number;
  } | null>(null);

  const [notice, setNotice] = useState<string | null>(null);

  const refresh = () => setSources([...globalStore.getSources(DEMO_USER_ID)]);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasteTitle.trim() || !pasteContent.trim()) return;

    const words = pasteContent.trim().split(/\s+/).length;
    setPreviewData({
      title: pasteTitle.trim(),
      content: pasteContent.trim(),
      isThirdParty,
      isSyntheticAi,
      wordCount: words,
    });
  };

  const handleConfirmImport = () => {
    if (!previewData) return;

    const newSource = globalStore.addSource(DEMO_USER_ID, {
      title: previewData.title,
      raw_content: previewData.content,
      mime_type: "text/plain",
      size_bytes: new Blob([previewData.content]).size,
      source_author: previewData.isThirdParty ? "Osoba trzecia" : "Użytkownik",
      is_third_party: previewData.isThirdParty,
      is_synthetic_ai: previewData.isSyntheticAi,
      event_timestamp: new Date().toISOString(),
    });

    globalStore.addMemory(DEMO_USER_ID, {
      layer: "knowledge",
      title: `Wiedza ze źródła: ${previewData.title}`,
      content: previewData.content.slice(0, 180) + "...",
      epistemic_status: previewData.isThirdParty ? "observed_behavior" : "user_declaration",
      confidence: "provisional",
      is_superseded: false,
    });

    setPreviewData(null);
    setPasteTitle("");
    setPasteContent("");
    setIsThirdParty(false);
    setIsSyntheticAi(false);
    refresh();
    showNotice("Źródło zostało pomyślnie przetworzone i dodane do pamięci.");
  };

  const handleDelete = (id: string) => {
    globalStore.deleteSource(DEMO_USER_ID, id);
    refresh();
    showNotice("Źródło i powiązane z nim dowody zostały usunięte.");
  };

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-blue/15 selection:text-alterja-blue">
      <Navbar />

      {notice && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white text-xs px-5 py-3.5 rounded-full shadow-2xl border border-white/20 flex items-center gap-3 animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="font-medium tracking-tight">{notice}</span>
        </div>
      )}

      {/* PEŁNOFORMATOWA KINOWA SCENA FOTOGRAFICZNA (MIND-LANDSCAPE) */}
      <section className="relative w-full min-h-[400px] md:min-h-[460px] flex items-center overflow-hidden bg-slate-950">
        <Image
          src="/images/mind-landscape.jpg"
          alt="Świecąca góra wiedzy i krystaliczne miasto pamięci AlterJa"
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/20 text-emerald-300 text-xs font-mono backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Zasilanie tożsamości · Autentyczne materiały</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white editorial-display leading-tight">
              Twoje źródła wiedzy i notatki
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-xl">
              Wgraj swoje maile, notatki, artykuły i zasady. Niech Twoja kopia uczy się wyłącznie na Twoich autentycznych materiałach, a nie na korporacyjnym bełkocie.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/15 text-xs font-mono text-slate-300 shadow-xl">
            <FolderSync className="w-4 h-4 text-emerald-400" />
            <span>{sources.length} podłączonych źródeł</span>
          </div>
        </div>
      </section>

      {/* OBSZAR ROBOCZY */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 relative z-20 -mt-10 sm:-mt-12">
        {/* Panel dodawania źródła w luksusowym szkle */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <button
              onClick={() => setActiveTab("paste")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === "paste" ? "bg-slate-950 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Wklej tekst lub notatkę
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === "upload" ? "bg-slate-950 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Prześlij plik (PDF, TXT, MD)
            </button>
            <button
              onClick={() => setActiveTab("voice")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === "voice" ? "bg-slate-950 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Nagraj głos
            </button>
          </div>

          {activeTab === "paste" && (
            <form onSubmit={handlePreview} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Tytuł źródła lub kontekst</label>
                <input
                  type="text"
                  required
                  value={pasteTitle}
                  onChange={(e) => setPasteTitle(e.target.value)}
                  placeholder="np. Moje zasady negocjacji kontraktów IT"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Treść tekstu do analizy</label>
                <textarea
                  rows={6}
                  required
                  value={pasteContent}
                  onChange={(e) => setPasteContent(e.target.value)}
                  placeholder="Wklej surowy tekst notatek, eseju, korespondencji..."
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue font-sans leading-relaxed shadow-inner"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium transition-all shadow-md active:scale-95"
                >
                  Generuj podgląd importu
                </button>
              </div>
            </form>
          )}

          {activeTab === "upload" && (
            <div className="p-12 rounded-3xl border-2 border-dashed border-slate-200 text-center space-y-3">
              <UploadCloud className="w-10 h-10 text-slate-400 mx-auto" />
              <div className="text-xs text-slate-700">
                <span className="font-semibold text-slate-900 block text-sm">Przeciągnij i upuść pliki</span>
                Obsługiwane formaty: Markdown, TXT, PDF (do 25 MB)
              </div>
              <button
                onClick={() => {
                  setPasteTitle("Dokument zaimportowany z pliku");
                  setPasteContent("Przykładowa treść wyekstrahowana z zaimportowanego pliku dokumentu.");
                  setActiveTab("paste");
                }}
                className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-800 hover:bg-slate-50 shadow-sm active:scale-95"
              >
                Wybierz plik z dysku
              </button>
            </div>
          )}

          {activeTab === "voice" && (
            <div className="p-12 rounded-3xl border-2 border-dashed border-slate-200 text-center space-y-3">
              <Mic className="w-10 h-10 text-alterja-blue mx-auto" />
              <div className="text-xs text-slate-700">
                <span className="font-semibold text-slate-900 block text-sm">Transkrypcja mowy na żywo</span>
                Nagranie audio z detekcją mówców i automatyczną eliminacją osób trzecich
              </div>
              <button
                onClick={() => {
                  setPasteTitle("Notatka głosowa");
                  setPasteContent("Nagranie: Ważne jest, abyśmy w architekturze zawsze oddzielali domenę od infrastruktury.");
                  setActiveTab("paste");
                }}
                className="px-6 py-2.5 rounded-2xl bg-alterja-blue hover:bg-blue-700 text-white text-xs font-medium shadow-md active:scale-95"
              >
                Rozpocznij nagrywanie
              </button>
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
                <h3 className="text-xl font-serif font-medium text-slate-950 editorial-display">
                  Podgląd importu źródła
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between font-mono text-slate-500">
                  <span>Tytuł: {previewData.title}</span>
                  <span>Liczba słów: {previewData.wordCount}</span>
                </div>
                <p className="text-slate-800 line-clamp-4 font-mono leading-relaxed">{previewData.content}</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setPreviewData(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Odrzuć
                </button>
                <button
                  onClick={handleConfirmImport}
                  className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium shadow-md active:scale-95"
                >
                  Zatwierdź i włącz do pamięci
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista podłączonych źródeł */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-medium text-slate-950 editorial-display">
              Podłączone źródła wiedzy
            </h2>
            <span className="text-xs font-mono text-slate-500">{sources.length} aktywnych źródeł</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map((src) => (
              <div
                key={src.id}
                className="p-5 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-950">{src.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {src.is_synthetic_ai ? "Treść AI" : src.is_third_party ? "Osoba trzecia" : "Tekst własny"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {src.raw_content || "Brak treści źródłowej"}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{new Date(src.created_at).toLocaleDateString("pl-PL")}</span>
                  <button
                    onClick={() => handleDelete(src.id)}
                    className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Usuń źródło"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
