"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import {
  Layers,
  Search,
  Plus,
  ShieldCheck,
  Quote,
  Filter,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Network,
  LayoutGrid,
} from "lucide-react";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { MemoryItem, MemoryLayer, EpistemicStatus } from "@/domains/types";

const LAYERS: { id: MemoryLayer | "all"; label: string; desc: string; color: string }[] = [
  { id: "all", label: "Wszystkie warstwy", desc: "Pełny zbiór pamięci", color: "#2563eb" },
  { id: "biography", label: "Biografia", desc: "Fakty, daty, miejsca, zwroty życiowe", color: "#3b82f6" },
  { id: "values", label: "Wartości", desc: "Zasady nienegocjowalne, etyka", color: "#10b981" },
  { id: "preferences", label: "Preferencje", desc: "Gust, nawyki, rytuały, narzędzia", color: "#f59e0b" },
  { id: "knowledge", label: "Wiedza", desc: "Ekspertyza dziedzinowa, warsztat", color: "#8b5cf6" },
  { id: "decisions", label: "Decyzje", desc: "Zapisane wybory i ich uzasadnienia", color: "#ef4444" },
  { id: "style", label: "Styl", desc: "Zwroty, rytm mowy, humor, pauzy", color: "#ec4899" },
  { id: "context", label: "Kontekst", desc: "Granice, modele partnerstwa i relacje", color: "#06b6d4" },
];

