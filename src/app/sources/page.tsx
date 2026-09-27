"use client";

import React, { useState } from "react";
import {
  FileText,
  UploadCloud,
  Mic,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  Shield,
  FileCheck,
} from "lucide-react";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { SourceItem } from "@/domains/types";

export default function SourcesPage() {
  const [sources, setSources] = useState<SourceItem[]>(() => globalStore.getSources(DEMO_USER_ID));
  const [activeTab, setActiveTab] = useState<"upload" | "paste" | "voice">("paste");

  // Formularz wklejania tekstu
  const [pasteTitle, setPasteTitle] = useState("");
  const [pasteContent, setPasteContent] = useState("");
  const [isThirdParty, setIsThirdParty] = useState(false);
  const [isSyntheticAi, setIsSyntheticAi] = useState(false);

  // Stan podglądu importu (Ingestion Preview)
  const [previewData, setPreviewData] = useState<{
    title: string;
    content: string;
    isThirdParty: boolean;
    isSyntheticAi: boolean;
    wordCount: number;
  } | null>(null);

  const [notice, setNotice] = useState<string | null>(null);

  const refresh = () => setSources([...globalStore.getSources(DEMO_USER_ID)]);

  const handlePreparePreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasteTitle.trim() || !pasteContent.trim()) return;

    setPreviewData({
      title: pasteTitle.trim(),
      content: pasteContent.trim(),
      isThirdParty,
      isSyntheticAi,
      wordCount: pasteContent.trim().split(/\s+/).length,
    });
  };

  const handleConfirmImport = () => {
    if (!previewData) return;

    globalStore.addSource(DEMO_USER_ID, {
      title: previewData.title,
      raw_content: previewData.content,
      mime_type: "text/plain",
      size_bytes: new Blob([previewData.content]).size,
      source_author: previewData.isThirdParty ? "Osoba trzecia" : "Jan Nowak",
      is_third_party: previewData.isThirdParty,
      is_synthetic_ai: previewData.isSyntheticAi,
      event_timestamp: new Date().toISOString(),
    });

    // Automatyczna ekstrakcja hipotezy do przeglądu
    if (!previewData.isThirdParty && !previewData.isSyntheticAi) {
      globalStore.addMemory(DEMO_USER_ID, {
        layer: "knowledge",
        title: previewData.title,
        content: `Wyekstrahowano z nowego materiału źródłowego: ${previewData.content.slice(0, 120)}...`,
        epistemic_status: "source_record",
        confidence: "provisional",
        is_superseded: false,
        evidence: [
          {
            id: `ev-${Date.now()}`,
            user_id: DEMO_USER_ID,
            memory_item_id: "new",
            source_item_id: "recent",
            exact_quote: previewData.content.slice(0, 80),
            source_title: previewData.title,
            created_at: new Date().toISOString(),
          },
        ],
      });
    }

    setPreviewData(null);
    setPasteTitle("");
    setPasteContent("");
    setIsThirdParty(false);
    setIsSyntheticAi(false);
    refresh();

    setNotice("Źródło zostało pomyślnie zaimportowane i przekazane do analizy pamięci.");
    setTimeout(() => setNotice(null), 4000);
  };

  const handleDeleteSource = (id: string) => {
    if (confirm("Usunięcie źródła kaskadowo usunie wszystkie powiązane z nim cytaty dowodowe. Kontynuować?")) {
      globalStore.deleteSource(DEMO_USER_ID, id);
      refresh();
      setNotice("Źródło oraz jego pochodne zostały trwale usunięte (RODO).");
      setTimeout(() => setNotice(null), 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Powiadomienie */}
      {notice && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-sm flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-xs text-emerald-400">
            Zamknij
          </button>
        </div>
      )}

      {/* Nagłówek */}
      <div className="mb-8 pb-6 border-b border-alterja-border">
        <span className="text-xs uppercase tracking-wider text-alterja-blue font-semibold">
          Bezpieczne pozyskiwanie danych
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">Źródła i import materiałów</h1>
        <p className="text-sm text-slate-400 mt-1">
          Wszystkie wpisy są weryfikowane pod kątem autorstwa i zgód przed włączeniem do profilu tożsamości.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lewa kolumna: Formularz importu */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-alterja-border">
            {/* Zakładki kanałów */}
            <div className="flex items-center space-x-2 pb-4 mb-6 border-b border-slate-800">
              <button
                onClick={() => setActiveTab("paste")}
                className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center space-x-2 transition-colors ${
                  activeTab === "paste"
                    ? "bg-alterja-blue text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Wklej tekst / notatkę</span>
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center space-x-2 transition-colors ${
                  activeTab === "upload"
                    ? "bg-alterja-blue text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                <span>Prześlij plik</span>
              </button>
              <button
                onClick={() => setActiveTab("voice")}
                className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center space-x-2 transition-colors ${
                  activeTab === "voice"
                    ? "bg-alterja-blue text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>Notatka głosowa</span>
              </button>
            </div>

            {/* Formularz wklejania */}
            {activeTab === "paste" && (
              <form onSubmit={handlePreparePreview} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Tytuł materiału lub kontekst
                  </label>
                  <input
                    type="text"
                    placeholder="np. Notatka ze spotkania strategicznego, zasady pracy 2025"
                    value={pasteTitle}
                    onChange={(e) => setPasteTitle(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Treść notatki lub wypowiedzi
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Wklej fragment tekstu, przemyślenia lub zapis decyzji..."
                    value={pasteContent}
                    onChange={(e) => setPasteContent(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm leading-relaxed"
                    required
                  />
                </div>

                {/* Kontrola autorstwa i AI */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                    Kwalifikacja autorstwa i prywatności
                  </span>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isThirdParty}
                      onChange={(e) => setIsThirdParty(e.target.checked)}
                      className="mt-0.5 rounded border-slate-700 text-alterja-blue focus:ring-alterja-blue"
                    />
                    <span className="text-xs text-slate-300">
                      Materiał zawiera wypowiedzi osób trzecich (będą odfiltrowane i nie wejdą do
                      Twojego profilu stylu).
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSyntheticAi}
                      onChange={(e) => setIsSyntheticAi(e.target.checked)}
                      className="mt-0.5 rounded border-slate-700 text-alterja-blue focus:ring-alterja-blue"
                    />
                    <span className="text-xs text-slate-300">
                      Tekst został wygenerowany przez narzędzie AI (zostanie oznaczony jako treść
                      syntetyczna).
                    </span>
                  </label>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-alterja-blue hover:bg-blue-600 text-white font-medium text-sm transition-colors flex items-center space-x-2"
                  >
                    <span>Przejdź do podglądu importu</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Obsługa pliku */}
            {activeTab === "upload" && (
              <div className="border-2 border-dashed border-slate-800 rounded-2xl p-10 text-center space-y-3">
                <UploadCloud className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-base font-semibold text-white">
                  Przeciągnij plik tekstowy, PDF lub JSON
                </h4>
                <p className="text-xs text-slate-400">
                  Obsługiwane formaty: .txt, .md, .pdf, .json (eksporty czatów) do 25 MB.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPasteTitle("Przykładowy zaimportowany dokument");
                      setPasteContent("Przykładowa treść zaimportowana z pliku do analizy.");
                      setActiveTab("paste");
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                  >
                    Wczytaj przykładowy plik tekstowy
                  </button>
                </div>
              </div>
            )}

            {/* Notatka głosowa */}
            {activeTab === "voice" && (
              <div className="border border-slate-800 rounded-2xl p-8 text-center space-y-4 bg-slate-900/50">
                <div className="w-16 h-16 rounded-full bg-alterja-blue/10 border border-alterja-blue/30 flex items-center justify-center text-alterja-blue mx-auto">
                  <Mic className="w-8 h-8" />
                </div>
                <h4 className="text-base font-semibold text-white">Krótka notatka głosowa</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Nagraj dobrowolną refleksję. Dźwięk zostanie przetworzony przez neuronowy silnik
                  transkrypcji z podziałem na mówców (*speaker diarization*).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPasteTitle("Transkrypcja notatki głosowej z 27 września");
                    setPasteContent(
                      "Podjąłem decyzję o pełnym skupieniu na jakości architektury danych. Uważam, że bezpieczeństwo i izolacja bazy to fundament każdego systemu memoratywnego."
                    );
                    setActiveTab("paste");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-alterja-blue to-alterja-purple text-white text-xs font-medium shadow-md"
                >
                  Symuluj nagranie notatki głosowej
                </button>
              </div>
            )}
          </div>

          {/* Modal / Ekran podglądu importu */}
          {previewData && (
            <div className="p-6 rounded-2xl glass-panel border border-alterja-blue/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-emerald-400" />
                  <span>Podgląd i potwierdzenie importu</span>
                </h3>
                <span className="text-xs text-slate-400">{previewData.wordCount} słów</span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-1">Tytuł źródła:</span>
                <div className="text-sm font-semibold text-white">{previewData.title}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed max-h-40 overflow-y-auto">
                {previewData.content}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block">Autorstwo:</span>
                  <span className="font-semibold text-white">
                    {previewData.isThirdParty ? "Osoba trzecia (wykluczona ze stylu)" : "Właściciel profilu"}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block">Charakter treści:</span>
                  <span className="font-semibold text-white">
                    {previewData.isSyntheticAi ? "Syntetyczna AI" : "Autentyczny materiał"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPreviewData(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Wróć do edycji
                </button>
                <button
                  type="button"
                  onClick={handleConfirmImport}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Zatwierdź i włącz do analizy</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Prawa kolumna: Lista aktywnych źródeł */}
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-alterja-border">
            <h3 className="text-base font-semibold text-white mb-4">
              Zapisane materiały ({sources.length})
            </h3>

            {sources.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">
                Brak zapisanych źródeł w bazie.
              </p>
            ) : (
              <div className="space-y-3">
                {sources.map((src) => (
                  <div
                    key={src.id}
                    className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-white leading-snug">{src.title}</h4>
                      <button
                        onClick={() => handleDeleteSource(src.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors"
                        title="Usuń źródło"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                      <span>Autor: {src.source_author || "Nieznany"}</span>
                      <span>{src.size_bytes} B</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
