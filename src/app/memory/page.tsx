"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  Database,
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

      {/* PEŁNOFORMATOWA KINOWA SCENA FOTOGRAFICZNA (MEMORY-CATHEDRAL) */}
      <section className="relative w-full min-h-[400px] md:min-h-[460px] flex items-center overflow-hidden bg-slate-950">
        <Image
          src="/images/memory-cathedral.jpg"
          alt="Monumentalna katedra wiedzy i pierścienie pamięci AlterJa"
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/20 text-blue-300 text-xs font-mono backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Skarbiec tożsamości · 7 warstw kognitywnych</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white editorial-display leading-tight">
              Skarbiec Twojego umysłu
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-xl">
              Twoje niepodważalne zasady, życiowe doświadczenia i granice, których nikt nie przekroczy. Każdy wpis w tym rejestrze ma twarde uziemienie w Twoich prawdziwych decyzjach.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-luxe-light !py-3 !px-5 text-xs shadow-2xl active:scale-95"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Dodaj nowy fakt do pamięci</span>
            </button>
          </div>
        </div>
      </section>

      {/* OBSZAR ROBOCZY - PRZEGLĄDARKA PAMIĘCI */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 relative z-20 -mt-10 sm:-mt-12">
        {/* Wyszukiwarka i filtry w szklanym pasku */}
        <div className="p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Szukaj we wspomnieniach, faktach, preferencjach..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-alterja-blue focus:bg-white shadow-inner font-medium"
            />
          </div>

          {/* Filtry warstw */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {LAYERS.map((layer) => (
              <button
                key={layer.key}
                onClick={() => setSelectedLayer(layer.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedLayer === layer.key
                    ? "bg-slate-950 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista kart pamięci */}
        {filteredMemories.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white/95 backdrop-blur-xl border border-dashed border-slate-200 text-center text-slate-500 shadow-lg">
            <Brain className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-800">Brak wpisów spełniających kryteria</p>
            <p className="text-xs text-slate-500 mt-1">Zmień filtry lub dodaj nową zasadę do pamięci.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMemories.map((mem) => {
              const evidence = mem.evidence && mem.evidence.length > 0 ? mem.evidence[0] : null;
              return (
                <div
                  key={mem.id}
                  className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        Warstwa: {mem.layer}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-800 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        Status: {mem.epistemic_status}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-medium text-slate-950 editorial-display">
                      {mem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {mem.content}
                    </p>

                    {evidence && (
                      <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-slate-800 space-y-1">
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
                        className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-950 transition-colors"
                        title="Edytuj wpis"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(mem.id)}
                        className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
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

      {/* Modal edycji wpisu */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-medium text-slate-950">Edytuj zasadę pamięci</h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Tytuł wpisu</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-alterja-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Treść reguły</label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-alterja-blue"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium transition-colors shadow-sm"
                >
                  Zapisz zmiany
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal dodawania wpisu */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-medium text-slate-950">Dodaj nowy fakt do pamięci</h3>
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