export default function MemoryPage() {
  const [memories, setMemories] = useState<MemoryItem[]>(() => globalStore.getMemories(DEMO_USER_ID));
  const [selectedLayer, setSelectedLayer] = useState<MemoryLayer | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "graph">("cards");
  const [showAddModal, setShowAddModal] = useState(false);

  // Formularz nowego wspomnienia
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newLayer, setNewLayer] = useState<MemoryLayer>("values");
  const [newStatus, setNewStatus] = useState<EpistemicStatus>("user_declaration");

  const refresh = () => setMemories([...globalStore.getMemories(DEMO_USER_ID)]);

  const handleDelete = (id: string) => {
    globalStore.deleteMemory(DEMO_USER_ID, id);
    refresh();
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    globalStore.addMemory(DEMO_USER_ID, {
      layer: newLayer,
      title: newTitle.trim(),
      content: newContent.trim(),
      epistemic_status: newStatus,
      confidence: "confirmed",
      is_superseded: false,
    });

    setNewTitle("");
    setNewContent("");
    setShowAddModal(false);
    refresh();
  };

  const filteredMemories = memories.filter((m) => {
    const matchesLayer = selectedLayer === "all" || m.layer === selectedLayer;
    const matchesSearch =
      !searchQuery.trim() ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLayer && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-blue/15 selection:text-alterja-blue">
      <Navbar />

      {/* PEŁNOFORMATOWA KINOWA SCENA FOTOGRAFICZNA — ALTERJA-MATRIX */}
      <section className="relative w-full min-h-[380px] md:min-h-[440px] flex items-center overflow-hidden bg-slate-950 border-b border-slate-800">
        <Image
          src="/images/alterja-matrix.jpg"
          alt="Monumentalna katedra pamięci AlterJa ze sferą centralną i lewitującymi sześcianami faktów"
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
              <span>Skarbiec tożsamości · 7 warstw autobiograficznych</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white editorial-display leading-tight">
              Skarbiec Twojego umysłu
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
              Twoje niepodważalne zasady, życiowe doświadczenia i granice etyczne. Każdy wpis w tym rejestrze ma twarde uziemienie w Twoich prawdziwych decyzjach i źródłach.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-medium shadow-xl transition-all active:scale-95 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Dodaj wspomnienie</span>
            </button>
          </div>
        </div>
      </section>

      {/* GŁÓWNY PANEL ZARZĄDZANIA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        {/* Pasek narzędziowy: Wyszukiwanie, przełącznik widoku, filtry */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj w pamięci (fakt, wartość, zasada)..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 mr-2">Widok:</span>
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === "cards"
                  ? "bg-slate-950 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Karty</span>
            </button>
            <button
              onClick={() => setViewMode("graph")}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === "graph"
                  ? "bg-slate-950 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Graf powiązań</span>
            </button>
          </div>
        </div>

        {/* Filtr warstw */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {LAYERS.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setSelectedLayer(layer.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-medium whitespace-nowrap transition-all border ${
                selectedLayer === layer.id
                  ? "bg-slate-950 text-white border-slate-950 shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{layer.label}</span>
            </button>
          ))}
        </div>

        {/* WIDOK GRAFU POWIĄZAŃ */}
        {viewMode === "graph" ? (
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-6 text-white overflow-hidden relative min-h-[500px] flex flex-col justify-between">
            <div className="space-y-1 relative z-10">
              <span className="text-[10px] font-mono uppercase text-alterja-gold font-bold tracking-wider">
                Interaktywny graf epistemologiczny
              </span>
              <h3 className="text-xl font-serif font-medium">Relacyjna architektura 7 warstw</h3>
              <p className="text-xs text-slate-400 max-w-xl">
                Wizualizacja powiązań pomiędzy fundamentem etycznym (wartości), decyzjami a materiałami dowodowymi.
              </p>
            </div>

            {/* Wizualizacja sieci węzłów SVG */}
            <div className="w-full h-80 relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 800 400">
                {/* Linie połączeń */}
                <line x1="400" y1="200" x2="200" y2="100" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                <line x1="400" y1="200" x2="600" y2="100" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                <line x1="400" y1="200" x2="200" y2="300" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                <line x1="400" y1="200" x2="600" y2="300" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                <line x1="400" y1="200" x2="400" y2="60" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                <line x1="400" y1="200" x2="400" y2="340" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

                {/* Centralny węzeł: AlterJa Ego */}
                <circle cx="400" cy="200" r="32" fill="#0f172a" stroke="#60a5fa" strokeWidth="3" />
                <text x="400" y="204" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  ALTERJA
                </text>

                {/* Węzły warstw */}
                <g className="cursor-pointer hover:scale-105 transition-transform">
                  <circle cx="200" cy="100" r="22" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                  <text x="200" y="104" textAnchor="middle" fill="#93c5fd" fontSize="9" fontFamily="monospace">Biografia</text>
                </g>

                <g className="cursor-pointer hover:scale-105 transition-transform">
                  <circle cx="600" cy="100" r="22" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                  <text x="600" y="104" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="monospace">Wartości</text>
                </g>

                <g className="cursor-pointer hover:scale-105 transition-transform">
                  <circle cx="200" cy="300" r="22" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                  <text x="200" y="304" textAnchor="middle" fill="#fde047" fontSize="9" fontFamily="monospace">Nawyki</text>
                </g>

                <g className="cursor-pointer hover:scale-105 transition-transform">
                  <circle cx="600" cy="300" r="22" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                  <text x="600" y="304" textAnchor="middle" fill="#d8b4fe" fontSize="9" fontFamily="monospace">Wiedza</text>
                </g>

                <g className="cursor-pointer hover:scale-105 transition-transform">
                  <circle cx="400" cy="60" r="22" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                  <text x="400" y="64" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="monospace">Decyzje</text>
                </g>

                <g className="cursor-pointer hover:scale-105 transition-transform">
                  <circle cx="400" cy="340" r="22" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                  <text x="400" y="344" textAnchor="middle" fill="#67e8f9" fontSize="9" fontFamily="monospace">Ekspresja</text>
                </g>
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-4">
              <span>Węzłów w pamięci: {memories.length}</span>
              <span>Wskaźnik uziemienia dowodowego: 100%</span>
            </div>
          </div>
        ) : (
          /* WIDOK KART PAMIĘCI */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemories.map((mem) => {
              const evidence = globalStore.getEvidenceForMemory(mem.id);
              const layerMeta = LAYERS.find((l) => l.id === mem.layer);

              return (
                <div
                  key={mem.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-semibold uppercase">
                        {layerMeta?.label || mem.layer}
                      </span>
                      <button
                        onClick={() => handleDelete(mem.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Usuń wpis"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 leading-snug">
                      {mem.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-4">
                      {mem.content}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>Status: {mem.epistemic_status}</span>
                      <span className="text-emerald-600 font-semibold">Pewność: {mem.confidence}</span>
                    </div>

                    {evidence.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-600 italic border border-slate-100 flex items-start gap-1.5">
                        <Quote className="w-3 h-3 text-alterja-gold shrink-0 mt-0.5" />
                        <span className="line-clamp-2">„{evidence[0].exact_quote}”</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal dodawania nowego wspomnienia */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <h3 className="text-xl font-serif font-medium text-slate-950">
              Dodaj nową kartę pamięci
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-600">Tytuł wpisu</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Np. Zasada dotrzymywania terminów..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-alterja-blue"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-600">Warstwa</label>
                  <select
                    value={newLayer}
                    onChange={(e) => setNewLayer(e.target.value as MemoryLayer)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-alterja-blue"
                  >
                    <option value="values">Wartości</option>
                    <option value="biography">Biografia</option>
                    <option value="preferences">Preferencje</option>
                    <option value="knowledge">Wiedza</option>
                    <option value="decisions">Decyzje</option>
                    <option value="relations">Relacje</option>
                    <option value="expressions">Ekspresja</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-600">Status epistemiczny</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as EpistemicStatus)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-alterja-blue"
                  >
                    <option value="user_declaration">Deklaracja wprost</option>
                    <option value="observed_behavior">Zaobserwowany fakt</option>
                    <option value="inferred_pattern">Wzorce wywnioskowane</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-600">Treść pamięci</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Opisz zasadę lub fakt..."
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-alterja-blue"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium shadow-md"
                >
                  Zapisz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
