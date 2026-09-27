"use client";

import React, { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import {
  Brain,
  Search,
  Trash2,
  Edit3,
  Plus,
  Quote,
  Layers,
  CheckCircle2,
  X,
  Shield,
  ArrowRight,
} from "lucide-react";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { MemoryItem, MemoryLayer, EpistemicStatus } from "@/domains/types";

const LAYERS: { key: MemoryLayer | "all"; label: string }[] = [
  { key: "all", label: "Wszystkie warstwy" },
  { key: "values", label: "Wartości i pryncypia" },
  { key: "decisions", label: "Wzorce decyzji" },
  { key: "style", label: "Styl i leksyka" },
  { key: "knowledge", label: "Wiedza domenowa" },
  { key: "preferences", label: "Preferencje" },
  { key: "biography", label: "Biografia" },
  { key: "context", label: "Kontekst relacyjny" },
];

export default function MemoryLibraryPage() {
  const [selectedLayer, setSelectedLayer] = useState<MemoryLayer | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [memories, setMemories] = useState<MemoryItem[]>(() =>
    globalStore.getMemories(DEMO_USER_ID)
  );
  const [editingItem, setEditingItem] = useState<MemoryItem | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [addLayer, setAddLayer] = useState<MemoryLayer>("values");
  const [addTitle, setAddTitle] = useState("");
  const [addContent, setAddContent] = useState("");
  const [addQuote, setAddQuote] = useState("");

  const refresh = () => {
    setMemories([...globalStore.getMemories(DEMO_USER_ID)]);
  };

  const handleDelete = (id: string) => {
    globalStore.deleteMemory(DEMO_USER_ID, id);
    refresh();
  };

  const handleStartEdit = (item: MemoryItem) => {
    setEditingItem(item);
    setNewTitle(item.title);
    setNewContent(item.content);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    globalStore.updateMemory(DEMO_USER_ID, editingItem.id, {
      title: newTitle,
      content: newContent,
      epistemic_status: "user_declaration",
    });
    setEditingItem(null);
    refresh();
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addTitle.trim() || !addContent.trim()) return;

    globalStore.addMemory(DEMO_USER_ID, {
      layer: addLayer,
      title: addTitle.trim(),
      content: addContent.trim(),
      epistemic_status: "user_declaration",
      confidence: "confirmed",
      is_superseded: false,
    });

    setAddTitle("");
    setAddContent("");
    setAddQuote("");
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
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Nagłówek strony */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-mono font-medium mb-2">
              <Brain className="w-3.5 h-3.5 text-alterja-blue" />
              <span>7 warstw kognitywnych · Pełne uziemienie</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
              Biblioteka pamięci autobiograficznej
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Zbiór zweryfikowanych faktów, przekonań, stylu i reguł decyzyjnych. Każda karta posiada udokumentowane pochodzenie źródłowe.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium shadow-sm transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Dodaj wpis do pamięci</span>
          </button>
        </div>

        {/* Wyszukiwarka i filtry */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Szukaj we wspomnieniach, faktach, preferencjach..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-alterja-blue shadow-sm font-medium"
            />
          </div>

          {/* Filtry warstw */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {LAYERS.map((layer) => (
              <button
                key={layer.key}
                onClick={() => setSelectedLayer(layer.key)}
                className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedLayer === layer.key
                    ? "bg-slate-950 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista kart pamięci */}
        {filteredMemories.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white border border-dashed border-slate-200 text-center text-slate-500">
            <Brain className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-medium text-slate-800">Brak wpisów spełniających kryteria</p>
            <p className="text-xs text-slate-500 mt-1">Zmień filtry lub dodaj nowy fakt do pamięci.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMemories.map((mem) => {
              const evidence = mem.evidence && mem.evidence.length > 0 ? mem.evidence[0] : null;
              return (
                <div
                  key={mem.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-float transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        Warstwa: {mem.layer}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Status: {mem.epistemic_status}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-950">{mem.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{mem.content}</p>

                    {evidence && (
                      <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-slate-800 space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold text-alterja-blue">
                          <Quote className="w-3 h-3" />
                          <span>Dowód: {evidence.source_title || "Źródło autoryzowane"}</span>
                        </div>
                        <p className="italic font-serif text-[11px] text-slate-900">
                          „{evidence.exact_quote}”
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono text-[11px]">ID: {mem.id.slice(0, 10)}...</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleStartEdit(mem)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-950 transition-colors"
                        title="Edytuj wpis"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(mem.id)}
                        className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Usuń wpis (RODO)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal dodawania wpisu */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-950">Dodaj nowy fakt do pamięci</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Warstwa pamięci</label>
                <select
                  value={addLayer}
                  onChange={(e) => setAddLayer(e.target.value as MemoryLayer)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-alterja-blue"
                >
                  <option value="values">Wartości i pryncypia</option>
                  <option value="decisions">Wzorce decyzji</option>
                  <option value="style">Styl i leksyka</option>
                  <option value="knowledge">Wiedza domenowa</option>
                  <option value="preferences">Preferencje</option>
                  <option value="biography">Biografia</option>
                  <option value="context">Kontekst relacyjny</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Tytuł wpisu</label>
                <input
                  type="text"
                  required
                  value={addTitle}
                  onChange={(e) => setAddTitle(e.target.value)}
                  placeholder="np. Zasada transparentności w relacjach"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-alterja-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Treść faktu</label>
                <textarea
                  rows={3}
                  required
                  value={addContent}
                  onChange={(e) => setAddContent(e.target.value)}
                  placeholder="Opisz regułę lub fakt bez konfabulacji..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-alterja-blue"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium transition-colors shadow-sm"
                >
                  Zapisz fakt w pamięci
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
